import { WizardStep, WizardResult } from "@/lib/types";

export const wizardSteps: WizardStep[] = [
  {
    id: 1,
    title: "Pain Location",
    question: "Where is your pain primarily located?",
    type: "multiselect",
    options: [
      { id: "head", label: "Head / Face", value: "head", icon: "🧠" },
      { id: "neck", label: "Neck / Cervical", value: "neck", icon: "🦴" },
      { id: "shoulder", label: "Shoulder", value: "shoulder", icon: "💪" },
      { id: "arm", label: "Arm / Elbow", value: "arm", icon: "🦾" },
      { id: "hand", label: "Hand / Wrist", value: "hand", icon: "✋" },
      { id: "chest", label: "Chest / Thoracic", value: "chest", icon: "🫁" },
      { id: "back", label: "Lower Back / Lumbar", value: "back", icon: "🔙" },
      { id: "hip", label: "Hip / Pelvis", value: "hip", icon: "🦴" },
      { id: "knee", label: "Knee", value: "knee", icon: "🦵" },
      { id: "leg", label: "Leg / Shin", value: "leg", icon: "🦿" },
      { id: "foot", label: "Foot / Ankle", value: "foot", icon: "🦶" },
    ],
  },
  {
    id: 2,
    title: "Pain Quality",
    question: "How would you describe the quality of your pain?",
    type: "multiselect",
    options: [
      { id: "burning", label: "Burning", value: "burning", icon: "🔥" },
      { id: "electric", label: "Electric Shock", value: "electric", icon: "⚡" },
      { id: "shooting", label: "Shooting", value: "shooting", icon: "🎯" },
      { id: "pins", label: "Pins & Needles / Tingling", value: "pins-and-needles", icon: "📌" },
      { id: "aching", label: "Deep Aching", value: "aching", icon: "😔" },
      { id: "stabbing", label: "Stabbing / Sharp", value: "stabbing", icon: "🗡️" },
      { id: "numbness", label: "Numbness", value: "numbness", icon: "🧊" },
      { id: "throbbing", label: "Throbbing / Pulsating", value: "throbbing", icon: "💓" },
    ],
  },
  {
    id: 3,
    title: "Duration",
    question: "How long have you been experiencing this pain?",
    type: "select",
    options: [
      { id: "acute", label: "Less than 2 weeks", value: "acute", description: "Acute pain" },
      { id: "subacute", label: "2 weeks to 3 months", value: "subacute", description: "Subacute pain" },
      { id: "chronic", label: "More than 3 months", value: "chronic", description: "Chronic pain" },
      { id: "intermittent", label: "Comes and goes", value: "intermittent", description: "Episodic pain" },
    ],
  },
  {
    id: 4,
    title: "Intensity",
    question: "On a scale of 0–10, how intense is your pain most of the time?",
    type: "range",
    min: 0,
    max: 10,
    unit: "/10",
  },
  {
    id: 5,
    title: "Radiation",
    question: "Does the pain travel or spread to other areas?",
    type: "yesno",
    options: [
      { id: "yes", label: "Yes, it radiates", value: "yes" },
      { id: "no", label: "No, it stays in one spot", value: "no" },
    ],
  },
  {
    id: 6,
    title: "Radiation Pattern",
    question: "Where does the pain radiate to? (if applicable)",
    type: "multiselect",
    options: [
      { id: "below-knee", label: "Below the knee", value: "below-knee" },
      { id: "below-elbow", label: "Below the elbow", value: "below-elbow" },
      { id: "groin", label: "Groin area", value: "groin" },
      { id: "buttock", label: "Buttock / Back of thigh", value: "buttock" },
      { id: "shoulder-blade", label: "Between shoulder blades", value: "shoulder-blade" },
      { id: "none", label: "Does not radiate", value: "none" },
    ],
  },
  {
    id: 7,
    title: "Aggravating Factors",
    question: "What makes your pain worse?",
    type: "multiselect",
    options: [
      { id: "movement", label: "Movement / Activity", value: "movement" },
      { id: "sitting", label: "Prolonged Sitting", value: "sitting" },
      { id: "standing", label: "Prolonged Standing", value: "standing" },
      { id: "lying", label: "Lying Down", value: "lying" },
      { id: "coughing", label: "Coughing / Sneezing", value: "coughing" },
      { id: "night", label: "Night time", value: "night" },
      { id: "cold", label: "Cold weather", value: "cold" },
      { id: "touch", label: "Light touch / Clothing", value: "touch" },
    ],
  },
  {
    id: 8,
    title: "Sensory Changes",
    question: "Have you noticed any changes in sensation?",
    type: "multiselect",
    options: [
      { id: "numbness", label: "Numbness", value: "numbness" },
      { id: "tingling", label: "Tingling / Pins and needles", value: "tingling" },
      { id: "burning", label: "Burning sensation on skin", value: "burning" },
      { id: "cold", label: "Feeling cold in the area", value: "cold" },
      { id: "none", label: "No sensory changes", value: "none" },
    ],
  },
  {
    id: 9,
    title: "Motor Strength",
    question: "Have you experienced any weakness or difficulty moving?",
    type: "yesno",
    options: [
      { id: "yes", label: "Yes, I feel weaker", value: "yes" },
      { id: "no", label: "No, strength feels normal", value: "no" },
    ],
  },
  {
    id: 10,
    title: "Red Flags Screening",
    question: "Have you experienced any of these concerning symptoms?",
    type: "multiselect",
    options: [
      { id: "saddle", label: "Numbness in groin / saddle area", value: "saddle" },
      { id: "bladder", label: "Bladder or bowel changes", value: "bladder" },
      { id: "progressive", label: "Progressively worsening weakness", value: "progressive" },
      { id: "trauma", label: "Recent significant trauma", value: "trauma" },
      { id: "fever", label: "Fever / Unexplained weight loss", value: "fever" },
      { id: "none", label: "None of these", value: "none" },
    ],
  },
];

