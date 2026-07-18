import { courses } from "./course-data";
import type { CareerMatch, CourseRecommendation } from "./types";

export function matchCourses(careerMatches: CareerMatch[]): CourseRecommendation[] {
  const careerIds = careerMatches.map((career) => career.careerId);
  const score = (tags: string[]) => tags.filter((tag) => careerIds.some((id) => id.includes(tag) || tag.includes(id))).length;
  return courses.map((course) => ({
    ...course,
    reason: `Builds ${course.skillTags.join(" and ")} capability connected to your recommended pathways.`,
  })).sort((a, b) => score(b.skillTags) - score(a.skillTags) || a.title.localeCompare(b.title)).slice(0, 3);
}
