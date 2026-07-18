import { careers } from "./career-data";
import { findOccupation } from "./military-data";
import type { CareerMatch, MemberProfile, TranslatedSkill } from "./types";

export function matchCareers(profile: MemberProfile, skills: TranslatedSkill[]): CareerMatch[] {
  const occupation = findOccupation(profile);
  const skillNames = skills.map((skill) => skill.civilianSkill);
  const direction = profile.careerDirection.toLowerCase();
  return careers
    .map((career) => {
      const tagMatches = career.tags.filter((tag) => occupation.skills.some((skill) => skill.tags.includes(tag))).length;
      const directMatches = career.requiredSkills.filter((required) => skillNames.includes(required));
      const directionMatches = career.tags.filter((tag) => direction.includes(tag)).length + (direction.includes(career.title.toLowerCase().split(" ")[0]) ? 1 : 0);
      const modeFit = profile.workPreference === "Flexible" || career.workModes.includes(profile.workPreference);
      const score = Math.min(96, 48 + tagMatches * 10 + directMatches.length * 7 + Math.min(2, directionMatches) * 6 + (modeFit ? 4 : 0));
      const strengths = directMatches.length > 0 ? directMatches : skills.slice(0, 2).map((skill) => skill.civilianSkill);
      const gaps = career.requiredSkills.filter((required) => !skillNames.includes(required));
      career.credentials.forEach((credential) => {
        if (!profile.certifications.some((certification) => certification.toLowerCase().includes(credential.toLowerCase()))) gaps.push(credential);
      });
      return {
        careerId: career.id, title: career.title, description: career.description, match: score,
        reason: `${tagMatches} capability area${tagMatches === 1 ? "" : "s"} align with this pathway${modeFit ? `, including your ${profile.workPreference.toLowerCase()} work preference` : ""}.`,
        strengths, gaps,
      };
    })
    .sort((a, b) => b.match - a.match || a.title.localeCompare(b.title))
    .slice(0, 3);
}
