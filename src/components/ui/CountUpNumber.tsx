import React, { useState, useEffect, useRef } from "react";

interface CountUpNumberProps {
  target: number;
  duration?: number;
  suffix?: string;
}

export function CountUpNumber({ target, duration = 1500, suffix = "" }: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let start = 0;
          const end = target;
          if (start === end) return;
          const totalMilliseconds = duration;
          const incrementTime = Math.abs(Math.floor(totalMilliseconds / end));
          
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
              clearInterval(timer);
            }
          }, Math.max(incrementTime, 15));
        }
      },
      { threshold: 0.1 }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}
