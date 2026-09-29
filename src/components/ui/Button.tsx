"use client";

import React from "react";
import Link from "next/link";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "light"
  | "whatsapp"
  | "outline"
  | "ghost";

export interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  newTab?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode | boolean;
  iconPosition?: "left" | "right";
  rounded?: number;
  hoverTextColor?: string;
  ariaLabel?: string;
}

/**
 * 3D Glassmorphism Button for The Painkiller MD.
 * Features tactile multi-layer lighting, top specular light reflections,
 * frosted backdrop-blur glassmorphism, and physical active:scale-95 press mechanics.
 */
export default function Button({
  label,
  children,
  variant = "primary",
  href,
  link,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  newTab = false,
  size = "md",
  icon = true,
  iconPosition = "right",
  ariaLabel,
}: ButtonProps) {
  const targetLink = href || link;
  const content = children || label;

  // Size specifications
  const sizeStyles = {
    sm: {
      btn: "px-4 py-2 text-xs tracking-wide gap-2",
      badge: "w-5 h-5",
      iconSize: 11,
    },
    md: {
      btn: "px-6 py-3 text-sm tracking-wide gap-2.5",
      badge: "w-6 h-6",
      iconSize: 13,
    },
    lg: {
      btn: "px-7 py-3.5 text-base tracking-wide gap-3",
      badge: "w-7 h-7",
      iconSize: 15,
    },
  }[size];

  // Variant technical styling matching 3D glass specifications
  const variantStyles: Record<
    ButtonVariant,
    {
      base: string;
      hover: string;
      active: string;
      text: string;
      border: string;
      sheen: string;
      badge: string;
      badgeHover: string;
      shadow: string;
      shadowHover: string;
      shadowActive: string;
    }
  > = {
    // Liquid Glass Primary — Dark Navy Blue Base with Refractive Blue Bleed & Physical 3D Casing
    primary: {
      base: "btn-liquid-glass",
      hover: "",
      active: "",
      text: "text-white font-semibold",
      border: "",
      sheen: "",
      badge: "bg-white/15 text-white border border-white/25 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.4)]",
      badgeHover: "group-hover:bg-white/25 group-hover:text-white group-hover:border-white/45",
      shadow: "",
      shadowHover: "",
      shadowActive: "",
    },

    // Frosted Light 3D Glass — High-contrast on dark surfaces (Hero, Dark CTA banners)
    light: {
      base: "bg-gradient-to-br from-white/95 via-white/88 to-blue-50/80",
      hover: "hover:from-white hover:to-white hover:bg-white",
      active: "active:bg-slate-100",
      text: "text-[#0c1929] font-bold",
      border: "border border-white/70 hover:border-white",
      sheen: "from-white/0 via-white to-white/0",
      badge: "bg-[#0c1929]/10 text-[#0c1929] border border-[#0c1929]/15",
      badgeHover: "group-hover:bg-[#0c1929] group-hover:text-white",
      shadow:
        "shadow-[inset_0px_1px_2px_rgba(255,255,255,0.9),inset_0px_-2px_4px_rgba(0,0,0,0.08),0_8px_32px_0_rgba(31,38,135,0.15),0_2px_6px_rgba(0,0,0,0.04)]",
      shadowHover:
        "hover:shadow-[inset_0px_1px_3px_rgba(255,255,255,1),inset_0px_-2px_4px_rgba(0,0,0,0.12),0_12px_36px_0_rgba(31,38,135,0.22),0_4px_10px_rgba(0,0,0,0.06)]",
      shadowActive:
        "active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.15),inset_0px_-1px_2px_rgba(255,255,255,0.4),0_4px_14px_0_rgba(31,38,135,0.08)]",
    },

    // Pure Frosted Translucent Glass — Secondary actions
    secondary: {
      base: "bg-white/15",
      hover: "hover:bg-white/28",
      active: "active:bg-white/35",
      text: "text-white font-semibold [text-shadow:0px_1px_2px_rgba(0,0,0,0.5)]",
      border: "border border-white/20 hover:border-white/40",
      sheen: "from-white/0 via-white/60 to-white/0",
      badge: "bg-white/15 text-white border border-white/25 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.3)]",
      badgeHover: "group-hover:bg-white/30 group-hover:text-white group-hover:border-white/45",
      shadow:
        "shadow-[inset_0px_3px_5px_rgba(255,255,255,0.35),inset_0px_1px_1px_rgba(255,255,255,0.7),inset_0px_-3px_5px_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.15)]",
      shadowHover:
        "hover:shadow-[inset_0px_3px_5px_rgba(255,255,255,0.45),inset_0px_1px_1px_rgba(255,255,255,0.85),inset_0px_-3px_5px_rgba(0,0,0,0.3),0_12px_32px_rgba(0,0,0,0.22)]",
      shadowActive:
        "active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.3),inset_0px_-1px_2px_rgba(255,255,255,0.2),0_4px_14px_rgba(0,0,0,0.1)]",
    },

    // WhatsApp Emerald Liquid Glass
    whatsapp: {
      base: "bg-gradient-to-b from-[#0e5c38] via-[#09482b] to-[#05301c]",
      hover: "hover:from-[#137346] hover:via-[#0c5936] hover:to-[#073d24]",
      active: "active:from-[#062c19] active:to-[#03190e]",
      text: "text-white font-semibold [text-shadow:0px_1px_2px_rgba(0,0,0,0.5)]",
      border: "border border-white/20 hover:border-white/35",
      sheen: "from-white/0 via-white/80 to-white/0",
      badge: "bg-white/15 text-white border border-white/25 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.4)]",
      badgeHover: "group-hover:bg-white/25 group-hover:text-white group-hover:border-white/45",
      shadow:
        "shadow-[inset_0px_4px_6px_rgba(255,255,255,0.4),inset_0px_1px_1px_rgba(255,255,255,0.8),inset_0px_-4px_6px_rgba(0,0,0,0.5),0px_10px_24px_-4px_rgba(34,197,94,0.6),0px_4px_12px_rgba(22,163,74,0.35)]",
      shadowHover:
        "hover:shadow-[inset_0px_4px_6px_rgba(255,255,255,0.5),inset_0px_1px_1px_rgba(255,255,255,0.95),inset_0px_-4px_6px_rgba(0,0,0,0.45),0px_14px_32px_-4px_rgba(34,197,94,0.85),0px_6px_18px_rgba(22,163,74,0.5)]",
      shadowActive:
        "active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.5),inset_0px_-1px_2px_rgba(255,255,255,0.3),0px_6px_16px_rgba(34,197,94,0.4)]",
    },

    // Refractive Glass Outline
    outline: {
      base: "bg-white/10",
      hover: "hover:bg-white/20",
      active: "active:bg-white/30",
      text: "text-[var(--color-text-primary)] hover:text-[var(--color-clinical-600)] font-semibold",
      border: "border border-[var(--color-surface-300)]/80 hover:border-[var(--color-clinical-500)]",
      sheen: "from-white/0 via-white/40 to-white/0",
      badge: "bg-[var(--color-surface-200)] text-[var(--color-text-primary)] border border-white/30",
      badgeHover: "group-hover:bg-[var(--color-clinical-600)] group-hover:text-white",
      shadow:
        "shadow-[inset_0px_1px_2px_rgba(255,255,255,0.4),inset_0px_-1px_3px_rgba(0,0,0,0.08),0_6px_20px_rgba(0,0,0,0.06)]",
      shadowHover:
        "hover:shadow-[inset_0px_1px_3px_rgba(255,255,255,0.6),inset_0px_-1px_3px_rgba(0,0,0,0.1),0_10px_28px_rgba(31,38,135,0.12)]",
      shadowActive:
        "active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.15),0_3px_10px_rgba(0,0,0,0.05)]",
    },

    // Ghost Glass
    ghost: {
      base: "bg-transparent",
      hover: "hover:bg-white/15",
      active: "active:bg-white/25",
      text: "text-current font-semibold",
      border: "border border-transparent hover:border-white/25",
      sheen: "from-white/0 via-white/30 to-white/0",
      badge: "bg-current/10 text-current border border-white/20",
      badgeHover: "group-hover:scale-110",
      shadow: "shadow-none",
      shadowHover: "hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]",
      shadowActive: "active:shadow-none",
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;

  const combinedClasses = [
    "group relative inline-flex items-center justify-center font-semibold rounded-full select-none cursor-pointer overflow-hidden",
    "backdrop-blur-md hover:backdrop-blur-lg",
    "transition-all duration-300 ease-out transform-gpu",
    "hover:-translate-y-[1px]",
    "active:scale-95 active:translate-y-[1px]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100 disabled:hover:translate-y-0",
    sizeStyles.btn,
    currentVariant.base,
    currentVariant.hover,
    currentVariant.active,
    currentVariant.text,
    currentVariant.border,
    currentVariant.shadow,
    currentVariant.shadowHover,
    currentVariant.shadowActive,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderBadge = (dir: "left" | "right") => (
    <span
      className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 transform ${
        dir === "left"
          ? "group-hover:-translate-x-1 group-hover:-rotate-45"
          : "group-hover:translate-x-1 group-hover:rotate-45"
      } flex-shrink-0 ${sizeStyles.badge} ${currentVariant.badge} ${currentVariant.badgeHover}`}
      aria-hidden="true"
    >
      {typeof icon === "object" && React.isValidElement(icon) ? (
        icon
      ) : (
        <svg
          className="transition-transform duration-300"
          style={{ width: sizeStyles.iconSize, height: sizeStyles.iconSize }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          {dir === "left" ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          )}
        </svg>
      )}
    </span>
  );

  const renderInner = () => (
    <>
      {/* 3D Top Specular Light Reflection / Glint (for variants with explicit sheen) */}
      {currentVariant.sheen ? (
        <span
          className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r ${currentVariant.sheen} pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-300`}
          aria-hidden="true"
        />
      ) : null}

      {/* Left Icon Badge */}
      {icon && iconPosition === "left" && renderBadge("left")}

      {/* Button Label Content */}
      <span className="relative z-10 transition-colors duration-200">
        {content}
      </span>

      {/* Right Icon Badge */}
      {icon && iconPosition !== "left" && renderBadge("right")}
    </>
  );

  if (targetLink && !disabled) {
    const isExternal =
      targetLink.startsWith("http") ||
      targetLink.startsWith("tel:") ||
      targetLink.startsWith("mailto:");

    if (isExternal || newTab) {
      return (
        <a
          href={targetLink}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          className={combinedClasses}
          aria-label={ariaLabel || (typeof label === "string" ? label : undefined)}
          onClick={onClick}
        >
          {renderInner()}
        </a>
      );
    }

    return (
      <Link
        href={targetLink}
        className={combinedClasses}
        aria-label={ariaLabel || (typeof label === "string" ? label : undefined)}
        onClick={onClick}
      >
        {renderInner()}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel || (typeof label === "string" ? label : undefined)}
    >
      {renderInner()}
    </button>
  );
}
