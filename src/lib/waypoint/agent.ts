import { createActionPlan } from "./action-plan";
import { matchCareers } from "./career-matcher";
import { matchCourses } from "./course-matcher";
import { findOccupation } from "./military-data";
import { matchMentors } from "./mentor-matcher";
import { memberProfileSchema } from "./schemas";
import { translateSkills } from "./translator";
import type { MemberProfile, WayPointAgent, WayPointResult } from "./types";

function analyze(profile: MemberProfile): WayPointResult {
  const validated = memberProfileSchema.parse(profile);
  const occupation = findOccupation(validated);
  const skills = translateSkills(validated);
  const careers = matchCareers(validated, skills);
  const courses = matchCourses(careers);
  return {
    summary: `${validated.yearsServed}-year ${validated.serviceStatus.toLowerCase()} military-trained professional with transferable experience in ${skills.slice(0, 3).map((skill) => skill.civilianSkill.toLowerCase()).join(", ")}. Brings structured execution, accountability, and adaptability to civilian teams.`,
    occupation: { code: validated.specialty, title: occupation.title },
    skills,
    careers,
    courses,
    mentors: matchMentors(careers),
    actionPlan: createActionPlan(validated, careers, courses),
    notices: [
      "WayPoint suggestions are advisory. You decide what accurately represents your experience.",
      "This demonstration uses synthetic catalogs and does not verify eligibility, credentials, or job availability.",
      "Your profile and attachments remain in this browser session and are not uploaded or persisted.",
    ],
  };
}

export const wayPointAgent: WayPointAgent = { analyze };
export { analyze as runWayPointAgent };
