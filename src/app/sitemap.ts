import type { MetadataRoute } from "next";
import { conditions } from "@/data/conditions";
import { procedures } from "@/data/procedures";
import { medications } from "@/data/medications";
import { allPainAreas } from "@/data/painAreasFull";

const BASE_URL = "https://thepainkillermd.com";
const LANGUAGES = ["en", "hi", "mr", "gu"] as const;

function withAlternates(path: string): MetadataRoute.Sitemap[number] {
  const url = path === "/" ? BASE_URL : `${BASE_URL}${path}`;
  const alternates: Record<string, string> = {};
  for (const lang of LANGUAGES) {
    alternates[lang] = path === "/" ? `${BASE_URL}?lang=${lang}` : `${BASE_URL}${path}?lang=${lang}`;
  }
  return {
    url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
    alternates: { languages: alternates },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "/",
    "/conditions",
    "/procedures",
    "/medications",
    "/doctor",
    "/clinic",
    "/videos",
    "/pain-navigator",
    "/education",
  ].map(withAlternates);

  const conditionPages = conditions.map((c) => withAlternates(`/conditions/${c.slug}`));
  const procedurePages = procedures.map((p) => withAlternates(`/procedures/${p.slug}`));
  const medicationPages = medications.map((m) => withAlternates(`/medications/${m.slug}`));
  const painAreaPages = allPainAreas.map((a) => withAlternates(`/pain/${a.slug}`));

  return [...staticPages, ...conditionPages, ...procedurePages, ...medicationPages, ...painAreaPages];
}
