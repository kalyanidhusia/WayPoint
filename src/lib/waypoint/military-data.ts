import type { MemberProfile, MilitaryOccupation } from "./types";

const skill = (name: string, civilianLabel: string, evidence: string, baseConfidence: number, tags: string[]) =>
  ({ name, civilianLabel, evidence, baseConfidence, tags });

export const militaryOccupations: MilitaryOccupation[] = [
  {
    id: "army-11b", branch: "Army", codes: ["11b", "infantry"], title: "Infantry",
    keywords: ["team", "lead", "train", "mission", "equipment", "risk", "coordinate"],
    skills: [
      skill("Mission planning", "Operations planning", "Planned and coordinated time-sensitive missions with defined objectives.", 88, ["operations", "project", "emergency"]),
      skill("Team leadership", "Cross-functional team leadership", "Led, trained, or supported teams in changing environments.", 91, ["leadership", "training", "operations"]),
      skill("Risk assessment", "Operational risk management", "Evaluated hazards, resources, and contingencies before execution.", 86, ["safety", "emergency", "operations"]),
      skill("Training readiness", "Workforce training and readiness", "Maintained individual and team readiness through repeatable training.", 84, ["training", "project"]),
    ],
  },
  {
    id: "army-88m", branch: "Army", codes: ["88m", "motor transport"], title: "Motor Transport Operator",
    keywords: ["vehicle", "dispatch", "cargo", "route", "maintenance", "fleet", "transport"],
    skills: [
      skill("Convoy operations", "Transportation operations coordination", "Coordinated vehicles, routes, schedules, and cargo movement.", 92, ["logistics", "fleet", "operations"]),
      skill("Vehicle readiness", "Fleet readiness management", "Inspected equipment and coordinated preventive maintenance.", 90, ["fleet", "safety"]),
      skill("Cargo accountability", "Shipment and inventory control", "Maintained accountability for cargo and transport documentation.", 87, ["logistics", "supply"]),
    ],
  },
  {
    id: "army-92y", branch: "Army", codes: ["92y", "unit supply"], title: "Unit Supply Specialist",
    keywords: ["inventory", "supply", "property", "warehouse", "requisition", "audit"],
    skills: [
      skill("Property accountability", "Inventory control and audit readiness", "Tracked organizational property and maintained accountable records.", 94, ["supply", "logistics"]),
      skill("Supply operations", "Supply-chain coordination", "Managed requests, receipt, storage, and issue of supplies.", 92, ["supply", "logistics", "operations"]),
      skill("Records management", "Compliance documentation", "Maintained auditable supply and transaction records.", 88, ["project", "supply"]),
    ],
  },
  {
    id: "navy-ls", branch: "Navy", codes: ["ls", "logistics specialist"], title: "Logistics Specialist",
    keywords: ["logistics", "inventory", "procurement", "shipping", "warehouse"],
    skills: [
      skill("Material management", "End-to-end logistics coordination", "Managed purchasing, receipt, storage, and distribution workflows.", 94, ["logistics", "supply"]),
      skill("Inventory systems", "Inventory systems administration", "Used structured systems to track stock levels and transactions.", 90, ["supply", "operations"]),
      skill("Customer support", "Internal customer service", "Resolved material requests for operational customers.", 85, ["customer", "logistics"]),
    ],
  },
  {
    id: "airforce-2t2x1", branch: "Air Force", codes: ["2t2x1", "air transportation"], title: "Air Transportation",
    keywords: ["cargo", "passenger", "aircraft", "load", "transport"],
    skills: [
      skill("Air terminal operations", "Transportation hub operations", "Coordinated passenger and cargo movement through a high-tempo terminal.", 94, ["logistics", "operations"]),
      skill("Load planning", "Capacity and load planning", "Balanced cargo requirements, schedules, and safety constraints.", 91, ["logistics", "safety", "project"]),
      skill("Movement documentation", "Transportation compliance documentation", "Maintained accurate movement and shipment records.", 88, ["logistics", "supply"]),
    ],
  },
  {
    id: "marines-3043", branch: "Marine Corps", codes: ["3043", "supply administration"], title: "Supply Administration and Operations",
    keywords: ["supply", "inventory", "fiscal", "warehouse", "records"],
    skills: [
      skill("Supply administration", "Supply-chain operations administration", "Coordinated supply records, requests, and inventory activities.", 94, ["supply", "logistics"]),
      skill("Fiscal records", "Resource and transaction tracking", "Maintained structured records supporting resource accountability.", 87, ["supply", "project"]),
      skill("Operational support", "Field operations support", "Aligned supply availability with operational requirements.", 89, ["operations", "logistics"]),
    ],
  },
  {
    id: "guard-medic", branch: "National Guard", codes: ["68w", "combat medic", "healthcare specialist", "medic"], title: "Combat Medic / Healthcare Specialist",
    keywords: ["patient", "medical", "triage", "care", "emergency", "clinic"],
    skills: [
      skill("Triage support", "Emergency response coordination", "Prioritized needs and supported care in time-sensitive environments.", 92, ["healthcare", "emergency"]),
      skill("Medical readiness", "Healthcare readiness administration", "Tracked readiness requirements, supplies, and documentation.", 88, ["healthcare", "operations"]),
      skill("Team training", "Safety and response training", "Delivered or reinforced first-response and safety procedures.", 87, ["training", "safety", "healthcare"]),
    ],
  },
];

