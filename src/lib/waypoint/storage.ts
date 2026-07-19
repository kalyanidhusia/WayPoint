import { companionSkills, consultantNote, demoStories, safetySummary } from "./demo-member";
import { initialEvents } from "./interview-data";
import { companionStateSchema } from "./companion-schema";
import type { CompanionState } from "./companion-types";
export const STORAGE_KEY = "waypoint-companion-v1";
export function createInitialState(): CompanionState {
  return { version:1, activeStage:"translate", skills:structuredClone(companionSkills), summary:safetySummary, consultantNote, profileApproved:false,
    stories:structuredClone(demoStories), courseStatus:{}, mentorRequests:[], roadmapTasks:{}, roadmapNotes:{}, applications:[],
    resumeText:"", resumeCompleted:false, coverLetterText:"", coverLetterCompleted:false, practiceCompleted:{}, events:structuredClone(initialEvents), lastReadinessAction:"Base experience validated" };
}
export function loadState(storage: Pick<Storage,"getItem">): CompanionState {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(STORAGE_KEY) ?? "null");
    const result = companionStateSchema.safeParse(parsed);
    if (result.success) return result.data;
  } catch {}
  return createInitialState();
}
export function saveState(storage: Pick<Storage,"setItem">, state: CompanionState): void { storage.setItem(STORAGE_KEY, JSON.stringify(state)); }
export function resetState(storage?: Pick<Storage,"removeItem">): CompanionState { storage?.removeItem(STORAGE_KEY); return createInitialState(); }
export function requestMentor(state: CompanionState, request: CompanionState["mentorRequests"][number]): CompanionState { return { ...state, mentorRequests:[...state.mentorRequests,request], lastReadinessAction:`Saved ${request.type} request locally` }; }
export function applyToJob(state: CompanionState, jobId:string, confirmed:boolean): CompanionState { if (!confirmed) return state; return { ...state, applications:[...state.applications.filter((item)=>item.jobId!==jobId),{jobId,appliedAt:"2026-07-18",confirmed:true}], lastReadinessAction:"Confirmed an external application" }; }
