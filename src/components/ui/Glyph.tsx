import { BODY_OUTLINE } from "@/components/medical/AnatomyFigure";

/*
 * Glyph — the site's own icon system, replacing every emoji.
 * - Body areas render as a close-up of the site's anatomical figure with the
 *   area glowing (same drawing as the body map).
 * - Everything else renders as a consistent 1.8px purple line icon.
 */

type View = "front" | "back";
const BODY: Record<string, [View, number, number]> = {
  // assessment values / body-map regions
  head: ["front", 50, 9], neck: ["back", 50, 34], shoulder: ["front", 70.5, 43], arm: ["front", 77.5, 66],
  hand: ["front", 84, 95], chest: ["front", 50, 50], back: ["back", 50, 80], hip: ["front", 66.5, 94],
  knee: ["front", 58.6, 139], leg: ["front", 58, 158], foot: ["front", 60.5, 186],
  // pain-navigator areas
  headache: ["front", 50, 8], "face-pain": ["front", 50, 17], "neck-cervical-pain": ["back", 50, 34],
  "chest-pain": ["front", 50, 50], "shoulder-pain": ["front", 70.5, 43], "arm-pain": ["front", 77, 58],
  "elbow-pain": ["front", 78.6, 69], "forearm-pain": ["front", 81, 80], "wrist-pain": ["front", 83.6, 92],
  "palm-pain": ["front", 84.8, 98.5], "fingers-pain": ["front", 84, 105], "upper-back-pain": ["back", 50, 47],
  "midback-pain": ["back", 50, 62], "low-back-pain": ["back", 50, 80], "tail-bone-pain": ["back", 50, 98],
  "buttock-pain": ["back", 57, 104], "hip-pain": ["front", 66.5, 94], "thigh-pain-anterior": ["front", 59, 118],
  "thigh-pain-posterior": ["back", 59, 121], "knee-pain": ["front", 58.6, 139], "leg-pain": ["front", 58, 158],
  "ankle-pain": ["front", 60.2, 181], "foot-pain": ["front", 60.8, 189],
};

// emoji → line icon name
const MAP: Record<string, string> = {
  "⚠️": "alert", "⚠": "alert", "🚨": "siren", "📋": "clipboard", "⚡": "bolt", "🧊": "snow", "🔥": "flame", "♨️": "flame",
  "📌": "pins", "📍": "pin", "🏥": "clinic", "😔": "ache", "😣": "ache", "😴": "moon", "🗡️": "blade", "🔄": "refresh",
  "📞": "phone", "💬": "chat", "💓": "pulse", "❤️": "pulse", "💉": "syringe", "🎯": "target", "✕": "x", "✓": "check",
  "✅": "check", "🩺": "stethoscope", "🔬": "scope", "📊": "chart", "🏠": "home", "🏋️": "dumbbell", "🫂": "people",
  "🪑": "chair", "🧴": "bottle", "🧬": "dna", "🧘": "calm", "🧎": "kneel", "🚶": "walk", "🗺️": "map", "🖥️": "screen",
  "🕐": "clock", "🔒": "lock", "🔍": "search", "📅": "calendar", "💧": "drop", "💊": "pill", "💆": "hands",
  "👨‍⚕️": "doctor", "👤": "user", "👇": "down", "🍪": "cookie", "🌙": "moon", "🌅": "sunrise", "✏️": "pencil",
  "⚕️": "cross", "🧠": "head", "🦴": "bone", "💪": "joint", "🦾": "joint", "✋": "hand", "🤲": "hands", "🫁": "lungs",
  "🔙": "spine", "🦵": "joint", "🦿": "bone", "🦶": "foot",
};

