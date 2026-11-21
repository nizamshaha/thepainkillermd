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
  /** Pass a node to show an icon. `true`/`false` kept for backwards compatibility (no icon). */
  icon?: React.ReactNode | boolean;
  iconPosition?: "left" | "right";
  rounded?: number;
  hoverTextColor?: string;
  ariaLabel?: string;
}

const sizes = {
  sm: "h-10 px-4 text-sm gap-2",
  md: "h-12 px-6 text-[0.975rem] gap-2.5",
  lg: "h-14 px-7 text-base gap-3",
};

const variants: Record<ButtonVariant, string> = {
  // Logo red — the one action we want people to take
  primary:
    "bg-[var(--signal)] text-white shadow-[0_10px_24px_-12px_rgba(208,42,60,0.9)] hover:bg-[var(--signal-dark)]",
  // On dark surfaces: quiet outlined
  secondary:
    "bg-white/[0.06] text-white ring-1 ring-inset ring-white/30 hover:bg-white/[0.12] hover:ring-white/50",
  // On dark surfaces: solid white
  light: "bg-white text-[var(--ink)] hover:bg-[var(--panel)]",
  whatsapp:
    "bg-[#178a4c] text-white shadow-[0_10px_24px_-12px_rgba(23,138,76,0.9)] hover:bg-[#127440]",
  // On light surfaces
  outline:
    "bg-white text-[var(--ink)] ring-1 ring-inset ring-[var(--color-surface-300)] hover:ring-[var(--ink)]",
  ghost: "bg-transparent text-[var(--iris)] hover:bg-[var(--iris-soft)]",
};

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
  icon,
  iconPosition = "left",
  ariaLabel,
}: ButtonProps) {
  const targetLink = href || link;
  const content = children || label;
  const iconNode = icon && icon !== true ? icon : null;

  const classes = [
    "inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold",
    "transition-[background-color,box-shadow,color,transform] duration-200 ease-out",
    "active:translate-y-px disabled:opacity-50 disabled:pointer-events-none select-none",
    sizes[size],
    variants[variant],
    className,
  ].join(" ");

  const iconWrap = (n: React.ReactNode) => (
    <span className="shrink-0 inline-flex [&>svg]:w-[1.15em] [&>svg]:h-[1.15em]" aria-hidden="true">{n}</span>
  );

  const inner = (
    <>
      {iconNode && iconPosition === "left" && iconWrap(iconNode)}
      <span>{content}</span>
      {iconNode && iconPosition === "right" && iconWrap(iconNode)}
    </>
  );

  const aria = ariaLabel || (typeof label === "string" ? label : undefined);

  if (targetLink && !disabled) {
    const isExternal = /^(https?:|tel:|mailto:)/.test(targetLink);
    if (isExternal || newTab || targetLink.startsWith("#")) {
      return (
        <a
          href={targetLink}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          className={classes}
          aria-label={aria}
          onClick={onClick}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={targetLink} className={classes} aria-label={aria} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes} aria-label={aria}>
      {inner}
    </button>
  );
}
