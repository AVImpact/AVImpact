import React, { useEffect, useState } from "react";

interface AnimatedMetricProps {
  value: string;
  duration?: number;
}

export function AnimatedMetric({ value, duration = 1200 }: AnimatedMetricProps) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    // Regular expression to extract numbers (including decimals)
    const match = value.match(/([<>\s]*)([\d.]+)(.*)/);
    if (!match) {
      // Fallback for non-numeric values like "Real-time"
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || "";
    const isDecimal = match[2].includes(".");
    const decimalPlaces = isDecimal ? match[2].split(".")[1].length : 0;

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const current = start + easeProgress * (targetNum - start);

      const formattedNum = current.toFixed(decimalPlaces);
      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{displayValue}</span>;
}