const P: Record<string, string> = {
  alert: "M12 3 2 20h20L12 3Z M12 10v4 M12 17h.01",
  siren: "M6 18v-6a6 6 0 0 1 12 0v6 M4 18h16v3H4z M12 3V1 M4.2 6.2 2.8 4.8 M19.8 6.2l1.4-1.4 M12 12v3",
  clipboard: "M9 4h6v3H9z M8 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2 M8 11h8 M8 15h6",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  snow: "M12 2v20 M4 7l16 10 M20 7 4 17 M9 3l3 3 3-3 M9 21l3-3 3 3",
  flame: "M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-2 4-2 6-1-1-2-3-2-5-3 3-6 6-6 9a7 7 0 0 0 7 7Z M12 22a3 3 0 0 0 3-3c0-2-3-4-3-4s-3 2-3 4a3 3 0 0 0 3 3Z",
  pins: "M6 4v6 M12 2v8 M18 4v6 M4 14l2 2 2-2 M10 14l2 2 2-2 M16 14l2 2 2-2 M6 20h.01 M12 20h.01 M18 20h.01",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z M12 7.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z",
  clinic: "M4 21V8l8-5 8 5v13 M2 21h20 M10 21v-5h4v5 M12 8v4 M10 10h4",
  ache: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 11.5h.01",
  moon: "M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z",
  blade: "M14 4l6 6-9 9-3-3 6-12Z M8 16l-4 4 M10 18l-4-4",
  refresh: "M20 11a8 8 0 0 0-14.5-4.5L4 8 M4 4v4h4 M4 13a8 8 0 0 0 14.5 4.5L20 16 M20 20v-4h-4",
  phone: "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  chat: "M4 5h16v11H9l-5 4V5Z M8 9h8 M8 12h5",
  pulse: "M2 12h4l2-5 4 10 2-5h8",
  syringe: "M18 2l4 4 M20 4l-9 9 M15 4l5 5 M13 6l5 5 M11 8l-6 6v5h5l6-6 M5 19l-3 3",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z M17 7l4-4",
  x: "M6 6l12 12 M18 6 6 18",
  check: "m5 12.5 4.5 4.5L19 7",
  stethoscope: "M5 3v6a5 5 0 0 0 10 0V3 M10 14v2a5 5 0 0 0 10 0v-2 M20 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  scope: "M9 3h5l-1 9H10L9 3Z M11.5 12v3 M6 21h12 M8 21a6 6 0 0 1 9-8",
  chart: "M4 20V4 M4 20h16 M8 16v-5 M12 16V8 M16 16v-3",
  home: "M3 11 12 4l9 7 M5 10v10h14V10 M10 20v-5h4v5",
  dumbbell: "M6 7v10 M18 7v10 M3 10v4 M21 10v4 M6 12h12",
  people: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M3 20a6 6 0 0 1 12 0 M16 5a3 3 0 0 1 0 6 M18 14a6 6 0 0 1 3 6",
  chair: "M7 3v9h10V3 M5 12h14 M7 12v9 M17 12v9 M7 17h10",
  bottle: "M10 2h4v3h-4z M9 5h6l1 3v13H8V8l1-3Z M8 12h8",
  dna: "M7 3c0 6 10 6 10 12s-10 6-10 6 M17 3c0 6-10 6-10 12s10 6 10 6 M8 7h8 M8 17h8",
  calm: "M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M12 7v6 M5 18c3-1 5-3 7-5 2 2 4 4 7 5 M4 21h16",
  kneel: "M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M12 8v6l-4 3v4 M12 14h5v7",
  walk: "M13 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M10 22l2-7 3 3v4 M8 12l3-4 3 1 2 4 M12 15l-1-4",
  map: "M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z M9 3v15 M15 6v15",
  screen: "M3 4h18v12H3z M8 20h8 M12 16v4",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 7v5l3 2",
  lock: "M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z m9 16-4-4",
  calendar: "M4 5h16v15H4z M4 10h16 M8 3v4 M16 3v4",
  drop: "M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z",
  pill: "M4.5 13.5l9-9a4.2 4.2 0 0 1 6 6l-9 9a4.2 4.2 0 0 1-6-6Z M9 9l6 6",
  hands: "M7 11V5a1.5 1.5 0 0 1 3 0v5 M10 9V3.5a1.5 1.5 0 0 1 3 0V10 M13 9V5a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7c-2.5 0-4-1-5.5-3L3 14a1.5 1.5 0 0 1 2.5-1.5L7 14",
  doctor: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4 21a8 8 0 0 1 16 0 M12 15v4 M10 17h4",
  user: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4 21a8 8 0 0 1 16 0",
  down: "M12 4v16 M6 14l6 6 6-6",
  cookie: "M12 3a9 9 0 1 0 9 9 4 4 0 0 1-5-5 4 4 0 0 1-4-4Z M9 10h.01 M14 15h.01 M9 15h.01",
  sunrise: "M3 18h18 M6 18a6 6 0 0 1 12 0 M12 4v4 M5 9l2 2 M19 9l-2 2 M8 22h8",
  pencil: "M4 20l4-1L19 8l-3-3L5 16l-1 4Z M14 7l3 3",
  cross: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
  head: "M12 3a7 7 0 0 0-7 7c0 2.5 1 4 2 5v5h7v-3h2a2 2 0 0 0 2-2v-2l2-1-2-3a7 7 0 0 0-6-6Z",
  bone: "M7 4a2.5 2.5 0 0 0-2 4l11 11a2.5 2.5 0 1 0 4-2l-11-11a2.5 2.5 0 0 0-2-2Z",
  joint: "M8 3v6 M16 3v6 M8 9a4 4 0 0 0 8 0 M12 13v8 M9 21h6",
  hand: "M8 12V5a1.5 1.5 0 0 1 3 0v6 M11 10V3.5a1.5 1.5 0 0 1 3 0V11 M14 10V5a1.5 1.5 0 0 1 3 0v9a7 7 0 0 1-7 7c-2.5 0-4-1-5.5-3L2.5 15A1.5 1.5 0 0 1 5 13.5L8 16",
  lungs: "M12 4v8 M12 12l-3-2 M12 12l3-2 M9 8C6 8 4 13 4 17c0 2 1 3 3 3s2-2 2-4V8Z M15 8c3 0 5 5 5 9 0 2-1 3-3 3s-2-2-2-4V8Z",
  spine: "M10 3h4v3h-4z M9.5 8h5v3h-5z M9 13h6v3H9z M9.5 18h5l-1 3h-3z",
  foot: "M9 3c2 0 3 2 3 5v6c0 2 2 3 5 3 2 0 3 1 3 2.5S19 22 17 22H8c-2 0-3-2-3-4V8c0-3 2-5 4-5Z",
  dot: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
};

