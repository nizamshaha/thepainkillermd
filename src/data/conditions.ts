import { Condition } from "@/lib/types";

export const conditions: Condition[] = [
  {
    id: "sciatica",
    name: "Sciatica",
    slug: "sciatica",
    category: "spine",
    overview:
      "Sciatica refers to pain that radiates along the path of the sciatic nerve, from the lower back through the hips and buttocks and down the leg. It typically affects one side of the body and is caused by compression of the sciatic nerve roots (L4-S3), most commonly from a lumbar disc herniation or foraminal stenosis.",
    symptoms: [
      "Radiating pain from lower back to foot, usually unilateral",
      "Shooting or electric shock-like pain along posterior leg",
      "Numbness or tingling in the L4-S1 dermatome",
      "Weakness in ankle dorsiflexion or plantar flexion",
      "Pain worsened by sitting, bending, or coughing",
      "Positive straight leg raise test (Lasègue sign)",
    ],
    causes: [
      "Lumbar disc herniation (most common, ~90% from L4-L5 or L5-S1)",
      "Lumbar spinal stenosis with foraminal narrowing",
      "Degenerative disc disease",
      "Spondylolisthesis",
      "Piriformis syndrome (rare)",
      "Spinal tumors or infections (rare)",
    ],
    diagnosis: [
      "Clinical examination with dermatomal testing",
      "Straight leg raise (SLR) test — sensitivity ~91%",
      "Lumbar MRI (gold standard for disc herniation)",
      "EMG/Nerve conduction studies for nerve damage assessment",
      "X-ray for bony pathology screening",
      "CT myelogram if MRI contraindicated",
    ],
    treatmentOptions: [
      "Conservative: Activity modification, physical therapy, McKenzie method",
      "Pharmacotherapy: NSAIDs, neuropathic agents, short-course oral corticosteroids",
      "Interventional: Epidural steroid injections (transforaminal preferred)",
      "Surgical: Microdiscectomy for refractory cases with progressive deficit",
    ],
    procedures: ["lumbar-epidural-injection", "transforaminal-epidural", "microdiscectomy"],
    medications: ["nsaid", "neuropathic", "muscle-relaxant"],
    redFlags: [
      "Cauda equina syndrome (saddle anesthesia, bladder/bowel dysfunction)",
      "Progressive motor weakness (foot drop)",
      "Bilateral symptoms",
      "Fever, unexplained weight loss, history of cancer",
    ],
    faq: [
      {
        question: "Does sciatica always require surgery?",
        answer: "No. Approximately 80-90% of sciatica cases improve with conservative management within 6-12 weeks. Surgery is typically considered only when conservative treatments fail after 6-8 weeks, or when there are progressive neurological deficits or cauda equina syndrome.",
      },
      {
        question: "How long does sciatica take to resolve?",
        answer: "Most acute sciatica episodes improve significantly within 4-6 weeks with appropriate conservative management. Complete resolution may take 6-12 weeks. Chronic sciatica lasting beyond 3 months may require more intensive interventional or multidisciplinary approaches.",
      },
      {
        question: "Can I exercise with sciatica?",
        answer: "Yes, appropriate exercise is a key component of sciatica recovery. Low-impact activities like walking, swimming, and specific core stabilization exercises are recommended. Avoid prolonged sitting and aggravating movements initially. A physiotherapist can provide a tailored program.",
      },
    ],
    relatedConditions: ["lumbar-spinal-stenosis", "facet-joint-syndrome", "sacroiliac-dysfunction"],
    relatedArticles: ["understanding-disc-herniation", "sciatica-rehabilitation-guide"],
    bodyRegions: ["back"],
    severity: "moderate",
  },
  {
    id: "lumbar-spinal-stenosis",
    name: "Lumbar Spinal Stenosis",
    slug: "lumbar-spinal-stenosis",
    category: "spine",
    overview:
      "Lumbar spinal stenosis (LSS) is a narrowing of the spinal canal, lateral recesses, or neural foramina in the lumbar spine that results in compression of neural structures. It is the most common reason for spinal surgery in adults over 65 and is typically caused by degenerative changes including disc bulging, facet joint hypertrophy, and ligamentum flavum thickening.",
    symptoms: [
      "Neurogenic claudication — bilateral leg heaviness, pain, or fatigue with walking",
      "Symptom relief with flexion (leaning forward on a shopping cart)",
      "Pain typically bilateral and non-dermatomal",
      "Lumbar radiculopathy if foraminal stenosis",
      "Worse with extension, better with rest",
      "Reduced walking tolerance over time",
    ],
    causes: [
      "Degenerative disc disease",
      "Facet joint hypertrophy",
      "Ligamentum flavum hypertrophy/buckling",
      "Spondylolisthesis (dynamic instability)",
      "Prior surgery (epidural fibrosis)",
      "Congenital (developmental) stenosis",
    ],
    diagnosis: [
      "Clinical presentation of neurogenic claudication",
      "Lumbar MRI — gold standard",
      "CT scan for bony anatomy detail",
      "CT myelogram for dynamic assessment",
      "X-ray with flexion/extension views for instability",
      "Quantitative CT morphometry for canal measurements",
    ],
    treatmentOptions: [
      "Conservative: Flexion-based exercises, weight management, activity modification",
      "Pharmacotherapy: NSAIDs, duloxetine for neuropathic component",
      "Interventional: Lumbar epidural steroid injections, MILD procedure",
      "Surgical: Laminectomy, laminotomy, or interspinous spacer placement",
    ],
    procedures: ["lumbar-epidural-injection", "mild-procedure", "laminectomy"],
    medications: ["nsaid", "neuropathic", "muscle-relaxant"],
    redFlags: [
      "Cauda equina syndrome",
      "Rapidly progressive neurological deficit",
      "Intractable pain unresponsive to all conservative measures",
    ],
    faq: [
      {
        question: "What is the difference between spinal stenosis and sciatica?",
        answer: "Spinal stenosis typically causes bilateral neurogenic claudication (leg heaviness with walking, relieved by sitting), while sciatica is usually unilateral radiating pain from a specific nerve root. They can overlap when stenosis compresses individual nerve roots.",
      },
      {
        question: "Is walking good for spinal stenosis?",
        answer: "Walking can be beneficial but may worsen symptoms. The key is to walk with a flexed posture (leaning forward) which opens the spinal canal. Use a walker or shopping cart if needed. Start with short distances and gradually increase as tolerated.",
      },
    ],
    relatedConditions: ["sciatica", "facet-joint-syndrome", "spondylolisthesis"],
    relatedArticles: ["living-with-spinal-stenosis", "conservative-management-options"],
    bodyRegions: ["back"],
    severity: "moderate",
  },
  {
    id: "cervical-radiculopathy",
    name: "Cervical Radiculopathy",
    slug: "cervical-radiculopathy",
    category: "spine",
    overview:
      "Cervical radiculopathy is pain, numbness, or weakness caused by compression or irritation of a cervical nerve root. It most commonly results from disc herniation or foraminal stenosis and typically affects the C6 or C7 nerve roots.",
    symptoms: [
      "Unilateral arm pain following a dermatomal pattern",
      "Neck pain radiating to shoulder, arm, or hand",
      "Numbness and tingling in specific finger distributions",
      "Weakness in muscles innervated by the affected root",
      "Symptoms worsened by neck extension and rotation",
      "Positive Spurling's test",
    ],
    causes: [
      "Cervical disc herniation",
      "Cervical foraminal stenosis",
      "Cervical spondylosis",
      "Disc osteophyte complex",
      "Rare: tumor, infection",
    ],
    diagnosis: [
      "Clinical examination with Spurling's test, distraction test",
      "Cervical MRI (gold standard)",
      "CT for bony detail",
      "EMG/Nerve conduction studies",
      "X-ray for screening",
    ],
    treatmentOptions: [
      "Conservative: Cervical collar (brief), physical therapy, activity modification",
      "Pharmacotherapy: NSAIDs, neuropathic agents, short-course oral steroids",
      "Interventional: Cervical epidural injections, medial branch blocks",
      "Surgical: Anterior cervical discectomy and fusion (ACDF) or cervical disc arthroplasty",
    ],
    procedures: ["cervical-epidural-injection", "medial-branch-block"],
    medications: ["nsaid", "neuropathic", "muscle-relaxant"],
    redFlags: [
      "Bilateral upper limb symptoms (myelopathy)",
      "Gait disturbance",
      "Lhermitte's sign",
      "Progressive motor deficit",
    ],
    faq: [
      {
        question: "How do I know if my arm pain is from my neck?",
        answer: "Arm pain originating from the neck typically follows a specific dermatomal pattern, is worsened by neck movements (especially extension and rotation), and may be accompanied by neck pain. Spurling's test (compression with extension and lateral bending) reproduces the arm pain. Imaging confirms nerve root compression.",
      },
    ],
    relatedConditions: ["sciatica", "thoracic-outlet-syndrome"],
    relatedArticles: ["cervical-spine-anatomy", "when-neck-pain-radiates"],
    bodyRegions: ["neck"],
    severity: "moderate",
  },
  {
    id: "facet-joint-syndrome",
    name: "Facet Joint Syndrome",
    slug: "facet-joint-syndrome",
    category: "spine",
    overview:
      "Facet joint syndrome (zygapophyseal joint syndrome) is pain arising from the facet joints of the spine due to degenerative changes, injury, or inflammation. It is a common cause of chronic spinal pain and is diagnosed clinically and confirmed with diagnostic medial branch blocks.",
    symptoms: [
      "Localized spinal pain, often aching or stiff",
      "Pain with extension and rotation",
      "Referred pain to buttocks, hips, or shoulders (not below the knee)",
      "Stiffness, especially in the morning",
      "Pain worsened by prolonged standing or extension",
      "No neurological deficit typically",
    ],
    causes: [
      "Degenerative joint disease (osteoarthritis)",
      "Trauma / whiplash injury",
      "Repetitive loading / occupational stress",
      "Post-surgical adjacent segment disease",
      "Inflammatory arthropathy",
    ],
    diagnosis: [
      "Clinical examination — pain with extension and rotation",
      "Diagnostic medial branch block (gold standard confirmation)",
      "X-ray, MRI for degenerative changes",
      "Bone scan or SPECT for active inflammation",
    ],
    treatmentOptions: [
      "Conservative: Physical therapy, core stabilization, posture education",
      "Pharmacotherapy: NSAIDs, topical analgesics",
      "Interventional: Medial branch blocks, radiofrequency ablation (RFA)",
      "Surgical: Facet fusion (rare, for instability)",
    ],
    procedures: ["medial-branch-block", "radiofrequency-ablation"],
    medications: ["nsaid", "topical", "muscle-relaxant"],
    redFlags: [
      "Progressive neurological deficit",
      "Unremitting pain not responding to any treatment",
      "Constitutional symptoms (fever, weight loss)",
    ],
    faq: [
      {
        question: "What is the difference between facet joint pain and disc pain?",
        answer: "Facet joint pain is typically worse with extension and rotation, and refers pain to buttocks, hips, or shoulders but not below the knee. Disc pain is usually worse with flexion and sitting, and can radiate below the knee when a nerve root is involved. Medial branch blocks distinguish facet from discogenic pain.",
      },
    ],
    relatedConditions: ["sciatica", "lumbar-spinal-stenosis"],
    relatedArticles: ["understanding-facet-joints", "radiofrequency-ablation-guide"],
    bodyRegions: ["back", "neck"],
    severity: "mild",
  },
  {
    id: "sacroiliac-dysfunction",
    name: "Sacroiliac Joint Dysfunction",
    slug: "sacroiliac-dysfunction",
    category: "spine",
    overview:
      "Sacroiliac (SI) joint dysfunction refers to pain originating from the sacroiliac joint complex, a common but often underdiagnosed cause of low back and buttock pain. The SI joint transmits forces between the spine and lower extremities and can become painful through inflammatory, degenerative, or traumatic mechanisms.",
    symptoms: [
      "Low back pain localized to the posterior superior iliac spine (PSIS)",
      "Pain in the buttock, lateral hip, or groin",
      "Pain with transitional movements (sit-to-stand, rolling in bed)",
      "Can mimic sciatica but pain rarely extends below the knee",
      "Stiffness in the morning",
      "Pain with prolonged standing",
    ],
    causes: [
      "Hypermobility or hypomobility",
      "Degenerative arthropathy",
      "Post-surgical (post-laminectomy)",
      "Post-partum instability",
      "Trauma (fall on buttocks)",
      "Leg length discrepancy",
    ],
    diagnosis: [
      "Clinical provocation tests (cluster of ≥3/5 positive tests): Gaenslen's, FABER, compression, distraction, thigh thrust",
      "Diagnostic SI joint injection (gold standard)",
      "X-ray, MRI for structural pathology",
      "Bone scan for sacroiliitis",
    ],
    treatmentOptions: [
      "Conservative: Pelvic belt, SI-specific exercises, manual therapy",
      "Pharmacotherapy: NSAIDs",
      "Interventional: Intra-articular SI joint injections, lateral branch radiofrequency ablation",
      "Surgical: SI joint fusion (for refractory cases)",
    ],
    procedures: ["si-joint-injection", "lateral-branch-rfa"],
    medications: ["nsaid", "muscle-relaxant"],
    redFlags: [
      "Fever, night sweats, weight loss (infection/malignancy)",
      "History of IV drug use (septic SI joint)",
      "Bilateral sacroiliitis (inflammatory spondyloarthropathy)",
    ],
    faq: [
      {
        question: "How do I know if my pain is from the SI joint?",
        answer: "SI joint pain is typically felt at the PSIS and may radiate to the buttock, lateral hip, or groin. Provocation tests that reproduce your pain (Gaenslen's, FABER, compression, etc.) suggest SI joint involvement. Definitive diagnosis requires a diagnostic injection that eliminates the pain.",
      },
    ],
    relatedConditions: ["sciatica", "facet-joint-syndrome"],
    relatedArticles: ["si-joint-anatomy", "managing-chronic-low-back-pain"],
    bodyRegions: ["back", "hip"],
    severity: "moderate",
  },
  {
    id: "crps",
    name: "Complex Regional Pain Syndrome",
    slug: "complex-regional-pain-syndrome",
    category: "chronic",
    overview:
      "Complex Regional Pain Syndrome (CRPS) is a form of chronic pain that usually affects an arm or leg and typically develops after an injury, surgery, stroke, or heart attack. The pain is out of proportion to the severity of the initial injury and is characterized by autonomic, sensory, and motor dysfunction.",
    symptoms: [
      "Severe burning pain disproportionate to the inciting event",
      "Allodynia (pain from light touch)",
      "Edema and swelling of the affected limb",
      "Skin color and temperature changes",
      "Sudomotor changes (sweating abnormalities)",
      "Motor dysfunction (weakness, tremor, dystonia)",
      "Skin and nail changes",
    ],
    causes: [
      "Post-traumatic (fracture, sprain, surgery)",
      "Post-surgical",
      "Post-stroke (central CRPS)",
      "Idiopathic (no identifiable trigger)",
      "Immobilization after injury",
    ],
    diagnosis: [
      "Budapest Clinical Criteria (2003, revised 2010)",
      "Triple-phase bone scintigraphy (sensitivity 65-96%)",
      "Thermography",
      "Quantitative sensory testing",
      "Sudomotor testing",
      "X-ray for osteopenia",
    ],
    treatmentOptions: [
      "Early aggressive physical therapy and graded motor imagery",
      "Pharmacotherapy: Neuropathic agents (gabapentin, duloxetine), bisphosphonates",
      "Interventional: Sympathetic nerve blocks, IVIG, spinal cord stimulation",
      "Psychological support and pain neuroscience education",
    ],
    procedures: ["spinal-cord-stimulation", "sympathetic-nerve-block"],
    medications: ["neuropathic", "nsaid", "adjunct"],
    redFlags: [
      "Rapidly progressive tissue changes",
      "Skin ulceration or necrosis",
      "Severe unrelenting pain unresponsive to all treatments",
    ],
    faq: [
      {
        question: "Is CRPS curable?",
        answer: "CRPS is not definitively curable, but early diagnosis and aggressive treatment can lead to significant improvement or remission. The earlier treatment begins, the better the outcomes. Many patients experience improvement with a multidisciplinary approach.",
      },
      {
        question: "What makes CRPS different from other pain conditions?",
        answer: "CRPS is characterized by pain that is disproportionate to the initial injury, combined with autonomic dysfunction (color changes, temperature changes, swelling), sensory changes (allodynia, hyperalgesia), and motor dysfunction. It affects the entire limb and involves both peripheral and central nervous system changes.",
      },
    ],
    relatedConditions: ["peripheral-neuropathy", "fibromyalgia"],
    relatedArticles: ["understanding-crps", "early-intervention-in-crps"],
    bodyRegions: ["arm", "hand", "leg", "foot"],
    severity: "severe",
  },
  {
    id: "trigeminal-neuralgia",
    name: "Trigeminal Neuralgia",
    slug: "trigeminal-neuralgia",
    category: "head",
    overview:
      "Trigeminal neuralgia (TN) is a chronic pain condition affecting the trigeminal nerve (cranial nerve V), which carries sensation from the face to the brain. It causes sudden, severe, brief, stabbing, recurrent episodes of facial pain, typically in the distribution of one or more branches of the trigeminal nerve.",
    symptoms: [
      "Sudden, severe, electric shock-like facial pain",
      "Episodes lasting seconds to minutes",
      "Pain in V2 (maxillary) or V3 (mandibular) distribution",
      "Triggered by light touch, chewing, talking, brushing teeth",
      "Pain-free intervals between episodes",
      "Progressive increase in frequency over time",
    ],
    causes: [
      "Vascular compression of the trigeminal nerve root (most common)",
      "Demyelination (multiple sclerosis-associated)",
      "Brain tumors or cysts (rare)",
      "Herpes zoster (post-herpetic neuralgia variant)",
      "Idiopathic",
    ],
    diagnosis: [
      "Clinical history — classic description of TN pain",
      "MRI with thin cuts and CISS/FIESTA sequences (neurovascular compression)",
      "Brain MRI to rule out MS or tumor",
      "Diagnostic response to carbamazepine",
      "Neurological examination (usually normal between episodes)",
    ],
    treatmentOptions: [
      "Pharmacotherapy: Carbamazepine (first-line), oxcarbazepine, baclofen",
      "Interventional: Percutaneous procedures (rhizotomy, balloon compression, glycerol injection)",
      "Surgical: Microvascular decompression (MVD) — curative potential",
      "Radiosurgery (Gamma Knife) for inoperable cases",
    ],
    procedures: ["microvascular-decompression", "percutaneous-rhizotomy"],
    medications: ["neuropathic", "adjunct"],
    redFlags: [
      "Atypical pain features (constant, burning)",
      "Sensory deficit on examination",
      "Progressive course without treatment-free intervals",
      "Bilateral symptoms",
    ],
    faq: [
      {
        question: "What triggers trigeminal neuralgia pain?",
        answer: "Common triggers include light touch to the face, chewing, talking, brushing teeth, wind on the face, and even smiling. These are called 'trigger zones' and vary between patients. Avoiding triggers can reduce episode frequency, though it's not always possible.",
      },
    ],
    relatedConditions: ["cervical-radiculopathy"],
    relatedArticles: ["trigeminal-nerve-anatomy", "managing-facial-pain"],
    bodyRegions: ["head"],
    severity: "severe",
  },
  {
    id: "knee-osteoarthritis",
    name: "Knee Osteoarthritis",
    slug: "knee-osteoarthritis",
    category: "joint",
    overview:
      "Knee osteoarthritis (OA) is the most common joint disorder worldwide and the leading cause of disability in older adults. It involves progressive loss of articular cartilage, subchondral bone remodeling, synovial inflammation, and osteophyte formation in the knee joint.",
    symptoms: [
      "Gradual onset of knee pain, worse with activity",
      "Morning stiffness lasting <30 minutes",
      "Crepitus with movement",
      "Joint swelling and effusion",
      "Reduced range of motion",
      "Varus/valgus deformity in advanced disease",
      "Loss of function and difficulty with stairs",
    ],
    causes: [
      "Age-related cartilage degeneration",
      "Obesity (increased mechanical loading)",
      "Prior knee injury (ACL, meniscal tears)",
      "Genetic predisposition",
      "Occupational repetitive loading",
      "Malalignment",
    ],
    diagnosis: [
      "Clinical examination — joint line tenderness, crepitus, reduced ROM",
      "Weight-bearing X-ray (AP, lateral, sunrise views)",
      "Kellgren-Lawrence grading system",
      "MRI for early or equivocal cases",
      "Joint aspiration if effusion present",
    ],
    treatmentOptions: [
      "Conservative: Weight management, exercise therapy (quadriceps strengthening), knee orthoses",
      "Pharmacotherapy: Topical NSAIDs, oral NSAIDs, duloxetine, intra-articular corticosteroids or hyaluronic acid",
      "Interventional: Genicular nerve radiofrequency ablation",
      "Surgical: Total knee arthroplasty (end-stage)",
    ],
    procedures: ["genicular-nerve-rfa", "knee-injection"],
    medications: ["nsaid", "topical", "adjunct"],
    redFlags: [
      "Hot, swollen joint with fever (septic arthritis)",
      "Unexplained weight loss",
      "Night pain at rest",
      "Rapid joint destruction",
    ],
    faq: [
      {
        question: "Will knee osteoarthritis require surgery?",
        answer: "Not necessarily. Many patients manage OA successfully with conservative measures including exercise, weight management, and medications. Total knee arthroplasty is reserved for severe cases that significantly impact quality of life despite appropriate non-surgical management.",
      },
      {
        question: "Is running bad for knee osteoarthritis?",
        answer: "Moderate running on flat surfaces with appropriate footwear is generally not harmful and may even be beneficial for joint health in early OA. However, high-impact activities on hard surfaces or with poor mechanics may accelerate cartilage loss. Listen to your body and consult your clinician.",
      },
    ],
    relatedConditions: ["facet-joint-syndrome"],
    relatedArticles: ["knee-anatomy", "exercise-for-knee-arthritis"],
    bodyRegions: ["knee"],
    severity: "moderate",
  },
];

export function getConditionBySlug(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}

export function getConditionsByCategory(category: Condition["category"]): Condition[] {
  return conditions.filter((c) => c.category === category);
}

export function searchConditions(query: string): Condition[] {
  const q = query.toLowerCase();
  return conditions.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.overview.toLowerCase().includes(q) ||
      c.symptoms.some((s) => s.toLowerCase().includes(q))
  );
}
