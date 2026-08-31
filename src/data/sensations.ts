import { PainSensation } from "@/lib/types";

export const painSensations: PainSensation[] = [
  {
    id: "burning",
    name: "Burning",
    label: "Burning Pain",
    icon: "🔥",
    description:
      "A sensation of heat or scorching, often constant and superficial. Frequently felt along a nerve distribution.",
    mechanism:
      "C-fiber sensitization and inflammatory mediator release (bradykinin, prostaglandins, substance P) lower nociceptor thresholds, producing a sustained burning sensation.",
    pathway: "neuropathic",
    associatedConditions: ["Peripheral Neuropathy", "CRPS", "Diabetic Neuropathy", "Post-herpetic Neuralgia"],
    clinicalNotes:
      "Burning pain that worsens at night or with temperature changes may indicate small-fiber neuropathy. Clinicians should evaluate for metabolic, autoimmune, and toxic causes.",
  },
  {
    id: "electric",
    name: "Electric",
    label: "Electric Shock Pain",
    icon: "⚡",
    description:
      "Sudden, sharp jolts of pain that feel like an electric current passing through the body. Brief but intensely distressing.",
    mechanism:
      "Ectopic impulse generation from demyelinated or compressed nerve fibers. Sodium channel upregulation in damaged axons creates spontaneous firing patterns resembling electrical discharge.",
    pathway: "neuropathic",
    associatedConditions: ["Trigeminal Neuralgia", "Trigeminal Neuralgia", "Radiculopathy", "Neuroma"],
    clinicalNotes:
      "Electric-shock quality pain is highly suggestive of nerve root compression or peripheral nerve pathology. Classic in trigeminal neuralgia and compression radiculopathies.",
  },
  {
    id: "shooting",
    name: "Shooting",
    label: "Shooting Pain",
    icon: "🎯",
    description:
      "Pain that travels rapidly along a pathway, radiating from its origin to a distant area. Follows a nerve or dermatomal distribution.",
    mechanism:
      "Action potential propagation along sensitized or compressed nerve fibers. Ectopic foci in dorsal root ganglia or along nerve trunks create a wave-like pain pattern.",
    pathway: "neuropathic",
    associatedConditions: ["Sciatica", "Cervical Radiculopathy", "Thoracic Outlet Syndrome", "Phantom Limb Pain"],
    clinicalNotes:
      "Shooting pain following a dermatomal pattern strongly suggests nerve root involvement. Non-dermatomal radiation may indicate peripheral nerve or central sensitization.",
  },
  {
    id: "pins-and-needles",
    name: "Pins & Needles",
    label: "Pins & Needles (Paresthesia)",
    icon: "📌",
    description:
      "A tingling, prickling sensation often described as \"falling asleep\" or \"ants crawling\" on the skin. May be constant or intermittent.",
    mechanism:
      "Large-fiber (Aβ) and small-fiber (Aδ/C) dysfunction alters somatosensory processing. Compression or demyelination impairs normal tactile and proprioceptive signaling.",
    pathway: "neuropathic",
    associatedConditions: ["Carpal Tunnel Syndrome", "Cervical Myelopathy", "Peripheral Neuropathy", "Multiple Sclerosis"],
    clinicalNotes:
      "Paresthesias in specific nerve distributions help localize pathology. Bilateral symmetric patterns suggest systemic neuropathy; unilateral patterns suggest focal compression.",
  },
  {
    id: "aching",
    name: "Aching",
    label: "Aching Pain",
    icon: "😔",
    description:
      "A deep, dull, persistent pain often described as a heavy or throbbing ache. Typically localized and worsened by activity or sustained postures.",
    mechanism:
      "Activation of deep tissue nociceptors (mechanoreceptors in periosteum, joint capsules, fascia, and viscera). Prostaglandin and cytokine release from damaged or inflamed tissue lowers firing thresholds of Aδ and C fibers.",
    pathway: "nociceptive",
    associatedConditions: ["Osteoarthritis", "Myofascial Pain", "Fibromyalgia", "Chronic Low Back Pain"],
    clinicalNotes:
      "Deep aching pain originating from joints or muscles typically indicates structural pathology. When widespread and disproportionate to findings, consider nociplastic pain mechanisms.",
  },
  {
    id: "stabbing",
    name: "Stabbing",
    label: "Stabbing / Piercing Pain",
    icon: "🗡️",
    description:
      "A sharp, localized, penetrating pain that feels like being stabbed or pierced. Sudden onset, brief duration, and intensely focused.",
    mechanism:
      "High-intensity, short-duration activation of Aδ nociceptors by acute mechanical stimuli. Often indicates acute tissue injury, facet joint capsule irritation, or periposteal inflammation.",
    pathway: "nociceptive",
    associatedConditions: ["Facet Joint Syndrome", "Muscle Strain", "Fracture", "Acute Disc Herniation"],
    clinicalNotes:
      "Stabbing pain that occurs with specific movements suggests mechanical pathology. Pain on rotation may indicate facet involvement; pain with flexion may suggest disc origin.",
  },
  {
    id: "numbness",
    name: "Numbness",
    label: "Numbness (Hypoesthesia)",
    icon: "🧊",
    description:
      "A loss or reduction of sensation in an area of the skin. May coexist with tingling or pain in adjacent regions.",
    mechanism:
      "Complete or partial loss of sensory signal transmission due to nerve compression, demyelination, or axonal degeneration. May indicate significant nerve compromise.",
    pathway: "neuropathic",
    associatedConditions: ["Cauda Equina Syndrome", "Severe Radiculopathy", "Peripheral Neuropathy", "Myelopathy"],
    clinicalNotes:
      "New-onset numbness in saddle distribution (perineal, inner thighs) is a RED FLAG for cauda equina syndrome and requires urgent evaluation. Progressive numbness warrants urgent imaging.",
  },
  {
    id: "throbbing",
    name: "Throbbing",
    label: "Throbbing / Pulsatile Pain",
    icon: "💓",
    description:
      "A rhythmic, pulsing pain that often synchronizes with the heartbeat. May feel like a beating or hammering sensation.",
    mechanism:
      "Vascular involvement with pulsatile pressure changes in inflamed or damaged tissue. Neurogenic inflammation and arterial pulsation create a rhythmic pain pattern. Often involves large blood vessels near nociceptors.",
    pathway: "nociceptive",
    associatedConditions: ["Migraine", "Temporal Arteritis", "Pulsatile Tinnitus", "Inflammatory Arthritis"],
    clinicalNotes:
      "Throbbing pain accompanied by visual changes, nausea, or photosensitivity suggests migraine. New-onset throbbing in elderly patients requires evaluation for giant cell arteritis.",
  },
];

export function getSensationById(id: string): PainSensation | undefined {
  return painSensations.find((s) => s.id === id);
}

export function getSensationsByPathway(pathway: PainSensation["pathway"]): PainSensation[] {
  return painSensations.filter((s) => s.pathway === pathway);
}

export function searchSensations(query: string): PainSensation[] {
  const q = query.toLowerCase();
  return painSensations.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.label.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
  );
}
