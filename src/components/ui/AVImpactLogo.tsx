import React, { useState } from "react";

interface LogoProps {
  className?: string;
  height?: number | string;
  light?: boolean;
}

export const AVImpactLogo = React.memo(function AVImpactLogo({ className = "", height = "40", light = false }: LogoProps) {
  const [imgSrc, setImgSrc] = useState("/assets/logo.webp");
  const [hasFailed, setHasFailed] = useState(false);

  const handleError = () => {
    setHasFailed(true);
  };

  const imageStyle = {
    height: typeof height === "number" ? `${height}px` : height,
  };

  if (hasFailed) {
    // Elegant, pixel-perfect, highly high-fidelity vector representation of the provided AV Impact Logo
    // This serves as an incredible fallback when the local logo.png file has not yet been uploaded to the workspace.
    const navyColor = "#001b44";
    const blueColor = "#1b75ff";

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 680 180"
        style={{ height: typeof height === "number" ? `${height}px` : height }}
        className={`inline-block select-none object-contain ${className}`}
        aria-label="AV Impact Logo"
      >
        <g>
          {/* Monogram A - Precision Serif Vector Path */}
          <path
            d="M 125,25 L 144,25 L 188,125 C 192,133 198,136 206,137 L 206,140 L 165,140 L 165,137 L 174,136 C 180,135 181,131 178,125 L 169,103 L 121,103 L 110,125 C 107,131 109,135 116,136 L 124,137 L 124,140 L 85,140 L 85,137 C 93,136 98,133 102,125 Z M 164,91 L 145,43 L 125,91 Z"
            fill={blueColor}
          />

          {/* Monogram V - Precision Serif Vector Path */}
          <path
            d="M 179,25 L 221,25 L 221,28 C 213,29 209,33 212,41 L 238,115 C 240,119 244,121 247,115 L 275,41 C 278,33 274,29 266,28 L 266,25 L 307,25 L 307,28 C 299,29 295,33 292,41 L 258,131 C 255,138 249,141 242,141 L 237,141 C 230,141 224,138 221,131 L 191,41 C 188,33 184,29 176,28 Z"
            fill={navyColor}
          />

          {/* Sweep curve 1 (Bottom dark navy/white wave) */}
          <path
            d="M 80,95 C 130,122 205,82 310,100 C 250,83 160,115 80,95 Z"
            fill={navyColor}
          />

          {/* Sweep curve 2 (Top bright blue wave) */}
          <path
            d="M 110,112 C 160,107 220,81 275,68 C 220,91 165,111 110,112 Z"
            fill={blueColor}
          />

          {/* Solid line to separate navy and blue curve to match the logo image exactly */}
          <path
            d="M 110,112 C 160,107 220,81 275,68"
            stroke="#ffffff"
            strokeWidth="3.5"
            fill="none"
          />

          {/* The word "IMPACT" in elegant, bold serif font */}
          <text
            x="320"
            y="118"
            fontFamily="Georgia, 'Times New Roman', Times, serif"
            fontSize="54"
            fontWeight="bold"
            letterSpacing="2"
            fill={navyColor}
            className="select-none font-bold"
          >
            IMPACT
          </text>
        </g>
      </svg>
    );
  }

  return (
    <img
      src={imgSrc}
      alt="AV Impact Logo"
      style={imageStyle}
      className={`inline-block select-none object-contain ${className}`}
      onError={handleError}
      referrerPolicy="no-referrer"
    />
  );
});
