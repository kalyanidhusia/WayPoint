import { z } from "zod";
export const referralSchema = z.object({ jobId:z.string().min(1,"Choose a specific job."), note:z.string().trim().min(5).max(300) });
