"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { PainArea } from "@/data/painAreas";
import { useT } from "@/lib/useT";

interface Props {
  areas: PainArea[];
  answers: Record<string, string | string[] | number>;
  onBack: () => void;
  pins?: Map<string, { anchor: { id: string; label: string; x: number; y: number }; customLabel?: string }[]>;
}

interface ReportData {
  patientName: string;
  patientPhone: string;
  painAreas: string;
  painPins: string;
  duration: string;
  intensity: number;
  painCharacter: string;
  radiation: string;
  aggravatingFactors: string;
  previousTreatment: string;
  medications: string;
  sensoryChanges: string;
  motorWeakness: string;
  redFlags: string;
  additionalNotes: string;
}

export default function PainReport({ areas, answers, onBack, pins }: Props) {
  const t = useT();
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Format pin locations from body map
  const pinLocations = useMemo(() => {
    if (!pins || pins.size === 0) return "";
    const allPins: string[] = [];
    pins.forEach((regionPins, regionId) => {
      const areaName = areas.find((a) => a.id === regionId)?.name || regionId;
      regionPins.forEach((pin) => {
        allPins.push(`${areaName}: ${pin.anchor.label}`);
      });
    });
    return allPins.join("; ");
  }, [pins, areas]);

  // Build report data from answers
  const [report, setReport] = useState<ReportData>(() => ({
    patientName: "",
    patientPhone: "",
    painAreas: areas.map((a) => a.name).join(", "),
    painPins: pinLocations,
    duration: formatDuration(answers.duration as string),
    intensity: (answers.intensity as number) ?? 5,
    painCharacter: formatCharacter(answers.character as string),
    radiation: formatRadiation(answers.radiation as string, answers.radiationDetail as string),
    aggravatingFactors: formatMulti(answers.worse as string[]),
    sensoryChanges: formatMulti(answers.sensory as string[]),
    motorWeakness: answers.motorWeakness === "yes" ? "Yes" : "No",
    redFlags: formatMulti(answers.redflags as string[]),
    previousTreatment: formatMulti(answers.previousTreatment as string[]),
    medications: formatMedication(answers.medications as string),
    additionalNotes: "",
  }));

  // Generate plain text report
  const plainTextReport = useMemo(() => {
    const lines = [
      "═══════════════════════════════════════",
      "   THE PAINKILLER MD",
      "   Patient Pain Assessment Report",
      "═══════════════════════════════════════",
      "",
      `Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`,
      "",
    ];

    if (report.patientName || report.patientPhone) {
      lines.push("─── PATIENT DETAILS ───");
      if (report.patientName) lines.push(`Name:  ${report.patientName}`);
      if (report.patientPhone) lines.push(`Phone: ${report.patientPhone}`);
      lines.push("");
    }

    lines.push("─── PAIN ASSESSMENT ───");
    lines.push(`Pain Area(s):      ${report.painAreas}`);
    if (report.painPins) lines.push(`Pain Location:     ${report.painPins}`);
    lines.push(`Duration:          ${report.duration}`);
    lines.push(`Intensity:         ${report.intensity}/10`);
    lines.push(`Pain Character:    ${report.painCharacter}`);
    lines.push(`Radiation:         ${report.radiation}`);
    lines.push(`Aggravating:       ${report.aggravatingFactors}`);
    lines.push(`Sensory Changes:   ${report.sensoryChanges}`);
    lines.push(`Weakness:          ${report.motorWeakness}`);
    lines.push(`Previous Treatment: ${report.previousTreatment}`);
    lines.push(`Medications:       ${report.medications}`);
    lines.push("");

    if (report.redFlags && report.redFlags !== "None") {
      lines.push("─── ⚠️ RED FLAGS ───");
      lines.push(report.redFlags);
      lines.push("");
    }

    if (report.additionalNotes) {
      lines.push("─── ADDITIONAL NOTES ───");
      lines.push(report.additionalNotes);
      lines.push("");
    }

    lines.push("═══════════════════════════════════════");
    lines.push("Generated via THE PAINKILLER MD");
    lines.push("thepainkillermd.in");
    lines.push("═══════════════════════════════════════");

    return lines.join("\n");
  }, [report]);

  // WhatsApp share
  const shareWhatsApp = useCallback(() => {
    const encoded = encodeURIComponent(plainTextReport);
    const url = `https://wa.me/?text=${encoded}`;
    window.open(url, "_blank");
  }, [plainTextReport]);

  // Email share
  const shareEmail = useCallback(() => {
    const subject = encodeURIComponent(`Pain Assessment Report — ${report.painAreas}`);
    const body = encodeURIComponent(plainTextReport);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [plainTextReport, report.painAreas]);

  // Copy to clipboard
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(plainTextReport);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = plainTextReport;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [plainTextReport]);

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-[var(--color-clinical-600)] font-medium mb-6 hover:text-[var(--color-clinical-700)]"
      >
        ← Back to results
      </button>

      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
        📋 Your Pain Report
      </h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-8">
        Review, edit, and share this report with Dr. Shahnawaz F Shah before your visit.
      </p>

      {/* ─── Report Card ─── */}
      <div ref={reportRef} className="bg-white rounded-2xl border border-[var(--color-surface-200)] shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">THE PAINKILLER MD</h3>
              <p className="text-sm text-white/60">{t("report.subtitle")}</p>
            </div>
            <div className="text-right text-sm text-white/60">
              <p>{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
              <p className="text-xs">Dr Shahnawaz F Shah</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Patient Details */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
                Patient Details
              </h4>
              <button
                onClick={() => setEditing(!editing)}
                className="text-xs text-[var(--color-clinical-600)] font-medium hover:underline"
              >
                {editing ? "Done" : "✏️ Edit"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[var(--color-text-muted)] mb-1 block">{t("report.fullName")}</label>
                {editing ? (
                  <input
                    type="text"
                    value={report.patientName}
                    onChange={(e) => setReport((r) => ({ ...r, patientName: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--color-surface-300)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clinical-500)]"
                  />
                ) : (
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {report.patientName || <span className="text-[var(--color-text-muted)] italic">Not provided</span>}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs text-[var(--color-text-muted)] mb-1 block">{t("report.phone")}</label>
                {editing ? (
                  <input
                    type="tel"
                    value={report.patientPhone}
                    onChange={(e) => setReport((r) => ({ ...r, patientPhone: e.target.value }))}
                    placeholder="Enter your phone"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--color-surface-300)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clinical-500)]"
                  />
                ) : (
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {report.patientPhone || <span className="text-[var(--color-text-muted)] italic">Not provided</span>}
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-[var(--color-surface-200)]" />

          {/* Pain Assessment */}
          <div>
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider mb-3">
              Pain Assessment
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <ReportField label={t("report.painArea")} value={report.painAreas} />
              <ReportField label={t("report.duration")} value={report.duration} />
              <ReportField
                label="Intensity"
                value={`${report.intensity}/10`}
                highlight={report.intensity >= 7 ? "red" : report.intensity >= 4 ? "orange" : undefined}
              />
              <ReportField label={t("report.painCharacter")} value={report.painCharacter} />
              <ReportField label={t("report.radiation")} value={report.radiation} />
              <ReportField label={t("report.weakness")} value={report.motorWeakness} />
            </div>
            {report.painPins && (
              <div className="mt-3">
                <ReportField label={t("report.painLocation")} value={report.painPins} />
              </div>
            )}
          </div>

          {/* Aggravating Factors, Sensory, Treatment & Medications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Aggravating Factors
              </h4>
              <p className="text-sm text-[var(--color-text-primary)]">{report.aggravatingFactors}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Sensory Changes
              </h4>
              <p className="text-sm text-[var(--color-text-primary)]">{report.sensoryChanges}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Previous Treatment
              </h4>
              <p className="text-sm text-[var(--color-text-primary)]">{report.previousTreatment}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Current Medications
              </h4>
              <p className="text-sm text-[var(--color-text-primary)]">{report.medications}</p>
            </div>
          </div>

          {/* Red Flags */}
          {report.redFlags && report.redFlags !== "None" && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <h4 className="text-sm font-bold text-red-700 mb-1">⚠️ Red Flags Detected</h4>
              <p className="text-sm text-red-600">{report.redFlags}</p>
            </div>
          )}

          {/* Additional Notes */}
          <div>
            <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
              Additional Notes
            </h4>
            {editing ? (
              <textarea
                value={report.additionalNotes}
                onChange={(e) => setReport((r) => ({ ...r, additionalNotes: e.target.value }))}
                placeholder="Add any additional information for the doctor..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-surface-300)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-clinical-500)] resize-none"
              />
            ) : (
              <p className="text-sm text-[var(--color-text-secondary)]">
                {report.additionalNotes || <span className="text-[var(--color-text-muted)] italic">No additional notes</span>}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[var(--color-surface-50)] border-t border-[var(--color-surface-200)] text-center">
          <p className="text-[10px] text-[var(--color-text-muted)]">
            Generated via THE PAINKILLER MD — thepainkillermd.in — Educational purposes only
          </p>
        </div>
      </div>

      {/* ─── Delivery Methods ─── */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 text-center">
          Share This Report
        </h3>
        <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">
          Choose how you&apos;d like to send this report to Dr. Shah
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* QR Code */}
          <button
            onClick={() => setShowQR(!showQR)}
            className="group p-5 rounded-xl border-2 border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-400)] hover:shadow-lg transition-all text-center"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center group-hover:bg-[var(--color-primary-100)] transition-colors">
              <svg className="w-6 h-6 text-[var(--color-primary-700)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
              </svg>
            </div>
            <p className="font-semibold text-[var(--color-text-primary)] text-sm">{t("report.qrCode")}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{t("report.generateQR")}</p>
          </button>

          {/* WhatsApp */}
          <button
            onClick={shareWhatsApp}
            className="group p-5 rounded-xl border-2 border-[var(--color-surface-200)] bg-white hover:border-green-400 hover:shadow-lg transition-all text-center"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <p className="font-semibold text-[var(--color-text-primary)] text-sm">{t("report.whatsapp")}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{t("report.sendVia")}</p>
          </button>

          {/* Email */}
          <button
            onClick={shareEmail}
            className="group p-5 rounded-xl border-2 border-[var(--color-surface-200)] bg-white hover:border-blue-400 hover:shadow-lg transition-all text-center"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="font-semibold text-[var(--color-text-primary)] text-sm">{t("report.email")}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{t("report.sendEmail")}</p>
          </button>
        </div>

        {/* Copy to clipboard */}
        <div className="mt-4 text-center">
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-100)] transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                Copy Report to Clipboard
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── QR Code Modal ─── */}
      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0" onClick={() => setShowQR(false)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-fade-in">
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--color-surface-100)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-surface-200)]"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Scan Report</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Show this QR code to Dr. Shah at the clinic
            </p>
            <div className="inline-block p-4 bg-white rounded-xl border border-[var(--color-surface-200)] shadow-sm">
              <QRCodeSVG
                value={plainTextReport}
                size={200}
                level="M"
                includeMargin={true}
                bgColor="#ffffff"
                fgColor="#0f172a"
              />
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-4">
              Contains your full pain assessment report
            </p>
          </div>
        </div>
      )}

      {/* ─── Disclaimer ─── */}
      <div className="mt-8 text-xs text-[var(--color-text-muted)] leading-relaxed text-center">
        <p>
          This report is generated for educational and informational purposes only. It does not constitute
          medical advice, diagnosis, or treatment. Always consult Dr. Shahnawaz F Shah for professional
          medical evaluation.
        </p>
      </div>
    </div>
  );
}