export const fallbackOccupation: MilitaryOccupation = {
  id: "generic", branch: "Army", codes: ["other"], title: "Military Specialty",
  keywords: ["lead", "train", "coordinate", "manage", "maintain", "support"],
  skills: [
    skill("Operational execution", "Operations coordination", "Coordinated people, resources, and priorities to complete assigned work.", 76, ["operations", "project"]),
    skill("Team contribution", "Collaborative team execution", "Worked within structured teams under clear standards and timelines.", 74, ["customer", "operations"]),
    skill("Readiness", "Quality and readiness assurance", "Maintained personal, equipment, or team readiness.", 72, ["safety", "training"]),
  ],
};

export function findOccupation(profile: MemberProfile): MilitaryOccupation {
  const search = profile.specialty.toLowerCase();
  return militaryOccupations.find((item) =>
    item.branch === profile.branch && item.codes.some((code) => search.includes(code))
  ) ?? militaryOccupations.find((item) => item.codes.some((code) => search.includes(code))) ?? fallbackOccupation;
}

export const demoProfiles: Record<string, MemberProfile> = {
  infantry: { serviceStatus: "Veteran", branch: "Army", specialty: "11B Infantry", yearsServed: 6, responsibilities: "Led a nine-person team, planned training, maintained equipment readiness, and coordinated mission resources.", certifications: ["CPR / First Aid"], careerDirection: "Operations or project coordination", workPreference: "Hybrid" },
  logistics: { serviceStatus: "Reserve", branch: "Navy", specialty: "LS Logistics Specialist", yearsServed: 8, responsibilities: "Managed inventory, processed procurement requests, coordinated shipments, and supported internal customers.", certifications: ["Forklift Operator"], careerDirection: "Supply chain and logistics", workPreference: "On-site" },
  transport: { serviceStatus: "Active Duty", branch: "Air Force", specialty: "2T2X1 Air Transportation", yearsServed: 4, responsibilities: "Coordinated cargo movement, verified documentation, planned loads, and maintained safe terminal operations.", certifications: [], careerDirection: "Logistics operations", workPreference: "Flexible" },
  medic: { serviceStatus: "National Guard", branch: "National Guard", specialty: "68W Combat Medic", yearsServed: 5, responsibilities: "Supported medical readiness, coordinated triage, maintained supplies, and trained teams on first response.", certifications: ["National Registry EMT"], careerDirection: "Healthcare operations", workPreference: "On-site" },
};
