"use client";

import type { PainArea } from "@/data/painAreas";

interface Props {
  areas: PainArea[];
  answers: Record<string, string | string[] | number>;
  showRedFlags: boolean;
  onRestart: () => void;
}

const durationLabels: Record<string, string> = {
  "less-than-1-week": "Less than 1 week",
  "1-4-weeks": "1–4 weeks",
  "1-3-months": "1–3 months",
  "more-than-3-months": "More than 3 months",
  "comes-and-goes": "Comes and goes",
};

const characterLabels: Record<string, string> = {
  aching: "Aching", sharp: "Sharp / Stabbing", burning: "Burning",
  shooting: "Shooting", electric: "Electric / Tingling", stiff: "Stiff / Tight",
  "dull-aching": "Dull, aching", throbbing: "Throbbing", "tight-band": "Tight band",
};

export default function PainResults({ areas, answers, showRedFlags, onRestart }: Props) {
  const area = areas[0];
  const duration = durationLabels[answers.duration as string] || "Not specified";
  const character = characterLabels[answers.character as string] || "Not specified";
  const intensity = (answers.intensity as number) ?? "Not specified";
  const sensory = (answers.sensory as string[]) || [];
  const hasNumbness = sensory.includes("numbness");
  const hasWeakness = sensory.includes("weakness");
  const hasTingling = sensory.includes("tingling");

  // Generate educational information based on answers
  const educationalNotes: string[] = [];

  if (answers.radiation === "travels") {
    educationalNotes.push(
      "Pain that travels from one area to another can sometimes occur when nerves or nearby structures are irritated. There are several possible causes, and a clinical assessment may be required to determine the source."
    );
  }

  if (hasNumbness || hasTingling) {
    educationalNotes.push(
      "Numbness or tingling can indicate involvement of the nervous system. This does not necessarily mean something serious, but it is worth discussing with a healthcare professional."
    );
  }

  if (hasWeakness) {
    educationalNotes.push(
      "Weakness associated with pain should be evaluated by a healthcare professional to determine the cause and guide appropriate management."
    );
  }

  if (educationalNotes.length === 0) {
    educationalNotes.push(
      `Based on your responses, your ${area.name.toLowerCase()} has characteristics that can be associated with several possible conditions. A clinical assessment can help identify the specific cause and guide appropriate treatment.`
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onRestart} className="flex items-center gap-2 text-sm text-[var(--color-clinical-600)] font-medium mb-6 hover:text-[var(--color-clinical-700)]">
        ← Start over
      </button>

      {/* Red Flag Alert */}
      {showRedFlags && (
        <div className="mb-8 p-6 rounded-xl bg-red-50 border-2 border-[var(--color-alert-critical)]">
          <h3 className="text-xl font-bold text-[var(--color-alert-critical)] mb-3">🚨 Important</h3>
          <p className="text-red-800 font-medium mb-2">
            Your symptoms may require prompt medical assessment.
          </p>
          <p className="text-sm text-red-700">
            If you are experiencing emergency symptoms such as sudden severe weakness, loss of bladder or bowel control, chest pain with breathlessness, or other alarming symptoms, please seek urgent medical attention or contact your local emergency services.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="/clinic#book" className="px-5 py-2.5 rounded-full bg-[var(--color-alert-critical)] text-white font-semibold text-sm hover:bg-red-700 transition-colors">
              Contact the Clinic
            </a>
            <a href="tel:108" className="px-5 py-2.5 rounded-full border-2 border-[var(--color-alert-critical)] text-[var(--color-alert-critical)] font-semibold text-sm hover:bg-red-50 transition-colors">
              Emergency: Call 108
            </a>
          </div>
        </div>
      )}

      {/* Title */}
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Your Pain Profile</h2>

      {/* Pain Profile Summary */}
      <div className="mb-8 p-5 rounded-xl bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold mb-1">Pain Area</p>
            <p className="font-medium text-[var(--color-text-primary)]">{area.icon} {area.name}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold mb-1">Duration</p>
            <p className="font-medium text-[var(--color-text-primary)]">{duration}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold mb-1">Pain Character</p>
            <p className="font-medium text-[var(--color-text-primary)]">{character}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold mb-1">Intensity</p>
            <p className="font-medium text-[var(--color-text-primary)]">{typeof intensity === "number" ? `${intensity}/10` : intensity}</p>
          </div>
          {(hasNumbness || hasTingling || hasWeakness) && (
            <div className="col-span-2">
              <p className="text-xs text-[var(--color-text-muted)] uppercase font-semibold mb-1">Associated Symptoms</p>
              <div className="flex flex-wrap gap-2">
                {hasNumbness && <span className="px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-800 font-medium">Numbness</span>}
                {hasTingling && <span className="px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-800 font-medium">Tingling</span>}
                {hasWeakness && <span className="px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-800 font-medium">Weakness</span>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* What Could This Mean? */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">What Could This Mean?</h3>
        <div className="space-y-3">
          {educationalNotes.map((note, i) => (
            <p key={i} className="text-[var(--color-text-secondary)] leading-relaxed p-4 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]">
              {note}
            </p>
          ))}
        </div>
      </section>

      {/* Possible Causes */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">Common Possible Causes</h3>
        <p className="text-sm text-[var(--color-text-muted)] italic mb-3">Some common possible causes for {area.name.toLowerCase()} include:</p>
        <div className="space-y-2">
          {area.commonCauses.map((cause, i) => (
            <div key={i} className="p-3 rounded-lg bg-[var(--color-surface-50)] border border-[var(--color-surface-200)] text-sm text-[var(--color-text-secondary)]">
              {cause}
            </div>
          ))}
        </div>
      </section>

      {/* What Can You Try at Home */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-[var(--color-medical-700)] mb-3">What Can You Try at Home?</h3>
        <ul className="space-y-2">
          {area.selfCare.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-medical-500)] flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
        <p className="text-xs text-[var(--color-text-muted)] mt-3 italic">
          Speak with your doctor or pharmacist about whether medication is appropriate for you.
        </p>
      </section>

      {/* When to Seek Medical Attention */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">When to Seek Medical Attention</h3>
        <ul className="space-y-2">
          {area.whenToConsult.map((w, i) => (
            <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-clinical-500)] flex-shrink-0" />
              {w}
            </li>
          ))}
        </ul>
      </section>

      {/* How a Pain Physician May Help */}
      <section className="mb-8">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">How a Pain Physician May Help</h3>
        <p className="text-[var(--color-text-secondary)] mb-3">Treatment depends on the cause, severity, examination findings and individual patient needs.</p>
        <div className="flex flex-wrap gap-2">
          {area.treatmentOptions.map((t, i) => (
            <span key={i} className="px-2.5 py-1 text-xs font-medium rounded bg-[var(--color-surface-100)] text-[var(--color-text-secondary)] border border-[var(--color-surface-200)]">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Doctor CTA */}
      <div className="mt-10 p-8 rounded-xl bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-700)] text-white text-center">
        <h3 className="text-xl font-bold mb-2">Need Help With Your Pain?</h3>
        <p className="text-white/80 mb-1">Dr Shahnawaz F Shah</p>
        <p className="text-sm text-white/60 mb-6">Interventional Spine &amp; Pain Physician</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/clinic#book" className="px-6 py-3 rounded-full bg-white text-[var(--color-primary-900)] font-semibold hover:bg-[var(--color-surface-100)] transition-colors">
            Book an Appointment
          </a>
          <a href="/clinic" className="px-6 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
            Contact the Clinic
          </a>
          <a href={`/pain/${area.slug}`} className="px-6 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
            Explore More Information
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 text-xs text-[var(--color-text-muted)] leading-relaxed text-center">
        <p>
          This tool provides general educational information and does not diagnose medical conditions or
          replace an examination by a qualified healthcare professional.
        </p>
        <p className="mt-2">
          If you think you may be experiencing a medical emergency, seek urgent medical care rather than
          relying on this tool.
        </p>
      </div>
    </div>
  );
}
