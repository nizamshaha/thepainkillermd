// === Anatomy & Body Map Types ===

export interface AnatomyRegion {
  id: string;
  name: string;
  label: string;
  path: string; // SVG path for the body map
  conditions: string[];
  mechanisms: string[];
  nerves?: string[];
  vertebrae?: string[];
}

// === Pain Sensation Types ===

export interface PainSensation {
  id: string;
  name: string;
  label: string;
  icon: string;
  description: string;
  mechanism: string;
  pathway: "nociceptive" | "neuropathic" | "nociplastic";
  associatedConditions: string[];
  clinicalNotes: string;
}

// === Condition Types (20-Point Architecture) ===

export interface Condition {
  id: string;
  name: string;
  slug: string;
  category: "spine" | "nerve" | "joint" | "chronic" | "head" | "soft-tissue";
  overview: string;
  symptoms: string[];
  causes: string[];
  diagnosis: string[];
  treatmentOptions: string[];
  procedures: string[];
  medications: string[];
  redFlags: string[];
  faq: { question: string; answer: string }[];
  relatedConditions: string[];
  relatedArticles: string[];
  bodyRegions: string[];
  severity: "mild" | "moderate" | "severe";
}

// === Procedure Types ===

export interface Procedure {
  id: string;
  name: string;
  slug: string;
  category: "injection" | "ablation" | "stimulation" | "rehabilitation";
  description: string;
  indications: string[];
  technique: string[];
  risks: string[];
  benefits: string[];
  recovery: string;
  evidenceLevel: "strong" | "moderate" | "limited";
  conditions: string[];
  imageAlt: string;
}

// === Medication Types ===

export interface Medication {
  id: string;
  name: string;
  slug: string;
  category: "neuropathic" | "nsaid" | "muscle-relaxant" | "topical" | "opioid" | "adjunct";
  description: string;
  mechanism: string;
  commonUses: string[];
  sideEffects: string[];
  precautions: string[];
  disclaimer: string;
}

// === Article Types ===

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  citations: string[];
  relatedArticles: string[];
}

// === Wizard Types ===

export interface WizardStep {
  id: number;
  key?: string;
  title: string;
  question: string;
  type: "select" | "multiselect" | "range" | "yesno";
  options?: WizardOption[];
  min?: number;
  max?: number;
  unit?: string;
}

export interface WizardOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  value: string;
}

export interface WizardResult {
  summary: string;
  patterns: string[];
  possiblePathways: ("nociceptive" | "neuropathic" | "nociplastic")[];
  recommendations: string[];
  redFlags: string[];
  disclaimer: string;
}

// === Translation Types ===

export type Locale = "en" | "hi" | "mr" | "gu";

export interface TranslationSet {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
    gu: string;
  };
}

// === Search Types ===

export interface SearchResult {
  id: string;
  type: "condition" | "procedure" | "medication" | "article" | "sensation" | "region";
  title: string;
  description: string;
  slug: string;
  category?: string;
}

// === Testimonial & Video Types ===

export interface PatientTestimonial {
  id: string;
  title?: string;
  patientName: string;
  condition: string;
  conditionSlug: string;
  procedure: string;
  procedureSlug: string;
  videoId: string;
  thumbnailUrl: string;
  duration: string;
  patientAge?: number;
  patientLocation?: string;
  quote: string;
  recoverySummary: string;
  recoveryMilestones: string[];
  videoDescription: string;
  consentVerified: boolean;
  dateRecorded: string;
  playlistId?: string;
  youtubeUrl?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: "testimonial" | "animation" | "procedure" | "education";
  videoId?: string;
  duration: string;
  thumbnailUrl?: string;
  description: string;
  tags: string[];
  relatedCondition?: string;
}

// === Schema.org Types ===

export interface PhysicianSchema {
  "@context": string;
  "@type": string;
  name: string;
  jobTitle: string;
  medicalSpecialty: string;
  description: string;
  url: string;
  sameAs?: string[];
}