export function iconName(e?: string) {
  if (!e) return "dot";
  return MAP[e] || MAP[e.replace(/️/g, "")] || "dot";
}

export function LineIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name] || P.dot} />
    </svg>
  );
}

export function BodyGlyph({ id, className = "w-10 h-10" }: { id: string; className?: string }) {
  const [view, x, y] = BODY[id];
  const s = 46; // crop size in figure units
  const vx = Math.max(0, Math.min(100 - s, x - s / 2));
  const vy = Math.max(0, Math.min(200 - s, y - s / 2));
  const gid = `g-${id}`;
  return (
    <svg viewBox={`${vx} ${vy} ${s} ${s}`} className={`${className} rounded-xl bg-[var(--mist)]`} aria-hidden="true">
      <defs>
        <linearGradient id={`${gid}-s`} x1="0" x2="1">
          <stop offset="0" stopColor="#e2d8f8" /><stop offset="0.5" stopColor="#ffffff" /><stop offset="1" stopColor="#dbd0f5" />
        </linearGradient>
        <radialGradient id={`${gid}-r`}>
          <stop offset="0" stopColor="#d9365a" stopOpacity="0.9" /><stop offset="0.5" stopColor="#d9365a" stopOpacity="0.35" /><stop offset="1" stopColor="#d9365a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={BODY_OUTLINE} fill={`url(#${gid}-s)`} stroke="#a892dc" strokeWidth="0.9" />
      {view === "back" && (
        <g fill="#cdbff1">
          {Array.from({ length: 22 }, (_, i) => (
            <rect key={i} x={50 - (2.6 + i * 0.12)} y={31 + i * 2.95} width={5.2 + i * 0.24} height={i < 5 ? 1.5 : i < 17 ? 2 : 2.6} rx="1" />
          ))}
        </g>
      )}
      <circle cx={x} cy={y} r="9" fill={`url(#${gid}-r)`} className="glyph-glow" />
      <circle cx={x} cy={y} r="2.6" fill="#d9365a" stroke="#fff" strokeWidth="1" />
    </svg>
  );
}

/** Drop-in replacement for an emoji: pass the emoji and (optionally) a body-area id. */
export default function Glyph({ e, id, className = "w-5 h-5", body = "w-10 h-10" }: { e?: string; id?: string; className?: string; body?: string }) {
  if (id && BODY[id]) return <BodyGlyph id={id} className={body} />;
  return <LineIcon name={iconName(e)} className={className} />;
}
