"use client";

import { useState, useEffect, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface GLBModelLoaderProps {
  /** Path to the GLB file in the public directory */
  modelPath: string;
  /** Whether to enable this loader (set to false to use procedural fallback) */
  enabled: boolean;
  /** Callback when model loads successfully */
  onLoaded?: () => void;
  /** Callback when model fails to load */
  onError?: (error: Error) => void;
}

/* ─── GLB model with progress ──────────────────────────────────────── */
function GLBModel({
  modelPath,
  onLoaded,
}: {
  modelPath: string;
  onLoaded?: () => void;
}) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (scene) {
      // Apply skin-like material to all meshes
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#c4a882"),
            emissive: new THREE.Color("#1a0e05"),
            emissiveIntensity: 0.05,
            roughness: 0.58,
            metalness: 0.02,
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 3.2 / maxDim;
      scene.scale.setScalar(scale);
      scene.position.sub(center.multiplyScalar(scale));

      onLoaded?.();
    }
  }, [scene, onLoaded]);

  return <primitive object={scene} />;
}

/* ─── Loading progress indicator ────────────────────────────────────── */
function ModelLoadingIndicator() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[var(--color-primary-900)] via-[#0f1d32] to-[var(--color-primary-800)] rounded-2xl z-10">
      <div className="w-12 h-12 border-4 border-[var(--color-clinical-500)]/30 border-t-[var(--color-clinical-500)] rounded-full animate-spin mb-4" />
      <p className="text-sm text-white/70 font-medium">Loading 3D model…</p>
      <p className="text-xs text-white/40 mt-1">Preparing anatomical visualization</p>
    </div>
  );
}

/* ─── Error state ───────────────────────────────────────────────────── */
function ModelError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[var(--color-primary-900)] via-[#0f1d32] to-[var(--color-primary-800)] rounded-2xl z-10">
      <svg className="w-12 h-12 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <p className="text-sm text-white/70 font-medium mb-1">Model unavailable</p>
      <p className="text-xs text-white/40 text-center max-w-xs mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-[var(--color-clinical-600)] text-white text-xs font-semibold hover:bg-[var(--color-clinical-700)] transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}

/* ─── Main GLB loader component ─────────────────────────────────────── */
export default function GLBModelLoader({
  modelPath,
  enabled,
  onLoaded,
  onError,
}: GLBModelLoaderProps) {
  const [loadError, setLoadError] = useState<string | null>(null);

  if (!enabled || loadError) {
    return null;
  }

  return (
    <Suspense fallback={<ModelLoadingIndicator />}>
      <ErrorBoundary
        onError={(err) => {
          setLoadError(err.message);
          onError?.(err);
        }}
      >
        <GLBModel modelPath={modelPath} onLoaded={onLoaded} />
      </ErrorBoundary>
    </Suspense>
  );
}

/* ─── Simple error boundary ─────────────────────────────────────────── */
import { Component, type ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode; onError: (error: Error) => void }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/* Preload GLB models (call when you have a model file) */
export function preloadModel(path: string) {
  useGLTF.preload(path);
}