/* ─── Helper Components ──────────────────────────────────────── */

function ReportField({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "red" | "orange";
}) {
  return (
    <div className="p-3 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
      <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mb-1">
        {label}
      </p>
      <p
        className={`text-sm font-semibold ${
          highlight === "red"
            ? "text-red-600"
            : highlight === "orange"
            ? "text-orange-600"
            : "text-[var(--color-text-primary)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* ─── Formatting Helpers ─────────────────────────────────────── */

function formatDuration(val: string): string {
  const map: Record<string, string> = {
    "less-than-1-week": "Less than 1 week",
    "1-4-weeks": "1–4 weeks",
    "1-3-months": "1–3 months",
    "more-than-3-months": "More than 3 months",
    "comes-and-goes": "Comes and goes",
    acute: "Less than 2 weeks",
    subacute: "2 weeks to 3 months",
    chronic: "More than 3 months",
    intermittent: "Comes and goes",
  };
  return map[val] || val || "Not specified";
}

function formatCharacter(val: string): string {
  const map: Record<string, string> = {
    aching: "Aching",
    sharp: "Sharp / Stabbing",
    burning: "Burning",
    shooting: "Shooting",
    electric: "Electric / Tingling",
    stiff: "Stiff / Tight",
    "dull-aching": "Dull, aching",
    throbbing: "Throbbing",
    "tight-band": "Tight band",
    pins: "Pins & Needles",
    stabbing: "Stabbing",
    numbness: "Numbness",
  };
  return map[val] || val || "Not specified";
}

function formatRadiation(val: string, detail?: string): string {
  if (val === "stays" || val === "no") return "Stays in one area";
  if (val === "travels" || val === "yes") {
    if (detail) {
      const detailMap: Record<string, string> = {
        "below-knee": "Below the knee",
        "below-elbow": "Below the elbow",
        groin: "Groin area",
        buttock: "Buttock / Back of thigh",
        "shoulder-blade": "Between shoulder blades",
      };
      return `Travels to: ${detailMap[detail] || detail}`;
    }
    return "Travels to other areas";
  }
  return val || "Not specified";
}

function formatMulti(vals: string[] | undefined): string {
  if (!vals || vals.length === 0) return "None selected";
  if (vals.includes("none")) return "None";
  const labels: Record<string, string> = {
    movement: "Movement",
    sitting: "Prolonged sitting",
    standing: "Prolonged standing",
    lying: "Lying down",
    coughing: "Coughing / Sneezing",
    night: "Night time",
    cold: "Cold weather",
    touch: "Light touch",
    numbness: "Numbness",
    tingling: "Tingling",
    burning: "Burning sensation",
    weak: "Weakness",
    weakness: "Weakness",
    saddle: "Saddle anesthesia",
    bladder: "Bladder/bowel changes",
    progressive: "Progressive weakness",
    trauma: "Recent trauma",
    fever: "Fever / Weight loss",
    medication: "Painkillers / tablets",
    physiotherapy: "Physiotherapy",
    "hot-cold": "Hot / cold packs",
    massage: "Massage or manual therapy",
    injections: "Injections",
    surgery: "Surgery",
    rest: "Rest / inactivity",
    positions: "Specific positions",
    nothing: "Nothing specific",
  };
  return vals.map((v) => labels[v] || v).join(", ");
}

function formatMedication(val: string | undefined): string {
  const map: Record<string, string> = {
    none: "No medication",
    otc: "Over-the-counter painkillers",
    prescribed: "Prescribed pain medication",
    other: "Other medication",
  };
  return map[val || ""] || val || "Not specified";
}
