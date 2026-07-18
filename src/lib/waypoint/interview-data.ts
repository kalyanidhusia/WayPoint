import type { InterviewEvent, InterviewRequirement } from "./companion-types";
export const requirements: InterviewRequirement[] = [
  { id:"inspect", requirement:"Conduct site safety inspections", status:"Needs evidence", evidence:"Military safety-procedure enforcement", missing:"Civilian inspection form example", next:"Complete a sample site walkthrough checklist", confidence:72 },
  { id:"jha", requirement:"Assist with job hazard analyses", status:"Match", evidence:"Pre-operation risk assessments and control planning", missing:"Construction-specific vocabulary", next:"Complete a construction JHA exercise", confidence:89 },
  { id:"talks", requirement:"Lead toolbox talks", status:"Match", evidence:"Recurring readiness and warehouse safety briefings", missing:"Construction trade examples", next:"Draft a five-minute toolbox talk", confidence:94 },
  { id:"incident", requirement:"Document incidents and corrective actions", status:"Match", evidence:"Incident, near-miss, and corrective-action records", missing:"Employer-specific forms", next:"Practice a sample incident form", confidence:90 },
  { id:"ppe", requirement:"Monitor PPE compliance", status:"Match", evidence:"Warehouse PPE compliance monitoring", missing:"Construction PPE matrix", next:"Review common trade PPE requirements", confidence:95 },
  { id:"communicate", requirement:"Communicate with workers and supervisors", status:"Match", evidence:"Army team leadership and warehouse shift supervision", missing:"Contractor coordination examples", next:"Prepare one coordination story", confidence:94 },
  { id:"osha", requirement:"Understand OSHA construction requirements", status:"In progress", evidence:"Relevant safety practice and recommended training", missing:"OSHA 30 Outreach completion", next:"Complete selected Outreach Training", confidence:58 },
  { id:"records", requirement:"Maintain safety records", status:"Match", evidence:"Shift, incident, and corrective-action documentation", missing:"Construction safety log example", next:"Build a sample safety log", confidence:86 },
  { id:"response", requirement:"Support emergency response", status:"Match", evidence:"Responded to emergencies under pressure", missing:"Civilian site-response protocol", next:"Review site emergency action plans", confidence:91 },
  { id:"travel", requirement:"Travel between worksites", status:"Needs evidence", evidence:"Field operations across changing locations", missing:"Member-confirmed travel preference and license requirements", next:"Confirm availability and employer requirements", confidence:62 },
];
export const interviewQuestions = [
  { id:"q1", text:"Tell me about a time you identified a hazard before it caused an incident.", tags:["hazard","risk"] },
  { id:"q2", text:"Describe a time you had to enforce a safety procedure when others were resistant.", tags:["ppe","enforce"] },
  { id:"q3", text:"Tell me about an incident or near miss that you documented and what changed afterward.", tags:["incident","near miss","documentation"] },
];
export const initialEvents: InterviewEvent[] = [
  { id:"mock-1", title:"WayPoint mock interview 1", date:"2026-07-21", time:"10:00", type:"Mock interview", location:"WayPoint demo room", checklist:["Review STAR worksheet","Test audio"], reminder:true, completed:false, demo:true },
  { id:"mentor-review", title:"Mentor résumé review", date:"2026-07-22", time:"14:00", type:"Mentor session", location:"Demo video link", checklist:["Share résumé draft","Prepare two questions"], reminder:true, completed:false, demo:true },
  { id:"mock-2", title:"WayPoint mock interview 2", date:"2026-07-24", time:"11:00", type:"Mock interview", location:"WayPoint demo room", checklist:["Practice safety vocabulary","Review coaching notes"], reminder:false, completed:false, demo:true },
  { id:"nabholz-demo", title:"Nabholz interview — DEMO EVENT", date:"2026-07-25", time:"09:00", type:"Employer interview", location:"Replace with confirmed details", checklist:["Verify official interview invitation","Research employer","Prepare questions"], reminder:false, completed:false, demo:true },
];
