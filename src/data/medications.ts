import { Medication } from "@/lib/types";

export const medications: Medication[] = [
  {
    id: "neuropathic-modulators",
    name: "Neuropathic Pain Modulators",
    slug: "neuropathic-modulators",
    category: "neuropathic",
    description:
      "Neuropathic pain modulators are medications that target the abnormal nerve signaling responsible for neuropathic pain. They work by modulating neurotransmitter activity, reducing nerve excitability, and blocking pain signal transmission in the central and peripheral nervous systems.",
    mechanism:
      "These agents work through multiple mechanisms: calcium channel alpha-2-delta subunit binding (gabapentin, pregabalin), serotonin-norepinephrine reuptake inhibition (duloxetine, amitriptyline), and sodium channel blockade (carbamazepine, oxcarbazepine). Together they reduce ectopic nerve firing and central sensitization.",
    commonUses: [
      "Neuropathic pain (diabetic neuropathy, post-herpetic neuralgia)",
      "Sciatica and radiculopathy",
      "Trigeminal neuralgia",
      "Central post-stroke pain",
      "Fibromyalgia (pregabalin, duloxetine)",
      "Chronic musculoskeletal pain with neuropathic component",
    ],
    sideEffects: [
      "Drowsiness and fatigue (especially with gabapentin, pregabalin)",
      "Dizziness",
      "Weight gain",
      "Dry mouth (tricyclics, duloxetine)",
      "Constipation",
      "Blurred vision (tricyclics)",
      "Peripheral edema",
      "Nausea",
    ],
    precautions: [
      "Do not stop abruptly — taper gradually to avoid withdrawal symptoms",
      "May impair driving and cognitive function initially",
      "Caution in elderly — start at low doses and titrate slowly",
      "Avoid with certain cardiac conditions (tricyclics)",
      "Monitor for suicidal ideation (as with all antidepressants)",
      "Avoid alcohol — enhances sedation",
      "Dose adjustment needed in renal impairment (gabapentin, pregabalin)",
    ],
    disclaimer:
      "This information is for educational purposes only and does not constitute medical advice. Medication decisions should be made in consultation with a qualified healthcare professional who can evaluate your specific condition, medical history, and potential drug interactions.",
  },
  {
    id: "nsaids",
    name: "Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)",
    slug: "nsaids",
    category: "nsaid",
    description:
      "NSAIDs are a class of medications that reduce pain, fever, and inflammation by inhibiting cyclooxygenase (COX) enzymes. They are among the most widely used analgesics for musculoskeletal pain and inflammatory conditions.",
    mechanism:
      "NSAIDs inhibit cyclooxygenase-1 (COX-1) and cyclooxygenase-2 (COX-2) enzymes, reducing prostaglandin synthesis. This decreases inflammation, pain sensitization, and fever. COX-2 selective inhibitors were developed to reduce gastrointestinal side effects associated with COX-1 inhibition.",
    commonUses: [
      "Osteoarthritis pain and inflammation",
      "Acute musculoskeletal injuries",
      "Low back pain",
      "Post-surgical pain",
      "Inflammatory conditions (tendinitis, bursitis)",
      "Headache and migraine",
    ],
    sideEffects: [
      "Gastric ulceration and bleeding (risk increases with dose and duration)",
      "Cardiovascular risk (increased with COX-2 selective agents)",
      "Renal impairment (especially in dehydrated patients or those with CKD)",
      "Increased bleeding risk",
      "Hypertension worsening",
      "Hepatic effects (rare with standard doses)",
      "Fluid retention",
    ],
    precautions: [
      "Avoid in patients with active peptic ulcer disease",
      "Use lowest effective dose for shortest duration",
      "Avoid in severe renal impairment",
      "Caution with cardiovascular disease (COX-2 selective agents carry higher CV risk)",
      "Take with food to reduce GI side effects",
      "Avoid combining multiple NSAIDs",
      "Caution with anticoagulant therapy",
      "Not recommended in third trimester of pregnancy",
    ],
    disclaimer:
      "This information is for educational purposes only. NSAIDs can have serious side effects. Consult a healthcare professional before starting, changing, or stopping any NSAID medication, especially if you have underlying health conditions.",
  },
  {
    id: "muscle-relaxants",
    name: "Muscle Relaxants",
    slug: "muscle-relaxants",
    category: "muscle-relaxant",
    description:
      "Muscle relaxants are medications that reduce muscle spasm and hypertonicity. They are commonly used in the acute management of musculoskeletal pain, particularly when muscle spasm is a significant contributing factor.",
    mechanism:
      "Centrally acting muscle relaxants (cyclobenzaprine, tizanidine, baclofen, methocarbamol) work in the central nervous system to reduce muscle tone and spasm. They may act on GABA receptors, alpha-2 adrenergic receptors, or inhibit multi-synaptic reflex arcs.",
    commonUses: [
      "Acute low back pain with muscle spasm",
      "Cervical strain / whiplash",
      "Post-surgical muscle spasm",
      "Muscle spasm secondary to disc herniation",
      "Acute exacerbations of chronic pain conditions",
      "Short-term adjunct to physical therapy",
    ],
    sideEffects: [
      "Drowsiness and sedation",
      "Dizziness",
      "Dry mouth",
      "Fatigue",
      "Nausea",
      "Blurred vision",
      "Potential for dependence (with some agents)",
    ],
    precautions: [
      "Short-term use recommended (2-3 weeks maximum)",
      "Avoid driving or operating machinery until you know how the medication affects you",
      "Avoid alcohol — enhances sedation",
      "Elderly patients at increased risk of falls",
      "Do not abruptly discontinue after prolonged use",
      "Avoid with other sedating medications",
      "Use with caution in hepatic impairment",
    ],
    disclaimer:
      "This information is for educational purposes only and does not constitute medical advice. Muscle relaxants are prescription medications that require professional evaluation and monitoring. Always consult your healthcare provider.",
  },
  {
    id: "topical-analgesics",
    name: "Topical Analgesics",
    slug: "topical-analgesics",
    category: "topical",
    description:
      "Topical analgesics are medications applied directly to the skin over the painful area, providing localized pain relief with minimal systemic side effects. They include lidocaine patches, capsaicin cream, topical NSAIDs, and compound formulations.",
    mechanism:
      "Topical agents work locally through multiple mechanisms: lidocaine blocks sodium channels in peripheral nociceptors; capsaicin depletes substance P from nerve endings and desensitizes TRPV1 receptors; topical NSAIDs provide localized COX inhibition; menthol activates TRPM8 receptors creating a cooling sensation.",
    commonUses: [
      "Localized musculoskeletal pain",
      "Osteoarthritis (knee, hand)",
      "Neuropathic pain (post-herpetic neuralgia with lidocaine patch)",
      "Myofascial pain",
      "Tendinopathy",
      "Pain in patients who cannot tolerate oral medications",
    ],
    sideEffects: [
      "Skin irritation or redness at application site",
      "Contact dermatitis",
      "Burning sensation (capsaicin — usually transient)",
      "Mild stinging (lidocaine patch)",
      "Allergic reaction (rare)",
    ],
    precautions: [
      "Apply only to intact skin — avoid open wounds, mucous membranes, and eyes",
      "Wash hands thoroughly after application (unless treating hands)",
      "Capsaicin requires consistent application for 2-4 weeks for full effect",
      "Do not use heating pads over topical analgesics",
      "Lidocaine patches should be removed before MRI",
      "Avoid combining multiple topical agents on the same area",
    ],
    disclaimer:
      "This information is for educational purposes only. While many topical analgesics are available over-the-counter, some require a prescription. Consult a healthcare professional to determine the most appropriate option for your condition.",
  },
];

export function getMedicationBySlug(slug: string): Medication | undefined {
  return medications.find((m) => m.slug === slug);
}

export function getMedicationsByCategory(category: Medication["category"]): Medication[] {
  return medications.filter((m) => m.category === category);
}

export function searchMedications(query: string): Medication[] {
  const q = query.toLowerCase();
  return medications.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.commonUses.some((u) => u.toLowerCase().includes(q))
  );
}
