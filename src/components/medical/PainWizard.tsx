"use client";

import { useState, useCallback } from "react";
import { wizardSteps, evaluateWizardAnswers } from "@/data/wizard";
import type { WizardResult, WizardStep } from "@/lib/types";
import { useT } from "@/lib/useT";
import Button from "@/components/ui/Button";
import AssessmentReport from "@/components/medical/AssessmentReport";
import LivePainFigure, { describePain } from "@/components/medical/LivePainFigure";

// Multi-select step (used for Pain Location, Pain Quality, Radiation, Aggravating, Relieving, Red Flags)
function MultiSelectStep({
  step,
  value,
  onChange,
}: {
  step: WizardStep;
  value?: string[];
  onChange: (v: string[]) => void;
}) {
  const t = useT();
  const selected = value || [];

  const toggle = (val: string) => {
    if (val === "none") {
      onChange(["none"]);
      return;
    }
    const next = selected.filter((v) => v !== "none");
    if (next.includes(val)) {
      onChange(next.filter((v) => v !== val));
    } else {
      onChange([...next, val]);
    }
  };

  const getOptionLabel = (val: string, fallback: string) => {
    const stepKey = step.key || (
      step.id === 1 ? "location" :
      step.id === 2 ? "quality" :
      step.id === 6 ? "radiationPattern" :
      step.id === 7 ? "aggravating" :
      step.id === 8 ? "sensory" :
      step.id === 10 ? "redFlags" : ""
    );
    const key = `assessment.options.${stepKey}.${val}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    if (step.id === 1) {
      const reg = t(`assessment.region.${val}`);
      if (reg && reg !== `assessment.region.${val}`) return reg;
    }
    if (step.id === 2) {
      const q = t(`assessment.quality.${val}`);
      if (q && q !== `assessment.quality.${val}`) return q;
    }
    return fallback;
  };

  const getOptionDesc = (val: string, fallback?: string) => {
    const stepKey = step.key || "";
    const key = `assessment.options.${stepKey}.${val}.desc`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return fallback || "";
  };

  const isCompactGrid = step.id === 1 || step.id === 2;

  return (
    <div className="space-y-3">
      {/* Helper indicating multi-selection count */}
      <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] px-1">
        <span>{t("assessment.selectMultiple")}</span>
        {selected.length > 0 && (
          <span className="font-semibold text-[var(--purple)] bg-[var(--lavender)] px-2.5 py-0.5 rounded-full pop" key={selected.length}>
            {selected.length} {t("assessment.selectedCount")}
          </span>
        )}
      </div>

      <div
        className={`grid gap-2.5 ${
          isCompactGrid
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
        role="group"
        aria-label={step.question}
      >
        {step.options?.map((opt) => {
          const isSelected = selected.includes(opt.value);
          const label = getOptionLabel(opt.value, opt.label);
          const desc = getOptionDesc(opt.value, opt.description);

          return (
            <button
              key={opt.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => toggle(opt.value)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex items-center justify-between gap-3 ${
                isSelected
                  ? "bg-white ring-2 ring-[var(--purple)] shadow-[var(--shadow-md)] text-[var(--ink)]"
                  : "bg-white ring-1 ring-[var(--hairline)] text-[var(--ink)] hover:ring-[var(--lilac)] hover:-translate-y-0.5"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {opt.icon && (
                  <span className="text-xl flex-shrink-0" role="img" aria-hidden="true">
                    {opt.icon}
                  </span>
                )}
                <div className="min-w-0">
                  <span className="font-semibold text-sm block leading-snug">
                    {label}
                  </span>
                  {desc && (
                    <span className="text-xs text-[var(--color-text-muted)] block">
                      {desc}
                    </span>
                  )}
                </div>
              </div>

              {/* Checkbox indicator */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected
                    ? "bg-[var(--purple)] text-white pop"
                    : "ring-1 ring-[var(--color-surface-300)] bg-white"
                }`}
              >
                {isSelected && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Select step (single select, e.g., Duration)
function SelectStep({
  step,
  value,
  onChange,
}: {
  step: WizardStep;
  value?: string;
  onChange: (v: string) => void;
}) {
  const t = useT();

  const getOptionLabel = (val: string, fallback: string) => {
    const stepKey = step.key || "duration";
    const key = `assessment.options.${stepKey}.${val}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    if (step.id === 3) {
      const dur = t(`assessment.duration.${val}`);
      if (dur && dur !== `assessment.duration.${val}`) return dur;
    }
    return fallback;
  };

  const getOptionDesc = (val: string, fallback?: string) => {
    const stepKey = step.key || "duration";
    const key = `assessment.options.${stepKey}.${val}.desc`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    return fallback || "";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label={step.question}>
      {step.options?.map((opt) => {
        const isSelected = value === opt.value;
        const label = getOptionLabel(opt.value, opt.label);
        const desc = getOptionDesc(opt.value, opt.description);

        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={`p-5 rounded-2xl text-left transition-all duration-300 ${
              isSelected
                ? "bg-white ring-2 ring-[var(--purple)] shadow-[var(--shadow-md)]"
                : "bg-white ring-1 ring-[var(--hairline)] hover:ring-[var(--lilac)] hover:-translate-y-0.5"
            }`}
          >
            {opt.icon && (
              <span className="text-xl block mb-1.5" role="img" aria-hidden="true">
                {opt.icon}
              </span>
            )}
            <span className="font-bold text-sm text-[var(--color-text-primary)] block">
              {label}
            </span>
            {desc && (
              <span className="text-xs text-[var(--color-text-muted)] mt-1 block">
                {desc}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// Range step (intensity 0-10)
function RangeStep({
  step,
  value,
  onChange,
}: {
  step: WizardStep;
  value?: number;
  onChange: (v: number) => void;
}) {
  const t = useT();
  const current = value ?? 5;

  const getIntensityLabel = (score: number) => {
    return t(`assessment.scale.${score}`) || `Intensity level ${score}`;
  };

  return (
    <div className="text-center py-4">
      <div key={current} className="pop text-7xl font-semibold mb-2 tracking-[-0.04em]" style={{ color: current <= 3 ? "#157a6e" : current <= 6 ? "#c27a0c" : "#c0283a" }}>
        {current}
        <span className="text-xl text-[var(--color-text-muted)] font-normal ml-1">/10</span>
      </div>
      <p className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
        {getIntensityLabel(current)}
      </p>
      <input
        type="range"
        min={step.min ?? 0}
        max={step.max ?? 10}
        value={current}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full max-w-md mx-auto h-3 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--color-medical-500) 0%, var(--color-alert-warning) 50%, var(--color-alert-critical) 100%)`,
        }}
        aria-label={`Pain intensity: ${current} out of 10`}
      />
      <div className="flex justify-between max-w-md mx-auto mt-3 text-xs font-semibold text-[var(--color-text-muted)]">
        <span>0 — {t("assessment.scale.0")}</span>
        <span>10 — {t("assessment.scale.10")}</span>
      </div>
    </div>
  );
}

// Yes/No step (radiation, weakness)
function YesNoStep({
  step,
  value,
  onChange,
}: {
  step: WizardStep;
  value?: string;
  onChange: (v: string) => void;
}) {
  const t = useT();

  const getOptionLabel = (val: string, fallback: string) => {
    const stepKey = step.key || (step.id === 5 ? "radiation" : step.id === 9 ? "motor" : "");
    const key = `assessment.options.${stepKey}.${val}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
    if (step.id === 5) {
      return val === "yes" ? t("assessment.yesno.radiates") : t("assessment.yesno.localized");
    }
    return fallback;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center" role="radiogroup" aria-label={step.question}>
      {step.options?.map((opt) => {
        const isSelected = value === opt.value;
        const label = getOptionLabel(opt.value, opt.label);

        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={`flex-1 px-8 py-5 rounded-2xl text-base font-semibold transition-all duration-300 ${
              isSelected
                ? "bg-white ring-2 ring-[var(--purple)] text-[var(--purple-deep)] shadow-[var(--shadow-md)]"
                : "bg-white ring-1 ring-[var(--hairline)] text-[var(--ink)] hover:ring-[var(--lilac)] hover:-translate-y-0.5"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function PainWizard() {
  const t = useT();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string | string[] | number>>({});
  const [result, setResult] = useState<WizardResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const step = wizardSteps.find((s) => s.id === currentStep) || wizardSteps[0];
  const totalSteps = wizardSteps.length;
  const currentAnswer = answers[currentStep];

  const canAdvance =
    currentAnswer !== undefined &&
    currentAnswer !== "" &&
    (!Array.isArray(currentAnswer) || currentAnswer.length > 0);

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
    } else {
      // Evaluate results
      setResult(evaluateWizardAnswers(answers));
    }
  }, [currentStep, totalSteps, answers]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(1);
    setAnswers({});
    setResult(null);
  }, []);

  const updateAnswer = (value: string | string[] | number) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }));
  };

  const getStepTitle = (s: WizardStep) => {
    if (s.key) {
      const translated = t(`assessment.titles.${s.key}`);
      if (translated && translated !== `assessment.titles.${s.key}`) return translated;
    }
    const legacy = t(`assessment.step${s.id}.title`);
    if (legacy && legacy !== `assessment.step${s.id}.title`) return legacy;
    return s.title;
  };

  const getStepQuestion = (s: WizardStep) => {
    if (s.key) {
      const translated = t(`assessment.questions.${s.key}`);
      if (translated && translated !== `assessment.questions.${s.key}`) return translated;
    }
    const legacy = t(`assessment.step${s.id}.question`);
    if (legacy && legacy !== `assessment.step${s.id}.question`) return legacy;
    return s.question;
  };

  const regions = (answers[1] as string[] | undefined) || [];
  const qualities = (answers[2] as string[] | undefined) || [];
  const intensity = answers[4] as number | undefined;
  const radiates = answers[5] === "yes";
  const radiationPattern = (answers[6] as string[] | undefined) || [];
  const progress = result ? 100 : Math.round(((currentStep - 1) / totalSteps) * 100);

  if (!isOpen) {
    return (
      <section id="pain-wizard" className="py-24 sm:py-32 bg-[var(--white)]" aria-labelledby="wizard-title">
        <div className="container-page">
          <div className="reveal tile overflow-hidden grid lg:grid-cols-2 items-center gap-10 p-8 sm:p-14 bg-[radial-gradient(90%_120%_at_100%_0%,#efe7fd_0%,#f4f1fb_60%)]">
            <div>
              <p className="kicker">Interactive assessment · 2 minutes</p>
              <h2 id="wizard-title" className="text-[var(--ink)]">{t("assessment.title")}</h2>
              <p className="mt-5 text-lg sm:text-xl text-[var(--grey)] max-w-xl">{t("assessment.subtitle")}</p>
              <ul className="mt-6 space-y-2 text-[15px] text-[var(--ink)]">
                <li className="flex gap-2"><span className="text-[var(--purple)]">●</span> Watch your pain appear on the body as you answer</li>
                <li className="flex gap-2"><span className="text-[var(--purple)]">●</span> {totalSteps} simple questions, tap to answer</li>
                <li className="flex gap-2"><span className="text-[var(--purple)]">●</span> Get a personal report you can save or share with Dr. Shah</li>
              </ul>
              <div className="mt-9">
                <Button label={t("assessment.start")} variant="primary" size="lg" onClick={() => setIsOpen(true)} />
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-white/70 p-6 ring-1 ring-white">
              <LivePainFigure regions={["back", "leg"]} qualities={["shooting"]} intensity={7} radiates />
              <p className="mt-4 text-center text-sm text-[var(--grey)]">Example: lower back pain that shoots down the leg</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pain-wizard" className="py-24 sm:py-32 bg-[var(--white)]" aria-labelledby="wizard-title">
      <div className="container-page">
        <div className="text-center mb-10">
          <h2 id="wizard-title" className="text-[var(--ink)]">{t("assessment.title")}</h2>
          <p className="disclaimer-badge justify-center mt-4">{t("assessment.disclaimerBadge")}</p>
        </div>

        {/* progress */}
        <div className="max-w-5xl mx-auto mb-8" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Assessment progress">
          <div className="flex justify-between text-sm text-[var(--grey)] mb-2">
            <span>{result ? "Your report" : `${t("assessment.step")} ${currentStep} ${t("assessment.of")} ${totalSteps} · ${getStepTitle(step)}`}</span>
            <span className="font-semibold text-[var(--purple)]">{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--mist)] overflow-hidden">
            <div className="h-full rounded-full bg-[linear-gradient(90deg,#8462c6,#5b2ea6)] transition-[width] duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className={`max-w-5xl mx-auto grid gap-6 ${result ? "" : "lg:grid-cols-[0.85fr_1.15fr]"}`}>
          {/* Live pain picture */}
          <aside className={`rounded-[1.75rem] bg-[var(--mist)] p-6 lg:sticky lg:top-20 self-start ${result ? "" : "hidden lg:block"} ${result ? "grid md:grid-cols-[auto_1fr] gap-6 items-center w-full max-w-2xl mx-auto" : ""}`} aria-live="polite">
            <div className={result ? "md:w-[260px]" : ""}>
              <LivePainFigure regions={regions} qualities={qualities} intensity={intensity} radiates={radiates} radiationPattern={radiationPattern} />
            </div>
            <div>
              <p className={`text-sm font-semibold text-[var(--purple)] ${result ? "" : "mt-6 text-center"}`}>Your pain picture</p>
              <p className={`mt-1 text-[15px] text-[var(--ink)] ${result ? "" : "text-center"}`}>{describePain({ regions, qualities, intensity, radiates })}</p>
            </div>
          </aside>

          {!result ? (
            <div className="rounded-[1.75rem] bg-white ring-1 ring-[var(--hairline)] p-6 sm:p-8 shadow-[var(--shadow-md)]">
              {/* compact live picture for phones */}
              <div className="lg:hidden -mx-2 -mt-2 mb-5 rounded-2xl bg-[var(--mist)] p-3 flex items-center gap-3">
                <div className="w-[132px] shrink-0"><LivePainFigure regions={regions} qualities={qualities} intensity={intensity} radiates={radiates} radiationPattern={radiationPattern} compact /></div>
                <p className="text-[13px] leading-snug text-[var(--ink)]"><span className="block font-semibold text-[var(--purple)]">Your pain picture</span>{describePain({ regions, qualities, intensity, radiates })}</p>
              </div>
              <div key={currentStep} className="step-in">
                <h3 className="text-2xl sm:text-[1.75rem] !leading-tight text-[var(--ink)] mb-6">{getStepQuestion(step)}</h3>
                <div className="mb-8">
                  {step.type === "multiselect" && (
                    <MultiSelectStep step={step} value={currentAnswer as string[] | undefined} onChange={updateAnswer} />
                  )}
                  {step.type === "select" && (
                    <SelectStep step={step} value={currentAnswer as string | undefined} onChange={updateAnswer} />
                  )}
                  {step.type === "range" && (
                    <RangeStep step={step} value={currentAnswer as number | undefined} onChange={updateAnswer} />
                  )}
                  {step.type === "yesno" && (
                    <YesNoStep step={step} value={currentAnswer as string | undefined} onChange={updateAnswer} />
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[var(--hairline)] mt-2 pt-6">
                <Button type="button" onClick={handlePrev} disabled={currentStep === 1} label={t("assessment.previous")} variant="outline" size="md" />
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!canAdvance}
                  label={currentStep === totalSteps ? t("assessment.viewResults") : t("assessment.next")}
                  variant="primary"
                  size="md"
                />
              </div>
            </div>
          ) : (
            <div className="step-in">
              <AssessmentReport answers={answers} result={result} onStartOver={handleReset} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
