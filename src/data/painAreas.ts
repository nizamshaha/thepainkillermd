export { allPainAreas as painAreas } from "./painAreasFull";

export interface PainArea {
  id: string;
  name: string;
  slug: string;
  synonyms: string[];
  icon: string;
  description: string;
  commonCauses: string[];
  symptoms: string[];
  aggravatingFactors: string[];
  selfCare: string[];
  redFlags: string[];
  whenToConsult: string[];
  physicianAssessment: string[];
  treatmentOptions: string[];
  faq: { question: string; answer: string }[];
  relatedAreas: string[];
  seo: { title: string; description: string };
  questionnaire: QuestionnaireConfig;
}

export interface QuestionnaireConfig {
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: "single" | "multiple" | "scale";
  options?: { id: string; label: string; value: string; triggersRedFlag?: boolean }[];
  condition?: (answers: Record<string, string | string[] | number>) => boolean;
}

import { allPainAreas } from "./painAreasFull";

export function getPainAreaBySlug(slug: string): PainArea | undefined {
  return allPainAreas.find((a: PainArea) => a.slug === slug);
}

export function searchPainAreas(query: string): PainArea[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allPainAreas.filter(
    (a: PainArea) =>
      a.name.toLowerCase().includes(q) ||
      a.synonyms.some((s) => s.includes(q)) ||
      a.commonCauses.some((c) => c.toLowerCase().includes(q))
  );
}
