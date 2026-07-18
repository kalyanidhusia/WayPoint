export type Stage = "translate" | "learn" | "connect" | "roadmap" | "apply" | "interview";
export type SkillStatus = "proposed" | "approved" | "edited" | "rejected";
export type CourseStatus = "not-started" | "in-progress" | "completed";
export type OpportunityStatus = "verified-open" | "watchlist" | "synthetic-demo";

export interface DemoMember {
  name: string; location: string; service: string; mos: string; rank: string; serviceLength: string;
  civilianExperience: string; targetCareer: string; targetSalary: string; targetEmployers: string; synthetic: true;
}
export interface CompanionSkill { id: string; name: string; description: string; evidence: string; source: "Military" | "Civilian"; confidence: number; status: SkillStatus; }
export interface Story { id: string; situation: string; task: string; action: string; result: string; measurableOutcome: string; source: string; userConfirmed: boolean; synthetic: true; tags: string[]; }
export interface CourseRecord { id: string; title: string; provider: string; gap: string; reason: string; gain: string; points: number; url: string; lastChecked: string; disclaimer: string; }
export interface MentorRecord { id: string; name: string; military: string; role: string; location: string; why: string; common: string; topics: string[]; availability: string; synthetic: true; }
export interface MentorRequest { mentorId: string; type: "intro" | "referral"; goal?: string; jobId?: string; note?: string; status: "pending"; createdAt: string; }
export interface RoadmapWeek { id: string; week: number; objective: string; tasks: string[]; dependency: string; gain: number; targetDate: string; }
export interface EmployerRecord { id: string; employer: string; role: string; location: string; match: number; matched: string[]; missing: string[]; status: OpportunityStatus; officialUrl: string; lastVerified: string; sourceLabel: string; verifiedOpen: boolean; }
export interface ApplicationRecord { jobId: string; appliedAt: string; confirmed: true; }
export interface InterviewRequirement { id: string; requirement: string; status: "Match" | "In progress" | "Gap" | "Needs evidence"; evidence: string; missing: string; next: string; confidence: number; }
export interface InterviewEvent { id: string; title: string; date: string; time: string; type: string; location: string; checklist: string[]; reminder: boolean; completed: boolean; demo: boolean; }
export interface CompanionState {
  version: 1; activeStage: Stage; skills: CompanionSkill[]; summary: string; consultantNote: string; profileApproved: boolean;
  stories: Story[]; courseStatus: Record<string, CourseStatus>; mentorRequests: MentorRequest[];
  roadmapTasks: Record<string, boolean>; roadmapNotes: Record<string, string>; applications: ApplicationRecord[];
  resumeText: string; resumeCompleted: boolean; coverLetterText: string; coverLetterCompleted: boolean;
  practiceCompleted: Record<string, boolean>; events: InterviewEvent[]; lastReadinessAction: string;
}
