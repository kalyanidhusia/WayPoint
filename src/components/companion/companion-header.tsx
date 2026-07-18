import { CalendarDays, CheckCircle2, Target } from "lucide-react";
import { calculateReadiness } from "@/lib/waypoint/readiness";
import { roadmap } from "@/lib/waypoint/roadmap-data";
import { demoMember } from "@/lib/waypoint/demo-member";
import { useCompanion } from "./companion-shell";

export function CompanionHeader(){
  const {state}=useCompanion(); const readiness=calculateReadiness(state);
  const taskCount=roadmap.flatMap((week)=>week.tasks.map((_,index)=>`${week.id}-${index}`)).length;
  const done=Object.values(state.roadmapTasks).filter(Boolean).length;
  const next=state.courseStatus.osha30!=="completed"?"Continue OSHA 30 learning":state.applications.length<1?"Review employer watchlist":"Practice interview stories";
  const confirmed=state.events.find((event)=>!event.demo&&!event.completed);
  return <header className="companion-header"><div><span className="synthetic-label">Flagship synthetic member</span><strong>{demoMember.name}</strong><small>{demoMember.rank} · {demoMember.location}</small></div><div className="companion-target"><Target size={17}/><span><small>Target career</small><strong>{demoMember.targetCareer}</strong></span></div><div className="header-metrics"><span><small>Readiness</small><strong>{readiness}%</strong></span><span><small>Roadmap</small><strong>{done}/{taskCount}</strong></span><span><small>Applications</small><strong>{state.applications.length}</strong></span><span><small>Interview</small><strong>{confirmed?<><CalendarDays size={12}/>{confirmed.date}</>:"Not confirmed"}</strong></span></div><div className="next-action"><CheckCircle2 size={15}/><span><small>Next recommended action</small>{next}</span></div></header>;
}
