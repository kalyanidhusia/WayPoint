import { findOccupation } from "./military-data";
import type { MemberProfile, TranslatedSkill } from "./types";

export function translateSkills(profile: MemberProfile): TranslatedSkill[] {
  const occupation = findOccupation(profile);
  const text = `${profile.responsibilities} ${profile.careerDirection}`.toLowerCase();
  return occupation.skills.map((skill, index) => {
    const keywordHits = occupation.keywords.filter((word) => text.includes(word)).length;
    const experienceBoost = Math.min(5, Math.floor(profile.yearsServed / 2));
    const confidence = Math.min(97, skill.baseConfidence + Math.min(4, keywordHits) + experienceBoost);
    return {
      id: `${occupation.id}-skill-${index + 1}`,
      militarySkill: skill.name,
      civilianSkill: skill.civilianLabel,
      sourceEvidence: `${skill.evidence} Self-reported context: ${profile.responsibilities}`,
      confidence,
      selfReported: true,
    };
  });
}
