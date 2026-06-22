import React from "react";
import { spaceImages, spaceHotspots } from "../constants/designerRecommendations";
import { useRoomAssembly } from "../hooks/useRoomAssembly";
import { TechnologyHotspots } from "./TechnologyHotspots";
import { RoomAssemblyAnimation } from "./RoomAssemblyAnimation";

interface RoomVisualizerProps {
  selectedSpaceId: string;
}

export function RoomVisualizer({ selectedSpaceId }: RoomVisualizerProps) {
  const assemblyStep = useRoomAssembly(selectedSpaceId);
  const imgUrl = spaceImages[selectedSpaceId] || spaceImages["meeting-room"];
  const hotspots = spaceHotspots[selectedSpaceId] || spaceHotspots["meeting-room"];

  return (
    <div className="relative aspect-video w-full max-w-4xl mx-auto bg-slate-950 rounded-2xl overflow-hidden shadow-2xl mt-4 select-none group/visualizer">
      {/* Environment Render Image */}
      <img
        src={imgUrl}
        alt={selectedSpaceId}
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 ease-out group-hover/visualizer:scale-105"
      />

      {/* Ambient Darkened Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

      {/* Sequenced Hotspots */}
      <TechnologyHotspots hotspots={hotspots} assemblyStep={assemblyStep} />

      {/* Assembly Status Bar */}
      <RoomAssemblyAnimation assemblyStep={assemblyStep} />
    </div>
  );
}

export default RoomVisualizer;
