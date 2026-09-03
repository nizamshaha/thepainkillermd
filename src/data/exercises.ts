/**
 * Exercise library — YouTube video embeds for each condition/area.
 * Videos are educational; curated from reputable medical channels.
 */

export interface Exercise {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  area: string[]; // pain area IDs
  conditions: string[]; // condition slugs
  precautions?: string;
}

export const exercises: Exercise[] = [
  // ─── LOW BACK PAIN ──────────────────────────
  {
    id: "cat-cow",
    title: "Cat-Cow Stretch",
    description: "Gentle spinal mobilization that improves flexibility and reduces low back stiffness. Perform slowly with controlled breathing.",
    youtubeId: "kqnua4rHVVA",
    duration: "3 min",
    difficulty: "beginner",
    area: ["low-back-pain", "midback-pain"],
    conditions: ["sciatica", "lumbar-spinal-stenosis", "facet-joint-syndrome"],
    precautions: "Avoid if you have acute disc herniation with severe pain.",
  },
  {
    id: "bird-dog",
    title: "Bird-Dog Exercise",
    description: "Core stabilization exercise that strengthens the deep stabilizing muscles of the spine. Essential for chronic low back pain management.",
    youtubeId: "wiFNA3sqjCA",
    duration: "4 min",
    difficulty: "beginner",
    area: ["low-back-pain"],
    conditions: ["sciatica", "lumbar-spinal-stenosis"],
    precautions: "Keep the trunk stable — avoid arching the back.",
  },
  {
    id: "pelvic-tilt",
    title: "Pelvic Tilts",
    description: "Activates deep core muscles and gently mobilizes the lumbar spine. Excellent starting exercise for low back pain.",
    youtubeId: "PhqsMz2M7_Q",
    duration: "2 min",
    difficulty: "beginner",
    area: ["low-back-pain"],
    conditions: ["sciatica", "lumbar-spinal-stenosis", "facet-joint-syndrome"],
  },
  {
    id: "child-pose",
    title: "Child's Pose (Modified)",
    description: "Gentle stretch for the low back muscles. Provides relief from compression and promotes relaxation of paraspinal muscles.",
    youtubeId: "2MJGn-cyVJk",
    duration: "2 min",
    difficulty: "beginner",
    area: ["low-back-pain"],
    conditions: ["sciatica", "lumbar-spinal-stenosis"],
    precautions: "Use a pillow under the knees if needed for comfort.",
  },
  {
    id: "knee-to-chest",
    title: "Knee-to-Chest Stretch",
    description: "Stretches the low back and gluteal muscles. Helps relieve tension and improve range of motion.",
    youtubeId: "aOTmqUAVLkI",
    duration: "2 min",
    difficulty: "beginner",
    area: ["low-back-pain", "buttock-pain"],
    conditions: ["sciatica", "facet-joint-syndrome"],
  },

  // ─── NECK / CERVICAL ────────────────────────
  {
    id: "neck-retraction",
    title: "Chin Tucks (Cervical Retraction)",
    description: "Strengthens deep neck flexors and improves forward head posture. First-line exercise for neck pain and cervical radiculopathy.",
    youtubeId: "2wLl-ERDnCk",
    duration: "3 min",
    difficulty: "beginner",
    area: ["neck-cervical-pain"],
    conditions: ["cervical-radiculopathy"],
    precautions: "Perform gently — do not force the range of motion.",
  },
  {
    id: "neck-stretch",
    title: "Upper Trapezius Stretch",
    description: "Stretches the upper trapezius and levator scapulae muscles. Commonly tight in neck pain and tension headaches.",
    youtubeId: "UZo0LCqMhXY",
    duration: "2 min",
    difficulty: "beginner",
    area: ["neck-cervical-pain", "shoulder-pain"],
    conditions: ["cervical-radiculopathy"],
  },
  {
    id: "scapular-squeeze",
    title: "Scapular Squeeze",
    description: "Activates the rhomboids and middle trapezius to improve posture and reduce cervical strain.",
    youtubeId: "LT_dFRnmdGs",
    duration: "2 min",
    difficulty: "beginner",
    area: ["neck-cervical-pain", "upper-back-pain"],
    conditions: ["cervical-radiculopathy"],
  },

  // ─── SHOULDER ────────────────────────────────
  {
    id: "pendulum",
    title: "Pendulum Exercise",
    description: "Passive shoulder mobilization using gravity. Excellent for early rehabilitation and frozen shoulder recovery.",
    youtubeId: "7O2y8G3N0Y",
    duration: "3 min",
    difficulty: "beginner",
    area: ["shoulder-pain"],
    conditions: ["rotator-cuff-tendinopathy", "frozen-shoulder"],
    precautions: "Do not actively lift the arm — let gravity do the work.",
  },
  {
    id: "wall-climbing",
    title: "Wall Climb Stretch",
    description: "Progressive shoulder flexion stretch using the wall. Helps restore overhead reach gradually.",
    youtubeId: "2I1dJOp8NQI",
    duration: "3 min",
    difficulty: "beginner",
    area: ["shoulder-pain"],
    conditions: ["rotator-cuff-tendinopathy", "frozen-shoulder"],
  },
  {
    id: "external-rotation",
    title: "External Rotation with Band",
    description: "Strengthens the infraspinatus and teres minor — key rotator cuff muscles for shoulder stability.",
    youtubeId: "sAqrGdqp34I",
    duration: "4 min",
    difficulty: "intermediate",
    area: ["shoulder-pain"],
    conditions: ["rotator-cuff-tendinopathy"],
    precautions: "Keep the elbow at 90° and pinned to your side.",
  },

  // ─── KNEE ────────────────────────────────────
  {
    id: "quad-set",
    title: "Quad Set",
    description: "Isometric quadriceps activation. Foundational exercise for knee pain, pre/post-surgery rehabilitation.",
    youtubeId: "YFkTI-iiDzU",
    duration: "2 min",
    difficulty: "beginner",
    area: ["knee-pain"],
    conditions: ["knee-osteoarthritis"],
  },
  {
    id: "straight-leg-raise",
    title: "Straight Leg Raise",
    description: "Strengthens the quadriceps without loading the knee joint. Safe for most knee conditions.",
    youtubeId: "giD0fy8xUxw",
    duration: "3 min",
    difficulty: "beginner",
    area: ["knee-pain"],
    conditions: ["knee-osteoarthritis"],
    precautions: "Keep the knee fully straight throughout the movement.",
  },
  {
    id: "wall-sit",
    title: "Wall Sit (Modified)",
    description: "Closed-chain quadriceps strengthening. Builds endurance for daily activities like climbing stairs.",
    youtubeId: "y-wV4Lk_LT4",
    duration: "3 min",
    difficulty: "intermediate",
    area: ["knee-pain"],
    conditions: ["knee-osteoarthritis"],
    precautions: "Do not bend beyond 60°. Stop if pain increases.",
  },

  // ─── HIP ─────────────────────────────────────
  {
    id: "clamshell",
    title: "Clamshell Exercise",
    description: "Activates the gluteus medius and external rotators. Critical for hip stability and reducing lateral hip pain.",
    youtubeId: "kNHuRn0Xkmk",
    duration: "3 min",
    difficulty: "beginner",
    area: ["hip-pain", "buttock-pain"],
    conditions: ["trochanteric-bursitis", "sacroiliac-dysfunction"],
    precautions: "Keep the pelvis stable — do not roll backward.",
  },
  {
    id: "hip-flexor-stretch",
    title: "Hip Flexor Stretch",
    description: "Stretches the iliopsoas and rectus femoris. Essential for people with prolonged sitting and hip pain.",
    youtubeId: "gMhSyfz81uE",
    duration: "3 min",
    difficulty: "beginner",
    area: ["hip-pain"],
    conditions: ["hip-osteoarthritis"],
    precautions: "Maintain an upright torso — avoid arching the back.",
  },

  // ─── THIGH / LEG ────────────────────────────
  {
    id: "hamstring-stretch",
    title: "Hamstring Stretch (Supine)",
    description: "Gentle hamstring stretch performed lying down. Safe for sciatica and posterior thigh pain.",
    youtubeId: "a7KuEFnXPQA",
    duration: "3 min",
    difficulty: "beginner",
    area: ["thigh-pain-posterior", "leg-pain"],
    conditions: ["sciatica"],
    precautions: "Keep the opposite leg bent to protect the low back.",
  },
  {
    id: "calf-stretch",
    title: "Standing Calf Stretch",
    description: "Stretches the gastrocnemius and soleus. Important for ankle mobility and calf pain.",
    youtubeId: "hFkJEc6AINI",
    duration: "2 min",
    difficulty: "beginner",
    area: ["leg-pain", "ankle-pain", "foot-pain"],
    conditions: ["plantar-fasciitis"],
  },

  // ─── WRIST / HAND ───────────────────────────
  {
    id: "wrist-flexor-stretch",
    title: "Wrist Flexor Stretch",
    description: "Stretches the forearm flexor muscles. Helps with carpal tunnel symptoms and wrist pain.",
    youtubeId: "JlGVMqRMnBY",
    duration: "2 min",
    difficulty: "beginner",
    area: ["wrist-pain", "palm-pain"],
    conditions: ["carpal-tunnel-syndrome"],
    precautions: "Do not overstretch — gentle pressure only.",
  },
  {
    id: "nerve-gliding",
    title: "Median Nerve Gliding",
    description: "Neural mobilization exercise for carpal tunnel syndrome. Helps restore nerve mobility.",
    youtubeId: "p_ms1VzBn0U",
    duration: "3 min",
    difficulty: "beginner",
    area: ["wrist-pain", "palm-pain", "fingers-pain"],
    conditions: ["carpal-tunnel-syndrome"],
    precautions: "Stop if symptoms increase significantly.",
  },

  // ─── FOOT / ANKLE ───────────────────────────
  {
    id: "towel-curl",
    title: "Towel Curl Exercise",
    description: "Strengthens the intrinsic foot muscles. Essential for plantar fasciitis rehabilitation.",
    youtubeId: "q_dJcSr_TUI",
    duration: "2 min",
    difficulty: "beginner",
    area: ["foot-pain", "ankle-pain"],
    conditions: ["plantar-fasciitis"],
  },
  {
    id: "golf-ball-roll",
    title: "Golf Ball Roll (Foot Massage)",
    description: "Self-myofascial release for the plantar fascia. Provides immediate relief and improves tissue mobility.",
    youtubeId: "RCV1cCmQjJI",
    duration: "2 min",
    difficulty: "beginner",
    area: ["foot-pain"],
    conditions: ["plantar-fasciitis"],
  },

  // ─── WHOLE BODY / GENERAL ────────────────────
  {
    id: "gentle-walk",
    title: "Walking for Pain Relief",
    description: "Low-impact cardiovascular exercise that promotes blood flow, reduces stiffness, and supports overall pain management.",
    youtubeId: "LhYpk8NwJkE",
    duration: "5 min",
    difficulty: "beginner",
    area: ["whole-body-pain"],
    conditions: ["fibromyalgia"],
  },
  {
    id: "deep-breathing",
    title: "Diaphragmatic Breathing",
    description: "Activates the parasympathetic nervous system. Reduces muscle tension and pain perception through relaxation.",
    youtubeId: "gYIMkKEPaA0",
    duration: "5 min",
    difficulty: "beginner",
    area: ["whole-body-pain"],
    conditions: ["fibromyalgia"],
  },
];

/**
 * Get exercises for a specific pain area
 */
export function getExercisesForArea(areaId: string): Exercise[] {
  return exercises.filter((e) => e.area.includes(areaId));
}

/**
 * Get exercises for a specific condition
 */
export function getExercisesForCondition(conditionSlug: string): Exercise[] {
  return exercises.filter((e) => e.conditions.includes(conditionSlug));
}
