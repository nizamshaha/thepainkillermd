"use client";

import { useState, useCallback, useMemo } from "react";
import { allPainAreas } from "@/data/painAreasFull";
import { searchPainAreas } from "@/data/painAreas";
import type { PainArea } from "@/data/painAreas";
import { useT } from "@/lib/useT";
import PainBody from "./PainBody";
import PainDetailPanel from "./PainDetailPanel";
import PainQuestionnaire from "./PainQuestionnaire";
import PainResults from "./PainResults";
import PainReport from "./PainReport";
import Button from "@/components/ui/Button";

type NavigatorState = "explore" | "detail" | "questionnaire" | "results" | "report";

interface PinData {
  anchor: { id: string; label: string; x: number; y: number };
  customLabel?: string;
}

export default function PainNavigator() {
  const t = useT();
  const [view, setView] = useState<"body" | "list">("body");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<PainArea[]>([]);
  const [state, setState] = useState<NavigatorState>("explore");
  const [showRedFlags, setShowRedFlags] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, string | string[] | number>>({});
  const [regionPins, setRegionPins] = useState<Map<string, PinData[]>>(new Map());

  const filteredAreas = useMemo(() => {
    if (!searchQuery.trim()) return allPainAreas;
    return searchPainAreas(searchQuery);
  }, [searchQuery]);

  const selectArea = useCallback((area: PainArea) => {
    setSelectedAreas((prev) => {
      const exists = prev.find((a) => a.id === area.id);
      if (exists) return prev.filter((a) => a.id !== area.id);
      return [...prev, area];
    });
  }, []);

  const removeArea = useCallback((id: string) => {
    setSelectedAreas((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const startQuestionnaire = useCallback(() => {
    if (selectedAreas.length > 0) {
      setState("questionnaire");
    }
  }, [selectedAreas]);

  const showResults = useCallback((answers: Record<string, string | string[] | number>) => {
    setQuestionnaireAnswers(answers);
    // Check for red flags
    const hasRedFlag = Object.entries(answers).some(([key, val]) => {
      if (Array.isArray(val)) {
        return val.some((v) => {
          const area = selectedAreas[0];
          const q = area?.questionnaire.questions.find((q) => q.id === key);
          const opt = q?.options?.find((o) => o.value === v);
          return opt?.triggersRedFlag;
        });
      }
      return false;
    });
    if (hasRedFlag) {
      setShowRedFlags(true);
    }
    setState("results");
  }, [selectedAreas]);

  const handlePinsChange = useCallback((pins: Map<string, PinData[]>) => {
    setRegionPins(pins);
  }, []);

  const reset = useCallback(() => {
    setSelectedAreas([]);
    setState("explore");
    setQuestionnaireAnswers({});
    setShowRedFlags(false);
    setRegionPins(new Map());
  }, []);

  return (
    <div className="w-full">
      {/* Explore State */}
      {state === "explore" && (
        <>
          {/* Search */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("navUI.searchPlaceholder")}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--color-surface-300)] bg-white text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-clinical-500)] focus:ring-2 focus:ring-[var(--color-clinical-500)] focus:ring-opacity-20 transition-all"
                aria-label="Search pain areas"
              />
            </div>
          </div>

          {/* Body Map */}
          <PainBody areas={filteredAreas} selectedIds={selectedAreas.map((a) => a.id)} onSelect={selectArea} onPinsChange={handlePinsChange} />

          {/* Selected Areas */}
          {selectedAreas.length > 0 && (
            <div className="mt-8 p-6 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-surface-200)] max-w-3xl mx-auto animate-slide-up">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">{t("navUI.selectedPainAreas")}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedAreas.map((area) => (
                  <span key={area.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-sm font-medium border border-[var(--color-primary-200)]">
                    {area.icon} {area.name}
                    <button onClick={() => removeArea(area.id)} className="ml-1 w-4 h-4 rounded-full bg-[var(--color-primary-200)] text-[var(--color-primary-700)] text-xs flex items-center justify-center hover:bg-[var(--color-primary-300)]" aria-label={`Remove ${area.name}`}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <Button
                  label={t("navUI.letsUnderstand")}
                  onClick={startQuestionnaire}
                  variant="primary"
                  size="md"
                />
                <Button
                  label={t("navUI.viewInformation")}
                  onClick={() => { setState("detail"); }}
                  variant="outline"
                  size="md"
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Detail Panel */}
      {state === "detail" && selectedAreas.length > 0 && (
        <PainDetailPanel areas={selectedAreas} onBack={reset} onStartQuestionnaire={startQuestionnaire} />
      )}

      {/* Questionnaire */}
      {state === "questionnaire" && selectedAreas.length > 0 && (
        <PainQuestionnaire
          area={selectedAreas[0]}
          allAreas={selectedAreas}
          onComplete={showResults}
          onBack={() => setState("explore")}
        />
      )}

      {/* Results */}
      {state === "results" && selectedAreas.length > 0 && (
        <div>
          <PainResults
            areas={selectedAreas}
            answers={questionnaireAnswers}
            showRedFlags={showRedFlags}
            onRestart={reset}
          />
          {/* Generate Report CTA */}
          <div className="max-w-3xl mx-auto mt-8 p-6 rounded-xl bg-gradient-to-r from-[var(--color-primary-50)] to-[var(--color-clinical-50)] border border-[var(--color-primary-200)] text-center">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
              {t("navUI.generateReportTitle")}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              {t("navUI.generateReportDesc")}
            </p>
            <button
              onClick={() => setState("report")}
              className="px-8 py-3 rounded-full bg-[var(--color-clinical-600)] text-white font-semibold hover:bg-[var(--color-clinical-700)] transition-colors shadow-lg"
            >
              {t("navUI.generateMyReport")}
            </button>
          </div>
        </div>
      )}

      {/* Report */}
      {state === "report" && selectedAreas.length > 0 && (
        <PainReport
          areas={selectedAreas}
          answers={questionnaireAnswers}
          onBack={() => setState("results")}
          pins={regionPins}
        />
      )}
    </div>
  );
}
