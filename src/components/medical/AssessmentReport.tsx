"use client";

import React, { useState, useMemo } from "react";
import type { WizardResult } from "@/lib/types";
import { useT } from "@/lib/useT";
import Button from "@/components/ui/Button";

interface AssessmentReportProps {
  answers: Record<number, string | string[] | number>;
  result: WizardResult;
  onStartOver: () => void;
}

// Region & Quality Icon mappings
const REGION_ICONS: Record<string, string> = {
  head: "🧠",
  neck: "🦴",
  shoulder: "💪",
  arm: "🦾",
  hand: "✋",
  chest: "🫁",
  back: "🔙",
  hip: "🦴",
  knee: "🦵",
  leg: "🦿",
  foot: "🦶",
};

const QUALITY_ICONS: Record<string, string> = {
  burning: "🔥",
  electric: "⚡",
  shooting: "🎯",
  "pins-and-needles": "📌",
  aching: "😔",
  stabbing: "🗡️",
  numbness: "🧊",
  throbbing: "💓",
};

export default function AssessmentReport({
  answers,
  result,
  onStartOver,
}: AssessmentReportProps) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  // Parse multi-select locations and qualities
  const locations: string[] = useMemo(() => {
    const raw = answers[1];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string" && raw) return [raw];
    return ["back"];
  }, [answers]);

  const qualities: string[] = useMemo(() => {
    const raw = answers[2];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string" && raw) return [raw];
    return ["aching"];
  }, [answers]);

  const durationKey = (answers[3] as string) || "chronic";
  const intensity = (answers[4] as number) ?? 5;
  const radiates = (answers[5] as string) || "no";
  const radiationPattern = (answers[6] as string[]) || [];
  const aggravating = (answers[7] as string[]) || [];

  // Localized getters
  const getRegionName = (id: string) => t(`assessment.region.${id}`) || id;
  const getQualityName = (id: string) => t(`assessment.quality.${id}`) || id;
  const getDurationName = (id: string) => t(`assessment.duration.${id}`) || id;

  // Intensity descriptive label
  const getIntensityLabel = (score: number) => {
    if (score === 0) return t("assessment.scale.0");
    if (score <= 3) return t("assessment.scale.2");
    if (score <= 6) return t("assessment.scale.4");
    if (score <= 8) return t("assessment.scale.7");
    return t("assessment.scale.10");
  };

  // Compile full text string for sharing
  const formattedReportText = useMemo(() => {
    const regionNames = locations.map(getRegionName).join(", ");
    const qualityNames = qualities.map(getQualityName).join(", ");
    const durationLabel = getDurationName(durationKey);
    const radiationText = radiates === "yes" 
      ? `Yes (${radiationPattern.filter(r => r !== "none").join(", ") || "General"})`
      : "No (stays in one spot)";
    const aggravatingText = aggravating.length > 0 ? aggravating.join(", ") : "None reported";
    const pathwaysText = result.possiblePathways
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(", ");

    return (
      `🏥 *THE PAINKILLER MD — PATIENT ASSESSMENT REPORT*\n` +
      `*Physician:* Dr. Shahnawaz F Shah (Surat, Gujarat)\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 *Pain Regions:* ${regionNames}\n` +
      `⚡ *Pain Sensations:* ${qualityNames}\n` +
      `⏱️ *Duration:* ${durationLabel}\n` +
      `📊 *Intensity Score:* ${intensity}/10 (${getIntensityLabel(intensity)})\n` +
      `🔄 *Radiation:* ${radiationText}\n` +
      `⚠️ *Aggravating Factors:* ${aggravatingText}\n` +
      `🔬 *Identified Pathways:* ${pathwaysText}\n` +
      (result.redFlags.length > 0 ? `🚨 *Safety Alerts:* ${result.redFlags.join(" | ")}\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Educational assessment generated via thepainkillermd.com*`
    );
  }, [locations, qualities, durationKey, intensity, radiates, radiationPattern, aggravating, result, t]);

  // WhatsApp sharing handler
  const handleShareWhatsApp = () => {
    const phone = "919769682366";
    const encoded = encodeURIComponent(formattedReportText);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Email sharing handler
  const handleShareEmail = () => {
    const subject = encodeURIComponent("Patient Pain Assessment Report - Dr. Shahnawaz F Shah");
    const body = encodeURIComponent(formattedReportText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Copy to clipboard handler
  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(formattedReportText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl mx-auto">
      {/* Header Clinical Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-800)] text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="px-3.5 py-1 rounded-full bg-white/15 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm border border-white/20">
            {t("assessment.report.badge")}
          </span>
          <span className="text-xs text-white/70">
            Dr. Shahnawaz F Shah • Surat
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          {t("assessment.report.summaryHeading")}
        </h2>
        <p className="text-sm text-white/80 leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Safety Alerts (if any) */}
      {result.redFlags.length > 0 && (
        <div className="p-5 rounded-xl bg-red-50 border-2 border-[var(--color-alert-critical)]/40 shadow-sm">
          <h3 className="text-base font-bold text-[var(--color-alert-critical)] mb-2 flex items-center gap-2">
            🚨 {t("assessment.report.safetyAlert")}
          </h3>
          <ul className="space-y-1.5">
            {result.redFlags.map((flag, idx) => (
              <li key={idx} className="text-sm text-red-900 font-medium">
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Structured Metrics Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pain Regions */}
        <div className="p-5 rounded-xl bg-white border border-[var(--color-surface-200)] shadow-sm">
          <p className="text-xs font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
            📍 {t("assessment.report.regionsHeading")}
          </p>
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--color-surface-100)] text-sm font-semibold text-[var(--color-text-primary)] border border-[var(--color-surface-300)]"
              >
                <span>{REGION_ICONS[loc] || "🦴"}</span>
                {getRegionName(loc)}
              </span>
            ))}
          </div>
        </div>

        {/* Pain Sensations */}
        <div className="p-5 rounded-xl bg-white border border-[var(--color-surface-200)] shadow-sm">
          <p className="text-xs font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
            ⚡ {t("assessment.report.qualitiesHeading")}
          </p>
          <div className="flex flex-wrap gap-2">
            {qualities.map((qual) => (
              <span
                key={qual}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--color-surface-100)] text-sm font-semibold text-[var(--color-text-primary)] border border-[var(--color-surface-300)]"
              >
                <span>{QUALITY_ICONS[qual] || "📌"}</span>
                {getQualityName(qual)}
              </span>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="p-5 rounded-xl bg-white border border-[var(--color-surface-200)] shadow-sm">
          <p className="text-xs font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-1">
            ⏱️ {t("assessment.report.durationHeading")}
          </p>
          <p className="text-base font-bold text-[var(--color-text-primary)]">
            {getDurationName(durationKey)}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            {durationKey === "chronic" ? "Involves neuroplastic adaptations" : "Acute/Subacute symptom pattern"}
          </p>
        </div>

        {/* Pain Intensity Scale */}
        <div className="p-5 rounded-xl bg-white border border-[var(--color-surface-200)] shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider">
              📊 {t("assessment.report.intensityHeading")}
            </p>
            <span className="text-lg font-bold text-[var(--color-clinical-600)]">
              {intensity}<span className="text-xs text-[var(--color-text-muted)] font-normal">/10</span>
            </span>
          </div>
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2">
            {getIntensityLabel(intensity)}
          </p>
          <div className="w-full h-2.5 rounded-full bg-[var(--color-surface-200)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.max(5, (intensity / 10) * 100)}%`,
                background: "linear-gradient(to right, var(--color-medical-500), var(--color-alert-warning), var(--color-alert-critical))",
              }}
            />
          </div>
        </div>
      </div>

      {/* Pathways Identified */}
      <div className="p-5 rounded-xl bg-white border border-[var(--color-surface-200)] shadow-sm">
        <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
          🔬 {t("assessment.report.pathwaysHeading")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.possiblePathways.map((p) => (
            <span
              key={p}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border pathway-${p}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Clinical Patterns & Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="p-5 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
          <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            🩺 {t("assessment.report.recommendationsHeading")}
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-600)] flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action / Sharing Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border-2 border-[var(--color-clinical-200)] text-center space-y-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
            Share Your Assessment with Dr. Shah
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] max-w-lg mx-auto">
            {t("assessment.report.directClinicNote")}
          </p>
        </div>

        {/* Primary Share Buttons with contrasting hover states */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
          <Button
            label={t("assessment.report.shareWhatsApp")}
            variant="whatsapp"
            size="md"
            onClick={handleShareWhatsApp}
          />
          <Button
            label={t("assessment.report.shareEmail")}
            variant="primary"
            size="md"
            onClick={handleShareEmail}
          />
          <button
            onClick={handleCopy}
            className="px-5 py-3 rounded-full border border-[var(--color-surface-300)] bg-white text-[var(--color-text-primary)] text-sm font-semibold hover:bg-[var(--color-surface-100)] transition-colors shadow-sm"
          >
            {copied ? `✅ ${t("assessment.report.copied")}` : `📋 ${t("assessment.report.copy")}`}
          </button>
        </div>
      </div>

      {/* Start Over Action */}
      <div className="pt-2 text-center">
        <button
          onClick={onStartOver}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-100)] hover:bg-[var(--color-surface-200)] transition-colors"
        >
          🔄 {t("assessment.startOver")}
        </button>
      </div>

      {/* Educational Disclaimer */}
      <div className="disclaimer-badge justify-center w-full py-3">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs text-center">{result.disclaimer}</span>
      </div>
    </div>
  );
}
