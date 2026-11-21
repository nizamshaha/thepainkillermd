import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
}

// Brand lock-up: the clinic wordmark (kept on its own white tile so its
// gradient background never clashes) + Dr. Shah's name set in the display serif.
export default function Logo({ size = "md", variant = "dark", showText = true }: LogoProps) {
  const heights = { sm: 34, md: 42, lg: 52 };
  const h = heights[size];
  const w = Math.round(h * (1080 / 488));
  const isLight = variant === "light";

  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="shrink-0 rounded-[10px] overflow-hidden bg-white ring-1 ring-black/5 shadow-[0_2px_6px_-2px_rgba(23,20,46,0.2)]">
        <Image src="/logo.jpeg" alt="THE PAINKILLER MD" width={w} height={h} className="block object-cover" style={{ width: w, height: h }} priority />
      </span>

      {showText && (
        <span className={`${isLight ? "flex" : "hidden min-[440px]:flex"} flex-col leading-none min-w-0 pl-3 border-l ${isLight ? "border-white/15" : "border-[var(--line)]"}`}>
          <span className={`font-display ${size === "lg" ? "text-[1.6rem]" : "text-[1.3rem]"} whitespace-nowrap ${isLight ? "text-white" : "text-[var(--ink)]"}`}>
            Dr. Shahnawaz F Shah
          </span>
          <span className={`mt-1 text-[12px] whitespace-nowrap ${isLight ? "text-white/60" : "text-[var(--color-text-muted)]"}`}>
            Spine &amp; pain physician
          </span>
        </span>
      )}
    </div>
  );
}
