import type { RoadmapWeek } from "./companion-types";
const start = new Date("2026-07-20T12:00:00Z");
export const roadmap: RoadmapWeek[] = [
  ["Approve translated safety skills and professional summary.",["Review all translated capabilities","Approve or edit the professional summary"],"Complete Translate review",2],
  ["Begin OSHA 30 Construction Outreach Training.",["Select an OSHA-authorized provider","Start the first training module"],"Choose a verified provider",2],
  ["Complete construction-safety fundamentals course.",["Complete one recommended fundamentals course","Record three new construction terms"],"Week 2 training started",2],
  ["Conduct mentor introduction and review safety-career gaps.",["Request a mentor introduction","Prepare three gap-focused questions"],"Translated profile approved",2],
  ["Complete incident-reporting and hazard-analysis exercises.",["Draft a job hazard analysis","Complete a near-miss documentation exercise"],"Construction fundamentals complete",2],
  ["Finalize safety résumé and tailored cover letter.",["Review and finalize résumé","Tailor and finalize cover letter"],"Approved skills and training status",2],
  ["Apply to four verified or watchlisted employers.",["Review four official employer career pages","Confirm and track submitted applications"],"Application materials complete",2],
  ["Complete mock interview sessions and employer interview preparation.",["Practice all three STAR questions","Complete two mock interview events"],"Confirmed story evidence or blank worksheets",2],
].map(([objective,tasks,dependency,gain], index) => {
  const date = new Date(start); date.setUTCDate(start.getUTCDate() + index * 7);
  return { id:`week-${index+1}`, week:index+1, objective:objective as string, tasks:tasks as string[], dependency:dependency as string, gain:gain as number, targetDate:date.toISOString().slice(0,10) };
});
