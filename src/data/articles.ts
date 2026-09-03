export interface Article {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  seo: { title: string; description: string; keywords: string };
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const articles: Article[] = [
  {
    slug: "understanding-disc-herniation-and-nerve-pain",
    title: "Understanding Disc Herniation and Nerve Pain",
    category: "Spine",
    readTime: "8 min",
    excerpt: "How disc material compresses nerve roots and the inflammatory cascade that follows.",
    seo: {
      title: "Understanding Disc Herniation and Nerve Pain — THE PAINKILLER MD",
      description: "A patient-friendly guide to how disc herniation causes nerve pain, the inflammatory cascade, and available treatment approaches.",
      keywords: "disc herniation, nerve pain, radiculopathy, sciatica, spinal disc, treatment",
    },
    content: `
## What Is a Disc Herniation?

A disc herniation occurs when the soft inner material of a spinal disc (nucleus pulposus) pushes through a tear in the outer ring (annulus fibrosus). This protruding material can press on nearby nerve roots, causing pain, numbness, or weakness.

The lumbar spine (lower back) is most commonly affected, with approximately 90% of herniations occurring at the L4-L5 or L5-S1 levels.

## How Does It Cause Pain?

Disc herniation causes pain through two primary mechanisms:

### Mechanical Compression

The herniated disc material physically presses against a nerve root. This compression disrupts normal nerve function and triggers pain signals along the nerve's distribution pathway (dermatome).

### Chemical Inflammation

When disc material escapes, it releases inflammatory mediators including:

- **TNF-α** (Tumor Necrosis Factor-alpha)
- **IL-1β** (Interleukin-1 beta)
- **PGE₂** (Prostaglandin E2)
- **NGF** (Nerve Growth Factor)

These chemicals irritate the nerve root, causing "chemical radiculitis" — inflammation of the nerve without direct compression.

## Common Symptoms

- Radiating pain from the back into the leg (sciatica)
- Shooting or electric shock-like pain
- Numbness or tingling in specific areas of the leg or foot
- Weakness in muscles controlled by the affected nerve
- Pain worsened by sitting, bending, or coughing

## Diagnosis

Accurate diagnosis typically involves:
- Clinical examination including straight leg raise test
- MRI of the spine (gold standard)
- EMG/Nerve conduction studies when needed
- X-ray for screening bony abnormalities

## Treatment Approaches

### Conservative Management

- Activity modification and relative rest
- Physical therapy (McKenzie method, core stabilization)
- Pain neuroscience education

### Medication

- NSAIDs for inflammation
- Neuropathic agents (gabapentin, pregabalin)
- Short-course oral corticosteroids

### Interventional Procedures

- Epidural steroid injections (transforaminal or interlaminar)
- Nerve root blocks
- Selective nerve root injections

### Surgical Options

- Microdiscectomy for refractory cases with progressive deficit
- Endoscopic discectomy

## When to See a Doctor

Seek medical evaluation if you experience:
- Progressive weakness in a leg or foot
- Loss of bladder or bowel control (emergency)
- Severe pain not responding to conservative measures
- Numbness in the saddle area

`,
    faq: [
      {
        question: "Does a disc herniation always require surgery?",
        answer: "No. The majority of disc herniations improve with conservative treatment over 6–12 weeks. Surgery is considered only when symptoms persist despite adequate conservative care, or when there is progressive neurological deficit.",
      },
      {
        question: "Can a herniated disc heal on its own?",
        answer: "Yes. Research shows that herniated disc material can be reabsorbed by the body over time. Many patients experience significant improvement within 6–12 weeks with appropriate conservative management.",
      },
      {
        question: "What is the difference between a disc bulge and a disc herniation?",
        answer: "A disc bulge involves the disc extending beyond its normal boundary without a tear, while a herniation involves the inner material (nucleus pulposus) actually protruding through a tear in the outer ring (annulus fibrosus). Herniations are more likely to cause nerve-related symptoms.",
      },
    ],
    relatedSlugs: ["lumbar-spinal-stenosis", "sciatica"],
  },
  {
    slug: "the-neuroscience-of-chronic-pain",
    title: "The Neuroscience of Chronic Pain",
    category: "Chronic Pain",
    readTime: "12 min",
    excerpt: "Central sensitization, neuroplasticity, and why chronic pain becomes a disease of its own.",
    seo: {
      title: "The Neuroscience of Chronic Pain — THE PAINKILLER MD",
      description: "Understanding central sensitization, neuroplasticity, and the neurobiological mechanisms that make chronic pain a disease of its own.",
      keywords: "chronic pain, central sensitization, neuroplasticity, pain neuroscience, chronic pain management",
    },
    content: `
## Pain Is More Than Tissue Damage

While acute pain serves as a protective alarm system, chronic pain (lasting more than 3–6 months) involves fundamental changes in the nervous system. Understanding these changes is essential for effective treatment.

## Central Sensitization

Central sensitization is a state in which the central nervous system (brain and spinal cord) becomes hypersensitive to input. This means:

- **Lower pain thresholds** — stimuli that normally wouldn't cause pain now do
- **Wider pain areas** — pain spreads beyond the original injury site
- **Increased pain intensity** — pain feels stronger than the tissue damage would suggest

This is why chronic pain patients often experience pain disproportionate to any visible injury on imaging.

## Neuroplasticity and Pain

The nervous system is plastic — it changes based on experience. With chronic pain:

- **Pain pathways become reinforced** — repeated pain signals strengthen neural connections
- **New pain pathways develop** — the brain creates novel pain circuits
- **Normal input becomes painful** — non-painful stimuli are interpreted as pain (allodynia)

## The Biopsychosocial Model

Modern pain science recognizes that pain involves:
- **Biological factors** — tissue damage, nerve sensitization, inflammation
- **Psychological factors** — fear-avoidance beliefs, catastrophizing, mood
- **Social factors** — work stress, social support, cultural influences

All three dimensions influence the pain experience and must be addressed in treatment.

## Graded Exposure and Pain Retraining

Effective chronic pain treatment often includes:
- Pain neuroscience education (understanding how pain works)
- Graded activity (gradually increasing activity levels)
- Cognitive functional therapy (changing pain-related thoughts and behaviors)
- Mindfulness and relaxation techniques

## When to Seek Help

If pain has persisted for more than 3 months and is affecting your daily life, a comprehensive pain assessment can help identify the underlying mechanisms and guide appropriate treatment.

`,
    faq: [
      {
        question: "Is chronic pain real if there's nothing wrong on my MRI?",
        answer: "Absolutely. Chronic pain is real and involves measurable changes in the nervous system. An MRI shows structural anatomy but cannot capture nerve sensitization, central sensitization, or the complex neurobiological changes that sustain chronic pain.",
      },
      {
        question: "Can chronic pain be cured?",
        answer: "While 'cure' may not always be the right word, chronic pain can be significantly managed and reduced. Many patients achieve substantial improvement through a combination of education, therapy, medication, and interventional procedures.",
      },
      {
        question: "Why does my pain spread to different areas?",
        answer: "Central sensitization causes the nervous system to amplify and spread pain signals. This is a well-documented neurobiological phenomenon, not something 'in your head.' It reflects real changes in how the nervous system processes pain.",
      },
    ],
    relatedSlugs: ["sciatica", "facet-joint-syndrome"],
  },
  {
    slug: "radiofrequency-ablation-what-to-expect",
    title: "Radiofrequency Ablation: What to Expect",
    category: "Procedures",
    readTime: "6 min",
    excerpt: "A step-by-step guide to the RFA procedure from preparation to recovery.",
    seo: {
      title: "Radiofrequency Ablation: What to Expect — THE PAINKILLER MD",
      description: "A complete patient guide to radiofrequency ablation — preparation, procedure steps, recovery, and expected outcomes for facet joint and nerve-mediated pain.",
      keywords: "radiofrequency ablation, RFA, facet joint pain, procedure guide, nerve ablation, pain treatment",
    },
    content: `
## What Is Radiofrequency Ablation?

Radiofrequency ablation (RFA) is a minimally invasive procedure that uses heat generated by radiofrequency energy to disrupt pain signals from specific nerves. It is commonly used for facet joint pain, sacroiliac joint pain, and certain other nerve-mediated pain conditions.

## Before the Procedure

### Preparation
- Stop blood-thinning medications as directed by your doctor
- Arrange for someone to drive you home
- Fast for a specified period before the procedure
- Inform the team about any allergies or medications

### Diagnostic Confirmation
RFA is typically performed only after a successful diagnostic medial branch block confirms that the targeted nerve is the source of your pain. This two-step approach ensures accuracy.

## During the Procedure

1. **Positioning** — You lie face-down on a specialized table
2. **Skin preparation** — The area is cleaned and numbed with local anaesthetic
3. **Needle placement** — Under X-ray guidance (fluoroscopy), a thin needle is positioned near the target nerve
4. **Sensory test** — A small electrical stimulus confirms correct placement
5. **Motor test** — Ensures the motor nerve is not at risk
6. **Ablation** — Radiofrequency energy is applied for 60–90 seconds, heating the nerve tip to approximately 80°C
7. **Repeat** — Multiple nerves may be treated in the same session

## After the Procedure

### Immediate Recovery
- Rest for 30–60 minutes before going home
- Mild soreness at the injection site is normal
- Apply ice packs for 15 minutes at a time

### First Few Days
- Take it easy for 24–48 hours
- Gradually return to normal activities
- Mild increased pain is common as the local anaesthetic wears off

### Weeks 2–6
- Pain relief typically begins around 2–3 weeks
- Maximum benefit is usually reached by 6 weeks
- Continue with rehabilitation exercises as prescribed

## Expected Outcomes

- 60–80% of patients experience significant pain relief
- Pain relief typically lasts 6–18 months
- The procedure can be repeated if needed
- RFA works best as part of a comprehensive treatment plan including exercise and education

## Risks and Side Effects

RFA is generally safe, but like all procedures, it carries some risks:
- Temporary increased pain at the site
- Bruising or minor bleeding
- Rare: infection, nerve damage, or allergic reaction to local anaesthetic

`,
    faq: [
      {
        question: "How long does the RFA procedure take?",
        answer: "The procedure itself typically takes 30–60 minutes, depending on how many nerves are being treated. You should plan for 2–3 hours total including preparation and recovery time.",
      },
      {
        question: "Is the procedure painful?",
        answer: "Most patients experience minimal discomfort. The skin is numbed with local anaesthetic, so you may feel pressure but should not feel significant pain during the procedure.",
      },
      {
        question: "When can I return to work?",
        answer: "Most patients can return to desk work within 1–2 days and physical activities within 1 week. Your doctor will provide specific guidance based on your occupation and the extent of the procedure.",
      },
    ],
    relatedSlugs: ["facet-joint-syndrome", "lumbar-spinal-stenosis"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
