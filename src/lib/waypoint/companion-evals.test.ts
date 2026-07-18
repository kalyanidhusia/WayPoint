import { describe, expect, it } from "vitest";
import { companionSkills } from "./demo-member";
import { companionCourses } from "./course-catalog";
import { companionMentors } from "./mentor-catalog";
import { createInitialState, applyToJob } from "./storage";
import { calculateReadiness } from "./readiness";
import { buildResume } from "./resume-builder";
import { buildStarAnswer } from "./star-builder";
import { roadmap } from "./roadmap-data";

describe("complete companion evaluation",()=>{
  it("prints the truthfulness and progression report",()=>{
    const state=createInitialState();
    const translation=companionSkills.every(skill=>skill.evidence&&skill.confidence>=0&&skill.confidence<=100);
    const alignment=companionCourses.every(course=>course.gap&&course.reason);
    const mentors=companionMentors.every(mentor=>mentor.why&&mentor.synthetic);
    const roadmapProgress=roadmap.length===8&&calculateReadiness({...state,roadmapTasks:{"week-1-0":true}})>35;
    const credentialTruth=!buildResume(state).includes("OSHA 30-Hour Construction Outreach Training — Completed");
    const applicationTruth=applyToJob(state,"nabholz",false).applications.length===0;
    const storyProvenance=buildStarAnswer(state.stories,["hazard"]).blank;
    const bounds=calculateReadiness(state)>=0&&calculateReadiness(state)<=100;
    console.log(`\nWayPoint companion journey evaluation\n✓ Translation evidence: ${translation}\n✓ Course-to-gap alignment: ${alignment}\n✓ Mentor-match explanation + synthetic labels: ${mentors}\n✓ Eight-week roadmap progression: ${roadmapProgress}\n✓ Credential truthfulness: ${credentialTruth}\n✓ Application truthfulness: ${applicationTruth}\n✓ STAR-story provenance: ${storyProvenance}\n✓ Readiness-score bounds: ${bounds}\n`);
    expect([translation,alignment,mentors,roadmapProgress,credentialTruth,applicationTruth,storyProvenance,bounds].every(Boolean)).toBe(true);
  });
});