export function evaluateWizardAnswers(
  answers: Record<number, string | string[] | number>
): WizardResult {
  const rawLocation = answers[1];
  const locations: string[] = Array.isArray(rawLocation)
    ? (rawLocation as string[])
    : rawLocation
    ? [rawLocation as string]
    : ["back"];

  const rawQuality = answers[2];
  const qualities: string[] = Array.isArray(rawQuality)
    ? (rawQuality as string[])
    : rawQuality
    ? [rawQuality as string]
    : ["aching"];

  const duration = (answers[3] as string) || "chronic";
  const intensity = (answers[4] as number) || 5;
  const radiates = (answers[5] as string) || "no";
  const aggravating = (answers[7] as string[]) || [];
  const sensoryChanges = (answers[8] as string[]) || [];
  const motorWeakness = answers[9] as string;
  const redFlags = (answers[10] as string[]) || [];

  // Determine pain pathway
  const possiblePathways: WizardResult["possiblePathways"] = [];
  const neuropathicQualities = ["burning", "electric", "shooting", "pins-and-needles", "numbness"];
  const nociceptiveQualities = ["aching", "stabbing", "throbbing"];

  if (qualities.some((q) => neuropathicQualities.includes(q))) {
    possiblePathways.push("neuropathic");
  }
  if (qualities.some((q) => nociceptiveQualities.includes(q))) {
    possiblePathways.push("nociceptive");
  }
  if (
    sensoryChanges.length > 1 ||
    duration === "chronic" ||
    intensity > 7 ||
    locations.length > 2
  ) {
    possiblePathways.push("nociplastic");
  }
  if (possiblePathways.length === 0) {
    possiblePathways.push("nociceptive", "neuropathic");
  }

  // Generate patterns
  const patterns: string[] = [];

  if (radiates === "yes") {
    patterns.push("Radiating pain pattern suggests nerve root or peripheral nerve involvement.");
  }
  if (sensoryChanges.includes("numbness") || sensoryChanges.includes("tingling")) {
    patterns.push("Sensory alteration present, indicating possible neuropathic component.");
  }
  if (motorWeakness === "yes") {
    patterns.push("Motor weakness suggests possible nerve compression or myelopathy.");
  }
  if (aggravating.includes("coughing")) {
    patterns.push("Pain worsened by Valsalva maneuver (coughing/sneezing) is consistent with disc pathology.");
  }
  if (aggravating.includes("sitting") && locations.includes("back")) {
    patterns.push("Pain worsened by sitting suggests discogenic or lumbar spinal stenosis pattern.");
  }
  if (locations.includes("head") && locations.includes("neck")) {
    patterns.push("Combined neck and head pain suggests possible cervicogenic or tension-type pain mechanism.");
  }
  if (locations.length > 2) {
    patterns.push("Multi-regional pain pattern detected across multiple body segments.");
  }
  if (aggravating.includes("night")) {
    patterns.push("Nocturnal pain warrants further investigation for inflammatory or neoplastic causes.");
  }
  if (intensity >= 7) {
    patterns.push("High pain intensity (≥7/10) warrants urgent clinical evaluation.");
  }
  if (duration === "chronic") {
    patterns.push("Chronic pain (>3 months) may involve central sensitization mechanisms.");
  }

  // Generate recommendations
  const recommendations: string[] = [
    "This educational tool provides general information only and does not replace clinical assessment.",
    "Consult a qualified pain medicine specialist for personalized evaluation and treatment.",
  ];

  if (patterns.length > 2) {
    recommendations.push("Multiple pain patterns identified — comprehensive clinical evaluation recommended.");
  }
  if (possiblePathways.includes("neuropathic")) {
    recommendations.push("Neuropathic pain features detected — nerve conduction studies or quantitative sensory testing may be beneficial.");
  }
  if (motorWeakness === "yes") {
    recommendations.push("Motor weakness present — prompt neurological evaluation and imaging recommended.");
  }

  // Check for red flag symptoms
  const activeRedFlags: string[] = [];
  const redFlagItems = redFlags.filter((f) => f !== "none");
  for (const flag of redFlagItems) {
    switch (flag) {
      case "saddle":
        activeRedFlags.push("⚠️ Saddle anesthesia: This is a RED FLAG for Cauda Equina Syndrome — requires URGENT emergency evaluation.");
        break;
      case "bladder":
        activeRedFlags.push("⚠️ Bladder/bowel changes: This is a RED FLAG — requires urgent neurological assessment.");
        break;
      case "progressive":
        activeRedFlags.push("⚠️ Progressive motor weakness: Requires urgent imaging and clinical evaluation.");
        break;
      case "trauma":
        activeRedFlags.push("⚠️ Recent trauma: Requires urgent imaging to rule out fracture or structural injury.");
        break;
      case "fever":
        activeRedFlags.push("⚠️ Fever/weight loss: Requires urgent evaluation to rule out infection or malignancy.");
        break;
    }
  }

  if (activeRedFlags.length > 0) {
    recommendations.unshift(
      "🚨 RED FLAG(S) DETECTED: Please seek immediate medical attention. These symptoms may indicate a serious underlying condition requiring urgent intervention."
    );
  }

  // Generate summary
  const regionNames = locations.map((loc) => loc.charAt(0).toUpperCase() + loc.slice(1)).join(", ");
  const qualityNames = qualities.map((q) => q.replace("-", " ")).join(", ");
  const pathwayNames = possiblePathways.map(
    (p) => p.charAt(0).toUpperCase() + p.slice(1)
  );

  const summary =
    `Based on your responses, your pain in ${regionNames} with ${qualityNames} quality ` +
    `(rated ${intensity}/10, ${duration} duration) ${radiates === "yes" ? "radiating to other areas " : ""}` +
    `suggests ${pathwayNames.join(" and ")} pain mechanisms. ` +
    (patterns.length > 0
      ? `${patterns.length} pattern(s) were identified from your responses.`
      : "No specific high-yield patterns were identified beyond the above.");

  return {
    summary,
    patterns,
    possiblePathways,
    recommendations,
    redFlags: activeRedFlags,
    disclaimer:
      "This educational tool is intended for informational purposes only. It does not constitute medical advice, diagnosis, or treatment. " +
      "Always consult a qualified healthcare professional for clinical evaluation and management of pain conditions.",
  };
}
