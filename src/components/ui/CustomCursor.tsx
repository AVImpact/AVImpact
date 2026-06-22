import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "expand" | "magnetic" | "text" | "brand">("default");
  const [cursorLabel, setCursorLabel] = useState("");
  const [brandDetails, setBrandDetails] = useState({ name: "", cat: "", fit: "" });
  const [isVisible, setIsVisible] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  // Track isVisible as ref to avoid stale closure in event handler
  const isVisibleRef = useRef(false);
  
  useEffect(() => {
    // Check if the device is touch-enabled
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Check if the device is hoverable (non-touch)
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    // Enable custom cursor active styles on body
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };
      // Use ref to avoid calling setState on every mousemove
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Handle magnetic button displacement
      const target = e.target as HTMLElement;
      const magneticEl = target.closest("[data-cursor='magnetic']") as HTMLElement;
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        
        // Soft pull towards the cursor (limit the pull to 12px)
        const pullX = Math.max(-12, Math.min(12, x * 0.25));
        const pullY = Math.max(-12, Math.min(12, y * 0.25));
        
        magneticEl.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        magneticEl.style.transition = "transform 0.08s ease-out";
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Dynamic hover attributes listener
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "expand") {
          setCursorType("expand");
        } else if (type === "magnetic") {
          setCursorType("magnetic");
        } else if (type === "text") {
          setCursorType("text");
          setCursorLabel(cursorTarget.getAttribute("data-cursor-label") || "");
        } else if (type === "brand") {
          setCursorType("brand");
          setBrandDetails({
            name: cursorTarget.getAttribute("data-brand-name") || "",
            cat: cursorTarget.getAttribute("data-brand-cat") || "",
            fit: cursorTarget.getAttribute("data-brand-fit") || ""
          });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement;
      if (cursorTarget) {
        setCursorType("default");
        setCursorLabel("");
        setBrandDetails({ name: "", cat: "", fit: "" });

        // Reset magnetic elements
        if (cursorTarget.getAttribute("data-cursor") === "magnetic") {
          cursorTarget.style.transform = "";
          cursorTarget.style.transition = "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
        }
      }
    };

    // Global click ripple handler for magnetic CTA buttons
    const onButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticEl = target.closest("[data-cursor='magnetic']") as HTMLElement;
      if (magneticEl) {
        const ripple = document.createElement("span");
        ripple.className = "click-ripple";
        
        const rect = magneticEl.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        magneticEl.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      }
    };

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("click", onButtonClick);

    // High performance animation loop - uses direct DOM manipulation (no React setState)
    let animationFrameId: number;
    const updatePosition = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ring) {
        // Interpolate (lerp) ring coordinates with a 0.15 factor for smooth follow lag
        ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * 0.15;
        ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * 0.15;
        
        ring.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("click", onButtonClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // FIXED: was [isVisible] which caused massive event listener leaks and re-renders


  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  // If invisible, touch-enabled or not hoverable, do not render
  if (!isVisible || isTouchDevice || !window.matchMedia("(hover: hover)").matches) {
    return null;
  }

  // Ring classes based on cursor type
  let ringClass = "custom-cursor-ring";
  if (cursorType === "expand") ringClass += " cursor-expanded";
  if (cursorType === "magnetic") ringClass += " cursor-magnetic";
  if (cursorType === "text") ringClass += " cursor-text";
  if (cursorType === "brand") ringClass += " cursor-brand";

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className={ringClass}>
        {cursorType === "text" && (
          <span className="custom-cursor-label">{cursorLabel}</span>
        )}
        {cursorType === "brand" && brandDetails.name && (
          <div className="custom-cursor-brand-card">
            <h5 className="text-[11px] font-black text-secondary uppercase tracking-wider mb-1">
              {brandDetails.name}
            </h5>
            <div className="text-[9px] font-bold text-[#0d1b3e] uppercase leading-tight mb-0.5">
              {brandDetails.cat}
            </div>
            <div className="text-[8px] font-bold text-slate-450 uppercase tracking-wide">
              {brandDetails.fit}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
