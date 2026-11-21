// Small stroke icon set used across the redesign (replaces emoji in UI chrome).
type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const PhoneIcon = ({ className = "w-5 h-5" }: P) => (
  <svg {...base} className={className} aria-hidden="true"><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const WhatsAppIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z" /></svg>
);
export const ArrowIcon = ({ className = "w-4 h-4" }: P) => (
  <svg {...base} className={className} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const PinIcon = ({ className = "w-5 h-5" }: P) => (
  <svg {...base} className={className} aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const ClockIcon = ({ className = "w-5 h-5" }: P) => (
  <svg {...base} className={className} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const ScanIcon = ({ className = "w-5 h-5" }: P) => (
  <svg {...base} className={className} aria-hidden="true"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" /><path d="M12 7v10M9 9.5h6M9 14.5h6" /></svg>
);
export const AlertIcon = ({ className = "w-5 h-5" }: P) => (
  <svg {...base} className={className} aria-hidden="true"><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4M12 17h.01" /></svg>
);
export const CalendarIcon = ({ className = "w-5 h-5" }: P) => (
  <svg {...base} className={className} aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
);
export const CheckIcon = ({ className = "w-4 h-4" }: P) => (
  <svg {...base} className={className} aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7" /></svg>
);
