/**
 * Home remedies and self-care guidance for each pain area.
 * Educational only — no medication dosages, no prescriptions.
 */

export interface Remedy {
  id: string;
  title: string;
  description: string;
  icon: string;
  evidence: "general" | "moderate" | "strong";
  caution?: string;
}

export interface RemediesByArea {
  areaId: string;
  areaName: string;
  remedies: Remedy[];
  generalAdvice: string[];
  whenToAvoid: string[];
}

export const remediesByArea: RemediesByArea[] = [
  {
    areaId: "low-back-pain",
    areaName: "Low Back Pain",
    generalAdvice: [
      "Stay gently active — avoid prolonged bed rest",
      "Take regular movement breaks every 30-60 minutes",
      "Apply ice for the first 48-72 hours if acute, then switch to heat",
      "Maintain a comfortable posture; use a lumbar support pillow when sitting",
      "Avoid heavy lifting and sudden twisting movements",
    ],
    whenToAvoid: [
      "Deep forward bends during acute pain",
      "High-impact exercises",
      "Prolonged sitting without breaks",
    ],
    remedies: [
      { id: "ice", title: "Cold Compress", description: "Apply ice wrapped in a cloth for 15-20 minutes. Helps reduce inflammation in the first 48-72 hours of acute pain.", icon: "🧊", evidence: "moderate" },
      { id: "heat", title: "Heat Therapy", description: "Use a warm towel or heating pad for 15-20 minutes. Helps relax tight muscles and improve blood flow. Best for chronic or muscle-related pain.", icon: "🔥", evidence: "moderate" },
      { id: "walking", title: "Gentle Walking", description: "Short, frequent walks help maintain mobility and prevent stiffness. Start with 10-15 minutes and gradually increase.", icon: "🚶", evidence: "strong" },
      { id: "posture", title: "Posture Awareness", description: "When sitting, keep feet flat on the floor, knees at hip level. Use a small pillow or rolled towel behind the low back for support.", icon: "🪑", evidence: "general" },
      { id: "sleep", title: "Sleep Position", description: "Sleep on your side with a pillow between the knees, or on your back with a pillow under the knees. This reduces strain on the low back.", icon: "😴", evidence: "general" },
    ],
  },
  {
    areaId: "neck-cervical-pain",
    areaName: "Neck / Cervical Pain",
    generalAdvice: [
      "Keep the neck in a neutral position during daily activities",
      "Take screen breaks every 20-30 minutes",
      "Avoid cradling the phone between ear and shoulder",
      "Use a supportive pillow that maintains neck alignment",
    ],
    whenToAvoid: [
      "Prolonged looking down at phone (\"text neck\")",
      "Sleeping on the stomach",
      "Heavy overhead activities during acute pain",
    ],
    remedies: [
      { id: "gentle-stretch", title: "Gentle Neck Stretches", description: "Slowly tilt the head ear-to-shoulder, hold for 15-20 seconds each side. Do not force the stretch. Repeat 3-5 times.", icon: "🧘", evidence: "moderate" },
      { id: "warm-compress", title: "Warm Compress", description: "Apply a warm towel or heating pad to the neck and upper shoulders for 15-20 minutes to relax tight muscles.", icon: "♨️", evidence: "moderate" },
      { id: "ergonomics", title: "Workstation Ergonomics", description: "Position the screen at eye level. Use a chair with good back support. Keep the keyboard at elbow height.", icon: "🖥️", evidence: "strong" },
      { id: "chin-tuck", title: "Chin Tuck Exercise", description: "Gently draw the chin backward (making a \"double chin\") to strengthen deep neck flexors. Hold 5 seconds, repeat 10 times.", icon: "💪", evidence: "moderate" },
    ],
  },
  {
    areaId: "shoulder-pain",
    areaName: "Shoulder Pain",
    generalAdvice: [
      "Avoid sleeping on the affected shoulder",
      "Keep the arm in a comfortable position",
      "Use the opposite arm for daily tasks during acute pain",
      "Apply ice for acute injuries, heat for chronic stiffness",
    ],
    whenToAvoid: [
      "Lifting heavy objects overhead",
      "Repetitive overhead motions",
      "Forcing range of motion during acute pain",
    ],
    remedies: [
      { id: "pendulum", title: "Pendulum Exercises", description: "Lean forward, let the affected arm hang down, and gently swing in small circles. Use body momentum, not muscles. 2-3 minutes, 3 times daily.", icon: "🔄", evidence: "moderate" },
      { id: "cold-pack", title: "Cold Pack", description: "Apply a cold pack for 15-20 minutes to reduce swelling and pain after activity or injury.", icon: "🧊", evidence: "moderate" },
      { id: "opposite-hand", title: "Assisted Range of Motion", description: "Use the unaffected arm to gently guide the affected arm through pain-free range of motion. Helps prevent stiffness.", icon: "🤲", evidence: "moderate" },
    ],
  },
  {
    areaId: "knee-pain",
    areaName: "Knee Pain",
    generalAdvice: [
      "Avoid prolonged standing or squatting",
      "Use a chair for support when sitting down or standing up",
      "Wear supportive, cushioned footwear",
      "Maintain a healthy weight to reduce knee stress",
    ],
    whenToAvoid: [
      "Deep squats and lunges during acute pain",
      "High-impact activities (running, jumping)",
      "Stair climbing without support",
    ],
    remedies: [
      { id: "ice-knee", title: "Ice the Knee", description: "Apply ice for 15-20 minutes after activity. Helps reduce inflammation and swelling. Always use a cloth barrier.", icon: "🧊", evidence: "moderate" },
      { id: "quad-strengthen", title: "Quadriceps Strengthening", description: "Tighten the thigh muscle and hold for 5 seconds while sitting with the leg extended. Repeat 10-15 times. Strengthens muscles that support the knee.", icon: "💪", evidence: "strong" },
      { id: "compression", title: "Compression Sleeve", description: "A simple elastic knee sleeve can provide warmth, mild compression, and proprioceptive support during daily activities.", icon: "🦿", evidence: "general" },
      { id: "rest-elevate", title: "Rest and Elevate", description: "When the knee is swollen, rest with the leg elevated above heart level for 15-20 minutes to reduce swelling.", icon: "🦶", evidence: "moderate" },
    ],
  },
  {
    areaId: "headache",
    areaName: "Headache",
    generalAdvice: [
      "Stay well hydrated throughout the day",
      "Maintain regular sleep patterns",
      "Take regular breaks from screens",
      "Manage stress with relaxation techniques",
    ],
    whenToAvoid: [
      "Skipping meals",
      "Excessive caffeine intake",
      "Overuse of pain medications (medication-overuse headache)",
    ],
    remedies: [
      { id: "hydration", title: "Stay Hydrated", description: "Drink water regularly throughout the day. Dehydration is a common and easily correctable cause of headaches.", icon: "💧", evidence: "strong" },
      { id: "temples", title: "Temples and Neck Massage", description: "Gently massage the temples in circular motions. Also massage the suboccipital muscles at the base of the skull.", icon: "💆", evidence: "general" },
      { id: "dark-room", title: "Rest in a Dark Room", description: "For tension or migraine headaches, lie down in a quiet, dark room for 20-30 minutes with a cool compress on the forehead.", icon: "🌙", evidence: "general" },
    ],
  },
  {
    areaId: "foot-pain",
    areaName: "Foot Pain",
    generalAdvice: [
      "Wear supportive shoes with good arch support",
      "Avoid walking barefoot on hard surfaces",
      "Stretch the calves and feet before getting out of bed",
      "Limit prolonged standing",
    ],
    whenToAvoid: [
      "Walking barefoot on hard floors",
      "Wearing flat, unsupportive shoes",
      "Sudden increase in walking/standing activity",
    ],
    remedies: [
      { id: "frozen-bottle", title: "Frozen Bottle Roll", description: "Fill a water bottle and freeze it. Roll it under the foot with gentle pressure for 5-10 minutes. Provides both cold therapy and plantar fascia massage.", icon: "🧴", evidence: "moderate" },
      { id: "calf-stretch", title: "Calf Stretching", description: "Lean against a wall with one foot back, pressing the heel into the floor. Hold 30 seconds, repeat 3 times. Tight calves contribute to foot pain.", icon: "🧎", evidence: "strong" },
      { id: "night-splint", title: "Night Stretch", description: "Gently stretch the foot and toes before bed and first thing in the morning. This helps prevent the morning pain spike.", icon: "🌅", evidence: "moderate" },
    ],
  },
];

/**
 * Get remedies for a specific pain area
 */
export function getRemediesForArea(areaId: string): RemediesByArea | undefined {
  return remediesByArea.find((r) => r.areaId === areaId);
}
