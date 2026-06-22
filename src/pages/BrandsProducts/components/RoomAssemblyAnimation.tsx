import React from "react";
import { CheckCircle2 } from "lucide-react";

interface RoomAssemblyAnimationProps {
  assemblyStep: number;
}

export function RoomAssemblyAnimation({ assemblyStep }: RoomAssemblyAnimationProps) {
  return (
    <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md border border-slate-800 px-3.5 py-1.5 rounded-full z-10 flex items-center gap-2">
      {assemblyStep < 5 ? (
        <>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" aria-hidden="true" />
          <span className="text-[9px] font-bold text-slate-300 font-mono">
            {assemblyStep === 0 && "Initializing staging configuration..."}
            {assemblyStep === 1 && "Stage 1/5: Display Mounted"}
            {assemblyStep === 2 && "Stage 2/5: Camera Configured"}
            {assemblyStep === 3 && "Stage 3/5: Mic Array Active"}
            {assemblyStep === 4 && "Stage 4/5: Audio Reinforcement Calibrated"}
          </span>
        </>
      ) : (
        <>
          <CheckCircle2 size={10} className="text-emerald-400" aria-hidden="true" />
          <span className="text-[9px] font-bold text-emerald-400 font-mono">
            Completed AV Environment
          </span>
        </>
      )}
    </div>
  );
}

export default RoomAssemblyAnimation;
