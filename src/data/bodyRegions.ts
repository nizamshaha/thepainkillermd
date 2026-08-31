/* ─── Body Region Configuration ─────────────────────────────────────────
   IDs MUST match painAreasFull.ts exactly so filtering works.
   ViewBox: 0 0 200 500                                                        
*/

export type BodyView = "front" | "back";
export type PainIntensity = "mild" | "moderate" | "severe";

export interface BodyRegionDefinition {
  id: string;
  label: string;
  category: string;
  front: string;
  back?: string;
  cx: number;
  cy: number;
  viewOnly?: BodyView;
}

export interface PainSelection {
  regionId: string;
  label: string;
  intensity: PainIntensity;
}

/* ─── Region Definitions (IDs match painAreasFull.ts) ────────────────── */

export const BODY_REGIONS: BodyRegionDefinition[] = [
  /* ── Head ── */
  {
    id: "headache",
    label: "Headache",
    category: "head",
    front: "M100,18 C118,18 132,34 132,56 C132,78 118,92 100,92 C82,92 68,78 68,56 C68,34 82,18 100,18 Z",
    back: "M100,18 C118,18 132,34 132,56 C132,78 118,92 100,92 C82,92 68,78 68,56 C68,34 82,18 100,18 Z",
    cx: 100, cy: 55,
  },
  /* ── Face ── */
  {
    id: "face-pain",
    label: "Face Pain",
    category: "head",
    front: "M84,52 C84,44 91,38 100,38 C109,38 116,44 116,52 C116,68 110,78 100,80 C90,78 84,68 84,52 Z",
    cx: 100, cy: 60,
    viewOnly: "front",
  },
  /* ── Neck ── */
  {
    id: "neck-cervical-pain",
    label: "Neck / Cervical",
    category: "neck",
    front: "M90,92 C90,92 88,100 88,106 L92,112 L108,112 L112,106 C112,100 110,92 110,92 Z",
    back: "M90,92 C90,92 88,100 88,106 L92,112 L108,112 L112,106 C112,100 110,92 110,92 Z",
    cx: 100, cy: 102,
  },
  /* ── Shoulders ── */
  {
    id: "shoulder-pain",
    label: "Shoulder",
    category: "shoulder",
    front: "M88,112 L72,116 C60,120 50,130 48,140 L52,142 L72,142 L88,124 Z M112,112 L128,116 C140,120 150,130 152,140 L148,142 L128,142 L112,124 Z",
    back: "M88,112 L72,116 C60,120 50,130 48,140 L52,142 L72,142 L88,124 Z M112,112 L128,116 C140,120 150,130 152,140 L148,142 L128,142 L112,124 Z",
    cx: 100, cy: 128,
  },
  /* ── Chest ── */
  {
    id: "chest-pain",
    label: "Chest Pain",
    category: "chest",
    front: "M72,142 L128,142 C130,142 130,190 128,196 L72,196 C70,190 70,142 72,142 Z",
    cx: 100, cy: 168,
    viewOnly: "front",
  },
  /* ── Upper Back ── */
  {
    id: "upper-back-pain",
    label: "Upper Back",
    category: "back",
    front: "M78,114 L122,114 L122,160 L78,160 Z",
    back: "M76,114 L124,114 L124,160 L76,160 Z",
    cx: 100, cy: 138,
  },
  /* ── Arms ── */
  {
    id: "arm-pain",
    label: "Arm",
    category: "arm",
    front: "M48,140 L52,142 L64,142 L58,208 L42,202 Z M152,140 L148,142 L136,142 L142,208 L158,202 Z",
    back: "M48,140 L52,142 L64,142 L58,208 L42,202 Z M152,140 L148,142 L136,142 L142,208 L158,202 Z",
    cx: 152, cy: 172,
  },
  /* ── Midback ── */
  {
    id: "midback-pain",
    label: "Midback",
    category: "back",
    front: "M76,160 L124,160 L122,220 L78,220 Z",
    back: "M74,160 L126,160 L124,220 L76,220 Z",
    cx: 100, cy: 190,
  },
  /* ── Elbows ── */
  {
    id: "elbow-pain",
    label: "Elbow",
    category: "arm",
    front: "M42,202 L58,208 L56,228 L38,222 Z M158,202 L142,208 L144,228 L162,222 Z",
    back: "M42,202 L58,208 L56,228 L38,222 Z M158,202 L142,208 L144,228 L162,222 Z",
    cx: 160, cy: 215,
  },
  /* ── Forearms ── */
  {
    id: "forearm-pain",
    label: "Forearm",
    category: "arm",
    front: "M38,222 L56,228 L50,285 L34,275 Z M162,222 L144,228 L150,285 L166,275 Z",
    back: "M38,222 L56,228 L50,285 L34,275 Z M162,222 L144,228 L150,285 L166,275 Z",
    cx: 164, cy: 252,
  },
  /* ── Low Back ── */
  {
    id: "low-back-pain",
    label: "Low Back",
    category: "back",
    front: "M72,196 L128,196 L124,258 L76,258 Z",
    back: "M70,196 L130,196 L126,258 L74,258 Z",
    cx: 100, cy: 228,
  },
  /* ── Wrists ── */
  {
    id: "wrist-pain",
    label: "Wrist",
    category: "arm",
    front: "M34,275 L50,285 L48,296 L32,288 Z M166,275 L150,285 L152,296 L168,288 Z",
    back: "M34,275 L50,285 L48,296 L32,288 Z M166,275 L150,285 L152,296 L168,288 Z",
    cx: 166, cy: 286,
  },
  /* ── Palms ── */
  {
    id: "palm-pain",
    label: "Palm",
    category: "arm",
    front: "M32,288 L48,296 L46,322 L28,312 Z M168,288 L152,296 L154,322 L172,312 Z",
    cx: 168, cy: 302,
    viewOnly: "front",
  },
  /* ── Fingers ── */
  {
    id: "fingers-pain",
    label: "Fingers",
    category: "arm",
    front: "M28,312 L46,322 L44,338 L26,328 Z M172,312 L154,322 L156,338 L174,328 Z",
    cx: 172, cy: 322,
    viewOnly: "front",
  },
  /* ── Tail Bone ── */
  {
    id: "tail-bone-pain",
    label: "Tail Bone",
    category: "back",
    front: "M92,254 L108,254 L107,275 L93,275 Z",
    back: "M92,252 L108,252 L107,278 L93,278 Z",
    cx: 100, cy: 264,
  },
  /* ── Buttocks ── */
  {
    id: "buttock-pain",
    label: "Buttock",
    category: "pelvis",
    front: "M76,258 L94,258 L92,295 L70,290 Z M124,258 L106,258 L108,295 L130,290 Z",
    back: "M74,255 L94,255 L92,300 L68,292 Z M126,255 L106,255 L108,300 L132,292 Z",
    cx: 100, cy: 278,
  },
  /* ── Hips ── */
  {
    id: "hip-pain",
    label: "Hip",
    category: "pelvis",
    front: "M70,290 L90,295 L86,328 L66,320 Z M130,290 L110,295 L114,328 L134,320 Z",
    back: "M68,292 L90,298 L86,330 L64,322 Z M132,292 L110,298 L114,330 L136,322 Z",
    cx: 100, cy: 310,
  },
  /* ── Thigh Anterior ── */
  {
    id: "thigh-pain-anterior",
    label: "Thigh (Front)",
    category: "leg",
    front: "M66,320 L86,324 L84,385 L62,375 Z M134,320 L114,324 L116,385 L138,375 Z",
    cx: 100, cy: 352,
    viewOnly: "front",
  },
  /* ── Thigh Posterior ── */
  {
    id: "thigh-pain-posterior",
    label: "Thigh (Back)",
    category: "leg",
    front: "M66,320 L86,324 L84,385 L62,375 Z M134,320 L114,324 L116,385 L138,375 Z",
    back: "M64,322 L86,326 L84,388 L60,378 Z M136,322 L114,326 L116,388 L140,378 Z",
    cx: 100, cy: 352,
  },
  /* ── Knee ── */
  {
    id: "knee-pain",
    label: "Knee",
    category: "leg",
    front: "M62,375 L84,385 L82,410 L60,405 Z M138,375 L116,385 L118,410 L140,405 Z",
    back: "M60,378 L84,388 L82,415 L58,408 Z M140,378 L116,388 L118,415 L142,408 Z",
    cx: 100, cy: 395,
  },
  /* ── Leg ── */
  {
    id: "leg-pain",
    label: "Leg",
    category: "leg",
    front: "M60,405 L82,410 L78,462 L56,452 Z M140,405 L118,410 L122,462 L144,452 Z",
    back: "M58,408 L82,415 L78,465 L54,455 Z M142,408 L118,415 L122,465 L146,455 Z",
    cx: 100, cy: 432,
  },
  /* ── Ankle ── */
  {
    id: "ankle-pain",
    label: "Ankle",
    category: "leg",
    front: "M56,452 L78,462 L76,478 L52,470 Z M144,452 L122,462 L124,478 L148,470 Z",
    back: "M54,455 L78,465 L76,480 L50,472 Z M146,455 L122,465 L124,480 L150,472 Z",
    cx: 100, cy: 465,
  },
  /* ── Foot ── */
  {
    id: "foot-pain",
    label: "Foot",
    category: "leg",
    front: "M52,470 L76,478 L80,495 L40,498 L36,488 Z M148,470 L124,478 L120,495 L160,498 L164,488 Z",
    back: "M50,472 L76,480 L80,498 L38,500 L34,490 Z M150,472 L124,480 L120,498 L162,500 L166,490 Z",
    cx: 100, cy: 486,
  },
];

