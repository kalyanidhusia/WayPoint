export type ServiceStatus = "Active Duty" | "National Guard" | "Reserve" | "Veteran";
export type Branch = "Army" | "Navy" | "Air Force" | "Marine Corps" | "National Guard";
export type WorkPreference = "On-site" | "Hybrid" | "Remote" | "Flexible";

export interface MemberProfile {
  serviceStatus: ServiceStatus;
  branch: Branch;
  specialty: string;
  yearsServed: number;
  responsibilities: string;
  certifications: string[];
  careerDirection: string;
  workPreference: WorkPreference;
}

export interface SkillDefinition {
  name: string;
  civilianLabel: string;
  evidence: string;
  baseConfidence: number;
  tags: string[];
}

export interface MilitaryOccupation {
  id: string;
  branch: Branch;
  codes: string[];
  title: string;
  keywords: string[];
  skills: SkillDefinition[];
}

export interface Career {
  id: string;
  title: string;
  description: string;
  tags: string[];
  requiredSkills: string[];
  credentials: string[];
  workModes: WorkPreference[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  description: string;
  skillTags: string[];
  format: string;
  funding: string;
  sourcePlaceholder: string;
  demonstrationData: true;
}

export interface Mentor {
  id: string;
  name: string;
  service: string;
  currentRole: string;
  company: string;
  bio: string;
  tags: string[];
  location: string;
}

export interface TranslatedSkill {
  id: string;
  militarySkill: string;
  civilianSkill: string;
  sourceEvidence: string;
  confidence: number;
  selfReported: boolean;
}

export interface CareerMatch {
  careerId: string;
  title: string;
  description: string;
  match: number;
  reason: string;
  strengths: string[];
  gaps: string[];
}

export interface CourseRecommendation extends Course {
  reason: string;
}

export interface MentorRecommendation extends Mentor {
  match: number;
  reason: string;
}

export interface ActionItem {
  dayRange: string;
  title: string;
  description: string;
  complete: boolean;
}

export interface WayPointResult {
  summary: string;
  occupation: { code: string; title: string };
  skills: TranslatedSkill[];
  careers: CareerMatch[];
  courses: CourseRecommendation[];
  mentors: MentorRecommendation[];
  actionPlan: ActionItem[];
  notices: string[];
}

export interface WayPointAgent {
  analyze(profile: MemberProfile): WayPointResult;
}
