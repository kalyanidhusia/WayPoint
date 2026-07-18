import { describe, expect, it } from "vitest";
import { runWayPointAgent } from "./agent";
import { demoProfiles } from "./military-data";
import type { MemberProfile } from "./types";

const reportLines: string[] = [];
const profiles: Array<{ name: string; profile: MemberProfile }> = [
  { name: "Army infantry leader", profile: demoProfiles.infantry },
  { name: "Navy logistics specialist", profile: demoProfiles.logistics },
  { name: "Air Force air transportation", profile: demoProfiles.transport },
  { name: "National Guard medic", profile: demoProfiles.medic },
  { name: "Unknown specialty fallback", profile: { serviceStatus: "Veteran", branch: "Marine Corps", specialty: "Unlisted specialty", yearsServed: 3, responsibilities: "Coordinated team priorities, maintained equipment, trained peers, and supported daily operations.", certifications: ["CPR"], careerDirection: "Field operations", workPreference: "Flexible" } },
];

describe("fixed WayPoint agent evaluations", () => {
  profiles.forEach(({ name, profile }) => {
    it(`${name}: produces explainable, stable, valid output`, () => {
      const first = runWayPointAgent(profile);
      const second = runWayPointAgent(profile);
      expect(first).toEqual(second);
      expect(first.skills.length).toBeGreaterThan(0);
      expect(first.careers).toHaveLength(3);
      expect(first.courses).toHaveLength(3);
      expect(first.mentors).toHaveLength(3);
      expect(first.actionPlan).toHaveLength(6);
      first.skills.forEach((skill) => {
        expect(skill.sourceEvidence).toBeTruthy();
        expect(skill.confidence).toBeGreaterThanOrEqual(0);
        expect(skill.confidence).toBeLessThanOrEqual(100);
      });
      first.careers.forEach((career) => expect(career.reason).toBeTruthy());
      const resultText = JSON.stringify(first).toLowerCase();
      const knownCertificates = profile.certifications.map((item) => item.toLowerCase());
      profile.certifications.forEach((certification) => expect(resultText).not.toContain(`earned ${certification.toLowerCase()}`));
      expect(knownCertificates.every((certification) => !resultText.includes(`verified ${certification}`))).toBe(true);
      reportLines.push(`✓ ${name}: stable · evidence-backed · reasons present · confidence bounded · top="${first.careers[0].title}"`);
    });
  });

  it("prints the concise evaluation report", () => {
    console.log(`\nWayPoint agent evaluation\n${reportLines.join("\n")}\n5 fixed profiles passed\n`);
    expect(reportLines).toHaveLength(5);
  });
});