/* ─── Body Outline (silhouette behind interactive regions) ──────────── */

export const BODY_OUTLINE_FRONT = `
  M100,16 C120,16 136,34 136,56 C136,78 120,94 100,94 C80,94 64,78 64,56 C64,34 80,16 100,16 Z
  M90,94 L110,94 L112,100 L114,108 L112,112
  L128,116 C142,120 154,132 156,144 L160,144 L162,224 L166,280 L170,296 L174,316
  L170,320 L158,320 L150,300 L152,290 L148,280 L146,228 L144,222
  L148,210 L156,204
  L152,144 L148,142 L130,142
  L132,196 L134,258 L138,290 L140,320 L142,378 L144,410 L146,456 L150,472 L164,490 L166,500
  L150,500 L122,498 L124,480 L126,468 L124,458 L120,412 L118,390
  L116,380 L118,330 L108,300 L108,260 L108,255
  L100,255 L92,255 L92,260 L92,300 L84,330
  L84,380 L82,390 L80,412 L76,458 L74,468 L76,480 L78,498
  L50,500 L34,500 L36,490 L50,472 L54,456 L56,410 L58,378
  L60,320 L62,290 L66,258 L68,196
  L70,142 L52,142 L48,144 L44,204 L42,210
  L46,222 L48,228 L50,280 L48,290 L50,300 L42,320 L30,320
  L26,316 L30,296 L34,280 L38,224 L40,144 L44,144
  C46,132 58,120 72,116
  L88,112 L86,108 L88,100 L90,94 Z
`;

export const BODY_OUTLINE_BACK = BODY_OUTLINE_FRONT;

/* ─── Utility Functions ────────────────────────────────────────────── */

export function getRegionById(id: string): BodyRegionDefinition | undefined {
  return BODY_REGIONS.find((r) => r.id === id);
}

export function getRegionsForView(view: BodyView): BodyRegionDefinition[] {
  return BODY_REGIONS.filter((r) => {
    if (r.viewOnly === "front" && view === "back") return false;
    if (r.viewOnly === "back" && view === "front") return false;
    return true;
  });
}

export function searchRegions(query: string): BodyRegionDefinition[] {
  const q = query.toLowerCase().trim();
  if (!q) return BODY_REGIONS;
  return BODY_REGIONS.filter(
    (r) =>
      r.label.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.id.replace(/-/g, " ").includes(q)
  );
}
