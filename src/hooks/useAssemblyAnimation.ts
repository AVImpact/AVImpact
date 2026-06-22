import { useState, useEffect } from "react";

export function useAssemblyAnimation(selectedSpaceId: string, stepCount = 5, intervalMs = 450) {
  const [assemblyStep, setAssemblyStep] = useState(0);

  useEffect(() => {
    setAssemblyStep(0);
    const steps = Array.from({ length: stepCount }, (_, i) => i + 1);
    const timers = steps.map((step, index) => {
      return setTimeout(() => {
        setAssemblyStep(step);
      }, (index + 1) * intervalMs);
    });
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [selectedSpaceId, stepCount, intervalMs]);

  return assemblyStep;
}

export default useAssemblyAnimation;
