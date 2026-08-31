"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import type { PainArea } from "@/data/painAreas";
import type { BodyView, PainIntensity, PainSelection } from "@/data/bodyRegions";
import { BODY_REGIONS } from "@/data/bodyRegions";
import HumanBodyModel from "./HumanBodyModel";
import Body3DPanel from "./Body3DPanel";

export interface Body3DSceneProps {
  areas: PainArea[];
  selectedIds: string[];
  onSelect: (area: PainArea) => void;
}

/* ─── Camera controller for Front/Back transitions ──────────────────── */
function CameraController({ viewTarget }: { viewTarget: "front" | "back" }) {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 0, 4.5));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 4.5));

  useEffect(() => {
    if (viewTarget === "front") {
      targetRef.current.set(0, 0, 4.5);
    } else {
      targetRef.current.set(0, 0, -4.5);
    }
  }, [viewTarget]);

  useFrame(() => {
    currentTarget.current.lerp(targetRef.current, 0.05);
    camera.position.copy(currentTarget.current);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  });

  return null;
}

/* ─── 3D Pain hotspot at intersection point ─────────────────────────── */
function PainHotspot({
  position,
  intensity,
  visible,
}: {
  position: [number, number, number] | null;
  intensity: PainIntensity;
  visible: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const color = useMemo(() => {
    switch (intensity) {
      case "mild": return "#fbbf24";
      case "moderate": return "#f97316";
      case "severe": return "#ef4444";
    }
  }, [intensity]);

  const scale = useMemo(() => {
    switch (intensity) {
      case "mild": return 0.06;
      case "moderate": return 0.08;
      case "severe": return 0.1;
    }
  }, [intensity]);

  useFrame((_, delta) => {
    if (ref.current && visible) {
      ref.current.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.15);
    }
  });

  if (!visible || !position) return null;

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[scale, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.7}
        depthTest={false}
      />
    </mesh>
  );
}

