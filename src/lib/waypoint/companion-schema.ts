import { z } from "zod";

export const referralSchema = z.object({ jobId:z.string().min(1,"Choose a specific job."), note:z.string().trim().min(5).max(300) });

const stageSchema = z.enum(["translate", "learn", "connect", "roadmap", "apply", "interview"]);
const skillStatusSchema = z.enum(["proposed", "approved", "edited", "rejected"]);
const courseStatusSchema = z.enum(["not-started", "in-progress", "completed"]);

const companionSkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  evidence: z.string(),
  source: z.enum(["Military", "Civilian"]),
  confidence: z.number().min(0).max(100),
  status: skillStatusSchema,
});

const storySchema = z.object({
  id: z.string(),
  situation: z.string(),
  task: z.string(),
  action: z.string(),
  result: z.string(),
  measurableOutcome: z.string(),
  source: z.string(),
  userConfirmed: z.boolean(),
  synthetic: z.literal(true),
  tags: z.array(z.string()),
});

const mentorRequestSchema = z.object({
  mentorId: z.string(),
  type: z.enum(["intro", "referral"]),
  goal: z.string().optional(),
  jobId: z.string().optional(),
  note: z.string().optional(),
  status: z.literal("pending"),
  createdAt: z.string(),
});

const applicationSchema = z.object({
  jobId: z.string(),
  appliedAt: z.string(),
  confirmed: z.literal(true),
});

const interviewEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  time: z.string(),
  type: z.string(),
  location: z.string(),
  checklist: z.array(z.string()),
  reminder: z.boolean(),
  completed: z.boolean(),
  demo: z.boolean(),
});

export const companionStateSchema = z.object({
  version: z.literal(1),
  activeStage: stageSchema,
  skills: z.array(companionSkillSchema),
  summary: z.string(),
  consultantNote: z.string(),
  profileApproved: z.boolean(),
  stories: z.array(storySchema),
  courseStatus: z.record(z.string(), courseStatusSchema),
  mentorRequests: z.array(mentorRequestSchema),
  roadmapTasks: z.record(z.string(), z.boolean()),
  roadmapNotes: z.record(z.string(), z.string()),
  applications: z.array(applicationSchema),
  resumeText: z.string(),
  resumeCompleted: z.boolean(),
  coverLetterText: z.string(),
  coverLetterCompleted: z.boolean(),
  practiceCompleted: z.record(z.string(), z.boolean()),
  events: z.array(interviewEventSchema),
  lastReadinessAction: z.string(),
});
