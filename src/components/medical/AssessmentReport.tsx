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
  const [patientData, setPatientData] = useState({ name: "", mobile: "", email: "" });

  // Derived validation: name and mobile are required
  const isValid = patientData.name.trim() !== "" && patientData.mobile.trim() !== "";

  // Parse neutral state values
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
  const sensoryChanges = (answers[8] as string[]) || [];
  const motorWeakness = (answers[9] as string) || "no";

  // Localized dictionary lookups mapping neutral IDs to localized copy
  const getRegionName = (id: string) => {
    const key = `assessment.options.location.${id}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return t(`assessment.region.${id}`) || id;
  };

  const getQualityName = (id: string) => {
    const key = `assessment.options.quality.${id}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return t(`assessment.quality.${id}`) || id;
  };

  const getDurationName = (id: string) => {
    const key = `assessment.options.duration.${id}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return t(`assessment.duration.${id}`) || id;
  };

  const getDurationDesc = (id: string) => {
    const key = `assessment.options.duration.${id}.desc`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return id === "chronic" ? "Involves central neuroplastic patterns" : "Acute/Subacute symptom pattern";
  };

  const getRadiationPatternName = (id: string) => {
    const key = `assessment.options.radiationPattern.${id}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return id;
  };

  const getAggravatingName = (id: string) => {
    const key = `assessment.options.aggravating.${id}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return id;
  };

  const getSensoryName = (id: string) => {
    const key = `assessment.options.sensory.${id}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return id;
  };

  const getPathwayName = (p: string) => {
    const key = `assessment.report.pathway.${p}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return p.charAt(0).toUpperCase() + p.slice(1);
  };

  // Intensity descriptive label
  const getIntensityLabel = (score: number) => {
    if (score === 0) return t("assessment.scale.0");
    if (score <= 3) return t("assessment.scale.2");
    if (score <= 6) return t("assessment.scale.4");
    if (score <= 8) return t("assessment.scale.7");
    return t("assessment.scale.10");
  };

  // Localized Dynamic Summary mapping neutral state keys
  const localizedSummary = useMemo(() => {
    const regionNames = locations.map(getRegionName).join(", ");
    const qualityNames = qualities.map(getQualityName).join(", ");
    const durationLabel = getDurationName(durationKey);
    const pathwayNames = result.possiblePathways.map(getPathwayName).join(", ");

    const template = t("assessment.report.summaryTemplate");
    if (template && template.includes("{regions}")) {
      return template
        .replace("{regions}", regionNames)
        .replace("{qualities}", qualityNames)
        .replace("{intensity}", intensity.toString())
        .replace("{duration}", durationLabel)
        .replace("{pathways}", pathwayNames);
    }

    return (
      `Based on your responses, your pain in ${regionNames} with ${qualityNames} characteristics ` +
      `(rated ${intensity}/10, ${durationLabel}) suggests ${pathwayNames} pain mechanism(s).`
    );
  }, [locations, qualities, durationKey, intensity, result.possiblePathways, t]);

  // Localized Red Flag notices
  const redFlagsList: string[] = useMemo(() => {
    const raw = answers[10];
    const flagIds = Array.isArray(raw) ? raw.filter((f) => f !== "none") : [];
    if (flagIds.length === 0) return [];
    return flagIds.map((id) => {
      const key = `assessment.report.redFlag.${id}`;
      const translated = t(key);
      if (translated && translated !== key) return translated;
      const optKey = `assessment.options.redFlags.${id}`;
      const optTranslated = t(optKey);
      if (optTranslated && optTranslated !== optKey) return `⚠️ ${optTranslated}`;
      return `⚠️ ${id}`;
    });
  }, [answers, t]);

  // Localized Recommendations list
  const localizedRecommendations: string[] = useMemo(() => {
    const list: string[] = [
      t("assessment.report.rec.disclaimer"),
      t("assessment.report.rec.consult"),
    ];
    if (result.possiblePathways.includes("neuropathic")) {
      list.push(t("assessment.report.rec.neuropathic"));
    }
    if (motorWeakness === "yes") {
      list.push(t("assessment.report.rec.motor"));
    }
    if (redFlagsList.length > 0) {
      list.unshift(t("assessment.report.rec.redFlagsUrgent"));
    }
    return list;
  }, [result.possiblePathways, motorWeakness, redFlagsList, t]);

  // Compile full translated text string for sharing
  const formattedReportText = useMemo(() => {
    const patientName = patientData.name.trim();
    const patientMobile = patientData.mobile.trim();
    const patientEmail = patientData.email.trim() || "N/A";
    const patientHeader = `Patient Name: ${patientName} | Mobile: ${patientMobile} | Email: ${patientEmail}`;
    const assuranceMessage =
      "Dr. Shahnawaz F Shah will carefully review your assessment. Please be assured that our clinical team will contact you as soon as possible to guide you toward the appropriate care.";

    const regionNames = locations.map(getRegionName).join(", ");
    const qualityNames = qualities.map(getQualityName).join(", ");
    const durationLabel = getDurationName(durationKey);
    const radiationText = radiates === "yes"
      ? `${t("assessment.options.radiation.yes")} (${radiationPattern.filter((r) => r !== "none").map(getRadiationPatternName).join(", ") || t("assessment.titles.radiationPattern")})`
      : t("assessment.options.radiation.no");
    const aggravatingText = aggravating.length > 0
      ? aggravating.map(getAggravatingName).join(", ")
      : t("assessment.report.noneReported");
    const sensoryText = sensoryChanges.length > 0 && !sensoryChanges.includes("none")
      ? sensoryChanges.map(getSensoryName).join(", ")
      : t("assessment.report.noneReported");
    const motorText = motorWeakness === "yes"
      ? t("assessment.options.motor.yes")
      : t("assessment.options.motor.no");
    const pathwaysText = result.possiblePathways
      .map(getPathwayName)
      .join(", ");

    return (
      `${patientHeader}\n\n` +
      `🏥 ${t("assessment.title").toUpperCase()} — ${t("assessment.report.badge").toUpperCase()}\n` +
      `Dr. Shahnawaz F Shah (Surat, Gujarat)\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 ${t("assessment.report.summaryHeading")}:\n${localizedSummary}\n\n` +
      `📍 ${t("assessment.report.regionsHeading")}: ${regionNames}\n` +
      `⚡ ${t("assessment.report.qualitiesHeading")}: ${qualityNames}\n` +
      `⏱️ ${t("assessment.report.durationHeading")}: ${durationLabel}\n` +
      `📊 ${t("assessment.report.intensityHeading")}: ${intensity}/10 (${getIntensityLabel(intensity)})\n` +
      `🔄 ${t("assessment.report.radiationHeading")}: ${radiationText}\n` +
      `⚠️ ${t("assessment.report.aggravatingHeading")}: ${aggravatingText}\n` +
      `🔬 ${t("assessment.report.sensoryHeading")}: ${sensoryText}\n` +
      `💪 ${t("assessment.report.motorHeading")}: ${motorText}\n` +
      `🧬 ${t("assessment.report.pathwaysHeading")}: ${pathwaysText}\n` +
      (redFlagsList.length > 0 ? `\n🚨 ${t("assessment.report.safetyAlert")}:\n${redFlagsList.join("\n")}\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `${assuranceMessage}\n\n` +
      `*${t("assessment.report.disclaimer")}*\n` +
      `https://thepainkillermd.com`
    );
  }, [
    patientData,
    locations,
    qualities,
    durationKey,
    intensity,
    radiates,
    radiationPattern,
    aggravating,
    sensoryChanges,
    motorWeakness,
    result.possiblePathways,
    localizedSummary,
    redFlagsList,
    t,
  ]);

  // Generates dedicated mailto URL for clinic with subject and URL-encoded body
  const generateMailtoUrl = () => {
    const recipient = "thepainkillermd@gmail.com";
    const patientName = patientData.name.trim();
    const defaultSubject = t("assessment.report.emailSubject") || "Patient Pain Assessment Report - Dr. Shahnawaz F Shah";
    const subject = patientName ? `Patient Assessment: ${patientName} - Dr. Shahnawaz F Shah` : defaultSubject;
    const body = formattedReportText;
    return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // WhatsApp sharing handler
  const handleShareWhatsApp = () => {
    if (!isValid) return;
    const phone = "919769682366";
    const encoded = encodeURIComponent(formattedReportText);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Email sharing handler
  const handleShareEmail = () => {
    if (!isValid) return;
    const mailtoUrl = generateMailtoUrl();
    window.location.href = mailtoUrl;
  };

  // Copy to clipboard handler
  const handleCopy = async () => {
    if (!isValid) return;
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
        <p className="text-sm text-white/90 leading-relaxed font-medium">
          {localizedSummary}
        </p>
      </div>

      {/* Safety Alerts (if any) */}
      {redFlagsList.length > 0 && (
        <div className="p-5 rounded-xl bg-red-50 border-2 border-[var(--color-alert-critical)]/40 shadow-sm">
          <h3 className="text-base font-bold text-[var(--color-alert-critical)] mb-2 flex items-center gap-2">
            🚨 {t("assessment.report.safetyAlert")}
          </h3>
          <ul className="space-y-1.5">
            {redFlagsList.map((flag, idx) => (
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
            {getDurationDesc(durationKey)}
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
              {getPathwayName(p)}
            </span>
          ))}
        </div>
      </div>

      {/* Clinical Recommendations */}
      {localizedRecommendations.length > 0 && (
        <div className="p-5 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
          <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            🩺 {t("assessment.report.recommendationsHeading")}
          </h3>
          <ul className="space-y-2">
            {localizedRecommendations.map((rec, idx) => (
              <li key={idx} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-600)] flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Patient Intake Form */}
      <div className="p-6 rounded-2xl bg-white border border-[var(--color-surface-300)] shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--color-clinical-600)] flex items-center justify-center text-xl flex-shrink-0 border border-blue-100">
            👤
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">
              {t("assessment.intake.title")}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)]">
              {t("assessment.intake.subtitle")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Full Name */}
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="patient-name" className="block text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
              {t("assessment.intake.nameLabel")}{" "}
              <span className="text-[var(--color-alert-critical)]">*</span>
            </label>
            <input
              id="patient-name"
              type="text"
              required
              value={patientData.name}
              onChange={(e) => setPatientData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder={t("assessment.intake.namePlaceholder")}
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-surface-300)] bg-[var(--color-surface-50)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-clinical-500)] focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-1.5">
            <label htmlFor="patient-mobile" className="block text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
              {t("assessment.intake.mobileLabel")}{" "}
              <span className="text-[var(--color-alert-critical)]">*</span>
            </label>
            <input
              id="patient-mobile"
              type="tel"
              required
              value={patientData.mobile}
              onChange={(e) => setPatientData((prev) => ({ ...prev, mobile: e.target.value }))}
              placeholder={t("assessment.intake.mobilePlaceholder")}
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-surface-300)] bg-[var(--color-surface-50)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-clinical-500)] focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label htmlFor="patient-email" className="block text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
              {t("assessment.intake.emailLabel")}{" "}
              <span className="text-xs font-normal text-[var(--color-text-muted)]">
                {t("assessment.intake.optional")}
              </span>
            </label>
            <input
              id="patient-email"
              type="email"
              value={patientData.email}
              onChange={(e) => setPatientData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder={t("assessment.intake.emailPlaceholder")}
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-surface-300)] bg-[var(--color-surface-50)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-clinical-500)] focus:bg-white transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Action / Sharing Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border-2 border-[var(--color-clinical-200)] text-center space-y-4">
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
            {t("assessment.report.shareTitle")}
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] max-w-lg mx-auto">
            {t("assessment.report.directClinicNote")}
          </p>
        </div>

        {/* Conditional rendering: locked indicator vs transitioned buttons */}
        {!isValid ? (
          <div className="py-4 px-5 rounded-xl bg-white/80 border border-dashed border-[var(--color-clinical-300)] text-center max-w-md mx-auto animate-fade-in shadow-sm">
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">
              {t("assessment.intake.lockedTitle")}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
              {t("assessment.intake.lockedSubtitle")}
            </p>
          </div>
        ) : (
          <div className="transition-all duration-500 ease-out transform opacity-100 translate-y-0 scale-100">
            {/* Primary Share Buttons with contrasting hover states */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
              <Button
                label={t("assessment.report.shareWhatsApp")}
                variant="whatsapp"
                size="md"
                onClick={handleShareWhatsApp}
                disabled={!isValid}
              />
              <Button
                label={t("assessment.report.shareEmail")}
                variant="primary"
                size="md"
                onClick={handleShareEmail}
                disabled={!isValid}
              />
              <button
                onClick={handleCopy}
                disabled={!isValid}
                className="px-5 py-3 rounded-full border border-[var(--color-surface-300)] bg-white text-[var(--color-text-primary)] text-sm font-semibold hover:bg-[var(--color-surface-100)] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? `✅ ${t("assessment.report.copied")}` : `📋 ${t("assessment.report.copy")}`}
              </button>
            </div>
          </div>
        )}
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
        <span className="text-xs text-center">{t("assessment.report.disclaimer") || result.disclaimer}</span>
      </div>
    </div>
  );
}
