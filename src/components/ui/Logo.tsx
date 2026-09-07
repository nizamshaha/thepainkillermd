import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  showText?: boolean;
}

export default function Logo({ size = "md", variant = "dark", showText = true }: LogoProps) {
  const iconSizes = { sm: 40, md: 48, lg: 64 };
  const titleSizes = { sm: "text-[10px]", md: "text-xs", lg: "text-sm" };
  const nameSizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };

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
        <div className="flex flex-col leading-tight">
          <span className={`${titleSizes[size]} tracking-[0.15em] uppercase font-medium ${
            isLight ? "text-white/70" : "text-[var(--color-text-muted)]"
          }`}>
            THE PAINKILLER MD
          </span>
          <span className={`font-bold ${nameSizes[size]} tracking-tight ${
            isLight ? "text-white" : "text-[var(--color-text-primary)]"
          }`}>
            Dr Shahnawaz F Shah
          </span>
        </div>
      )}
    </div>
  );
}
