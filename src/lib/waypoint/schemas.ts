import { z } from "zod";

export const memberProfileSchema = z.object({
  serviceStatus: z.enum(["Active Duty", "National Guard", "Reserve", "Veteran"]),
  branch: z.enum(["Army", "Navy", "Air Force", "Marine Corps", "National Guard"]),
  specialty: z.string().trim().min(2, "Enter a military occupation or specialty.").max(100),
  yearsServed: z.coerce.number().min(0).max(50),
  responsibilities: z.string().trim().min(20, "Share at least 20 characters of general responsibilities.").max(1000),
  certifications: z.array(z.string().trim().min(1)).max(20),
  careerDirection: z.string().trim().max(120),
  workPreference: z.enum(["On-site", "Hybrid", "Remote", "Flexible"]),
});
