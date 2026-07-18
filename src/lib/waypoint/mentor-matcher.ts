import { mentors } from "./mentor-data";
import type { CareerMatch, MentorRecommendation } from "./types";

export function matchMentors(careerMatches: CareerMatch[]): MentorRecommendation[] {
  const targetIds = careerMatches.map((career) => career.careerId);
  return mentors.map((mentor) => {
    const overlaps = mentor.tags.filter((tag) => targetIds.some((id) => id.includes(tag) || tag.includes(id)));
    return {
      ...mentor,
      match: Math.min(96, 67 + overlaps.length * 9),
      reason: overlaps.length ? `Shared focus in ${overlaps.join(", ")} and firsthand military-to-civilian transition experience.` : "Relevant transition experience and an adjacent civilian network.",
    };
  }).sort((a, b) => b.match - a.match || a.name.localeCompare(b.name)).slice(0, 3);
}
