import { AnatomyRegion } from "@/lib/types";

export const anatomyRegions: AnatomyRegion[] = [
  {
    id: "head",
    name: "Head",
    label: "Head & Face",
    path: "M200,30 C220,10 260,10 280,30 C300,50 300,90 280,110 C260,120 240,120 220,110 C200,90 200,50 200,30Z",
    conditions: ["Trigeminal Neuralgia", "Migraine", "Tension Headache", "Cluster Headache"],
    mechanisms: [
      "Cranial nerve V irritation",
      "Cerebrovascular changes",
      "Myofascial trigger points in temporalis, masseter",
      "Trigeminal ganglion compression"
    ],
    nerves: ["Trigeminal nerve (CN V)", "Facial nerve (CN VII)"],
  },
  {
    id: "neck",
    name: "Neck",
    label: "Neck & Cervical",
    path: "M220,110 L280,110 L290,160 L210,160Z",
    conditions: ["Cervical Radiculopathy", "Cervical Spondylosis", "Whiplash", "Thoracic Outlet Syndrome"],
    mechanisms: [
      "Cervical disc herniation compressing nerve roots",
      "Facet joint arthropathy",
      "Foraminal stenosis",
      "Muscle spasm and myofascial pain"
    ],
    nerves: ["Cervical nerve roots C3-C8", "Dorsal scapular nerve"],
    vertebrae: ["C3-C4", "C4-C5", "C5-C6", "C6-C7"],
  },
  {
    id: "shoulder",
    name: "Shoulder",
    label: "Shoulder",
    path: "M180,160 L210,160 L210,220 L140,220 L130,180 L150,160Z",
    conditions: ["Rotator Cuff Tendinopathy", "Frozen Shoulder", "Shoulder Impingement", "AC Joint Arthropathy"],
    mechanisms: [
      "Subacromial impingement",
      "Rotator cuff tendon degeneration",
      "Adhesive capsulitis",
      "Glenohumeral joint inflammation"
    ],
    nerves: ["Suprascapular nerve", "Axillary nerve"],
  },
  {
    id: "arm",
    name: "Arm",
    label: "Arm & Elbow",
    path: "M130,220 L170,220 L160,340 L120,340Z",
    conditions: ["Lateral Epicondylitis", "Medial Epicondylitis", "Cubital Tunnel Syndrome", "Bicipital Tendinopathy"],
    mechanisms: [
      "Repetitive strain injury",
      "Tendon micro-tears",
      "Nerve entrapment",
      "Lateral/medial epicondyle inflammation"
    ],
    nerves: ["Radial nerve", "Ulnar nerve", "Median nerve"],
  },
  {
    id: "hand",
    name: "Hand",
    label: "Hand & Wrist",
    path: "M110,340 L170,340 L180,400 L100,400Z",
    conditions: ["Carpal Tunnel Syndrome", "De Quervain's Tenosynovitis", "Trigger Finger", "Dupuytren's Contracture"],
    mechanisms: [
      "Median nerve compression at carpal tunnel",
      "Tendon sheath inflammation",
      "Flexor tendon nodule formation",
      "Palmar fascia fibrosis"
    ],
    nerves: ["Median nerve", "Ulnar nerve", "Radial nerve"],
  },
  {
    id: "chest",
    name: "Chest",
    label: "Chest & Thoracic",
    path: "M170,160 L330,160 L340,240 L160,240Z",
    conditions: ["Costochondritis", "Thoracic Radiculopathy", "Precordial Catch Syndrome", "Intercostal Neuralgia"],
    mechanisms: [
      "Costochondral junction inflammation",
      "Thoracic disc herniation",
      "Intercostal nerve irritation",
      "Rib dysfunction"
    ],
    nerves: ["Intercostal nerves T1-T12", "Thoracic nerve roots"],
    vertebrae: ["T1-T12"],
  },
  {
    id: "back",
    name: "Back",
    label: "Lumbar & Thoracic Spine",
    path: "M170,240 L330,240 L340,380 L160,380Z",
    conditions: [
      "Sciatica", "Lumbar Spinal Stenosis", "Facet Joint Syndrome",
      "Disc Herniation", "Sacroiliac Dysfunction", "Spondylolisthesis"
    ],
    mechanisms: [
      "Disc herniation compressing nerve roots",
      "Ligamentum flavum hypertrophy",
      "Facet joint arthropathy",
      "Sacroiliac joint dysfunction",
      "Paraspinal muscle spasm"
    ],
    nerves: ["Lumbar nerve roots L1-L5", "Sacral nerve roots S1-S3", "Sciatic nerve"],
    vertebrae: ["L1-L2", "L2-L3", "L3-L4", "L4-L5", "L5-S1"],
  },
  {
    id: "hip",
    name: "Hip",
    label: "Hip & Pelvis",
    path: "M140,380 L360,380 L370,440 L130,440Z",
    conditions: ["Hip Osteoarthritis", "Greater Trochanteric Pain Syndrome", "Hip Labral Tear", "Piriformis Syndrome"],
    mechanisms: [
      "Acetabular cartilage degeneration",
      "Gluteal tendon pathology",
      "Labral damage",
      "Piriformis muscle compression of sciatic nerve"
    ],
    nerves: ["Femoral nerve", "Obturator nerve", "Sciatic nerve"],
  },
  {
    id: "knee",
    name: "Knee",
    label: "Knee",
    path: "M150,440 L350,440 L350,560 L150,560Z",
    conditions: ["Knee Osteoarthritis", "Patellofemoral Syndrome", "Meniscal Tear", "ACL Injury", "IT Band Syndrome"],
    mechanisms: [
      "Articular cartilage loss",
      "Patellar maltracking",
      "Meniscal degeneration",
      "Ligament injury",
      "Lateral retinaculum friction"
    ],
    nerves: ["Femoral nerve", "Common peroneal nerve"],
  },
  {
    id: "leg",
    name: "Leg",
    label: "Leg & Shin",
    path: "M160,560 L340,560 L320,700 L180,700Z",
    conditions: ["Chronic Exertional Compartment Syndrome", "Shin Splints", "Peripheral Neuropathy", "Deep Vein Thrombosis"],
    mechanisms: [
      "Compartment pressure elevation",
      "Medial tibial stress syndrome",
      "Peripheral nerve degeneration",
      "Venous thrombosis"
    ],
    nerves: ["Tibial nerve", "Common peroneal nerve", "Saphenous nerve"],
  },
  {
    id: "foot",
    name: "Foot",
    label: "Foot & Ankle",
    path: "M150,700 L350,700 L380,780 L120,780Z",
    conditions: ["Plantar Fasciitis", "Ankle Sprain", "Tarsal Tunnel Syndrome", "Morton's Neuroma", "Achilles Tendinopathy"],
    mechanisms: [
      "Plantar fascia micro-tears",
      "Ligament injury",
      "Tibial nerve entrapment",
      "Interdigital nerve compression",
      "Achilles tendon degeneration"
    ],
    nerves: ["Tibial nerve", "Superficial peroneal nerve", "Medial plantar nerve"],
  },
];

export function getRegionById(id: string): AnatomyRegion | undefined {
  return anatomyRegions.find((r) => r.id === id);
}

export function searchRegions(query: string): AnatomyRegion[] {
  const q = query.toLowerCase();
  return anatomyRegions.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.label.toLowerCase().includes(q) ||
      r.conditions.some((c) => c.toLowerCase().includes(q))
  );
}