/* ─── Main Scene ────────────────────────────────────────────────────── */
export default function Body3DScene({ areas, selectedIds, onSelect }: Body3DSceneProps) {
  const [view, setView] = useState<BodyView>("front");
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string } | null>(null);
  const [selections, setSelections] = useState<Map<string, PainSelection>>(new Map());
  const [activeIntensity, setActiveIntensity] = useState<PainIntensity>("moderate");
  const [hotspotPos, setHotspotPos] = useState<[number, number, number] | null>(null);
  const [showMobileSheet, setShowMobileSheet] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedIdsFromMap = useMemo(() => Array.from(selections.keys()), [selections]);

  /* ─── Click handler ─────────────────────────────────────────── */
  const handleRegionClick = useCallback(
    (id: string) => {
      const area = areas.find((a) => a.id === id);
      if (!area) return;
      setSelections((prev) => {
        const next = new Map(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.set(id, { regionId: id, label: area.name, intensity: activeIntensity });
        }
        return next;
      });
      onSelect(area);
    },
    [areas, activeIntensity, onSelect]
  );

  /* ─── Pointer move handler (for tooltip) ────────────────────── */
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (hovered) {
        const region = BODY_REGIONS.find((r) => r.id === hovered);
        setTooltip({ x, y: y - 16, label: region?.label ?? hovered });
      }
    },
    [hovered]
  );

  const handlePointerLeave = useCallback(() => {
    setTooltip(null);
    setHovered(null);
  }, []);

  /* ─── Intensity change ──────────────────────────────────────── */
  const updateIntensity = useCallback((id: string, intensity: PainIntensity) => {
    setActiveIntensity(intensity);
    setSelections((prev) => {
      const next = new Map(prev);
      const existing = next.get(id);
      if (existing) next.set(id, { ...existing, intensity });
      return next;
    });
  }, []);

  const removeSelection = useCallback((id: string) => {
    setSelections((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const resetView = useCallback(() => {
    setView("front");
    setSelections(new Map());
    setHovered(null);
    setTooltip(null);
  }, []);

  /* ─── Mobile touch handler ──────────────────────────────────── */
  const handleRegionTouch = useCallback((id: string) => {
    setShowMobileSheet(id);
  }, []);

  const confirmMobileSelection = useCallback(
    (id: string) => {
      const area = areas.find((a) => a.id === id);
      if (!area) return;
      setSelections((prev) => {
        const next = new Map(prev);
        next.set(id, { regionId: id, label: area.name, intensity: activeIntensity });
        return next;
      });
      setShowMobileSheet(null);
    },
    [areas, activeIntensity]
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* ─── Controls ──────────────────────────────────── */}
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setView("front")}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            view === "front"
              ? "bg-[var(--color-primary-700)] text-white shadow-lg shadow-[var(--color-primary-700)]/25"
              : "bg-[var(--color-surface-200)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-300)]"
          }`}
          aria-pressed={view === "front"}
        >
          Front
        </button>
        <button
          onClick={() => setView("back")}
          className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            view === "back"
              ? "bg-[var(--color-primary-700)] text-white shadow-lg shadow-[var(--color-primary-700)]/25"
              : "bg-[var(--color-surface-200)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-300)]"
          }`}
          aria-pressed={view === "back"}
        >
          Back
        </button>
        <button
          onClick={resetView}
          className="px-4 py-2.5 rounded-lg text-sm font-medium bg-[var(--color-surface-100)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-200)] transition-all"
          title="Reset view and selections"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ─── 3D Canvas ──────────────────────────────── */}
        <div className="flex-1 w-full">
          <div
            ref={containerRef}
            className="relative bg-gradient-to-b from-[var(--color-primary-900)] via-[#0f1d32] to-[var(--color-primary-800)] rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/5" }}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <Canvas
              camera={{ position: [0, 0, 4.5], fov: 40, near: 0.1, far: 100 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
              style={{ background: "transparent" }}
            >
              {/* Lighting — premium 3-point setup */}
              <ambientLight intensity={0.35} />
              {/* Key light — warm, upper-right */}
              <directionalLight position={[3, 5, 4]} intensity={1.4} color="#fff5e6" castShadow />
              {/* Fill light — cool, left side */}
              <directionalLight position={[-3, 3, 2]} intensity={0.5} color="#b3d4fc" />
              {/* Rim light — back, creates edge definition */}
              <directionalLight position={[0, 2, -4]} intensity={0.6} color="#e0eaff" />
              {/* Under-fill — subtle bottom light to reduce harsh shadows */}
              <pointLight position={[0, -1, 2]} intensity={0.15} color="#fde8d0" />
              <hemisphereLight args={["#f0e8d8", "#1a2030", 0.25]} />

              {/* Environment — soft studio HDRI */}
              <Environment preset="studio" environmentIntensity={0.25} />

              {/* Camera controller */}
              <CameraController viewTarget={view} />

              {/* Human body model */}
              <HumanBodyModel
                selectedIds={selectedIdsFromMap}
                hoveredId={hovered}
                selections={selections}
                onHover={setHovered}
                onHoverEnd={() => setHovered(null)}
                onClick={handleRegionClick}
                onTouch={handleRegionTouch}
                setHotspotPos={setHotspotPos}
              />

              {/* Contact shadows */}
              <ContactShadows
                position={[0, -1.65, 0]}
                opacity={0.4}
                scale={4}
                blur={2}
                far={4}
                color="#0c1929"
              />

              {/* Orbit controls */}
              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={2.5}
                maxDistance={8}
                minPolarAngle={Math.PI * 0.15}
                maxPolarAngle={Math.PI * 0.85}
                enableDamping
                dampingFactor={0.08}
                rotateSpeed={0.5}
                target={[0, 0, 0]}
              />
            </Canvas>

            {/* Tooltip overlay */}
            {tooltip && (
              <div
                className="absolute pointer-events-none z-20 px-3 py-1.5 rounded-lg bg-[var(--color-primary-900)]/95 border border-white/10 text-white text-xs font-semibold shadow-lg"
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                  transform: "translate(-50%, -100%)",
                }}
              >
                {tooltip.label}
                <div className="text-[10px] text-white/50 font-normal mt-0.5">Click to select</div>
              </div>
            )}

            {/* Selection count badge */}
            {selectedIdsFromMap.length > 0 && (
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg z-20 animate-fade-in">
                {selectedIdsFromMap.length} selected
              </div>
            )}
          </div>

          <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">
            Drag to rotate • Scroll to zoom • Click a body region to select
          </p>
        </div>

        {/* ─── Selection Panel ─────────────────────────── */}
        <Body3DPanel
          selections={selections}
          activeIntensity={activeIntensity}
          onIntensityChange={updateIntensity}
          onRemove={removeSelection}
        />
      </div>

      {/* ─── Mobile Bottom Sheet ───────────────────────── */}
      {showMobileSheet && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setShowMobileSheet(null)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 pb-8 animate-slide-up shadow-2xl">
            <div className="w-10 h-1 bg-[var(--color-surface-300)] rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
              {BODY_REGIONS.find((r) => r.id === showMobileSheet)?.label}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-5">How severe is the discomfort?</p>
            <div className="space-y-2.5 mb-6">
              {(["mild", "moderate", "severe"] as PainIntensity[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveIntensity(level)}
                  className={`w-full px-4 py-3.5 rounded-xl text-left font-medium transition-all border-2 ${
                    activeIntensity === level
                      ? level === "mild"
                        ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                        : level === "moderate"
                        ? "border-orange-400 bg-orange-50 text-orange-700"
                        : "border-red-400 bg-red-50 text-red-700"
                      : "border-[var(--color-surface-200)] bg-white text-[var(--color-text-primary)]"
                  }`}
                >
                  <span className="font-semibold capitalize">{level}</span>
                  <span className="text-xs text-[var(--color-text-muted)] ml-2">
                    {level === "mild" ? "Barely noticeable" : level === "moderate" ? "Interferes with activities" : "Significantly limiting"}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowMobileSheet(null)} className="flex-1 px-4 py-3 rounded-xl border border-[var(--color-surface-300)] text-[var(--color-text-secondary)] font-semibold">
                Cancel
              </button>
              <button
                onClick={() => confirmMobileSelection(showMobileSheet)}
                className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-clinical-600)] text-white font-semibold hover:bg-[var(--color-clinical-700)]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
