import type { ActionItem, CareerMatch, CourseRecommendation, MemberProfile } from "./types";

export function createActionPlan(profile: MemberProfile, careers: CareerMatch[], courses: CourseRecommendation[]): ActionItem[] {
  return [
    { dayRange: "Days 1–3", title: "Validate your translated capabilities", description: "Approve, refine, or reject each suggested skill and save language that feels accurate.", complete: false },
    { dayRange: "Days 4–7", title: `Explore ${careers[0].title}`, description: `Review five postings and note repeated requirements, location patterns, and vocabulary. Prioritize ${profile.workPreference.toLowerCase()} roles.`, complete: false },
    { dayRange: "Days 8–14", title: "Close one visible gap", description: `Start “${courses[0].title}” or verify a comparable current program before enrolling.`, complete: false },
    { dayRange: "Days 15–21", title: "Build your civilian story", description: "Draft three résumé bullets using situation, action, and measurable outcome—without sensitive operational detail.", complete: false },
    { dayRange: "Days 22–26", title: "Hold a mentor conversation", description: "Ask one recommended mentor about role expectations, transition choices, and next-step feedback.", complete: false },
    { dayRange: "Days 27–30", title: "Run a focused application sprint", description: `Tailor your résumé to three ${careers[0].title.toLowerCase()} opportunities and track what you learn.`, complete: false },
  ];
}
