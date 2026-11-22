"use client";

import { useEffect, useState } from "react";

/*
 * Minimal interface sounds, synthesised with Web Audio (no audio files).
 * - Soft click when a button or link is pressed.
 * - Very quiet "whoosh" when the pointer moves onto a picture or diagram.
 * Browsers only allow sound after the visitor's first tap/click, so the
 * site is silent until then. Visitors can mute it; the choice is remembered.
 */

let ctx: AudioContext | null = null;
let unlocked = false;
let muted = false;

function ac() {
  if (!ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function click() {
  const c = ac(); if (!c || muted) return;
  const t = c.currentTime;
  const o = c.createOscillator(); const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(1500, t);
  o.frequency.exponentialRampToValueAtTime(600, t + 0.04);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.06, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
  o.connect(g).connect(c.destination);
  o.start(t); o.stop(t + 0.07);
}

function whoosh() {
  const c = ac(); if (!c || muted) return;
  const t = c.currentTime, d = 0.22;
  const buf = c.createBuffer(1, Math.floor(c.sampleRate * d), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource(); src.buffer = buf;
  const f = c.createBiquadFilter(); f.type = "bandpass"; f.Q.value = 0.9;
  f.frequency.setValueAtTime(500, t);
  f.frequency.exponentialRampToValueAtTime(2200, t + d);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.018, t + d * 0.45);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  src.connect(f).connect(g).connect(c.destination);
  src.start(t); src.stop(t + d);
}

const CLICKABLE = 'button, a[href], [role="button"], [role="tab"], [role="checkbox"], [role="radio"], input[type="range"], summary';
const VISUAL = 'svg[role="img"], svg[role="group"], figure, .tile, .diagram-card, .anim-step, #body-map svg, main img';

export default function SoundFX() {
  const [isMuted, setMuted] = useState(false);

  useEffect(() => {
    try { muted = localStorage.getItem("tpm-sound") === "off"; } catch {}
    setMuted(muted);

    const onDown = (e: PointerEvent) => {
      unlocked = true;
      const el = (e.target as Element | null)?.closest(CLICKABLE);
      if (el && !(el as HTMLButtonElement).disabled) click();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      unlocked = true;
      if ((e.target as Element | null)?.closest(CLICKABLE)) click();
    };
    let lastEl: Element | null = null;
    let lastAt = 0;
    const onOver = (e: PointerEvent) => {
      if (!unlocked || e.pointerType !== "mouse") return; // hover sounds only for mouse users
      const el = (e.target as Element | null)?.closest(VISUAL);
      if (!el || el === lastEl) return;
      if (el.contains(e.relatedTarget as Node)) return;
      const now = performance.now();
      if (now - lastAt < 350) return; // never more than ~3 a second
      lastEl = el; lastAt = now;
      whoosh();
    };
    const onOut = (e: PointerEvent) => {
      if (lastEl && !lastEl.contains(e.relatedTarget as Node)) lastEl = null;
    };
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerover", onOver, true);
    window.addEventListener("pointerout", onOut, true);
    return () => {
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("pointerover", onOver, true);
      window.removeEventListener("pointerout", onOut, true);
    };
  }, []);

  const toggle = () => {
    muted = !muted;
    setMuted(muted);
    try { localStorage.setItem("tpm-sound", muted ? "off" : "on"); } catch {}
    if (!muted) { unlocked = true; click(); }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!isMuted}
      aria-label={isMuted ? "Turn interface sounds on" : "Turn interface sounds off"}
      title={isMuted ? "Sounds off" : "Sounds on"}
      className="fixed left-4 bottom-24 md:bottom-6 z-50 h-10 w-10 rounded-full frost ring-1 ring-[var(--hairline)] text-[var(--purple)] flex items-center justify-center shadow-[var(--shadow-md)] hover:ring-[var(--lilac)] transition"
    >
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4Z" />
        {isMuted ? <path d="M17 9l5 6M22 9l-5 6" /> : <><path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a8.5 8.5 0 0 1 0 12" /></>}
      </svg>
    </button>
  );
}
