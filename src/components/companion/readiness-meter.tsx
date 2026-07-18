import { calculateReadiness, readinessBreakdown } from "@/lib/waypoint/readiness";
import { useCompanion } from "./companion-shell";
export function ReadinessMeter(){
 const {state}=useCompanion(); const score=calculateReadiness(state); const breakdown=readinessBreakdown(state);
 return <section className="readiness-card"><div className="readiness-score"><span>{score}<small>%</small></span><div><strong>WayPoint profile readiness</strong><p>A planning indicator, not an employment eligibility decision.</p></div></div><div className="progress-track" role="progressbar" aria-label="WayPoint profile readiness" aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}><span style={{width:`${score}%`}}/></div><div className="readiness-meta"><span>Last change: <strong>{state.lastReadinessAction}</strong></span><span><strong>{100-score}</strong> points remain available</span></div><div className="breakdown">{Object.entries(breakdown).map(([name,value])=><span key={name}><small>{name}</small><strong>{value} pts</strong></span>)}</div></section>;
}
