import { PatientTestimonial, VideoItem } from "@/lib/types";

export const testimonials: PatientTestimonial[] = [
  {
    id: "testimonial-sciatica-1",
    patientName: "Rajesh M.",
    condition: "Sciatica",
    conditionSlug: "sciatica",
    procedure: "Lumbar Epidural Steroid Injection",
    procedureSlug: "lumbar-epidural-injection",
    videoId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "3:42",
    patientAge: 52,
    patientLocation: "Surat, Gujarat",
    quote:
      "I could barely walk into the clinic. After the epidural injection guided by Dr. Shah, I was walking normally within two weeks. The pain that had plagued me for months just melted away.",
    recoverySummary:
      "52-year-old male with 6-month history of right-sided sciatica secondary to L4-L5 disc herniation. Failed conservative management including physical therapy and oral medications. Achieved significant pain relief following a single fluoroscopy-guided transforaminal epidural steroid injection.",
    recoveryMilestones: [
      "Day 1: 60% pain reduction following injection",
      "Week 1: Resumed walking without assistive device",
      "Week 4: Returned to full work duties",
      "Month 3: Completed rehabilitation program with full functional recovery",
    ],
    videoDescription:
      "Rajesh shares his journey from debilitating sciatica pain to full recovery through evidence-based interventional pain management.",
    consentVerified: true,
    dateRecorded: "2025-11-15",
  },
  {
    id: "testimonial-facet-1",
    patientName: "Priya K.",
    condition: "Facet Joint Syndrome",
    conditionSlug: "facet-joint-syndrome",
    procedure: "Radiofrequency Ablation (RFA)",
    procedureSlug: "radiofrequency-ablation",
    videoId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "4:15",
    patientAge: 45,
    patientLocation: "Surat, Gujarat",
    quote:
      "After years of chronic low back pain, the medial branch block confirmed it was my facet joints. Dr. Shah performed the RFA and I haven't looked back — I can finally play with my grandchildren again.",
    recoverySummary:
      "45-year-old female with chronic facet joint syndrome at L4-L5 and L5-S1 levels. Pain worse with extension and rotation, relieved by flexion. Diagnostic medial branch blocks provided 90% pain relief. Underwent radiofrequency ablation with excellent results.",
    recoveryMilestones: [
      "Diagnostic block: 90% pain relief confirming facet joint origin",
      "Day 1 post-RFA: Mild soreness, manageable with ice",
      "Week 2: Significant pain reduction begins",
      "Month 2: Full return to recreational activities",
      "Month 6: Sustained pain relief, reduced analgesic use",
    ],
    videoDescription:
      "Priya discusses how precise diagnostic blocks and radiofrequency ablation transformed her chronic back pain into a manageable condition.",
    consentVerified: true,
    dateRecorded: "2025-10-22",
  },
  {
    id: "testimonial-cervical-1",
    patientName: "Amit S.",
    condition: "Cervical Radiculopathy",
    conditionSlug: "cervical-radiculopathy",
    procedure: "Cervical Epidural Steroid Injection",
    procedureSlug: "lumbar-epidural-injection",
    videoId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "3:58",
    patientAge: 38,
    patientLocation: "Vadodara, Gujarat",
    quote:
      "The tingling and numbness in my hand was terrifying. Dr. Shah explained exactly what was happening with my C6 nerve root and the injection gave me relief I didn't think was possible.",
    recoverySummary:
      "38-year-old male software developer with C6 radiculopathy from C5-C6 disc herniation. Presented with burning pain radiating to the thumb and index finger, with numbness and grip weakness. Responded excellently to fluoroscopy-guided cervical epidural injection.",
    recoveryMilestones: [
      "Pre-procedure: Numbness in C6 dermatome, grip strength 3/5",
      "Week 1: 70% pain reduction, tingling subsiding",
      "Month 1: Grip strength returned to 5/5",
      "Month 3: Full recovery with ergonomic workplace modifications",
    ],
    videoDescription:
      "Amit shares his recovery from cervical radiculopathy and how understanding his condition helped him make informed treatment decisions.",
    consentVerified: true,
    dateRecorded: "2025-12-03",
  },
  {
    id: "testimonial-knee-1",
    patientName: "Sunita D.",
    condition: "Knee Osteoarthritis",
    conditionSlug: "knee-osteoarthritis",
    procedure: "Genicular Nerve Radiofrequency Ablation",
    procedureSlug: "radiofrequency-ablation",
    videoId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "4:30",
    patientAge: 62,
    patientLocation: "Rajkot, Gujarat",
    quote:
      "I was told I needed a knee replacement, but Dr. Shah offered me the genicular nerve ablation first. It was the best decision — I'm pain-free and avoided surgery entirely.",
    recoverySummary:
      "62-year-old female with moderate-to-severe bilateral knee osteoarthritis. Kellgren-Lawrence grade III. Declined knee arthroplasty. Underwent genicular nerve radiofrequency ablation after successful diagnostic genicular nerve blocks.",
    recoveryMilestones: [
      "Diagnostic block: 85% pain relief confirming genicular nerve involvement",
      "Week 1 post-RFA: Mild swelling, managed with ice and rest",
      "Month 1: 80% pain reduction, resumed daily walking routine",
      "Month 6: Maintained pain relief, avoided knee replacement surgery",
    ],
    videoDescription:
      "Sunita explains how genicular nerve RFA provided lasting knee pain relief without surgery, allowing her to stay active and independent.",
    consentVerified: true,
    dateRecorded: "2025-09-18",
  },
  {
    id: "testimonial-crps-1",
    patientName: "Vikram P.",
    condition: "Complex Regional Pain Syndrome",
    conditionSlug: "crps",
    procedure: "Spinal Cord Stimulation",
    procedureSlug: "spinal-cord-stimulation",
    videoId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "5:12",
    patientAge: 34,
    patientLocation: "Gandhinagar, Gujarat",
    quote:
      "CRPS controlled every aspect of my life. The spinal cord stimulation trial gave me my first pain-free days in three years. Dr. Shah and his team gave me hope when I had none left.",
    recoverySummary:
      "34-year-old male with CRPS Type I of the left hand following a wrist fracture. Failed multiple conservative treatments including medications, sympathetic blocks, and physical therapy. Underwent successful SCS trial with 70% pain relief, leading to permanent implant.",
    recoveryMilestones: [
      "SCS trial (5 days): 70% pain reduction, allodynia resolved",
      "Week 1 post-implant: Programming optimization",
      "Month 1: Significant functional improvement, reduced medication",
      "Month 6: Return to work, resumed recreational activities",
      "Year 1: Sustained benefit, CRPS in remission",
    ],
    videoDescription:
      "Vikram's remarkable recovery journey from CRPS through spinal cord stimulation — a story of perseverance and advanced neuromodulation.",
    consentVerified: true,
    dateRecorded: "2025-08-10",
  },
];

