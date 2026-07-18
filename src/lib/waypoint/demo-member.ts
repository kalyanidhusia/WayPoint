import type { CompanionSkill, DemoMember, Story } from "./companion-types";

export const demoMember: DemoMember = {
  name: "Marcus Reed", location: "Little Rock, Arkansas", service: "United States Army", mos: "11B Infantryman",
  rank: "Sergeant / E-5", serviceLength: "8 years", civilianExperience: "2 years as a warehouse shift lead",
  targetCareer: "Construction / Site Safety Coordinator", targetSalary: "$58,000–$70,000",
  targetEmployers: "Central Arkansas construction and industrial employers", synthetic: true,
};

const skill = (id: string, name: string, description: string, evidence: string, source: "Military" | "Civilian", confidence: number): CompanionSkill =>
  ({ id, name, description, evidence, source, confidence, status: "proposed" });

export const companionSkills: CompanionSkill[] = [
  skill("job-hazard", "Job hazard analysis", "Identify hazards before work begins and define practical controls.", "Conducted pre-operation risk assessments.", "Military", 92),
  skill("pre-task", "Pre-task safety planning", "Align people, equipment, timing, and controls before execution.", "Coordinated people, equipment, timelines, and accountability.", "Military", 94),
  skill("briefings", "Workforce safety briefings", "Deliver clear, repeatable safety expectations to teams.", "Delivered recurring safety and readiness briefings; conducted start-of-shift safety briefings.", "Civilian", 96),
  skill("ppe", "PPE compliance monitoring", "Observe and reinforce personal protective equipment requirements.", "Monitored PPE compliance during warehouse shifts.", "Civilian", 95),
  skill("incident", "Incident and near-miss documentation", "Create clear records of events, contributing factors, and follow-up.", "Documented incidents, corrective actions, warehouse near misses, and shift records.", "Civilian", 90),
  skill("emergency", "Emergency response coordination", "Keep teams organized and responsive during urgent situations.", "Responded to emergencies under pressure.", "Military", 91),
  skill("corrective", "Corrective-action follow-up", "Track whether agreed safety improvements are completed.", "Documented incidents and corrective actions.", "Military", 86),
  skill("walkthrough", "Site walkthroughs and inspections", "Observe work areas systematically and surface unsafe conditions.", "Enforced vehicle, equipment, and training safety procedures.", "Military", 82),
  skill("onboarding", "Employee onboarding and safety training", "Prepare new team members to work safely and consistently.", "Trained junior personnel and new warehouse employees.", "Civilian", 93),
  skill("movement", "Equipment-movement risk awareness", "Recognize interaction risks among people, vehicles, loads, and equipment.", "Coordinated loading and equipment movement.", "Civilian", 94),
  skill("accountability", "Operational accountability", "Maintain standards, records, and ownership across a work cycle.", "Maintained personnel, equipment, timeline, and shift accountability.", "Military", 95),
  skill("coordination", "Cross-functional coordination", "Coordinate supervisors, workers, equipment operators, and priorities.", "Supervised warehouse personnel and coordinated operational resources.", "Civilian", 91),
];

export const demoStories: Story[] = [
  { id: "hazard-story", situation: "A synthetic field operation was preparing to move personnel and vehicles through a constrained area.", task: "Review the plan for hazards and brief the team before movement.", action: "Used a pre-operation risk assessment, clarified controls, and adjusted the movement sequence.", result: "The team completed the evolution using the revised control plan.", measurableOutcome: "Add a member-confirmed outcome.", source: "Synthetic Army story prompt based on entered evidence", userConfirmed: false, synthetic: true, tags: ["hazard", "risk", "inspection"] },
  { id: "ppe-story", situation: "A synthetic warehouse shift began with inconsistent PPE use in a loading area.", task: "Reinforce the shift safety standard while keeping work moving.", action: "Delivered a start-of-shift briefing, monitored compliance, and coached employees individually.", result: "The shift followed the stated PPE process.", measurableOutcome: "Add a member-confirmed outcome.", source: "Synthetic civilian story prompt based on entered evidence", userConfirmed: false, synthetic: true, tags: ["ppe", "enforce", "briefing"] },
  { id: "near-miss-story", situation: "A synthetic near miss occurred during warehouse equipment movement.", task: "Document what happened and identify follow-up actions.", action: "Recorded the event, gathered relevant details, and documented corrective steps.", result: "The event produced a documented follow-up plan.", measurableOutcome: "Add a member-confirmed outcome.", source: "Synthetic civilian story prompt based on entered evidence", userConfirmed: false, synthetic: true, tags: ["incident", "near miss", "documentation"] },
];

export const safetySummary = "Safety-focused operations leader with eight years of Army infantry leadership and two years of warehouse shift supervision. Experienced in pre-task risk assessment, workforce briefings, PPE compliance, incident and near-miss documentation, emergency response, employee training, and operational accountability. Prepared to bring disciplined hazard awareness and team coordination to an entry-level construction or site-safety coordination role.";
export const consultantNote = "Marcus is not being redirected into security work. His strongest transferable pattern is identifying hazards, briefing teams, enforcing procedures, documenting incidents, and maintaining accountability in high-risk environments. Combined with warehouse supervision, this provides a credible bridge into entry-level construction or site-safety coordination. His main gaps are civilian safety terminology, OSHA construction training, formal inspection documentation, and familiarity with contractor safety workflows.";
