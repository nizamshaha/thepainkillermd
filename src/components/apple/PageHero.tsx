import type { ReactNode } from "react";

// Apple-style page header used by every inner page: soft lavender stage,
// centred headline that fades in line by line, optional actions.
export default function PageHero({
  kicker,
  title,
  subtitle,
  children,
  align = "center",
}: {
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <section className="relative overflow-hidden bg-[var(--white)]">
      <div className="pointer-events-none absolute left-1/2 -top-64 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#ece3fd,transparent)]" aria-hidden="true" />
      <div className={`container-page relative pt-12 pb-14 sm:pt-16 sm:pb-20 ${center ? "text-center" : ""}`}>
        {kicker && <p className="hero-line kicker">{kicker}</p>}
        <h1 className={`hero-line text-[var(--ink)] max-w-[18ch] ${center ? "mx-auto" : ""} !text-[clamp(2.4rem,3.6vw+0.8rem,4.25rem)]`} style={{ animationDelay: "100ms" }}>
          {title}
        </h1>
        {subtitle && (
          <p className={`hero-line mt-5 max-w-2xl text-[clamp(1.05rem,0.5vw+0.95rem,1.3rem)] leading-[1.5] text-[var(--grey)] ${center ? "mx-auto" : ""}`} style={{ animationDelay: "200ms" }}>
            {subtitle}
          </p>
        )}
        {children && (
          <div className={`hero-line mt-8 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`} style={{ animationDelay: "300ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
