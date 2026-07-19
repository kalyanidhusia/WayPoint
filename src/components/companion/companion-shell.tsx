"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BookOpen, BriefcaseBusiness, Compass, Map, MessagesSquare, RotateCcw, Users } from "lucide-react";
import Link from "next/link";
import type { CompanionState, Stage } from "@/lib/waypoint/companion-types";
import { createInitialState, loadState, resetState, saveState } from "@/lib/waypoint/storage";
import { CompanionHeader } from "./companion-header";
import { TranslateWorkspace } from "./translate-workspace";
import { LearnWorkspace } from "./learn-workspace";
import { ConnectWorkspace } from "./connect-workspace";
import { RoadmapWorkspace } from "./roadmap-workspace";
import { ApplyWorkspace } from "./apply-workspace";
import { InterviewWorkspace } from "./interview-workspace";

type CompanionContextValue = { state:CompanionState; setState:React.Dispatch<React.SetStateAction<CompanionState>>; hasHydrated:boolean; toast:(message:string)=>void; };
const CompanionContext = createContext<CompanionContextValue | null>(null);
export const useCompanion = () => { const value=useContext(CompanionContext); if(!value) throw new Error("Companion context missing"); return value; };
const nav: Array<{id:Stage;label:string;icon:typeof Compass}> = [
  {id:"translate",label:"Translate",icon:Compass},{id:"learn",label:"Learn",icon:BookOpen},{id:"connect",label:"Connect",icon:Users},
  {id:"roadmap",label:"Roadmap",icon:Map},{id:"apply",label:"Apply",icon:BriefcaseBusiness},{id:"interview",label:"Interview",icon:MessagesSquare},
];

export function CompanionShell(){
  const [state,setState]=useState<CompanionState>(createInitialState);
  const [hasHydrated,setHasHydrated]=useState(false);
  const [toastText,setToastText]=useState("");
  useEffect(()=>{
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setState(loadState(window.localStorage));
      setHasHydrated(true);
    });
    return () => { active = false; };
  },[]);
  useEffect(()=>{
    if (!hasHydrated) return;
    saveState(window.localStorage,state);
  },[hasHydrated,state]);
  const toast=(message:string)=>{setToastText(message);window.setTimeout(()=>setToastText(""),3500);};
  const view=useMemo(()=>({translate:<TranslateWorkspace/>,learn:<LearnWorkspace/>,connect:<ConnectWorkspace/>,roadmap:<RoadmapWorkspace/>,apply:<ApplyWorkspace/>,interview:<InterviewWorkspace/>})[state.activeStage],[state.activeStage]);
  return <CompanionContext.Provider value={{state,setState,hasHydrated,toast}}>
    <div className="companion-app">
      <CompanionHeader/>
      <div className="companion-body">
        <aside className="companion-nav"><Link className="companion-brand" href="/"><span>W</span>WayPoint</Link><p>Career companion</p><nav aria-label="Career companion stages">{nav.map(({id,label,icon:Icon},index)=><button key={id} className={state.activeStage===id?"active":""} onClick={()=>setState(current=>({...current,activeStage:id}))}><span className="nav-number">0{index+1}</span><Icon size={17}/>{label}</button>)}</nav><button className="reset-demo" onClick={()=>{if(window.confirm("Reset all locally saved WayPoint demonstration progress?")){setState(resetState(window.localStorage));toast("WayPoint demo reset to 35% readiness.");}}}><RotateCcw size={15}/> Reset WayPoint demo</button><small>Synthetic demonstration data<br/>Stored only in this browser</small></aside>
        <main className="companion-main">{view}</main>
      </div>
      {toastText&&<div className="toast" role="status">{toastText}</div>}
    </div>
  </CompanionContext.Provider>;
}
