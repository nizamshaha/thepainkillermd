/**
 * Detailed body region SVGs for zoom views.
 * Each region has a front and back detailed SVG viewBox,
 * paths for anatomy, and anchor points where pain pins can be placed.
 */

export interface RegionPin {
  id: string;
  label: string;
  x: number; // percentage within viewBox
  y: number;
}

export interface RegionDetail {
  id: string;
  label: string;
  viewBox: string;
  /** Simplified anatomy paths for the zoomed view */
  anatomyPaths: { d: string; fill: string; stroke: string; strokeWidth?: number; label?: string }[];
  /** Predefined pin anchor points where user can place pain markers */
  pinAnchors: RegionPin[];
}

export const REGION_DETAILS: Record<string, RegionDetail> = {
  headache: {
    id: "headache",
    label: "Head / Headache",
    viewBox: "0 0 200 200",
    anatomyPaths: [
      { d: "M100,20 C130,20 155,45 155,80 C155,115 130,140 100,140 C70,140 45,115 45,80 C45,45 70,20 100,20 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M75,55 C80,48 90,45 100,45 C110,45 120,48 125,55", fill: "none", stroke: "#6b8aad", strokeWidth: 1.5 },
      { d: "M80,70 C85,65 95,62 100,62 C105,62 115,65 120,70", fill: "none", stroke: "#6b8aad", strokeWidth: 1 },
      { d: "M85,90 Q100,105 115,90", fill: "none", stroke: "#6b8aad", strokeWidth: 1 },
    ],
    pinAnchors: [
      { id: "forehead", label: "Forehead", x: 50, y: 28 },
      { id: "left-temple", label: "Left Temple", x: 30, y: 38 },
      { id: "right-temple", label: "Right Temple", x: 70, y: 38 },
      { id: "top-of-head", label: "Top of Head", x: 50, y: 12 },
      { id: "back-of-head", label: "Back of Head", x: 50, y: 60 },
      { id: "behind-ear-left", label: "Behind Left Ear", x: 22, y: 45 },
      { id: "behind-ear-right", label: "Behind Right Ear", x: 78, y: 45 },
    ],
  },

  "face-pain": {
    id: "face-pain",
    label: "Face Pain",
    viewBox: "0 0 200 200",
    anatomyPaths: [
      { d: "M100,20 C130,20 155,45 155,80 C155,115 130,140 100,140 C70,140 45,115 45,80 C45,45 70,20 100,20 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M80,55 L88,50 L92,55 L88,58 Z", fill: "#3b5068", stroke: "#6b8aad" },
      { d: "M108,55 L112,50 L120,55 L112,58 Z", fill: "#3b5068", stroke: "#6b8aad" },
      { d: "M95,75 L100,80 L105,75", fill: "none", stroke: "#6b8aad", strokeWidth: 1.5 },
      { d: "M88,95 Q100,108 112,95", fill: "none", stroke: "#6b8aad", strokeWidth: 1.5 },
    ],
    pinAnchors: [
      { id: "left-cheek", label: "Left Cheek", x: 32, y: 48 },
      { id: "right-cheek", label: "Right Cheek", x: 68, y: 48 },
      { id: "jaw-left", label: "Left Jaw", x: 30, y: 62 },
      { id: "jaw-right", label: "Right Jaw", x: 70, y: 62 },
      { id: "around-left-eye", label: "Around Left Eye", x: 35, y: 30 },
      { id: "around-right-eye", label: "Around Right Eye", x: 65, y: 30 },
      { id: "nose", label: "Nose Area", x: 50, y: 42 },
      { id: "chin", label: "Chin", x: 50, y: 72 },
    ],
  },

  "neck-cervical-pain": {
    id: "neck-cervical-pain",
    label: "Neck / Cervical",
    viewBox: "0 0 200 200",
    anatomyPaths: [
      { d: "M80,10 L120,10 L125,30 L120,50 L80,50 L75,30 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M85,50 L115,50 L120,80 L130,110 L70,110 L80,80 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M92,15 L92,48", fill: "none", stroke: "#5a7a99", strokeWidth: 1, label: "Cervical spine" },
      { d: "M108,15 L108,48", fill: "none", stroke: "#5a7a99", strokeWidth: 1 },
      { d: "M100,12 L100,50", fill: "none", stroke: "#7a9abb", strokeWidth: 1.5, label: "Midline" },
    ],
    pinAnchors: [
      { id: "upper-neck-back", label: "Upper Neck (Back)", x: 50, y: 15 },
      { id: "mid-neck-back", label: "Mid Neck (Back)", x: 50, y: 28 },
      { id: "lower-neck", label: "Lower Neck / Base", x: 50, y: 42 },
      { id: "left-neck", label: "Left Side of Neck", x: 30, y: 28 },
      { id: "right-neck", label: "Right Side of Neck", x: 70, y: 28 },
      { id: "throat-area", label: "Front of Throat", x: 50, y: 22 },
      { id: "trapezius-left", label: "Left Trapezius", x: 22, y: 52 },
      { id: "trapezius-right", label: "Right Trapezius", x: 78, y: 52 },
    ],
  },

  "chest-pain": {
    id: "chest-pain",
    label: "Chest",
    viewBox: "0 0 200 200",
    anatomyPaths: [
      { d: "M40,20 L160,20 L170,60 L170,120 L30,120 L30,60 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M100,20 L100,120", fill: "none", stroke: "#5a7a99", strokeWidth: 1, label: "Sternum" },
      { d: "M60,40 Q80,50 100,40", fill: "none", stroke: "#6b8aad", strokeWidth: 1.5, label: "Left pectoral" },
      { d: "M100,40 Q120,50 140,40", fill: "none", stroke: "#6b8aad", strokeWidth: 1.5, label: "Right pectoral" },
    ],
    pinAnchors: [
      { id: "upper-chest-center", label: "Upper Chest (Center)", x: 50, y: 18 },
      { id: "left-chest", label: "Left Chest", x: 30, y: 28 },
      { id: "right-chest", label: "Right Chest", x: 70, y: 28 },
      { id: "sternum", label: "Sternum / Breastbone", x: 50, y: 32 },
      { id: "lower-chest-left", label: "Lower Left Chest", x: 32, y: 48 },
      { id: "lower-chest-right", label: "Lower Right Chest", x: 68, y: 48 },
    ],
  },

  "shoulder-pain": {
    id: "shoulder-pain",
    label: "Shoulder",
    viewBox: "0 0 200 180",
    anatomyPaths: [
      { d: "M60,30 L140,30 L155,50 L160,80 L150,100 L50,100 L40,80 L45,50 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M70,40 Q85,25 100,30 Q115,25 130,40", fill: "none", stroke: "#6b8aad", strokeWidth: 2, label: "Deltoid outline" },
      { d: "M60,50 C55,65 55,85 60,95", fill: "none", stroke: "#5a7a99", strokeWidth: 1.5, label: "Left arm attachment" },
      { d: "M140,50 C145,65 145,85 140,95", fill: "none", stroke: "#5a7a99", strokeWidth: 1.5, label: "Right arm attachment" },
    ],
    pinAnchors: [
      { id: "left-shoulder-top", label: "Left Shoulder (Top)", x: 30, y: 18 },
      { id: "left-shoulder-front", label: "Left Shoulder (Front)", x: 32, y: 35 },
      { id: "left-shoulder-side", label: "Left Shoulder (Side)", x: 22, y: 32 },
      { id: "right-shoulder-top", label: "Right Shoulder (Top)", x: 70, y: 18 },
      { id: "right-shoulder-front", label: "Right Shoulder (Front)", x: 68, y: 35 },
      { id: "right-shoulder-side", label: "Right Shoulder (Side)", x: 78, y: 32 },
      { id: "between-shoulders", label: "Between Shoulder Blades", x: 50, y: 15 },
    ],
  },

  "arm-pain": {
    id: "arm-pain",
    label: "Arm",
    viewBox: "0 0 200 220",
    anatomyPaths: [
      { d: "M60,10 L140,10 L145,30 L150,80 L145,130 L55,130 L50,80 L55,30 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M80,10 L80,130", fill: "none", stroke: "#5a7a99", strokeWidth: 1, label: "Humerus" },
      { d: "M120,10 L120,130", fill: "none", stroke: "#5a7a99", strokeWidth: 1 },
      { d: "M55,80 L145,80", fill: "none", stroke: "#6b8aad", strokeWidth: 1, label: "Mid-arm" },
    ],
    pinAnchors: [
      { id: "left-upper-arm", label: "Left Upper Arm", x: 28, y: 25 },
      { id: "left-inner-upper-arm", label: "Left Inner Upper Arm", x: 32, y: 35 },
      { id: "right-upper-arm", label: "Right Upper Arm", x: 72, y: 25 },
      { id: "right-inner-upper-arm", label: "Right Inner Upper Arm", x: 68, y: 35 },
      { id: "left-armpit", label: "Left Armpit Area", x: 24, y: 12 },
      { id: "right-armpit", label: "Right Armpit Area", x: 76, y: 12 },
    ],
  },

  "elbow-pain": {
    id: "elbow-pain",
    label: "Elbow",
    viewBox: "0 0 200 180",
    anatomyPaths: [
      { d: "M65,10 L135,10 L140,40 L145,70 L140,90 L60,90 L55,70 L60,40 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M85,10 L85,90", fill: "none", stroke: "#5a7a99", strokeWidth: 1 },
      { d: "M115,10 L115,90", fill: "none", stroke: "#5a7a99", strokeWidth: 1 },
      { d: "M60,55 Q100,65 140,55", fill: "none", stroke: "#6b8aad", strokeWidth: 1.5, label: "Elbow crease" },
    ],
    pinAnchors: [
      { id: "left-elbow-inner", label: "Left Elbow (Inner)", x: 30, y: 42 },
      { id: "left-elbow-outer", label: "Left Elbow (Outer)", x: 25, y: 35 },
      { id: "left-elbow-back", label: "Left Elbow (Back/Olecranon)", x: 28, y: 48 },
      { id: "right-elbow-inner", label: "Right Elbow (Inner)", x: 70, y: 42 },
      { id: "right-elbow-outer", label: "Right Elbow (Outer)", x: 75, y: 35 },
      { id: "right-elbow-back", label: "Right Elbow (Back/Olecranon)", x: 72, y: 48 },
    ],
  },

  "forearm-pain": {
    id: "forearm-pain",
    label: "Forearm",
    viewBox: "0 0 200 200",
    anatomyPaths: [
      { d: "M60,10 L140,10 L135,50 L130,100 L70,100 L65,50 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M80,10 L75,100", fill: "none", stroke: "#5a7a99", strokeWidth: 1 },
      { d: "M120,10 L125,100", fill: "none", stroke: "#5a7a99", strokeWidth: 1 },
      { d: "M65,50 L135,50", fill: "none", stroke: "#6b8aad", strokeWidth: 1, label: "Mid forearm" },
    ],
    pinAnchors: [
      { id: "left-forearm-top", label: "Left Forearm (Upper)", x: 28, y: 18 },
      { id: "left-forearm-inner", label: "Left Forearm (Inner)", x: 32, y: 32 },
      { id: "left-forearm-outer", label: "Left Forearm (Outer)", x: 25, y: 32 },
      { id: "right-forearm-top", label: "Right Forearm (Upper)", x: 72, y: 18 },
      { id: "right-forearm-inner", label: "Right Forearm (Inner)", x: 68, y: 32 },
      { id: "right-forearm-outer", label: "Right Forearm (Outer)", x: 75, y: 32 },
    ],
  },

  "wrist-pain": {
    id: "wrist-pain",
    label: "Wrist",
    viewBox: "0 0 200 160",
    anatomyPaths: [
      { d: "M60,10 L140,10 L135,40 L130,60 L70,60 L65,40 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M55,60 L145,60 L140,80 L60,80 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M55,60 L145,60", fill: "none", stroke: "#6b8aad", strokeWidth: 2, label: "Wrist crease" },
    ],
    pinAnchors: [
      { id: "left-wrist-top", label: "Left Wrist (Top/Back)", x: 28, y: 40 },
      { id: "left-wrist-bottom", label: "Left Wrist (Palm side)", x: 30, y: 50 },
      { id: "left-wrist-side", label: "Left Wrist (Pinky side)", x: 22, y: 45 },
      { id: "right-wrist-top", label: "Right Wrist (Top/Back)", x: 72, y: 40 },
      { id: "right-wrist-bottom", label: "Right Wrist (Palm side)", x: 70, y: 50 },
      { id: "right-wrist-side", label: "Right Wrist (Pinky side)", x: 78, y: 45 },
    ],
  },

  "palm-pain": {
    id: "palm-pain",
    label: "Palm / Hand",
    viewBox: "0 0 200 180",
    anatomyPaths: [
      { d: "M60,60 L140,60 L145,80 L148,110 L140,140 L60,140 L52,110 L55,80 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M60,60 L55,30 L62,10 L70,10 L72,30 L65,60", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M80,60 L78,25 L82,5 L88,5 L90,25 L85,60", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M100,60 L98,20 L100,2 L106,2 L108,20 L103,60", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M120,60 L118,28 L122,10 L128,10 L130,28 L125,60", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M140,60 L142,35 L145,20 L150,20 L150,35 L143,60", fill: "#2d3a4d", stroke: "#4a6280" },
    ],
    pinAnchors: [
      { id: "palm-center", label: "Center of Palm", x: 50, y: 58 },
      { id: "palm-base", label: "Base of Palm", x: 50, y: 72 },
      { id: "thumb-base", label: "Thumb Base (Thenar)", x: 25, y: 50 },
      { id: "pinky-base", label: "Pinky Base (Hypothenar)", x: 75, y: 52 },
      { id: "finger-tips", label: "Fingertips", x: 50, y: 8 },
      { id: "web-spaces", label: "Between Fingers", x: 45, y: 22 },
    ],
  },

  "fingers-pain": {
    id: "fingers-pain",
    label: "Fingers",
    viewBox: "0 0 200 200",
    anatomyPaths: [
      { d: "M50,180 L50,100 L58,95 L62,100 L62,180", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M72,180 L72,80 L78,75 L84,75 L88,80 L88,180", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M96,180 L96,60 L102,55 L108,55 L112,60 L112,180", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M120,180 L120,70 L126,65 L132,65 L136,70 L136,180", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M146,180 L146,95 L150,90 L156,90 L158,95 L158,180", fill: "#2d3a4d", stroke: "#4a6280" },
    ],
    pinAnchors: [
      { id: "thumb-tip", label: "Thumb Tip", x: 28, y: 92 },
      { id: "index-tip", label: "Index Finger Tip", x: 40, y: 38 },
      { id: "middle-tip", label: "Middle Finger Tip", x: 52, y: 28 },
      { id: "ring-tip", label: "Ring Finger Tip", x: 64, y: 32 },
      { id: "pinky-tip", label: "Pinky Tip", x: 76, y: 45 },
      { id: "knuckles", label: "Knuckles", x: 50, y: 82 },
    ],
  },

  "upper-back-pain": {
    id: "upper-back-pain",
    label: "Upper Back",
    viewBox: "0 0 200 200",
    anatomyPaths: [
      { d: "M40,10 L160,10 L165,50 L160,100 L40,100 L35,50 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M100,10 L100,100", fill: "none", stroke: "#5a7a99", strokeWidth: 1.5, label: "Spine" },
      { d: "M50,30 Q75,45 100,30", fill: "none", stroke: "#6b8aad", strokeWidth: 1, label: "Left scapula" },
      { d: "M100,30 Q125,45 150,30", fill: "none", stroke: "#6b8aad", strokeWidth: 1, label: "Right scapula" },
    ],
    pinAnchors: [
      { id: "between-shoulder-blades", label: "Between Shoulder Blades", x: 50, y: 20 },
      { id: "left-scapula", label: "Left Shoulder Blade", x: 30, y: 25 },
      { id: "right-scapula", label: "Right Shoulder Blade", x: 70, y: 25 },
      { id: "upper-spine-center", label: "Upper Spine (Center)", x: 50, y: 12 },
      { id: "left-upper-back", label: "Left Upper Back", x: 25, y: 18 },
      { id: "right-upper-back", label: "Right Upper Back", x: 75, y: 18 },
    ],
  },

  "midback-pain": {
    id: "midback-pain",
    label: "Mid Back",
    viewBox: "0 0 200 200",
    anatomyPaths: [
      { d: "M45,10 L155,10 L160,50 L155,100 L45,100 L40,50 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M100,10 L100,100", fill: "none", stroke: "#5a7a99", strokeWidth: 1.5, label: "Thoracic spine" },
      { d: "M60,30 L140,30", fill: "none", stroke: "#6b8aad", strokeWidth: 1 },
      { d: "M55,50 L145,50", fill: "none", stroke: "#6b8aad", strokeWidth: 1 },
      { d: "M50,70 L150,70", fill: "none", stroke: "#6b8aad", strokeWidth: 1 },
    ],
    pinAnchors: [
      { id: "mid-spine-center", label: "Mid Spine (Center)", x: 50, y: 30 },
      { id: "left-rib-area", label: "Left Rib Area", x: 25, y: 35 },
      { id: "right-rib-area", label: "Right Rib Area", x: 75, y: 35 },
      { id: "left-mid-back", label: "Left Mid Back", x: 28, y: 28 },
      { id: "right-mid-back", label: "Right Mid Back", x: 72, y: 28 },
    ],
  },

  "low-back-pain": {
    id: "low-back-pain",
    label: "Low Back / Lumbar",
    viewBox: "0 0 200 200",
    anatomyPaths: [
      { d: "M50,10 L150,10 L155,50 L150,90 L50,90 L45,50 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M100,10 L100,90", fill: "none", stroke: "#5a7a99", strokeWidth: 2, label: "Lumbar spine" },
      { d: "M55,30 L145,30", fill: "none", stroke: "#6b8aad", strokeWidth: 1 },
      { d: "M55,50 L145,50", fill: "none", stroke: "#6b8aad", strokeWidth: 1 },
      { d: "M55,70 L145,70", fill: "none", stroke: "#6b8aad", strokeWidth: 1 },
      { d: "M80,70 L80,90", fill: "none", stroke: "#7a9abb", strokeWidth: 1 },
      { d: "M120,70 L120,90", fill: "none", stroke: "#7a9abb", strokeWidth: 1 },
    ],
    pinAnchors: [
      { id: "lumbar-center", label: "Lumbar (Center)", x: 50, y: 35 },
      { id: "l4-l5", label: "L4-L5 Level", x: 50, y: 45 },
      { id: "l5-s1", label: "L5-S1 Level", x: 50, y: 58 },
      { id: "left-lumbar", label: "Left Lumbar", x: 28, y: 35 },
      { id: "right-lumbar", label: "Right Lumbar", x: 72, y: 35 },
      { id: "left-lower-back", label: "Left Lower Back", x: 25, y: 50 },
      { id: "right-lower-back", label: "Right Lower Back", x: 75, y: 50 },
    ],
  },

  "tail-bone-pain": {
    id: "tail-bone-pain",
    label: "Tailbone / Coccyx",
    viewBox: "0 0 200 160",
    anatomyPaths: [
      { d: "M55,10 L145,10 L150,40 L145,70 L55,70 L50,40 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M100,10 L100,70", fill: "none", stroke: "#5a7a99", strokeWidth: 1.5 },
      { d: "M95,55 L100,70 L105,55", fill: "none", stroke: "#ef4444", strokeWidth: 2, label: "Coccyx" },
      { d: "M85,30 Q100,38 115,30", fill: "none", stroke: "#6b8aad", strokeWidth: 1, label: "Sacrum" },
    ],
    pinAnchors: [
      { id: "coccyx-tip", label: "Tip of Tailbone", x: 50, y: 60 },
      { id: "coccyx-mid", label: "Mid Tailbone", x: 50, y: 48 },
      { id: "sacrum", label: "Sacrum Area", x: 50, y: 30 },
      { id: "left-coccyx", label: "Left of Tailbone", x: 35, y: 50 },
      { id: "right-coccyx", label: "Right of Tailbone", x: 65, y: 50 },
    ],
  },

  "buttock-pain": {
    id: "buttock-pain",
    label: "Buttock",
    viewBox: "0 0 200 180",
    anatomyPaths: [
      { d: "M40,10 L160,10 L165,40 L160,80 L100,100 L40,80 L35,40 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M100,10 L100,100", fill: "none", stroke: "#5a7a99", strokeWidth: 1.5, label: "Midline" },
      { d: "M55,30 Q75,55 95,40", fill: "none", stroke: "#6b8aad", strokeWidth: 1.5, label: "Left glute" },
      { d: "M105,40 Q125,55 145,30", fill: "none", stroke: "#6b8aad", strokeWidth: 1.5, label: "Right glute" },
    ],
    pinAnchors: [
      { id: "left-glute-center", label: "Left Buttock (Center)", x: 32, y: 32 },
      { id: "left-glute-upper", label: "Left Buttock (Upper)", x: 30, y: 18 },
      { id: "left-glute-lower", label: "Left Buttock (Lower)", x: 35, y: 45 },
      { id: "right-glute-center", label: "Right Buttock (Center)", x: 68, y: 32 },
      { id: "right-glute-upper", label: "Right Buttock (Upper)", x: 70, y: 18 },
      { id: "right-glute-lower", label: "Right Buttock (Lower)", x: 65, y: 45 },
      { id: "sacroiliac-left", label: "Left SI Joint Area", x: 38, y: 22 },
      { id: "sacroiliac-right", label: "Right SI Joint Area", x: 62, y: 22 },
    ],
  },

  "hip-pain": {
    id: "hip-pain",
    label: "Hip",
    viewBox: "0 0 200 180",
    anatomyPaths: [
      { d: "M40,10 L160,10 L165,40 L160,70 L40,70 L35,40 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M40,70 L60,100 L80,120 L100,130 L120,120 L140,100 L160,70", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M50,55 Q60,65 70,55", fill: "none", stroke: "#ef4444", strokeWidth: 2, label: "Left hip joint" },
      { d: "M130,55 Q140,65 150,55", fill: "none", stroke: "#ef4444", strokeWidth: 2, label: "Right hip joint" },
    ],
    pinAnchors: [
      { id: "left-hip-front", label: "Left Hip (Front)", x: 30, y: 35 },
      { id: "left-hip-side", label: "Left Hip (Side/IT Band)", x: 18, y: 40 },
      { id: "left-groin", label: "Left Groin Area", x: 35, y: 28 },
      { id: "right-hip-front", label: "Right Hip (Front)", x: 70, y: 35 },
      { id: "right-hip-side", label: "Right Hip (Side/IT Band)", x: 82, y: 40 },
      { id: "right-groin", label: "Right Groin Area", x: 65, y: 28 },
    ],
  },

  "thigh-pain-anterior": {
    id: "thigh-pain-anterior",
    label: "Thigh (Front)",
    viewBox: "0 0 200 220",
    anatomyPaths: [
      { d: "M50,10 L150,10 L145,50 L140,100 L130,140 L70,140 L60,100 L55,50 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M80,10 L75,140", fill: "none", stroke: "#5a7a99", strokeWidth: 1, label: "Left quad" },
      { d: "M120,10 L125,140", fill: "none", stroke: "#5a7a99", strokeWidth: 1, label: "Right quad" },
      { d: "M55,50 L145,50", fill: "none", stroke: "#6b8aad", strokeWidth: 1 },
    ],
    pinAnchors: [
      { id: "left-quad-upper", label: "Left Upper Thigh (Front)", x: 30, y: 18 },
      { id: "left-quad-mid", label: "Left Mid Thigh (Front)", x: 30, y: 38 },
      { id: "left-inner-thigh", label: "Left Inner Thigh", x: 38, y: 30 },
      { id: "right-quad-upper", label: "Right Upper Thigh (Front)", x: 70, y: 18 },
      { id: "right-quad-mid", label: "Right Mid Thigh (Front)", x: 70, y: 38 },
      { id: "right-inner-thigh", label: "Right Inner Thigh", x: 62, y: 30 },
    ],
  },

  "thigh-pain-posterior": {
    id: "thigh-pain-posterior",
    label: "Thigh (Back)",
    viewBox: "0 0 200 220",
    anatomyPaths: [
      { d: "M50,10 L150,10 L145,50 L140,100 L130,140 L70,140 L60,100 L55,50 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M80,10 L75,140", fill: "none", stroke: "#5a7a99", strokeWidth: 1, label: "Left hamstring" },
      { d: "M120,10 L125,140", fill: "none", stroke: "#5a7a99", strokeWidth: 1, label: "Right hamstring" },
      { d: "M100,10 L100,140", fill: "none", stroke: "#5a7a99", strokeWidth: 1.5, label: "Midline" },
    ],
    pinAnchors: [
      { id: "left-hamstring-upper", label: "Left Upper Hamstring", x: 30, y: 18 },
      { id: "left-hamstring-mid", label: "Left Mid Hamstring", x: 30, y: 38 },
      { id: "left-hamstring-lower", label: "Left Lower Hamstring", x: 32, y: 55 },
      { id: "right-hamstring-upper", label: "Right Upper Hamstring", x: 70, y: 18 },
      { id: "right-hamstring-mid", label: "Right Mid Hamstring", x: 70, y: 38 },
      { id: "right-hamstring-lower", label: "Right Lower Hamstring", x: 68, y: 55 },
    ],
  },

  "knee-pain": {
    id: "knee-pain",
    label: "Knee",
    viewBox: "0 0 200 200",
    anatomyPaths: [
      { d: "M55,10 L145,10 L140,40 L135,70 L65,70 L60,40 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M60,70 L140,70 L145,100 L145,130 L55,130 L55,100 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M75,85 Q100,70 125,85 Q130,100 125,115 Q100,125 75,115 Q70,100 75,85 Z", fill: "none", stroke: "#ef4444", strokeWidth: 2, label: "Knee joint" },
      { d: "M95,85 L100,75 L105,85", fill: "none", stroke: "#6b8aad", strokeWidth: 1, label: "Patella" },
    ],
    pinAnchors: [
      { id: "left-knee-front", label: "Left Knee (Front/Patella)", x: 30, y: 48 },
      { id: "left-knee-inner", label: "Left Knee (Inner/Medial)", x: 35, y: 50 },
      { id: "left-knee-outer", label: "Left Knee (Outer/Lateral)", x: 22, y: 48 },
      { id: "left-knee-back", label: "Left Knee (Back)", x: 28, y: 55 },
      { id: "right-knee-front", label: "Right Knee (Front/Patella)", x: 70, y: 48 },
      { id: "right-knee-inner", label: "Right Knee (Inner/Medial)", x: 65, y: 50 },
      { id: "right-knee-outer", label: "Right Knee (Outer/Lateral)", x: 78, y: 48 },
      { id: "right-knee-back", label: "Right Knee (Back)", x: 72, y: 55 },
    ],
  },

  "leg-pain": {
    id: "leg-pain",
    label: "Lower Leg",
    viewBox: "0 0 200 220",
    anatomyPaths: [
      { d: "M55,10 L145,10 L140,50 L135,100 L130,140 L70,140 L65,100 L60,50 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M80,10 L75,140", fill: "none", stroke: "#5a7a99", strokeWidth: 1, label: "Tibia" },
      { d: "M120,10 L125,140", fill: "none", stroke: "#5a7a99", strokeWidth: 1 },
      { d: "M55,50 L145,50", fill: "none", stroke: "#6b8aad", strokeWidth: 1 },
    ],
    pinAnchors: [
      { id: "left-shin", label: "Left Shin", x: 30, y: 30 },
      { id: "left-calf", label: "Left Calf", x: 25, y: 35 },
      { id: "left-achilles", label: "Left Achilles", x: 28, y: 58 },
      { id: "right-shin", label: "Right Shin", x: 70, y: 30 },
      { id: "right-calf", label: "Right Calf", x: 75, y: 35 },
      { id: "right-achilles", label: "Right Achilles", x: 72, y: 58 },
    ],
  },

  "ankle-pain": {
    id: "ankle-pain",
    label: "Ankle",
    viewBox: "0 0 200 160",
    anatomyPaths: [
      { d: "M60,10 L140,10 L135,40 L130,60 L70,60 L65,40 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M70,60 L130,60 L135,80 L65,80 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M60,80 L140,80 L145,100 L55,100 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M65,60 Q100,50 135,60", fill: "none", stroke: "#ef4444", strokeWidth: 2, label: "Ankle joint" },
    ],
    pinAnchors: [
      { id: "left-ankle-inner", label: "Left Ankle (Inner/Medial)", x: 30, y: 52 },
      { id: "left-ankle-outer", label: "Left Ankle (Outer/Lateral)", x: 22, y: 50 },
      { id: "left-ankle-front", label: "Left Ankle (Front)", x: 28, y: 45 },
      { id: "right-ankle-inner", label: "Right Ankle (Inner/Medial)", x: 70, y: 52 },
      { id: "right-ankle-outer", label: "Right Ankle (Outer/Lateral)", x: 78, y: 50 },
      { id: "right-ankle-front", label: "Right Ankle (Front)", x: 72, y: 45 },
    ],
  },

  "foot-pain": {
    id: "foot-pain",
    label: "Foot",
    viewBox: "0 0 200 160",
    anatomyPaths: [
      { d: "M50,60 L150,60 L155,80 L150,110 L130,130 L70,130 L50,110 L45,80 Z", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M70,60 L60,30 L65,15 L75,15 L78,30 L75,60", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M88,60 L85,35 L88,20 L95,20 L97,35 L93,60", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M105,60 L103,38 L105,25 L112,25 L114,38 L110,60", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M120,60 L118,40 L120,28 L126,28 L128,40 L124,60", fill: "#2d3a4d", stroke: "#4a6280" },
      { d: "M135,60 L134,45 L136,35 L140,35 L141,45 L138,60", fill: "#2d3a4d", stroke: "#4a6280" },
    ],
    pinAnchors: [
      { id: "heel", label: "Heel", x: 50, y: 72 },
      { id: "arch", label: "Arch of Foot", x: 48, y: 60 },
      { id: "ball-of-foot", label: "Ball of Foot", x: 50, y: 48 },
      { id: "big-toe", label: "Big Toe", x: 35, y: 12 },
      { id: "little-toe", label: "Little Toe", x: 70, y: 22 },
      { id: "top-of-foot", label: "Top of Foot", x: 50, y: 42 },
    ],
  },
};
