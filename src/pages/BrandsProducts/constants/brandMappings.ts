export const partnerBrandsRow1 = [
  { name: "Cisco", category: "Video Conferencing", techType: "video-conf", logoClass: "text-[#00bdf2]" },
  { name: "Jabra", category: "Audio Solutions", techType: "audio", logoClass: "text-[#ffc20e]" },
  { name: "Poly", category: "Video Conferencing", techType: "video-conf", logoClass: "text-[#e31837]" },
  { name: "Logitech", category: "Video Conferencing", techType: "video-conf", logoClass: "text-[#00e3a5]" },
  { name: "Bose Professional", category: "Audio Solutions", techType: "audio", logoClass: "text-[#000000]" },
  { name: "JBL Professional", category: "Audio Solutions", techType: "audio", logoClass: "text-[#ff6600]" },
  { name: "Barco", category: "Collaboration Solutions", techType: "collaboration", logoClass: "text-[#df1921]" },
  { name: "Kramer", category: "Signal Management", techType: "signal", logoClass: "text-[#005da6]" },
  { name: "Yealink", category: "Video Conferencing", techType: "video-conf", logoClass: "text-[#008f39]" }
];

export const partnerBrandsRow2 = [
  { name: "AVer", category: "Video Conferencing", techType: "video-conf", logoClass: "text-[#003893]" },
  { name: "MAXHUB", category: "Display Solutions", techType: "display", logoClass: "text-[#0050b3]" },
  { name: "Newline", category: "Display Solutions", techType: "display", logoClass: "text-[#003bb3]" },
  { name: "LG", category: "Display Solutions", techType: "display", logoClass: "text-[#a50034]" },
  { name: "Samsung", category: "Display Solutions", techType: "display", logoClass: "text-[#0c4da2]" },
  { name: "Epson", category: "Projection Systems", techType: "projection", logoClass: "text-[#002fbe]" },
  { name: "Panasonic", category: "Projection Systems", techType: "projection", logoClass: "text-[#003fb3]" },
  { name: "Optoma", category: "Projection Systems", techType: "projection", logoClass: "text-[#00adef]" }
];

export const allBrands = [...partnerBrandsRow1, ...partnerBrandsRow2];

export const brandDetails: Record<string, { category: string; bestFor: string; recommendedUse: string }> = {
  "Logitech": { category: "Video Conferencing", bestFor: "Small to Medium Meeting Rooms", recommendedUse: "Hybrid Collaboration" },
  "Poly": { category: "Video Conferencing", bestFor: "Executive Boardrooms & Focus Rooms", recommendedUse: "Enterprise-Grade Video Calls" },
  "Yealink": { category: "Video Conferencing", bestFor: "Corporate Meeting Rooms", recommendedUse: "Video Collaboration" },
  "Cisco": { category: "Video Conferencing", bestFor: "Secure Webex Rooms", recommendedUse: "High-Security Video Networks" },
  "Samsung": { category: "Displays", bestFor: "Boardrooms & Digital Signage", recommendedUse: "Content Presentation" },
  "LG": { category: "Displays", bestFor: "Boardrooms & Video Walls", recommendedUse: "Immersive Visual Displays" },
  "Epson": { category: "Displays & Projection", bestFor: "Classrooms & Large Auditoriums", recommendedUse: "Large Format Content Display" },
  "Panasonic": { category: "Displays & Projection", bestFor: "Professional Venues & Auditoriums", recommendedUse: "High-Brightness Laser Projection" },
  "Bose": { category: "Professional Audio", bestFor: "Meeting Rooms & Auditoriums", recommendedUse: "Clear Audio Reinforcement" },
  "JBL": { category: "Professional Audio", bestFor: "Commercial Spaces & Event Halls", recommendedUse: "Uniform Audio Coverage" },
  "Shure": { category: "Professional Audio", bestFor: "Corporate Boardrooms & Lecture Halls", recommendedUse: "Beamforming Ceiling Mics" },
  "Kramer": { category: "Control & Collaboration", bestFor: "Corporate Systems & Command Centers", recommendedUse: "Zero-Latency AV-over-IP Routing" },
  "Crestron": { category: "Control & Collaboration", bestFor: "Smart Boardrooms & Corporate Spaces", recommendedUse: "Unified Room Automation" },
  "Extron": { category: "Control & Collaboration", bestFor: "Corporate & Educational Spaces", recommendedUse: "Signal Distribution & Processing" },
};
