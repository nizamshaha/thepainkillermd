"use client";

import { useEffect, useState } from "react";

// Hero headline that cycles through English, Hindi, Marathi and Gujarati,
// holding each for 3 seconds. All four are stacked in one grid cell so the
// height never jumps; only the active one is visible.
const LINES: { code: string; label: string; text: string[] }[] = [
  { code: "en", label: "English", text: ["Understand Your Pain.", "Treat the Cause.", "Restore Function."] },
  { code: "gu", label: "ગુજરાતી", text: ["તમારા દુખાવાને સમજો.", "કારણની સારવાર કરો.", "કાર્યક્ષમતા પુનઃસ્થાપિત કરો."] },
  { code: "hi", label: "हिन्दी", text: ["अपने दर्द को समझें।", "कारण का इलाज करें।", "कार्यक्षमता बहाल करें।"] },
  { code: "mr", label: "मराठी", text: ["तुमच्या वेदना समजून घ्या.", "कारणावर उपचार करा.", "कार्यक्षमता पुन्हा मिळवा."] },
];

const HOLD_MS = 3000;

export default function RotatingHeadline({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % LINES.length), HOLD_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div className={className} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Screen readers get the English headline once, not a moving target */}
      <h1 className="sr-only">{LINES[0].text.join(" ")}</h1>

      <div className="grid" aria-hidden="true">
        {LINES.map((l, n) => (
          <p
            key={l.code}
            lang={l.code}
            className={`rotating-line [grid-area:1/1] font-semibold text-[var(--ink)] ${n === i ? "is-on" : ""} ${
              l.code === "en"
                ? "text-[clamp(2.6rem,4.4vw+0.6rem,4.6rem)] leading-[1.02] tracking-[-0.035em]"
                : "text-[clamp(2.1rem,3.4vw+0.6rem,3.7rem)] leading-[1.28] tracking-[-0.01em]"
            }`}
          >
            {l.text.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>
        ))}
      </div>

      {/* Language indicator — also lets visitors jump to a language */}
      <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-1.5" role="tablist" aria-label="Headline language">
        {LINES.map((l, n) => (
          <button
            key={l.code}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => { setI(n); setPaused(true); }}
            className={`relative h-8 px-3 rounded-full text-[13px] font-medium overflow-hidden transition-colors ${
              n === i ? "text-white bg-[var(--purple)]" : "text-[var(--grey)] bg-[var(--mist)] hover:text-[var(--ink)]"
            }`}
          >
            {l.label}
            {n === i && !paused && <span key={`p-${i}`} className="lang-progress absolute left-0 bottom-0 h-[2px] bg-white/70" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
}
