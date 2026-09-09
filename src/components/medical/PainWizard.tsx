"use client";

import { useState, useCallback } from "react";
import { wizardSteps, evaluateWizardAnswers } from "@/data/wizard";
import type { WizardResult } from "@/lib/types";
import Button from "@/components/ui/Button";

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
    <div className="flex items-center justify-center gap-1.5 mb-8" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        const stepNum = i + 1;
        const isComplete = answers[stepNum] !== undefined;
        const isCurrent = stepNum === current;
        return (
          <div
            key={stepNum}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              isCurrent
                ? "bg-[var(--color-clinical-500)] scale-125"
                : isComplete
                ? "bg-[var(--color-medical-500)]"
                : "bg-[var(--color-surface-300)]"
            }`}
            title={isComplete ? `Step ${stepNum}: Complete` : `Step ${stepNum}`}
          />
        );
      })}
      <span className="ml-3 text-sm text-[var(--color-text-muted)]">
        {current} / {total}
      </span>
    </div>
  );
}

// Select step
function SelectStep({
  step,
  value,
  onChange,
}: {
  step: (typeof wizardSteps)[0];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="radiogroup" aria-label={step.question}>
      {step.options?.map((opt) => (
        <button
          key={opt.id}
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`p-4 rounded-xl border-2 text-left transition-all ${
            value === opt.value
              ? "border-[var(--color-clinical-500)] bg-[var(--color-clinical-500)] bg-opacity-5 shadow-md"
              : "border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)] hover:shadow-sm"
          }`}
        >
          {opt.icon && (
            <span className="text-xl block mb-1" role="img" aria-hidden="true">
              {opt.icon}
            </span>
          )}
          <span className="font-medium text-sm text-[var(--color-text-primary)] block">
            {opt.label}
          </span>
          {opt.description && (
            <span className="text-xs text-[var(--color-text-muted)] mt-0.5 block">
              {opt.description}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// Multi-select step
function MultiSelectStep({
  step,
  value,
  onChange,
}: {
  step: (typeof wizardSteps)[0];
  value?: string[];
  onChange: (v: string[]) => void;
}) {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label={step.question}>
      {step.options?.map((opt) => (
        <button
          key={opt.id}
          role="checkbox"
          aria-checked={selected.includes(opt.value)}
          onClick={() => toggle(opt.value)}
          className={`p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
            selected.includes(opt.value)
              ? "border-[var(--color-clinical-500)] bg-[var(--color-clinical-500)] bg-opacity-5"
              : "border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)]"
          }`}
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
              selected.includes(opt.value)
                ? "bg-[var(--color-clinical-500)] border-[var(--color-clinical-500)]"
                : "border-[var(--color-surface-300)]"
            }`}
          >
            {selected.includes(opt.value) && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium text-[var(--color-text-primary)]">
            {opt.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// Range step
function RangeStep({
  step,
  value,
  onChange,
}: {
  step: (typeof wizardSteps)[0];
  value?: number;
  onChange: (v: number) => void;
}) {
  const current = value ?? 5;
  const labels: Record<number, string> = {
    0: "No pain",
    1: "Barely noticeable",
    2: "Mild",
    3: "Uncomfortable",
    4: "Moderate",
    5: "Noticeable",
    6: "Intense",
    7: "Severe",
    8: "Very severe",
    9: "Nearly unbearable",
    10: "Worst possible",
  };

  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-[var(--color-clinical-600)] mb-2">
        {current}
        <span className="text-lg text-[var(--color-text-muted)] font-normal">/10</span>
      </div>
      <p className="text-lg font-medium text-[var(--color-text-primary)] mb-6">
        {labels[current] || ""}
      </p>
      <input
        type="range"
        min={step.min || 0}
        max={step.max || 10}
        value={current}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full max-w-md mx-auto h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--color-medical-500) 0%, var(--color-alert-warning) 50%, var(--color-alert-critical) 100%)`,
        }}
        aria-label={`Pain intensity: ${current} out of 10`}
      />
      <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-[var(--color-text-muted)]">
        <span>0 — No pain</span>
        <span>10 — Worst pain</span>
      </div>
    </div>
  );
}

// Yes/No step
function YesNoStep({
  step,
  value,
  onChange,
}: {
  step: (typeof wizardSteps)[0];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center" role="radiogroup" aria-label={step.question}>
      {step.options?.map((opt) => (
        <button
          key={opt.id}
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-8 py-4 rounded-xl border-2 text-lg font-medium transition-all ${
            value === opt.value
              ? opt.value === "yes"
                ? "border-[var(--color-alert-warning)] bg-orange-50 text-[var(--color-alert-warning)] shadow-md"
                : "border-[var(--color-medical-500)] bg-green-50 text-[var(--color-medical-700)] shadow-md"
              : "border-[var(--color-surface-200)] bg-white text-[var(--color-text-primary)] hover:border-[var(--color-clinical-300)] hover:shadow-sm"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// Results panel
function WizardResults({ result }: { result: WizardResult }) {
  return (
    <div className="animate-slide-up space-y-6">
      {/* Red Flags Alert */}
      {result.redFlags.length > 0 && (
        <div className="p-5 rounded-xl bg-red-50 border-2 border-[var(--color-alert-critical)] border-opacity-30">
          <h3 className="text-lg font-bold text-[var(--color-alert-critical)] mb-3 flex items-center gap-2">
            🚨 Important Safety Alerts
          </h3>
          <ul className="space-y-2">
            {result.redFlags.map((flag, i) => (
              <li key={i} className="text-sm text-red-800 font-medium">
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      <div className="p-5 rounded-xl bg-white border border-[var(--color-surface-200)] shadow-sm">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">
          Educational Pain Pattern Summary
        </h3>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Pathways */}
      <div className="p-5 rounded-xl bg-white border border-[var(--color-surface-200)] shadow-sm">
        <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
          Identified Pain Pathways
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.possiblePathways.map((p) => (
            <span
              key={p}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border pathway-${p}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Patterns */}
      {result.patterns.length > 0 && (
        <div className="p-5 rounded-xl bg-white border border-[var(--color-surface-200)] shadow-sm">
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
            Clinical Patterns Identified
          </h3>
          <ul className="space-y-2">
            {result.patterns.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-500)] flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div className="p-5 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
        <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
          Recommendations
        </h3>
        <ul className="space-y-2">
          {result.recommendations.map((r, i) => (
            <li key={i} className="text-sm text-[var(--color-text-secondary)]">
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer-badge justify-center w-full py-3">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs text-center">{result.disclaimer}</span>
      </div>
    </div>
  );
}

export default function PainWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string | string[] | number>>({});
  const [result, setResult] = useState<WizardResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const step = wizardSteps.find((s) => s.id === currentStep)!;
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
      // Evaluate
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

  if (!isOpen) {
    return (
      <section id="pain-wizard" className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="wizard-title">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-2">
            Interactive Assessment
          </p>
          <h2 id="wizard-title" className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
            Find Your Pain
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8">
            A 10-step guided assessment that helps you understand your pain patterns.
            This is an educational tool — not a diagnostic device.
          </p>
          <div className="flex justify-center">
            <Button
              label="Start Assessment"
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
          <h2 id="wizard-title" className="text-2xl font-bold text-[var(--color-text-primary)]">
            Find Your Pain
          </h2>
          <p className="disclaimer-badge justify-center mt-3">
            Educational tool — not a diagnostic device
          </p>
        </div>

        <StepIndicator current={currentStep} total={totalSteps} answers={answers} />

        {!result ? (
          <div className="animate-fade-in">
            {/* Question */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[var(--color-clinical-600)] uppercase tracking-wider mb-1">
                Step {currentStep}: {step.title}
              </p>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                {step.question}
              </h3>
            </div>

            {/* Input */}
            <div className="mb-8">
              {step.type === "select" && (
                <SelectStep step={step} value={currentAnswer as string | undefined} onChange={updateAnswer} />
              )}
              {step.type === "multiselect" && (
                <MultiSelectStep step={step} value={currentAnswer as string[] | undefined} onChange={updateAnswer} />
              )}
              {step.type === "range" && (
                <RangeStep step={step} value={currentAnswer as number | undefined} onChange={updateAnswer} />
              )}
              {step.type === "yesno" && (
                <YesNoStep step={step} value={currentAnswer as string | undefined} onChange={updateAnswer} />
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-100)] hover:bg-[var(--color-surface-200)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!canAdvance}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[var(--color-clinical-600)] hover:bg-[var(--color-clinical-700)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {currentStep === totalSteps ? "View Results →" : "Next →"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <WizardResults result={result} />
            <div className="mt-8 text-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-100)] hover:bg-[var(--color-surface-200)] transition-colors"
              >
                Start Over
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