export const educationalVideos: VideoItem[] = [
  {
    id: "video-spine-anatomy",
    title: "3D Spinal Anatomy Walkthrough",
    category: "animation",
    duration: "4:32",
    description:
      "Interactive 3D visualization of spinal anatomy — vertebrae, discs, nerves, and facet joints explained in detail.",
    tags: ["spine", "anatomy", "3d", "education"],
  },
  {
    id: "video-epidural",
    title: "How a Lumbar Epidural Works",
    category: "procedure",
    videoId: "dQw4w9WgXcQ",
    duration: "3:15",
    description:
      "Step-by-step animation of a lumbar epidural steroid injection — from needle placement to medication delivery.",
    tags: ["epidural", "procedure", "lumbar", "injection"],
    relatedCondition: "sciatica",
  },
  {
    id: "video-nerve-pain",
    title: "Understanding Nerve Pain Pathways",
    category: "education",
    duration: "5:48",
    description:
      "Visual explanation of nociceptive, neuropathic, and nociplastic pain pathways and how they affect the body.",
    tags: ["nerve", "pain", "pathway", "neuroscience"],
  },
  {
    id: "video-rfa-procedure",
    title: "Radiofrequency Ablation Explained",
    category: "procedure",
    videoId: "dQw4w9WgXcQ",
    duration: "6:10",
    description:
      "Complete walkthrough of the RFA procedure — diagnostic confirmation, safety testing, thermal neurotomy, and expected outcomes.",
    tags: ["rfa", "ablation", "procedure", "facet"],
    relatedCondition: "facet-joint-syndrome",
  },
  {
    id: "video-spinal-stenosis",
    title: "Living with Spinal Stenosis",
    category: "education",
    duration: "4:55",
    description:
      "Understanding spinal stenosis — causes, symptoms, and the stepwise treatment approach from conservative to interventional.",
    tags: ["stenosis", "spine", "education", "conservative"],
    relatedCondition: "lumbar-spinal-stenosis",
  },
  {
    id: "video-crp-overview",
    title: "What is CRPS? Patient Guide",
    category: "education",
    duration: "7:20",
    description:
      "A comprehensive patient-friendly guide to Complex Regional Pain Syndrome — diagnosis, mechanisms, and modern treatment options.",
    tags: ["crps", "chronic", "education", "neuromodulation"],
    relatedCondition: "crps",
  },
];

export function getTestimonialsByCondition(conditionSlug: string): PatientTestimonial[] {
  return testimonials.filter((t) => t.conditionSlug === conditionSlug);
}

export function getVideosByCategory(category: VideoItem["category"]): VideoItem[] {
  return educationalVideos.filter((v) => v.category === category);
}

export function searchTestimonials(query: string): PatientTestimonial[] {
  const q = query.toLowerCase();
  return testimonials.filter(
    (t) =>
      t.condition.toLowerCase().includes(q) ||
      t.procedure.toLowerCase().includes(q) ||
      t.quote.toLowerCase().includes(q) ||
      t.patientName.toLowerCase().includes(q)
  );
}

export function searchVideos(query: string): VideoItem[] {
  const q = query.toLowerCase();
  return educationalVideos.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.tags.some((tag) => tag.includes(q))
  );
}
