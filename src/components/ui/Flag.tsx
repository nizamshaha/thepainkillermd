import React from "react";

interface FlagProps {
  country?: "IN" | "GB" | "GLOBAL";
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * High-definition vector SVG flag component that renders perfectly across all
 * operating systems and browsers (avoiding Windows emoji flag rendering gaps).
 */
export default function Flag({ country = "IN", className = "", size = "md" }: FlagProps) {
  const dimensions = {
    sm: "w-4 h-3",
    md: "w-5 h-3.5",
    lg: "w-6 h-4",
  }[size];

  if (country === "GB") {
    return (
      <svg
        className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.4)] overflow-hidden flex-shrink-0 ${dimensions} ${className}`}
        viewBox="0 0 60 30"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    );
  }

  // Default: India Flag (Tiranga) with Ashoka Chakra
  return (
    <svg
      className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.4)] overflow-hidden flex-shrink-0 ${dimensions} ${className}`}
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Saffron Band */}
      <rect width="900" height="200" fill="#FF9933" />
      {/* White Band */}
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      {/* Green Band */}
      <rect y="400" width="900" height="200" fill="#138808" />

      {/* Ashoka Chakra */}
      <g transform="translate(450, 300)">
        <circle r="85" fill="none" stroke="#000080" strokeWidth="10" />
        <circle r="18" fill="#000080" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2="0"
            y2="-85"
            stroke="#000080"
            strokeWidth="5"
            transform={`rotate(${i * 15})`}
          />
        ))}
      </g>
    </svg>
  );
}
