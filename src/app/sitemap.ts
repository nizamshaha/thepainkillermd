import type { MetadataRoute } from "next";
import { conditions } from "@/data/conditions";
import { procedures } from "@/data/procedures";
import { medications } from "@/data/medications";
import { allPainAreas } from "@/data/painAreasFull";

const BASE_URL = "https://thepainkillermd.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/conditions`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/procedures`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/medications`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/doctor`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/clinic`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/videos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/pain-navigator`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/education`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const conditionPages = conditions.map((c) => ({
    url: `${BASE_URL}/conditions/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const procedurePages = procedures.map((p) => ({
    url: `${BASE_URL}/procedures/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const medicationPages = medications.map((m) => ({
    url: `${BASE_URL}/medications/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const painAreaPages = allPainAreas.map((a) => ({
    url: `${BASE_URL}/pain/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...conditionPages, ...procedurePages, ...medicationPages, ...painAreaPages];
}
