"use client";

import { useState, useCallback } from "react";
import type { PainArea } from "@/data/painAreas";
import { useT } from "@/lib/useT";

interface Props {
  area: PainArea;
  allAreas: PainArea[];
  onComplete: (answers: Record<string, string | string[] | number>) => void;
  onBack: () => void;
}

export default function PainQuestionnaire({ area, allAreas, onComplete, onBack }: Props) {
  const t = useT();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});

  // Translation helpers
  const trQ = (qId: string) => t(`q.${qId}`);
  const trOpt = (qId: string, optVal: string) => t(`q.${qId}.${optVal}`);
  const trUI = (key: string) => t(`q.${key}`);

  // Merge questions from all selected areas (use first area's questionnaire, add multi-area question if needed)
  const questions = area.questionnaire.questions;

  const visibleQuestions = questions.filter((q) => {
    if (q.condition) return q.condition(answers);
    return true;
  });

  const question = visibleQuestions[currentQ];
  const isLast = currentQ >= visibleQuestions.length - 1;

  const setAnswer = useCallback((value: string | string[] | number) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }, [question]);

  const canAdvance = (() => {
    if (!question) return false;
    const val = answers[question.id];
    if (question.type === "scale") return val !== undefined;
    if (question.type === "multiple") return Array.isArray(val) && val.length > 0;
    return val !== undefined && val !== "";
  })();

  const handleNext = () => {
    if (isLast) {
      onComplete(answers);
    } else {
      setCurrentQ((c) => c + 1);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((c) => c - 1);
    else onBack();
  };

  const toggleMulti = (value: string) => {
    if (!question) return;
    const current = (answers[question.id] as string[]) || [];
    if (value === "none") {
      setAnswer(["none"]);
      return;
    }
    const next = current.filter((v) => v !== "none");
    if (next.includes(value)) {
      setAnswer(next.filter((v) => v !== value));
    } else {
      setAnswer([...next, value]);
    }
  };

  if (!question) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={handlePrev} className="flex items-center gap-2 text-sm text-[var(--color-clinical-600)] font-medium mb-6 hover:text-[var(--color-clinical-700)]">
        ← {currentQ > 0 ? trUI("previous") : trUI("back")}
      </button>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)] mb-2">
          <span>Question {currentQ + 1} {trUI("of")} {visibleQuestions.length}</span>
          <span>{Math.round(((currentQ + 1) / visibleQuestions.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-[var(--color-surface-200)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-clinical-500)] rounded-full transition-all"
            style={{ width: `${((currentQ + 1) / visibleQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Selected areas */}
      {allAreas.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {allAreas.map((a) => (
            <span key={a.id} className="px-2 py-0.5 text-xs rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)]">
              {a.icon} {a.name}
            </span>
          ))}
        </div>
      )}

      {/* Question */}
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">{trQ(question.id) || question.text}</h3>

      {/* Options */}
      {question.type === "single" && question.options && (
        <div className="space-y-2">
          {question.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setAnswer(opt.value)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                answers[question.id] === opt.value
                  ? "border-[var(--color-clinical-500)] bg-[var(--color-clinical-500)] bg-opacity-5 shadow-md"
                  : "border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)]"
              }`}
            >
              <span className="font-medium text-[var(--color-text-primary)]">{trOpt(question.id, opt.value) || opt.label}</span>
            </button>
          ))}
        </div>
      )}

      {question.type === "multiple" && question.options && (
        <div className="space-y-2">
          {question.options.map((opt) => {
            const selected = ((answers[question.id] as string[]) || []).includes(opt.value);
            return (
              <button
                key={opt.id}
                onClick={() => toggleMulti(opt.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  selected
                    ? "border-[var(--color-clinical-500)] bg-[var(--color-clinical-500)] bg-opacity-5"
                    : "border-[var(--color-surface-200)] bg-white hover:border-[var(--color-clinical-300)]"
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  selected ? "bg-[var(--color-clinical-500)] border-[var(--color-clinical-500)]" : "border-[var(--color-surface-300)]"
                }`}>
                  {selected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              <span className="font-medium text-[var(--color-text-primary)]">{trOpt(question.id, opt.value) || opt.label}</span>
              {opt.triggersRedFlag && (
                  <span className="ml-auto px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-700 font-medium">⚠️</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "scale" && (
        <div className="text-center">
          <div className="text-5xl font-bold text-[var(--color-clinical-600)] mb-2">
            {(answers[question.id] as number) ?? 5}
            <span className="text-lg text-[var(--color-text-muted)] font-normal">/10</span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            value={(answers[question.id] as number) ?? 5}
            onChange={(e) => setAnswer(parseInt(e.target.value))}
            className="w-full max-w-md mx-auto h-2 rounded-full appearance-none cursor-pointer"
            style={{ background: "linear-gradient(to right, var(--color-medical-500) 0%, var(--color-alert-warning) 50%, var(--color-alert-critical) 100%)" }}
            aria-label="Pain intensity scale"
          />
          <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-[var(--color-text-muted)]">
            <span>0 — {trUI("noPain")}</span>
            <span>10 — {trUI("worstPain")}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className="px-6 py-3 rounded-full bg-[var(--color-clinical-600)] text-white font-semibold hover:bg-[var(--color-clinical-700)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {isLast ? trUI("viewResults") : trUI("next")}
        </button>
      </div>
    </div>
  );
}
