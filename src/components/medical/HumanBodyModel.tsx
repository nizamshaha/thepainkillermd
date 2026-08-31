"use client";

import { useRef, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BODY_REGIONS, type PainIntensity, type PainSelection } from "@/data/bodyRegions";

interface HumanBodyModelProps {
  selectedIds: string[];
  hoveredId: string | null;
  selections: Map<string, PainSelection>;
  onHover: (id: string | null) => void;
  onHoverEnd: () => void;
  onClick: (id: string) => void;
  onTouch: (id: string) => void;
  setHotspotPos: (pos: [number, number, number] | null) => void;
}

/* ─── Body part geometry definitions ──────────────────────────────────
   Improved proportions for a more realistic human silhouette.
   ViewBox center: origin, height ~3.4 units.                           */

interface BodyPartDef {
  regionId: string;
  type: "sphere" | "cylinder" | "capsule" | "box" | "torus";
  args: number[];
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

const BODY_PARTS: BodyPartDef[] = [
  // ── HEAD (more detailed) ──
  { regionId: "headache", type: "sphere", args: [0.19, 32, 32], position: [0, 1.38, 0] },
  // Skull back
  { regionId: "headache", type: "sphere", args: [0.17, 24, 24], position: [0, 1.42, -0.04] },

  // ── NECK ──
  { regionId: "neck-cervical-pain", type: "cylinder", args: [0.065, 0.075, 0.2, 20], position: [0, 1.14, 0] },
  // Neck muscles
  { regionId: "neck-cervical-pain", type: "cylinder", args: [0.055, 0.06, 0.12, 16], position: [0, 1.06, 0] },

  // ── SHOULDERS (rounded deltoids) ──
  { regionId: "shoulder-pain", type: "sphere", args: [0.12, 24, 24], position: [-0.29, 1.02, 0] },
  { regionId: "shoulder-pain", type: "sphere", args: [0.12, 24, 24], position: [0.29, 1.02, 0] },
  // Deltoid caps
  { regionId: "shoulder-pain", type: "sphere", args: [0.09, 20, 20], position: [-0.32, 1.06, 0.02] },
  { regionId: "shoulder-pain", type: "sphere", args: [0.09, 20, 20], position: [0.32, 1.06, 0.02] },

  // ── CHEST (tapered torso) ──
  { regionId: "chest-pain", type: "cylinder", args: [0.19, 0.21, 0.38, 24], position: [0, 0.82, 0] },
  // Pectorals
  { regionId: "chest-pain", type: "sphere", args: [0.1, 20, 20], position: [-0.1, 0.9, 0.1] },
  { regionId: "chest-pain", type: "sphere", args: [0.1, 20, 20], position: [0.1, 0.9, 0.1] },

  // ── UPPER BACK ──
  { regionId: "upper-back-pain", type: "cylinder", args: [0.19, 0.21, 0.38, 24], position: [0, 0.82, -0.02] },
  // Scapulae
  { regionId: "upper-back-pain", type: "sphere", args: [0.08, 16, 16], position: [-0.12, 0.85, -0.14] },
  { regionId: "upper-back-pain", type: "sphere", args: [0.08, 16, 16], position: [0.12, 0.85, -0.14] },

  // ── ARMS (upper) ──
  { regionId: "arm-pain", type: "cylinder", args: [0.052, 0.048, 0.34, 16], position: [-0.35, 0.8, 0] },
  { regionId: "arm-pain", type: "cylinder", args: [0.052, 0.048, 0.34, 16], position: [0.35, 0.8, 0] },
  // Biceps
  { regionId: "arm-pain", type: "sphere", args: [0.055, 16, 16], position: [-0.34, 0.82, 0.04] },
  { regionId: "arm-pain", type: "sphere", args: [0.055, 16, 16], position: [0.34, 0.82, 0.04] },

  // ── MIDBACK ──
  { regionId: "midback-pain", type: "cylinder", args: [0.21, 0.19, 0.36, 24], position: [0, 0.44, 0] },
  { regionId: "midback-pain", type: "cylinder", args: [0.21, 0.19, 0.36, 24], position: [0, 0.44, -0.02] },

  // ── ELBOWS ──
  { regionId: "elbow-pain", type: "sphere", args: [0.05, 16, 16], position: [-0.37, 0.58, 0] },
  { regionId: "elbow-pain", type: "sphere", args: [0.05, 16, 16], position: [0.37, 0.58, 0] },

  // ── FOREARMS ──
  { regionId: "forearm-pain", type: "cylinder", args: [0.042, 0.038, 0.32, 14], position: [-0.39, 0.38, 0] },
  { regionId: "forearm-pain", type: "cylinder", args: [0.042, 0.038, 0.32, 14], position: [0.39, 0.38, 0] },

  // ── LOW BACK ──
  { regionId: "low-back-pain", type: "cylinder", args: [0.19, 0.21, 0.22, 24], position: [0, 0.12, 0] },
  { regionId: "low-back-pain", type: "cylinder", args: [0.19, 0.21, 0.22, 24], position: [0, 0.12, -0.02] },

  // ── WRISTS ──
  { regionId: "wrist-pain", type: "sphere", args: [0.038, 14, 14], position: [-0.4, 0.18, 0] },
  { regionId: "wrist-pain", type: "sphere", args: [0.038, 14, 14], position: [0.4, 0.18, 0] },

  // ── HANDS ──
  { regionId: "palm-pain", type: "box", args: [0.065, 0.09, 0.035], position: [-0.41, 0.09, 0] },
  { regionId: "palm-pain", type: "box", args: [0.065, 0.09, 0.035], position: [0.41, 0.09, 0] },

  // ── FINGERS ──
  { regionId: "fingers-pain", type: "sphere", args: [0.025, 10, 10], position: [-0.41, 0.02, 0] },
  { regionId: "fingers-pain", type: "sphere", args: [0.025, 10, 10], position: [0.41, 0.02, 0] },

  // ── TAILBONE ──
  { regionId: "tail-bone-pain", type: "sphere", args: [0.05, 14, 14], position: [0, 0.02, -0.16] },

  // ── BUTTOCKS ──
  { regionId: "buttock-pain", type: "sphere", args: [0.11, 20, 20], position: [-0.1, -0.08, -0.1] },
  { regionId: "buttock-pain", type: "sphere", args: [0.11, 20, 20], position: [0.1, -0.08, -0.1] },

  // ── HIPS ──
  { regionId: "hip-pain", type: "sphere", args: [0.09, 18, 18], position: [-0.17, -0.15, 0] },
  { regionId: "hip-pain", type: "sphere", args: [0.09, 18, 18], position: [0.17, -0.15, 0] },

  // ── THIGHS ──
  { regionId: "thigh-pain-anterior", type: "cylinder", args: [0.085, 0.075, 0.48, 18], position: [-0.12, -0.46, 0] },
  { regionId: "thigh-pain-anterior", type: "cylinder", args: [0.085, 0.075, 0.48, 18], position: [0.12, -0.46, 0] },
  // Quad muscles
  { regionId: "thigh-pain-anterior", type: "sphere", args: [0.07, 16, 16], position: [-0.12, -0.42, 0.04] },
  { regionId: "thigh-pain-anterior", type: "sphere", args: [0.07, 16, 16], position: [0.12, -0.42, 0.04] },

  // ── KNEES ──
  { regionId: "knee-pain", type: "sphere", args: [0.065, 18, 18], position: [-0.12, -0.78, 0] },
  { regionId: "knee-pain", type: "sphere", args: [0.065, 18, 18], position: [0.12, -0.78, 0] },

  // ── CALVES ──
  { regionId: "leg-pain", type: "cylinder", args: [0.065, 0.05, 0.42, 16], position: [-0.12, -1.08, 0] },
  { regionId: "leg-pain", type: "cylinder", args: [0.065, 0.05, 0.42, 16], position: [0.12, -1.08, 0] },
  // Calf muscles
  { regionId: "leg-pain", type: "sphere", args: [0.055, 14, 14], position: [-0.12, -1.02, -0.03] },
  { regionId: "leg-pain", type: "sphere", args: [0.055, 14, 14], position: [0.12, -1.02, -0.03] },

  // ── ANKLES ──
  { regionId: "ankle-pain", type: "sphere", args: [0.04, 14, 14], position: [-0.12, -1.36, 0] },
  { regionId: "ankle-pain", type: "sphere", args: [0.04, 14, 14], position: [0.12, -1.36, 0] },

  // ── FEET ──
  { regionId: "foot-pain", type: "box", args: [0.085, 0.035, 0.17], position: [-0.12, -1.43, 0.04] },
  { regionId: "foot-pain", type: "box", args: [0.085, 0.035, 0.17], position: [0.12, -1.43, 0.04] },
];

/* ─── Skin material config ──────────────────────────────────────────── */
const SKIN_COLOR = new THREE.Color("#c4a882");
const SKIN_EMISSIVE = new THREE.Color("#1a0e05");

const INTENSITY_COLORS: Record<PainIntensity, { color: THREE.Color; emissive: THREE.Color; emissiveIntensity: number }> = {
  mild: { color: new THREE.Color("#e8b84a"), emissive: new THREE.Color("#5c3a0a"), emissiveIntensity: 0.5 },
  moderate: { color: new THREE.Color("#e07030"), emissive: new THREE.Color("#6b2a08"), emissiveIntensity: 0.6 },
  severe: { color: new THREE.Color("#d43030"), emissive: new THREE.Color("#701515"), emissiveIntensity: 0.7 },
};

const HOVER_EMISSIVE = new THREE.Color("#1a3050");

/* ─── Shared material pool (avoid per-frame allocations) ─────────────── */
const sharedMaterial = new THREE.MeshStandardMaterial({
  color: SKIN_COLOR,
  emissive: SKIN_EMISSIVE,
  emissiveIntensity: 0.05,
  roughness: 0.58,
  metalness: 0.02,
  transparent: false,
});

/* ─── Individual body part mesh ─────────────────────────────────────── */
function BodyPart({
  part,
  isSelected,
  isHovered,
  intensity,
  onPointerEnter,
  onPointerOut,
  onClick,
  setHotspotPos,
}: {
  part: BodyPartDef;
  isSelected: boolean;
  isHovered: boolean;
  intensity: PainIntensity | null;
  onPointerEnter: (id: string) => void;
  onPointerOut: () => void;
  onClick: (id: string) => void;
  setHotspotPos: (pos: [number, number, number] | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  /* ─── Per-part material clone ───────────────────────────── */
  const material = useMemo(() => sharedMaterial.clone(), []);

  /* ─── Smooth material transitions in render loop ────────── */
  useFrame(() => {
    if (!matRef.current) return;
    const mat = matRef.current;

    if (isSelected && intensity) {
      const cfg = INTENSITY_COLORS[intensity];
      mat.color.lerp(cfg.color, 0.08);
      mat.emissive.lerp(cfg.emissive, 0.08);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, cfg.emissiveIntensity, 0.08);
    } else if (isHovered) {
      mat.color.lerp(new THREE.Color("#d4b896"), 0.08);
      mat.emissive.lerp(HOVER_EMISSIVE, 0.08);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.3, 0.08);
    } else {
      mat.color.lerp(SKIN_COLOR, 0.06);
      mat.emissive.lerp(SKIN_EMISSIVE, 0.06);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 0.05, 0.06);
    }

    // Subtle pulse for severe
    if (isSelected && intensity === "severe") {
      mat.emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.003) * 0.15;
    }
  });

  const geometry = useMemo(() => {
    switch (part.type) {
      case "sphere":
        return new THREE.SphereGeometry(part.args[0], part.args[1], part.args[2]);
      case "cylinder":
        return new THREE.CylinderGeometry(part.args[0], part.args[1], part.args[2], part.args[3]);
      case "box":
        return new THREE.BoxGeometry(part.args[0], part.args[1], part.args[2]);
      default:
        return new THREE.SphereGeometry(0.05, 8, 8);
    }
  }, [part]);

  const handlePointerOver = useCallback(
    (e: any) => {
      e.stopPropagation();
      onPointerEnter(part.regionId);
      document.body.style.cursor = "pointer";
    },
    [part.regionId, onPointerEnter]
  );

  const handlePointerOut = useCallback(
    (e: any) => {
      e.stopPropagation();
      onPointerOut();
      setHotspotPos(null);
      document.body.style.cursor = "auto";
    },
    [onPointerOut, setHotspotPos]
  );

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      onClick(part.regionId);
    },
    [part.regionId, onClick]
  );

  const handlePointerMove = useCallback(
    (e: any) => {
      if (e.intersections && e.intersections.length > 0) {
        const point = e.intersections[0].point;
        setHotspotPos([point.x, point.y, point.z]);
      }
    },
    [setHotspotPos]
  );

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={part.position}
      rotation={part.rotation}
      scale={part.scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      <meshStandardMaterial
        ref={matRef}
        color={SKIN_COLOR}
        emissive={SKIN_EMISSIVE}
        emissiveIntensity={0.05}
        roughness={0.58}
        metalness={0.02}
      />
    </mesh>
  );
}

