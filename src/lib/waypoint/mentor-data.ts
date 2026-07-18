import type { Mentor } from "./types";

export const mentors: Mentor[] = [
  { id: "m1", name: "Alicia Torres", service: "Army · 92Y", currentRole: "Supply Chain Program Manager", company: "Northline Foods", bio: "Turned unit supply experience into enterprise inventory and program leadership.", tags: ["supply", "logistics", "project"], location: "Dallas, TX · Hybrid" },
  { id: "m2", name: "Marcus Reed", service: "Army · 11B", currentRole: "Regional Operations Lead", company: "CommonGround Services", bio: "Moved from infantry team leadership into multi-site civilian operations.", tags: ["operations", "leadership", "project"], location: "Atlanta, GA · Remote-friendly" },
  { id: "m3", name: "Priya Shah", service: "Air Force · 2T2X1", currentRole: "Transportation Strategy Manager", company: "AeroBridge Logistics", bio: "Bridges air transportation experience with commercial network planning.", tags: ["logistics", "fleet", "operations"], location: "Chicago, IL · Hybrid" },
  { id: "m4", name: "Devin Brooks", service: "National Guard · 68W", currentRole: "Healthcare Operations Manager", company: "Horizon Clinics", bio: "Built a healthcare administration career from medical readiness experience.", tags: ["healthcare", "emergency", "operations"], location: "Columbus, OH · On-site" },
  { id: "m5", name: "Linh Nguyen", service: "Navy · LS", currentRole: "Customer Success Director", company: "FlowSystems", bio: "Translated logistics problem-solving into technology customer success.", tags: ["customer", "logistics", "leadership"], location: "Seattle, WA · Remote" },
  { id: "m6", name: "Jordan Ellis", service: "Marine Corps · 3043", currentRole: "Safety & Readiness Consultant", company: "Vantage Works", bio: "Combines supply administration, training, and safety systems.", tags: ["safety", "training", "supply"], location: "Norfolk, VA · Flexible" },
];
