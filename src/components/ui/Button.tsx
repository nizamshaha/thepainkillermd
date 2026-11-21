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
  sm: "h-9 px-4 text-[13.5px] gap-1.5",
  md: "h-11 px-6 text-[15px] gap-2",
  lg: "h-[3.4rem] px-8 text-[17px] gap-2.5",
};

// Crystal-glass variants (styles live in globals.css)
const variants: Record<ButtonVariant, string> = {
  primary: "glass-btn glass-purple",   // suit purple crystal
  secondary: "glass-btn glass-frost",  // on dark surfaces
  light: "glass-btn glass-white",      // solid crystal on dark
  whatsapp: "glass-btn glass-green",
  outline: "glass-btn glass-clear",    // clear crystal on light
  ghost: "glass-btn text-[var(--purple)] hover:bg-[var(--lavender)]",
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
    "select-none disabled:opacity-50 disabled:pointer-events-none",
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