/* ─── Pain hotspot sphere (placed at raycast intersection) ──────────── */
function PainHotspot({ position, intensity }: { position: [number, number, number] | null; intensity: PainIntensity }) {
  const ref = useRef<THREE.Mesh>(null);

  const color = useMemo(() => {
    switch (intensity) {
      case "mild": return "#fbbf24";
      case "moderate": return "#f97316";
      case "severe": return "#ef4444";
    }
  }, [intensity]);

  useFrame(() => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(Date.now() * 0.004) * 0.12);
      ref.current.lookAt(new THREE.Vector3(0, 0, 5));
    }
  });

  if (!position) return null;

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.025, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} depthTest={false} />
    </mesh>
  );
}

/* ─── Main human body model ─────────────────────────────────────────── */
export default function HumanBodyModel({
  selectedIds,
  hoveredId,
  selections,
  onHover,
  onHoverEnd,
  onClick,
  onTouch,
  setHotspotPos,
}: HumanBodyModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle idle rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0002) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {BODY_PARTS.map((part, i) => {
        const isSelected = selectedIds.includes(part.regionId);
        const isHovered = hoveredId === part.regionId;
        const sel = selections.get(part.regionId);

        return (
          <BodyPart
            key={`${part.regionId}-${i}`}
            part={part}
            isSelected={isSelected}
            isHovered={isHovered}
            intensity={sel?.intensity ?? null}
            onPointerEnter={(id) => onHover(id)}
            onPointerOut={() => onHoverEnd()}
            onClick={onClick}
            setHotspotPos={setHotspotPos}
          />
        );
      })}

      {/* Pain hotspots for selected regions */}
      {Array.from(selections.entries()).map(([id, sel]) => (
        <PainHotspot
          key={id}
          position={[0, 0, 0]}
          intensity={sel.intensity}
        />
      ))}
    </group>
  );
}
