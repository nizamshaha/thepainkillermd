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
  onClick?: React.MouseEventHandler<any>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  newTab?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode | boolean | any;
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
    // Clinical Blue 3D Glass — primary clinical action
    primary: {
      base: "bg-gradient-to-br from-[var(--color-clinical-600)]/90 via-[var(--color-clinical-700)]/85 to-[var(--color-primary-800)]/80",
      hover: "hover:from-[var(--color-clinical-500)]/95 hover:to-[var(--color-clinical-700)]/90",
      active: "active:from-[var(--color-clinical-700)] active:to-[var(--color-primary-900)]",
      text: "text-white font-semibold drop-shadow-sm",
      border: "border border-white/35 hover:border-white/55",
      sheen: "from-white/0 via-white/70 to-white/0",
      badge: "bg-white/20 text-white border border-white/30",
      badgeHover: "group-hover:bg-white group-hover:text-[var(--color-clinical-700)]",
      shadow:
        "shadow-[inset_0px_1px_2px_rgba(255,255,255,0.5),inset_0px_-2px_4px_rgba(0,0,0,0.2),0_8px_32px_0_rgba(31,38,135,0.18),0_2px_6px_rgba(0,0,0,0.06)]",
      shadowHover:
        "hover:shadow-[inset_0px_1px_3px_rgba(255,255,255,0.7),inset_0px_-2px_4px_rgba(0,0,0,0.25),0_12px_36px_0_rgba(31,38,135,0.25),0_4px_10px_rgba(0,0,0,0.08)]",
      shadowActive:
        "active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.25),inset_0px_-1px_2px_rgba(255,255,255,0.2),0_4px_14px_0_rgba(31,38,135,0.1)]",
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
      text: "text-white font-semibold drop-shadow-sm",
      border: "border border-white/30 hover:border-white/50",
      sheen: "from-white/0 via-white/50 to-white/0",
      badge: "bg-white/15 text-white border border-white/25",
      badgeHover: "group-hover:bg-white group-hover:text-[#0c1929]",
      shadow:
        "shadow-[inset_0px_1px_2px_rgba(255,255,255,0.4),inset_0px_-2px_4px_rgba(0,0,0,0.12),0_8px_32px_0_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.06)]",
      shadowHover:
        "hover:shadow-[inset_0px_1px_3px_rgba(255,255,255,0.6),inset_0px_-2px_4px_rgba(0,0,0,0.15),0_12px_36px_0_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.08)]",
      shadowActive:
        "active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.2),inset_0px_-1px_2px_rgba(255,255,255,0.2),0_4px_14px_0_rgba(0,0,0,0.1)]",
    },

    // WhatsApp Emerald 3D Glass
    whatsapp: {
      base: "bg-gradient-to-br from-emerald-600/90 via-green-600/85 to-emerald-800/80",
      hover: "hover:from-emerald-500/95 hover:to-green-600/90",
      active: "active:from-emerald-700 active:to-emerald-900",
      text: "text-white font-semibold drop-shadow-sm",
      border: "border border-white/35 hover:border-white/55",
      sheen: "from-white/0 via-white/70 to-white/0",
      badge: "bg-white/20 text-white border border-white/30",
      badgeHover: "group-hover:bg-white group-hover:text-emerald-700",
      shadow:
        "shadow-[inset_0px_1px_2px_rgba(255,255,255,0.5),inset_0px_-2px_4px_rgba(0,0,0,0.18),0_8px_32px_0_rgba(22,163,74,0.25),0_2px_6px_rgba(0,0,0,0.06)]",
      shadowHover:
        "hover:shadow-[inset_0px_1px_3px_rgba(255,255,255,0.7),inset_0px_-2px_4px_rgba(0,0,0,0.22),0_12px_36px_0_rgba(22,163,74,0.35),0_4px_10px_rgba(0,0,0,0.08)]",
      shadowActive:
        "active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.22),inset_0px_-1px_2px_rgba(255,255,255,0.25),0_4px_14px_0_rgba(22,163,74,0.15)]",
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

  const renderInner = () => (
    <>
      {/* 3D Top Specular Light Reflection / Glint */}
      <span
        className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r ${currentVariant.sheen} pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-300`}
        aria-hidden="true"
      />

      {/* Button Label Content */}
      <span className="relative z-10 transition-colors duration-200">
        {content}
      </span>

      {/* Tactile Micro-Interaction Arrow / Icon Badge */}
      {icon && (
        <span
          className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-300 transform group-hover:translate-x-1 group-hover:rotate-45 flex-shrink-0 ${sizeStyles.badge} ${currentVariant.badge} ${currentVariant.badgeHover}`}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          )}
        </span>
      )}
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
