"use client";

import React from "react";
import ArrowRevealButton, { IconConfig } from "@/components/originkit/ui/arrow-reveal-button";

export type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "outline" 
  | "light" 
  | "whatsapp" 
  | "ghost";

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  href?: string;
  link?: string;
  onClick?: React.MouseEventHandler<any>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  newTab?: boolean;
  icon?: IconConfig;
  size?: "sm" | "md" | "lg";
  rounded?: number;
  hoverTextColor?: string;
  ariaLabel?: string;
}

/**
 * Standardized Button component for The Painkiller MD.
 * Features contrasting text transitions on hover, preventing white-on-white invisibility.
 */
export default function Button({
  label,
  variant = "primary",
  href,
  link,
  onClick,
  disabled,
  type = "button",
  className,
  newTab,
  icon,
  size = "md",
  rounded = 100,
  hoverTextColor,
  ariaLabel,
}: ButtonProps) {
  const targetLink = href || link;

  // Size specifications
  const sizeStyles = {
    sm: {
      padding: "8px 18px 8px 14px",
      fontSize: "0.875rem",
      gap: 10,
      iconSize: 12,
      badgeSize: 26,
    },
    md: {
      padding: "12px 26px 12px 22px",
      fontSize: "1rem",
      gap: 14,
      iconSize: 14,
      badgeSize: 32,
    },
    lg: {
      padding: "14px 32px 14px 26px",
      fontSize: "1.125rem",
      gap: 16,
      iconSize: 15,
      badgeSize: 36,
    },
  }[size];

  // Variant color definitions with guaranteed high-contrast hover text
  const variantConfig = {
    primary: {
      colors: {
        fill: "var(--color-clinical-600)",
        textColor: "#ffffff",
        hoverTextColor: hoverTextColor || "#0c1929", // Contrasting dark navy on white hover background
      },
      icon: {
        side: "right" as const,
        color: "var(--color-clinical-600)",
        background: "#ffffff",
        size: sizeStyles.iconSize,
        badgeSize: sizeStyles.badgeSize,
        padding: 8,
        restAngle: 0,
        hoverAngle: 45,
      },
      border: { borderWidth: 0 },
    },
    secondary: {
      colors: {
        fill: "rgba(255, 255, 255, 0.12)",
        textColor: "#ffffff",
        hoverTextColor: hoverTextColor || "#0c1929", // Contrasting dark navy on white hover background
      },
      icon: {
        side: "right" as const,
        color: "#0c1929",
        background: "#ffffff",
        size: sizeStyles.iconSize,
        badgeSize: sizeStyles.badgeSize,
        padding: 8,
        restAngle: 0,
        hoverAngle: 45,
      },
      border: { borderColor: "rgba(255, 255, 255, 0.35)", borderWidth: 2 },
    },
    outline: {
      colors: {
        fill: "#ffffff",
        textColor: "var(--color-text-primary)",
        hoverTextColor: hoverTextColor || "#ffffff", // White text on clinical blue hover background
      },
      icon: {
        side: "right" as const,
        color: "#ffffff",
        background: "var(--color-clinical-600)",
        size: sizeStyles.iconSize,
        badgeSize: sizeStyles.badgeSize,
        padding: 8,
        restAngle: 0,
        hoverAngle: 45,
      },
      border: { borderColor: "var(--color-surface-300)", borderWidth: 1 },
    },
    light: {
      colors: {
        fill: "#ffffff",
        textColor: "#0c1929",
        hoverTextColor: hoverTextColor || "#ffffff", // White text on dark navy hover background
      },
      icon: {
        side: "right" as const,
        color: "#ffffff",
        background: "#0c1929",
        size: sizeStyles.iconSize,
        badgeSize: sizeStyles.badgeSize,
        padding: 8,
        restAngle: 0,
        hoverAngle: 45,
      },
      border: { borderWidth: 0 },
    },
    whatsapp: {
      colors: {
        fill: "#16a34a",
        textColor: "#ffffff",
        hoverTextColor: hoverTextColor || "#0c1929", // Contrasting dark navy on white hover background
      },
      icon: {
        side: "right" as const,
        color: "#16a34a",
        background: "#ffffff",
        size: sizeStyles.iconSize,
        badgeSize: sizeStyles.badgeSize,
        padding: 8,
        restAngle: 0,
        hoverAngle: 45,
      },
      border: { borderWidth: 0 },
    },
    ghost: {
      colors: {
        fill: "transparent",
        textColor: "var(--color-text-primary)",
        hoverTextColor: hoverTextColor || "#ffffff",
      },
      icon: {
        side: "right" as const,
        color: "#ffffff",
        background: "var(--color-clinical-600)",
        size: sizeStyles.iconSize,
        badgeSize: sizeStyles.badgeSize,
        padding: 8,
        restAngle: 0,
        hoverAngle: 45,
      },
      border: { borderWidth: 0 },
    },
  }[variant];

  return (
    <ArrowRevealButton
      label={label}
      link={targetLink}
      onClick={onClick}
      disabled={disabled}
      type={type}
      newTab={newTab}
      className={className}
      ariaLabel={ariaLabel}
      padding={sizeStyles.padding}
      rounded={rounded}
      gap={sizeStyles.gap}
      colors={variantConfig.colors}
      icon={{
        ...variantConfig.icon,
        ...(icon || {}),
      }}
      border={variantConfig.border}
      font={{ fontSize: sizeStyles.fontSize, fontWeight: 600 }}
    />
  );
}
