"use client";

import { Suspense, useState, useCallback, useEffect } from "react";
import type { PainArea } from "@/data/painAreas";
import type { BodyView, PainIntensity, PainSelection } from "@/data/bodyRegions";

interface Body3DProps {
  areas: PainArea[];
  selectedIds: string[];
  onSelect: (area: PainArea) => void;
}

/* ─── WebGL detection ──────────────────────────────────────────────── */
function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/* ─── Loading state ────────────────────────────────────────────────── */
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] bg-gradient-to-b from-[var(--color-primary-900)] via-[#0f1d32] to-[var(--color-primary-800)] rounded-2xl">
      <div className="w-12 h-12 border-4 border-[var(--color-clinical-500)]/30 border-t-[var(--color-clinical-500)] rounded-full animate-spin mb-4" />
      <p className="text-sm text-white/70 font-medium">Loading body model…</p>
      <p className="text-xs text-white/40 mt-1">Preparing 3D visualization</p>
    </div>
  );
}

/* ─── Error / Fallback state ───────────────────────────────────────── */
function WebGLFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] bg-gradient-to-b from-[var(--color-primary-900)] via-[#0f1d32] to-[var(--color-primary-800)] rounded-2xl">
      <svg className="w-16 h-16 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563h-.874A.562.562 0 019 14.437V9.563z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
      </svg>
      <h3 className="text-lg font-bold text-white/90 mb-2">3D Body Model Unavailable</h3>
      <p className="text-sm text-white/50 text-center max-w-sm mb-6">
        Your browser does not support WebGL or the 3D model could not be loaded.
        You can still use the list-based body selector below.
      </p>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-lg bg-[var(--color-clinical-600)] text-white text-sm font-semibold hover:bg-[var(--color-clinical-700)] transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

/* ─── Main Body3D component ────────────────────────────────────────── */
export default function Body3D({ areas, selectedIds, onSelect }: Body3DProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [Scene3D, setScene3D] = useState<React.ComponentType<import("@/components/medical/Body3DScene").Body3DSceneProps> | null>(null);

  useEffect(() => {
    setHasWebGL(detectWebGL());
  }, []);

  /* Lazy-load the heavy 3D scene only when WebGL is available */
  useEffect(() => {
    if (hasWebGL && !Scene3D) {
      import("@/components/medical/Body3DScene").then((mod) => {
        setScene3D(() => mod.default);
      });
    }
  }, [hasWebGL, Scene3D]);

  const handleRetry = useCallback(() => {
    setHasWebGL(null);
    setRetryKey((k) => k + 1);
    // Re-check after a tick
    setTimeout(() => setHasWebGL(detectWebGL()), 100);
  }, []);

  /* Loading: WebGL check not yet complete */
  if (hasWebGL === null) {
    return <LoadingSpinner />;
  }

  /* Fallback: no WebGL */
  if (!hasWebGL) {
    return <WebGLFallback onRetry={handleRetry} />;
  }

  /* Scene not yet loaded */
  if (!Scene3D) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Scene3D
        key={retryKey}
        areas={areas}
        selectedIds={selectedIds}
        onSelect={onSelect}
      />
    </Suspense>
  );
}
