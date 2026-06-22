import React from "react";

export const BrandLogo = React.memo(function BrandLogo({ name, className = "", isDark = false }: { name: string; className?: string; isDark?: boolean }) {
  const normalized = name.toLowerCase().trim();
  const textFill = isDark ? "#ffffff" : "#333333";
  const darkTextFill = isDark ? "#ffffff" : "#111111";
  const mutedTextFill = isDark ? "#cccccc" : "#666666";

  switch (normalized) {
    case "cisco":
      return (
        <svg viewBox="0 0 100 35" className={`${className || "h-9 w-auto"} text-[#00bdf2]`} fill="currentColor">
          <rect x="18" y="12" width="2.5" height="10" rx="1" />
          <rect x="24" y="8" width="2.5" height="14" rx="1" />
          <rect x="30" y="4" width="2.5" height="18" rx="1" />
          <rect x="36" y="8" width="2.5" height="14" rx="1" />
          <rect x="42" y="12" width="2.5" height="10" rx="1" />
          <rect x="18" y="24" width="26.5" height="2" rx="0.5" />
          <text x="50" y="23" className="font-sans font-black tracking-wider text-[17px] fill-[#00bdf2]">CISCO</text>
        </svg>
      );
    case "jabra":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="20" className="font-sans font-black tracking-normal text-[22px] italic" fill={textFill}>Jabra</text>
          <rect x="5" y="24" width="70" height="3" fill="#ffc20e" />
        </svg>
      );
    case "poly":
      return (
        <svg viewBox="0 0 100 30" className={`${className || "h-7 w-auto"} text-[#e31837]`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 10 5 L 25 15 L 10 25 Z" fill="#e31837" stroke="none" />
          <path d="M 28 5 L 20 20 L 32 20 Z" fill="#e31837" stroke="none" opacity="0.8" />
          <text x="40" y="22" className="font-sans font-black tracking-wider text-[20px] stroke-none" fill={darkTextFill}>poly</text>
        </svg>
      );
    case "logitech":
      return (
        <svg viewBox="0 0 120 30" className={className || "h-7 w-auto"} fill="currentColor">
          <path d="M 12 5 A 8 8 0 1 0 12 21 A 8 8 0 1 0 12 5 Z" fill="#00e3a5" />
          <circle cx="12" cy="13" r="4" fill="#ffffff" />
          <path d="M 22 9 C 20 12 20 14 22 17" stroke="#00e3a5" strokeWidth="3" strokeLinecap="round" fill="none" />
          <text x="32" y="21" className="font-sans font-black tracking-tight text-[18px]" fill={textFill}>logitech</text>
        </svg>
      );
    case "bose professional":
    case "bose":
      return (
        <svg viewBox="0 0 110 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="22" className="font-serif font-black italic tracking-widest text-[24px]" fill={isDark ? "#ffffff" : "#000000"}>BOSE</text>
          <text x="82" y="10" className="font-sans text-[7px] font-bold tracking-wider" fill={mutedTextFill}>PRO</text>
        </svg>
      );
    case "jbl professional":
    case "jbl":
      return (
        <svg viewBox="0 0 110 30" className={className || "h-8 w-auto"} fill="currentColor">
          <rect x="5" y="2" width="45" height="26" rx="3" fill="#ff6600" />
          <text x="10" y="21" className="font-sans font-black tracking-tighter text-[19px] fill-[#ffffff]">JBL</text>
          <text x="55" y="16" className="font-sans font-bold text-[8px] tracking-wide" fill={textFill}>PROFESSIONAL</text>
        </svg>
      );
    case "barco":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-7 w-auto"} fill="currentColor">
          <rect x="5" y="3" width="24" height="24" rx="4" fill="#df1921" />
          <circle cx="17" cy="15" r="5" fill="#ffffff" />
          <text x="35" y="22" className="font-sans font-black tracking-normal text-[20px]" fill={darkTextFill}>BARCO</text>
        </svg>
      );
    case "kramer":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="22" className="font-sans font-black tracking-wide text-[21px] fill-[#005da6]">KRAMER</text>
        </svg>
      );
    case "yealink":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="21" className="font-sans font-black tracking-tight text-[19px] fill-[#008f39]">Yealink</text>
        </svg>
      );
    case "aver":
      return (
        <svg viewBox="0 0 90 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="22" className="font-sans font-black tracking-wide text-[22px] fill-[#003893]">AVer</text>
        </svg>
      );
    case "maxhub":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="22" className="font-sans font-black tracking-wider text-[19px] fill-[#0050b3]">MAXHUB</text>
        </svg>
      );
    case "newline":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="22" className="font-sans font-black tracking-normal text-[19px] fill-[#003bb3] italic">newline</text>
        </svg>
      );
    case "lg":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-8 w-auto"} fill="currentColor">
          <circle cx="18" cy="15" r="13" fill="#a50034" />
          <path d="M 23 15 A 5 5 0 0 0 18 10 L 18 15 L 23 15" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="14" cy="13" r="1.5" fill="#ffffff" />
          <path d="M 25 15 A 7 7 0 0 1 18 22 A 7 7 0 0 1 11 15 A 7 7 0 0 1 18 8" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <text x="40" y="23" className="font-sans font-black text-[22px]" fill={isDark ? "#ffffff" : "#222222"}>LG</text>
        </svg>
      );
    case "samsung":
      return (
        <svg viewBox="0 0 120 30" className={className || "h-7 w-auto"} fill="currentColor">
          <ellipse cx="60" cy="15" rx="58" ry="14" fill="#0c4da2" transform="rotate(-7, 60, 15)" />
          <text x="60" y="20" textAnchor="middle" className="font-sans font-black text-[13px] tracking-widest fill-[#ffffff]" transform="rotate(-7, 60, 15)">SAMSUNG</text>
        </svg>
      );
    case "epson":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="22" className="font-sans font-black tracking-wide text-[21px] fill-[#002fbe]">EPSON</text>
        </svg>
      );
    case "panasonic":
      return (
        <svg viewBox="0 0 120 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="22" className="font-sans font-black tracking-wide text-[20px] fill-[#003fb3]">Panasonic</text>
        </svg>
      );
    case "optoma":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="21" className="font-sans font-black tracking-tight text-[19px] fill-[#00adef]">Optoma</text>
        </svg>
      );
    case "crestron":
      return (
        <svg viewBox="0 0 110 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="22" className="font-sans font-black tracking-normal text-[19px]" fill={isDark ? "#ffffff" : "#000000"}>CRESTRON</text>
          <rect x="5" y="25" width="95" height="2.5" fill="#00a3e0" />
        </svg>
      );
    case "shure":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="22" className="font-sans font-extrabold tracking-widest text-[19px]" fill={isDark ? "#ffffff" : "#020202"}>SHURE</text>
        </svg>
      );
    case "extron":
      return (
        <svg viewBox="0 0 100 30" className={className || "h-7 w-auto"} fill="currentColor">
          <text x="5" y="22" className="font-sans font-black tracking-wider text-[20px] fill-[#005da6]">Extron</text>
        </svg>
      );
    default:
      return <span className="font-sans font-black text-sm">{name.toUpperCase()}</span>;
  }
});
