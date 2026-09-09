"use client";

import { useState, useCallback } from "react";
import { wizardSteps, evaluateWizardAnswers } from "@/data/wizard";
import type { WizardResult, WizardStep } from "@/lib/types";
import { useT } from "@/lib/useT";
import Button from "@/components/ui/Button";
import AssessmentReport from "@/components/medical/AssessmentReport";

// Step indicator dots
function StepIndicator({
  current,
  total,
  answers,
}: {
  current: number;
  total: number;
  answers: Record<number, string | string[] | number>;
}) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 mb-8"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Step ${current} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const stepNum = i + 1;
        const isComplete = answers[stepNum] !== undefined;
        const isCurrent = stepNum === current;
        return (
          <div
            key={stepNum}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              isCurrent
                ? "bg-[var(--color-clinical-600)] scale-125 ring-2 ring-[var(--color-clinical-200)]"
                : isComplete
                ? "bg-[var(--color-medical-500)]"
                : "bg-[var(--color-surface-300)]"
            }`}
            title={isComplete ? `Step ${stepNum}: Complete` : `Step ${stepNum}`}
          />
        );
      })}
      <span className="ml-3 text-xs font-semibold text-[var(--color-text-muted)]">
        {current} / {total}
      </span>
    </div>
  );
}

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
          <span className="font-semibold text-[var(--color-clinical-600)] bg-[var(--color-clinical-50)] px-2 py-0.5 rounded-full border border-[var(--color-clinical-200)]">
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
              className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between gap-3 ${
                isSelected
                  ? "border-[var(--color-clinical-600)] bg-[var(--color-clinical-50)] text-[var(--color-text-primary)] shadow-sm ring-1 ring-[var(--color-clinical-500)]/30"
                  : "border-[var(--color-surface-200)] bg-white text-[var(--color-text-primary)] hover:border-[var(--color-clinical-300)] hover:bg-[var(--color-surface-50)]"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {opt.icon && (
                  <span className="text-xl flex-shrink-0" role="img" aria-hidden="true">
                    {opt.icon}
                  </span>
                )}
                <div className="min-w-0">
                  <span className="font-semibold text-sm block truncate">
                    {label}
                  </span>
                  {desc && (
                    <span className="text-xs text-[var(--color-text-muted)] block truncate">
                      {desc}
                    </span>
                  )}
                </div>
              </div>

              {/* Checkbox indicator */}
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected
                    ? "bg-[var(--color-clinical-600)] border-[var(--color-clinical-600)] text-white"
                    : "border-[var(--color-surface-300)] bg-white"
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
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              isSelected
                ? "border-[var(--color-clinical-600)] bg-[var(--color-clinical-50)] shadow-md ring-1 ring-[var(--color-clinical-500)]/30"
                : "border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)] hover:bg-[var(--color-surface-50)] shadow-sm"
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
      <div className="text-6xl font-black text-[var(--color-clinical-600)] mb-2 tracking-tight">
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
            className={`px-8 py-4 rounded-xl border-2 text-base font-bold transition-all ${
              isSelected
                ? opt.value === "yes"
                  ? "border-[var(--color-alert-warning)] bg-orange-50 text-[var(--color-alert-warning)] shadow-md ring-1 ring-orange-200"
                  : "border-[var(--color-medical-500)] bg-green-50 text-[var(--color-medical-700)] shadow-md ring-1 ring-green-200"
                : "border-[var(--color-surface-200)] bg-white text-[var(--color-text-primary)] hover:border-[var(--color-clinical-300)] hover:shadow-sm"
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

  if (!isOpen) {
    return (
      <section id="pain-wizard" className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="wizard-title">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
            {t("assessment.badge")}
          </p>
          <h2 id="wizard-title" className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            {t("assessment.title")}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8">
            {t("assessment.subtitle")}
          </p>
          <div className="flex justify-center">
            <Button
              label={t("assessment.start")}
              variant="primary"
              size="lg"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pain-wizard" className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="wizard-title">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h2 id="wizard-title" className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            {t("assessment.title")}
          </h2>
          <p className="disclaimer-badge justify-center mt-3">
            {t("assessment.disclaimerBadge")}
          </p>
        </div>

        {!result ? (
          <>
            <StepIndicator current={currentStep} total={totalSteps} answers={answers} />

            <div className="animate-fade-in">
              {/* Question Header */}
              <div className="mb-6">
                <p className="text-xs font-bold text-[var(--color-clinical-600)] uppercase tracking-wider mb-1">
                  {t("assessment.step")} {currentStep} {t("assessment.of")} {totalSteps}: {getStepTitle(step)}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                  {getStepQuestion(step)}
                </h3>
              </div>

              {/* Dynamic Step Input */}
              <div className="mb-8">
                {step.type === "multiselect" && (
                  <MultiSelectStep
                    step={step}
                    value={currentAnswer as string[] | undefined}
                    onChange={updateAnswer}
                  />
                )}
                {step.type === "select" && (
                  <SelectStep
                    step={step}
                    value={currentAnswer as string | undefined}
                    onChange={updateAnswer}
                  />
                )}
                {step.type === "range" && (
                  <RangeStep
                    step={step}
                    value={currentAnswer as number | undefined}
                    onChange={updateAnswer}
                  />
                )}
                {step.type === "yesno" && (
                  <YesNoStep
                    step={step}
                    value={currentAnswer as string | undefined}
                    onChange={updateAnswer}
                  />
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-[var(--color-text-secondary)] bg-[var(--color-surface-100)] hover:bg-[var(--color-surface-200)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← {t("assessment.previous")}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canAdvance}
                  className="px-7 py-3 rounded-full text-sm font-bold text-white bg-[var(--color-clinical-600)] hover:bg-[var(--color-clinical-700)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
                >
                  {currentStep === totalSteps
                    ? `${t("assessment.viewResults")} →`
                    : `${t("assessment.next")} →`}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Render Dedicated On-Screen Assessment Report Component */
          <AssessmentReport
            answers={answers}
            result={result}
            onStartOver={handleReset}
          />
        )}
      </div>
    </section>
  );
}
