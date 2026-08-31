import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
}

export default function Logo({ size = "md", variant = "dark", showText = true }: LogoProps) {
  const iconSizes = { sm: 32, md: 40, lg: 56 };
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };
  const subSizes = { sm: "text-[8px]", md: "text-[9px]", lg: "text-[10px]" };

  const iconSize = iconSizes[size];
  const isLight = variant === "light";

  return (
    <div className="flex items-center gap-2.5">
      {/* Logo Image */}
      <Image
        src="/logo.jpeg"
        alt="THE PAINKILLER MD Logo"
        width={iconSize}
        height={iconSize}
        className="rounded-lg object-contain"
        priority
      />

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold ${textSizes[size]} tracking-tight ${
            isLight ? "text-white" : "text-[var(--color-text-primary)]"
          }`}>
            THE PAINKILLER MD
          </span>
          <span className={`${subSizes[size]} tracking-wide ${
            isLight ? "text-white/60" : "text-[var(--color-text-muted)]"
          }`}>
            Evidence-Based Pain Medicine
          </span>
        </div>
      )}
    </div>
  );
}
