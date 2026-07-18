import { describe, expect, it } from "vitest";
import { calculateReadiness } from "./readiness";
import { createInitialState, requestMentor, applyToJob, resetState } from "./storage";
import { buildResume } from "./resume-builder";
import { buildCoverLetter } from "./cover-letter-builder";
import { buildStarAnswer } from "./star-builder";
import { employers } from "./employer-catalog";
import { companionMentors } from "./mentor-catalog";
import { referralSchema } from "./companion-schema";

describe("WayPoint companion journey",()=>{
  it("starts and resets at exactly 35",()=>{expect(calculateReadiness(createInitialState())).toBe(35);expect(calculateReadiness(resetState())).toBe(35)});
  it("adds exact course points and caps at 100",()=>{const state=createInitialState();state.courseStatus={osha30:"completed","li-health":"completed","li-safety":"completed",coursera:"completed",udemy:"completed"};expect(calculateReadiness(state)).toBe(60);state.profileApproved=true;state.resumeCompleted=true;state.coverLetterCompleted=true;state.applications=employers.map(job=>({jobId:job.id,appliedAt:"2026-07-18",confirmed:true}));Object.fromEntries(Array.from({length:40},(_,index)=>[`task-${index}`,true]));state.roadmapTasks=Object.fromEntries(Array.from({length:40},(_,index)=>[`task-${index}`,true]));state.practiceCompleted={a:true,b:true,c:true,d:true};expect(calculateReadiness(state)).toBeLessThanOrEqual(100)});
  it("omits rejected skills from the résumé",()=>{const state=createInitialState();const rejected=state.skills[0].name;state.skills[0].status="rejected";expect(buildResume(state)).not.toContain(rejected)});
  it("never calls uncompleted OSHA training completed",()=>{const state=createInitialState();expect(buildResume(state)).toContain("Planned");expect(buildResume(state)).not.toContain("Training — Completed")});
  it("changes local mentor state and requires a referral job",()=>{const state=createInitialState();const next=requestMentor(state,{mentorId:"daniel",type:"intro",goal:"First safety role",status:"pending",createdAt:"2026-07-18"});expect(next.mentorRequests).toHaveLength(1);expect(referralSchema.safeParse({jobId:"",note:"Please review"}).success).toBe(false)});
  it("tracks an application only after confirmation",()=>{const state=createInitialState();expect(applyToJob(state,"nabholz",false).applications).toHaveLength(0);expect(applyToJob(state,"nabholz",true).applications).toHaveLength(1)});
  it("distinguishes every job status and verifies truthfully",()=>{expect(new Set(employers.map(job=>job.status))).toEqual(new Set(["watchlist","synthetic-demo"]));expect(employers.every(job=>job.status!=="verified-open"||job.verifiedOpen)).toBe(true)});
  it("uses only confirmed matching stories or a blank worksheet",()=>{const state=createInitialState();expect(buildStarAnswer(state.stories,["hazard"]).blank).toBe(true);state.stories[0].userConfirmed=true;const answer=buildStarAnswer(state.stories,["hazard"]);expect(answer.blank).toBe(false);expect(answer.source).toBe(state.stories[0].source)});
  it("roadmap completion increases readiness",()=>{const state=createInitialState();const before=calculateReadiness(state);state.roadmapTasks["week-1-0"]=true;expect(calculateReadiness(state)).toBe(before+1)});
  it("produces deterministic résumé and cover letter",()=>{const state=createInitialState();expect(buildResume(state)).toBe(buildResume(state));expect(buildCoverLetter(state)).toBe(buildCoverLetter(state))});
  it("labels synthetic mentors and Nabholz demo calendar event",()=>{expect(companionMentors.every(mentor=>mentor.synthetic)).toBe(true);const event=createInitialState().events.find(item=>item.id==="nabholz-demo");expect(event?.demo).toBe(true);expect(event?.title).toContain("DEMO EVENT")});
});
