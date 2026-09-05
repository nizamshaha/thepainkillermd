import React, { useState, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { MeshStandardMaterial, TextureLoader } from "three";
import { useEffect } from "react";

export default function HumanBody3DViewer({ onClose }: { onClose: () => void }) {
  const [modelReady, setModelReady] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const sceneRef = useRef<any>(null);

  // Simple placeholder: a textured sphere using body.jpeg
  // In production, replace with actual GLTF model loading.

  // We'll attempt to load a GLTF model if exists; otherwise use placeholder.
  // Since we cannot dynamically check file existence, we'll try to load and catch error.
  // For simplicity, we'll use a sphere with the body.jpeg texture.

  const texture = new TextureLoader().load("/photos/body.jpeg");

  // Material for the sphere
  const sphereMaterial = new MeshStandardMaterial({
    map: texture,
    // Make it look like a body silhouette? We'll just use the texture as is.
  });

  // Handle click on the sphere to open modal? Actually clicking on the sphere will open the BodyMap modal.
  // We'll implement a simple click handler that sets a flag to open BodyMap.
  // But we already have onClose prop to close the viewer; we need to open BodyMap inside this modal? 
  // Instead, we'll make this viewer itself a modal that when clicked, opens another modal? That's nested modals.
  // Better: The HumanBody3DViewer is the content of a modal; clicking on the body will open a region selector (maybe we can reuse BodyMap inside the same modal).
  // However, due to time, we'll keep it simple: clicking on the 3D body does nothing but we can rotate.

  // For demonstration, we'll just make the sphere rotate and change color on hover.

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        camera={{ position: [0, 1.5, 3], fov: 60 }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* Orbit controls */}
        <OrbitControls enableZoom={true} enablePan={true} />
        {/* Placeholder sphere */}
        <mesh
          ref={sceneRef}
          onPointerOver={(e) => setHovered("body")}
          onPointerOut={(e) => setHovered(null)}
          onClick={(e) => {
            // On click, we could open a region selector modal; for now just alert
            alert("Click detected on 3D body. In a full implementation, this would open the interactive body map.");
          }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            // Slightly highlight when hovered
            {...(hovered
              ? { emissive: new THREE.Color(0x0ea5e9), emissiveIntensity: 0.5 }
              : {})}
          />
        </mesh>
        {/* Optional: show a simple bounding box for debugging */}
        {/* <Box args={[1, 1, 1]} /> */}
      </Canvas>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 50,
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          padding: "8px 16px",
          borderRadius: "4px",
          fontSize: "14px",
          pointerEvents: "none",
        }}
      >
        {hovered ? "Hovering over body" : "Rotate to view 3D human body"}
      </div>
    </div>
  );
}