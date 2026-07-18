import { companionCourses } from "./course-catalog";
import type { CompanionState } from "./companion-types";

export interface ReadinessBreakdown { Experience:number; Training:number; Network:number; Application:number; Interview:number; }
export function readinessBreakdown(state: CompanionState): ReadinessBreakdown {
  const training = companionCourses.filter((course) => state.courseStatus[course.id] === "completed").reduce((sum, course) => sum + course.points, 0);
  const roadmapCompleted = Object.values(state.roadmapTasks).filter(Boolean).length;
  const roadmapPoints = Math.min(16, roadmapCompleted);
  const network = Math.min(3, new Set(state.mentorRequests.map((request) => request.mentorId)).size);
  const application = (state.profileApproved ? 5 : 0) + (state.resumeCompleted ? 5 : 0) + (state.coverLetterCompleted ? 3 : 0) + Math.min(6, state.applications.length * 2) + roadmapPoints;
  const interview = Math.min(4, Object.values(state.practiceCompleted).filter(Boolean).length + state.events.filter((event) => event.completed && event.type === "Mock interview").length);
  return { Experience:35, Training:training, Network:network, Application:application, Interview:interview };
}
export function calculateReadiness(state: CompanionState): number {
  return Math.min(100, Object.values(readinessBreakdown(state)).reduce((sum, value) => sum + value, 0));
}
