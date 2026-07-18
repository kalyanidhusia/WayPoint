import { describe, expect, it } from "vitest";
import { runWayPointAgent } from "./agent";
import { demoProfiles } from "./military-data";
import { translateSkills } from "./translator";
import { matchCareers } from "./career-matcher";

describe("WayPoint deterministic agent", () => {
  it("returns identical results for identical inputs", () => {
    expect(runWayPointAgent(demoProfiles.infantry)).toEqual(runWayPointAgent(demoProfiles.infantry));
  });

  it("translates every capability with evidence and bounded confidence", () => {
    const skills = translateSkills(demoProfiles.logistics);
    expect(skills.length).toBeGreaterThan(0);
    skills.forEach((skill) => {
      expect(skill.sourceEvidence.length).toBeGreaterThan(20);
      expect(skill.confidence).toBeGreaterThanOrEqual(0);
      expect(skill.confidence).toBeLessThanOrEqual(100);
    });
  });

  it("scores career matches with a reason", () => {
    const skills = translateSkills(demoProfiles.transport);
    matchCareers(demoProfiles.transport, skills).forEach((career) => {
      expect(career.match).toBeGreaterThanOrEqual(0);
      expect(career.match).toBeLessThanOrEqual(100);
      expect(career.reason).toBeTruthy();
    });
  });

  it("does not reduce infantry experience to security work", () => {
    const result = runWayPointAgent(demoProfiles.infantry);
    expect(result.careers.some((career) => career.title.toLowerCase().includes("security"))).toBe(false);
    expect(result.careers.some((career) => ["Operations Coordinator", "Project Coordinator", "Training Specialist", "Emergency-Management Specialist"].includes(career.title))).toBe(true);
  });

  it("surfaces a logistics pathway for logistics experience", () => {
    const result = runWayPointAgent(demoProfiles.logistics);
    expect(result.careers.some((career) => /logistics|supply-chain/i.test(career.title))).toBe(true);
  });
});
