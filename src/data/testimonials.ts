import { PatientTestimonial, VideoItem } from "@/lib/types";

export const YOUTUBE_TESTIMONIALS_PLAYLIST_URL =
  "https://www.youtube.com/playlist?list=PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2";

export const testimonials: PatientTestimonial[] = [
  {
    id: "testimonial-upper-back-1",
    patientName: "Ramesh P.",
    condition: "Upper Back Pain (Myofascial Pain Syndrome)",
    conditionSlug: "upper-back-pain",
    procedure: "Trigger Point (TP) Injection & Physiotherapy",
    procedureSlug: "trigger-point-injection",
    videoId: "nAX0iicEOGo",
    playlistId: "PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    youtubeUrl: "https://www.youtube.com/watch?v=nAX0iicEOGo&list=PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    thumbnailUrl: "https://i.ytimg.com/vi/nAX0iicEOGo/hqdefault.jpg",
    duration: "0:41",
    patientAge: 48,
    patientLocation: "Unity Hospital, Surat",
    quote:
      "I was suffering from chronic upper back pain for 8 years and spent a lot trying different treatments without relief. Dr. Shahnawaz Shah accurately diagnosed it and performed a simple OPD trigger point injection with physiotherapy. My pain is completely gone and my lifestyle has changed completely!",
    recoverySummary:
      "48-year-old male with an 8-year history of debilitating chronic upper back pain refractory to previous treatments and medications. Thorough clinical examination by Dr. Shahnawaz Shah identified myofascial trigger points. A simple, precise Trigger Point (TP) Injection was performed on an outpatient (OPD) basis along with customized physiotherapy. On follow-up, the patient reported complete pain relief with dramatically enhanced mobility and quality of life.",
    recoveryMilestones: [
      "Clinical Diagnosis: Accurate pinpointing of chronic myofascial trigger points",
      "OPD Procedure: Targeted trigger point injection performed in daycare without admission",
      "Day 3: Rapid resolution of deep muscular spasms and knot tightness",
      "Follow-Up: 100% relief from 8-year pain; joyful return to pain-free daily activities",
    ],
    videoDescription:
      "Patient shares his joy and relief after Dr. Shahnawaz Shah relieved his 8-year chronic upper back pain with a simple OPD trigger point injection and physiotherapy at Unity Hospital, Surat.",
    consentVerified: true,
    dateRecorded: "2025-06-15",
  },
  {
    id: "testimonial-sciatica-1",
    patientName: "Rajesh M.",
    condition: "Sciatica & Lumbar Herniated Disc",
    conditionSlug: "sciatica",
    procedure: "Lumbar Epidural Steroid Injection",
    procedureSlug: "lumbar-epidural-injection",
    videoId: "UM0jLQAkzBE",
    playlistId: "PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    youtubeUrl: "https://www.youtube.com/watch?v=UM0jLQAkzBE&list=PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    thumbnailUrl: "https://i.ytimg.com/vi/UM0jLQAkzBE/hqdefault.jpg",
    duration: "1:26",
    patientAge: 52,
    patientLocation: "Surat, Gujarat",
    quote:
      "Severe disc herniation sent unbearable shooting pain down my leg. I was terrified of open spine surgery. Dr. Shah treated it with just a targeted injection — no cuts, no hospital stay, and the pain vanished.",
    recoverySummary:
      "52-year-old male with severe right-sided sciatica secondary to L4-L5 lumbar disc herniation. Presented with sharp radiating leg pain. Underwent fluoroscopy-guided precision epidural injection. Achieved swift, sustained pain elimination without open surgery.",
    recoveryMilestones: [
      "Day 1: Immediate reduction in radiating nerve pain following injection",
      "Week 1: Normal pain-free walking resumed without support",
      "Week 4: Returned to full work responsibilities",
      "Month 3: Full rehabilitation with zero surgical intervention",
    ],
    videoDescription:
      "Patient shares his recovery from debilitating lumbar disc herniation and leg pain treated non-surgically with a targeted injection by Dr. Shahnawaz Shah.",
    consentVerified: true,
    dateRecorded: "2025-11-15",
  },
  {
    id: "testimonial-cervical-1",
    patientName: "Amit S.",
    condition: "Cervical Disc Herniation & Radiculopathy",
    conditionSlug: "cervical-radiculopathy",
    procedure: "Cervical Targeted Injection",
    procedureSlug: "lumbar-epidural-injection",
    videoId: "tV7xM0j1QXY",
    playlistId: "PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    youtubeUrl: "https://www.youtube.com/watch?v=tV7xM0j1QXY&list=PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    thumbnailUrl: "https://i.ytimg.com/vi/tV7xM0j1QXY/hqdefault.jpg",
    duration: "3:08",
    patientAge: 38,
    patientLocation: "Surat, Gujarat",
    quote:
      "I was advised spine surgery for neck disc herniation causing severe radiating pain and weakness in my arm. Dr. Shah resolved it completely with an advanced OPD injection without any incision or admission.",
    recoverySummary:
      "38-year-old male with severe C5-C6 cervical disc herniation causing intense brachialgia, numbness, and arm weakness. Feared invasive surgery. Responded remarkably to image-guided cervical targeted injection, restoring full upper limb function.",
    recoveryMilestones: [
      "Day 1: Significant drop in acute arm shooting pain",
      "Week 1: Tingling and hand numbness resolved",
      "Month 1: Full arm strength restored (5/5)",
      "Month 3: Continued pain-free status with ergonomic rehabilitation",
    ],
    videoDescription:
      "Patient discusses non-surgical relief from cervical disc prolapse and radiating arm pain through precision injection therapy.",
    consentVerified: true,
    dateRecorded: "2025-12-03",
  },
  {
    id: "testimonial-coccydynia-1",
    patientName: "Kavita R.",
    condition: "Coccydynia (Tailbone Pain)",
    conditionSlug: "sacroiliac-dysfunction",
    procedure: "Ganglion Impar & Periarticular Block",
    procedureSlug: "ganglion-impar-block",
    videoId: "hDZI9aVj6C4",
    playlistId: "PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    youtubeUrl: "https://www.youtube.com/watch?v=hDZI9aVj6C4&list=PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    thumbnailUrl: "https://i.ytimg.com/vi/hDZI9aVj6C4/hqdefault.jpg",
    duration: "1:59",
    patientAge: 42,
    patientLocation: "Surat, Gujarat",
    quote:
      "Referred by a spine surgeon after traumatic injury, I was unable to sit for more than 2-3 minutes. After Dr. Shah's Ganglion Impar block, the agony is gone and I can sit comfortably through entire workdays.",
    recoverySummary:
      "42-year-old female presenting with severe post-traumatic coccydynia (tailbone pain). Inability to sit beyond 2-3 minutes severely incapacitated daily function. Following evaluation, underwent image-guided Ganglion Impar and intercoccygeal periarticular block with immediate dramatic relief.",
    recoveryMilestones: [
      "Diagnostic & Therapeutic Block: Precision Ganglion Impar injection performed",
      "Immediate: Over 80% relief in sitting pain on test sit",
      "Week 2: Able to sit normally without specialized cushions",
      "Month 3: Full restoration of sitting tolerance and sedentary work",
    ],
    videoDescription:
      "Patient shares her journey of overcoming debilitating coccydynia (tailbone pain) with Ganglion Impar interventional block.",
    consentVerified: true,
    dateRecorded: "2025-07-20",
  },
  {
    id: "testimonial-crps-1",
    patientName: "Vikram P.",
    condition: "Complex Regional Pain Syndrome (CRPS)",
    conditionSlug: "complex-regional-pain-syndrome",
    procedure: "Sympathetic Block & Neuromodulation",
    procedureSlug: "spinal-cord-stimulation",
    videoId: "9al1fCQdQw4",
    playlistId: "PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    youtubeUrl: "https://www.youtube.com/watch?v=9al1fCQdQw4&list=PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    thumbnailUrl: "https://i.ytimg.com/vi/9al1fCQdQw4/hqdefault.jpg",
    duration: "0:56",
    patientAge: 34,
    patientLocation: "Gujarat, India",
    quote:
      "No more pain, all smiles! The unbearable burning pain and hypersensitivity from CRPS felt like a nightmare. Dr. Shah's specialized interventions gave me my hand and my smile back.",
    recoverySummary:
      "34-year-old patient suffering from CRPS with severe autonomic changes, allodynia, and unbearable burning pain. Treated with interventional sympathetic blockade and modern multimodal pain therapies with complete functional restoration.",
    recoveryMilestones: [
      "Pre-treatment: Severe burning pain, allodynia, inability to touch limb",
      "Procedure: Targeted sympathetic blockade administered",
      "Week 1: Burning sensation subsided significantly",
      "Month 2: Full functional limb mobility restored with normal skin temperature",
    ],
    videoDescription:
      "Testimonial of rapid relief from Complex Regional Pain Syndrome (CRPS) — 'No more pain, all smiles!' with Dr. Shahnawaz Shah.",
    consentVerified: true,
    dateRecorded: "2025-08-10",
  },
  {
    id: "testimonial-midback-1",
    patientName: "Dinesh K.",
    condition: "Chronic Midback Pain",
    conditionSlug: "facet-joint-syndrome",
    procedure: "OPD Precision Injection & Rehabilitation",
    procedureSlug: "trigger-point-injection",
    videoId: "QgqIymRxQxQ",
    playlistId: "PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    youtubeUrl: "https://www.youtube.com/watch?v=QgqIymRxQxQ&list=PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    thumbnailUrl: "https://i.ytimg.com/vi/QgqIymRxQxQ/hqdefault.jpg",
    duration: "1:05",
    patientAge: 46,
    patientLocation: "Surat, Gujarat",
    quote:
      "I had been suffering from midback pain for years, spending large sums without improvement. Dr. Shah identified the true pain source and treated it on an OPD basis with simple injection and rehab. Instant relief!",
    recoverySummary:
      "46-year-old male with persistent midback pain of several years' duration. Failed conservative approaches. Underwent comprehensive physical examination, targeted OPD intervention, and customized spinal rehabilitation.",
    recoveryMilestones: [
      "Clinical Evaluation: Accurate differential diagnosis of thoracic myofascial/facet pain",
      "Procedure: Outpatient targeted injection performed",
      "Week 1: Substantial reduction in thoracic stiffness and focal tenderness",
      "Month 1: Sustained functional relief and return to pain-free work",
    ],
    videoDescription:
      "Patient shares his gratitude for lasting relief from long-standing midback pain through simple diagnosis and outpatient treatment by Dr. Shahnawaz Shah.",
    consentVerified: true,
    dateRecorded: "2025-05-12",
  },
  {
    id: "testimonial-neck-mipsi-1",
    patientName: "Meenaben S.",
    condition: "12-Year Chronic Neck Pain (C1-C2 Arthrosis)",
    conditionSlug: "cervical-radiculopathy",
    procedure: "MIPSI (Minimally Invasive Pain & Spine Intervention)",
    procedureSlug: "radiofrequency-ablation",
    videoId: "nEIceZoEK9s",
    playlistId: "PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    youtubeUrl: "https://www.youtube.com/watch?v=nEIceZoEK9s&list=PLPQPxKNL6JnqEdYcwv9aKD2kWwtuAcCQ2",
    thumbnailUrl: "https://i.ytimg.com/vi/nEIceZoEK9s/hqdefault.jpg",
    duration: "1:54",
    patientAge: 58,
    patientLocation: "Surat, Gujarat",
    quote:
      "After enduring 12 long years of debilitating neck pain from C1-C2 osteoarthritis, MIPSI by Dr. Shah finally gave me lasting relief. I am now pain-free and moving freely with joy and gratitude.",
    recoverySummary:
      "58-year-old female with a 12-year history of severe high cervical neck pain due to C1-C2 arthrosis. Multiple previous treatments had failed. Dr. Shahnawaz Shah performed a Minimally Invasive Pain and Spine Intervention (MIPSI), producing transformative pain freedom.",
    recoveryMilestones: [
      "Pre-treatment: 12 years of severe chronic neck pain limiting head turning",
      "Procedure: Advanced MIPSI intervention performed under image guidance",
      "Week 1: Dramatic alleviation of upper cervical pain",
      "Month 3: Full cervical mobility regained, completely off chronic painkillers",
    ],
    videoDescription:
      "Grateful patient shares her remarkable relief from 12 years of severe neck pain through Minimally Invasive Pain and Spine Intervention (MIPSI).",
    consentVerified: true,
    dateRecorded: "2025-04-18",
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
