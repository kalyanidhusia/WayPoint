import { companionCourses } from "./course-catalog";
import { demoMember } from "./demo-member";
import type { CompanionState } from "./companion-types";
export function credentialLine(state: CompanionState): string {
  const status = state.courseStatus.osha30;
  return `OSHA 30-Hour Construction Outreach Training — ${status === "completed" ? "Completed" : status === "in-progress" ? "In progress" : "Planned"} (Outreach Training completion card; not an OSHA certification)`;
}
export function buildResume(state: CompanionState): string {
  const skills = state.skills.filter((skill) => skill.status !== "rejected").map((skill) => skill.name).join(" • ");
  const stories = state.stories.filter((story) => story.userConfirmed).map((story) => `• ${story.action} ${story.result} ${story.measurableOutcome}`.trim()).join("\n") || "• Achievement stories awaiting member confirmation.";
  const completedTraining = companionCourses.filter((course) => state.courseStatus[course.id] === "completed" && course.id !== "osha30").map((course) => course.title);
  return `${demoMember.name.toUpperCase()}\nLittle Rock, Arkansas | Construction / Site Safety Coordinator\nSYNTHETIC DEMONSTRATION RÉSUMÉ\n\nPROFESSIONAL SUMMARY\n${state.summary}\n\nCORE SAFETY CAPABILITIES\n${skills}\n\nMILITARY EXPERIENCE\nSergeant / E-5, United States Army — 11B Infantryman | 8 years\n• Led teams, conducted pre-operation risk assessments, delivered safety briefings, trained junior personnel, documented incidents, and coordinated emergency response.\n\nCIVILIAN EXPERIENCE\nWarehouse Shift Lead | 2 years\n• Supervised shift personnel, monitored PPE compliance, documented near misses, coordinated loading and equipment movement, trained employees, and maintained records.\n\nTRAINING\n${credentialLine(state)}${completedTraining.length ? `\n${completedTraining.map((title) => `• ${title} — Completed`).join("\n")}` : ""}\n\nCREDENTIALS\nNo additional civilian-recognized credentials have been verified in this demonstration.\n\nACHIEVEMENT STORIES\n${stories}`;
}
