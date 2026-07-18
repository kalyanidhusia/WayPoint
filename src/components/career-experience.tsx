"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight, Circle, Clock3, File, MapPin, Pencil, RotateCcw, ShieldCheck, Sparkles, Upload, UserRound, X } from "lucide-react";
import { demoProfiles, memberProfileSchema, wayPointAgent } from "@/lib/waypoint";
import type { MemberProfile, TranslatedSkill, WayPointResult } from "@/lib/waypoint";

const stages = ["Analyzing service experience", "Translating transferable skills", "Matching civilian pathways", "Identifying skill gaps", "Finding learning opportunities", "Finding mentors", "Building a 30-day plan"];
const emptyProfile: MemberProfile = { serviceStatus: "Veteran", branch: "Army", specialty: "", yearsServed: 4, responsibilities: "", certifications: [], careerDirection: "", workPreference: "Flexible" };
type Status = "form" | "loading" | "results" | "error";
type SkillDecision = "pending" | "approved" | "rejected";

export function CareerExperience() {
  const [profile, setProfile] = useState<MemberProfile>(emptyProfile);
  const [certText, setCertText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("form");
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState<WayPointResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [decisions, setDecisions] = useState<Record<string, SkillDecision>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [planDone, setPlanDone] = useState<Record<number, boolean>>({});
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "loading") return;
    if (stage < stages.length - 1) {
      const timer = window.setTimeout(() => setStage((value) => value + 1), 520);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => {
      try {
        const next = wayPointAgent.analyze(profile);
        setResult(next);
        setDecisions(Object.fromEntries(next.skills.map((skill) => [skill.id, "pending"])));
        setStatus("results");
        window.setTimeout(() => resultsRef.current?.focus(), 30);
      } catch { setStatus("error"); }
    }, 650);
    return () => window.clearTimeout(timer);
  }, [status, stage, profile]);

  const update = <K extends keyof MemberProfile>(key: K, value: MemberProfile[K]) => setProfile((current) => ({ ...current, [key]: value }));
  const chooseDemo = (key: keyof typeof demoProfiles) => { setProfile(demoProfiles[key]); setCertText(demoProfiles[key].certifications.join(", ")); setErrors({}); };
  const runAgent = () => {
    const withCerts = { ...profile, certifications: certText.split(",").map((item) => item.trim()).filter(Boolean) };
    const parsed = memberProfileSchema.safeParse(withCerts);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setProfile(parsed.data); setErrors({}); setStage(0); setStatus("loading");
  };
  const editSkill = (id: string, value: string) => {
    setResult((current) => current ? { ...current, skills: current.skills.map((skill) => skill.id === id ? { ...skill, civilianSkill: value } : skill) } : current);
  };

  if (status === "loading") return <AgentProgress stage={stage} />;
  if (status === "error") return <section className="workspace state-card"><AlertCircle /><h2>We couldn’t build your career map.</h2><p>Your information is still in this browser. Please return to the profile and try again.</p><button className="button" onClick={() => setStatus("form")}>Return to profile</button></section>;
  if (status === "results" && result) return <Results result={result} decisions={decisions} setDecisions={setDecisions} editing={editing} setEditing={setEditing} editSkill={editSkill} planDone={planDone} setPlanDone={setPlanDone} reset={() => { setStatus("form"); setResult(null); }} resultsRef={resultsRef} />;

  return (
    <section className="workspace">
      <div className="workspace-head"><div><span className="step-chip">Step 1 of 2</span><h2>Build your service profile</h2><p>General context is enough. Don’t include classified, sensitive, medical, or operational details.</p></div><ShieldCheck size={30} /></div>
      <div className="demo-select"><div><Sparkles size={18} /><span><strong>Want to move faster?</strong> Load a synthetic profile.</span></div><div className="demo-buttons"><button onClick={() => chooseDemo("infantry")}>Army 11B</button><button onClick={() => chooseDemo("logistics")}>Navy LS</button><button onClick={() => chooseDemo("transport")}>Air Force 2T2X1</button><button onClick={() => chooseDemo("medic")}>Guard Medic</button></div></div>
      <form onSubmit={(event) => { event.preventDefault(); runAgent(); }}>
        <fieldset><legend>Service background</legend><div className="form-grid">
          <Field label="Service status" error={errors.serviceStatus}><select value={profile.serviceStatus} onChange={(e) => update("serviceStatus", e.target.value as MemberProfile["serviceStatus"])}><option>Active Duty</option><option>National Guard</option><option>Reserve</option><option>Veteran</option></select></Field>
          <Field label="Branch" error={errors.branch}><select value={profile.branch} onChange={(e) => update("branch", e.target.value as MemberProfile["branch"])}><option>Army</option><option>Navy</option><option>Air Force</option><option>Marine Corps</option><option>National Guard</option></select></Field>
          <Field label="Military occupation or specialty" error={errors.specialty} wide><input value={profile.specialty} onChange={(e) => update("specialty", e.target.value)} placeholder="e.g., 92Y Unit Supply Specialist" /></Field>
          <Field label="Years served" error={errors.yearsServed}><input type="number" min="0" max="50" value={profile.yearsServed} onChange={(e) => update("yearsServed", Number(e.target.value))} /></Field>
          <Field label="Work-location preference" error={errors.workPreference}><select value={profile.workPreference} onChange={(e) => update("workPreference", e.target.value as MemberProfile["workPreference"])}><option>Flexible</option><option>On-site</option><option>Hybrid</option><option>Remote</option></select></Field>
        </div></fieldset>
        <fieldset><legend>Experience & direction</legend><div className="form-grid">
          <Field label="General responsibilities" hint="Use broad, unclassified terms." error={errors.responsibilities} wide><textarea value={profile.responsibilities} onChange={(e) => update("responsibilities", e.target.value)} placeholder="Describe the people, resources, systems, training, or outcomes you supported…" /></Field>
          <Field label="Certifications" hint="Separate with commas." error={errors.certifications}><input value={certText} onChange={(e) => setCertText(e.target.value)} placeholder="e.g., EMT, CPR / First Aid" /></Field>
          <Field label="Preferred civilian direction" error={errors.careerDirection}><input value={profile.careerDirection} onChange={(e) => update("careerDirection", e.target.value)} placeholder="e.g., Logistics, project coordination" /></Field>
        </div></fieldset>
        <fieldset><legend>Optional attachments</legend><label className="dropzone"><Upload size={25} /><strong>Add a résumé or certificate</strong><span>PDF, image, or text · browser memory only</span><input type="file" multiple accept=".pdf,.txt,image/*" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} /></label>
          {files.length > 0 && <div className="file-list">{files.map((file) => <div key={`${file.name}-${file.size}`}><File size={17} /><span><strong>{file.name}</strong><small>{file.type || "file"} · {(file.size / 1024).toFixed(1)} KB</small></span><button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((item) => item !== file))}><X size={16} /></button></div>)}</div>}
          <p className="notice"><AlertCircle size={15} /> Attachments are not uploaded or analyzed. Automated extraction is not enabled in this demonstration.</p>
        </fieldset>
        <div className="form-submit"><p><ShieldCheck size={16} /> Nothing you enter is saved after this browser session.</p><button className="button" type="submit">Start Career Agent <ArrowRight size={17} /></button></div>
      </form>
    </section>
  );
}

function Field({ label, hint, error, wide, children }: { label: string; hint?: string; error?: string; wide?: boolean; children: React.ReactNode }) {
  return <label className={wide ? "field wide" : "field"}><span>{label}{hint && <small>{hint}</small>}</span>{children}{error && <em>{error}</em>}</label>;
}

function AgentProgress({ stage }: { stage: number }) {
  return <section className="workspace progress-view" aria-live="polite"><div className="agent-orbit"><Sparkles /></div><span className="step-chip">WayPoint Career Agent</span><h2>Building your career map</h2><p>Connecting your experience to practical next steps. This takes just a moment.</p><div className="stage-list">{stages.map((name, index) => <div className={index < stage ? "done" : index === stage ? "active" : ""} key={name}>{index < stage ? <Check size={16} /> : index === stage ? <span className="pulse" /> : <Circle size={12} />}<span>{name}</span>{index === stage && <small>Working…</small>}</div>)}</div><p className="agent-advisory"><ShieldCheck size={15} /> Suggestions will be ready for your review—not applied automatically.</p></section>;
}

type ResultsProps = { result: WayPointResult; decisions: Record<string, SkillDecision>; setDecisions: React.Dispatch<React.SetStateAction<Record<string, SkillDecision>>>; editing: string | null; setEditing: (id: string | null) => void; editSkill: (id: string, value: string) => void; planDone: Record<number, boolean>; setPlanDone: React.Dispatch<React.SetStateAction<Record<number, boolean>>>; reset: () => void; resultsRef: React.RefObject<HTMLDivElement | null> };
function Results({ result, decisions, setDecisions, editing, setEditing, editSkill, planDone, setPlanDone, reset, resultsRef }: ResultsProps) {
  const visibleSkills = result.skills.filter((skill) => decisions[skill.id] !== "rejected");
  return <section className="results-shell" ref={resultsRef} tabIndex={-1}>
    <div className="results-top"><div><span className="success-label"><CheckCircle2 size={15} /> Career map ready</span><h2>Your experience points in <em>more than one direction.</em></h2><p>{result.summary}</p></div><button className="secondary-button" onClick={reset}><RotateCcw size={15} /> Start over</button></div>
    <nav className="result-nav" aria-label="Result sections"><a href="#skills">Skills</a><a href="#pathways">Pathways</a><a href="#learning">Learning</a><a href="#mentors">Mentors</a><a href="#plan">30-day plan</a></nav>
    <div className="results-grid">
      <section className="result-section full" id="skills"><SectionTitle kicker="Experience translation" title="Civilian-recognized capabilities" note={`${visibleSkills.length} of ${result.skills.length} included`} /><p className="section-note">These translations are suggestions, not final judgments. Review the evidence, then approve, edit, or reject each one.</p><div className="skill-grid">{result.skills.map((skill) => <SkillCard key={skill.id} skill={skill} decision={decisions[skill.id]} editing={editing === skill.id} decide={(decision) => setDecisions((current) => ({ ...current, [skill.id]: decision }))} setEditing={setEditing} editSkill={editSkill} />)}</div></section>
      <section className="result-section full" id="pathways"><SectionTitle kicker="Top matches" title="Career pathways worth exploring" note="Weighted, explainable matches" /><div className="career-grid">{result.careers.map((career, index) => <article className="career-card" key={career.careerId}><div className="career-rank">0{index + 1}</div><div className="score-ring" style={{ "--score": `${career.match * 3.6}deg` } as React.CSSProperties}><span>{career.match}<small>%</small></span></div><h3>{career.title}</h3><p>{career.description}</p><div className="reason"><Sparkles size={15} /><span><strong>Why this match</strong>{career.reason}</span></div><h4>Strengths you already bring</h4><ul>{career.strengths.map((strength) => <li key={strength}><Check size={13} />{strength}</li>)}</ul><h4>Capabilities to develop</h4><div className="tags">{career.gaps.length ? career.gaps.map((gap) => <span key={gap}>{gap}</span>) : <span>Validate with local employers</span>}</div></article>)}</div></section>
      <section className="result-section" id="learning"><SectionTitle kicker="Close the gap" title="Learning opportunities" note="3 recommendations" /><div className="stack-list">{result.courses.map((course) => <article className="course-card" key={course.id}><div className="list-icon"><BookOpen size={19} /></div><div><span className="demo-label">Demonstration data</span><h3>{course.title}</h3><p>{course.provider} · {course.format}</p><p>{course.reason}</p><small>{course.funding} · {course.sourcePlaceholder}</small></div><ChevronRight /></article>)}</div></section>
      <section className="result-section" id="mentors"><SectionTitle kicker="Human guidance" title="Mentors who understand the route" note="Synthetic profiles" /><div className="stack-list">{result.mentors.map((mentor) => <article className="mentor-card" key={mentor.id}><div className="avatar">{mentor.name.split(" ").map((part) => part[0]).join("")}</div><div><div className="mentor-title"><h3>{mentor.name}</h3><span>{mentor.match}% match</span></div><p><strong>{mentor.currentRole}</strong> · {mentor.company}</p><p>{mentor.bio}</p><small><UserRound size={13} /> {mentor.service} <MapPin size={13} /> {mentor.location}</small></div></article>)}</div></section>
      <section className="result-section full" id="plan"><SectionTitle kicker="Your next move" title="A practical 30-day action plan" note={`${Object.values(planDone).filter(Boolean).length} of ${result.actionPlan.length} complete`} /><div className="timeline">{result.actionPlan.map((item, index) => <button className={planDone[index] ? "timeline-item complete" : "timeline-item"} key={item.dayRange} onClick={() => setPlanDone((current) => ({ ...current, [index]: !current[index] }))}><span className="timeline-check">{planDone[index] ? <Check size={15} /> : index + 1}</span><span><small>{item.dayRange}</small><strong>{item.title}</strong><p>{item.description}</p></span><Clock3 size={16} /></button>)}</div></section>
      <aside className="advisory full"><ShieldCheck size={23} /><div><strong>You are the decision-maker.</strong>{result.notices.map((notice) => <p key={notice}>{notice}</p>)}</div></aside>
    </div>
  </section>;
}

function SectionTitle({ kicker, title, note }: { kicker: string; title: string; note: string }) { return <div className="result-heading"><div><small>{kicker}</small><h2>{title}</h2></div><span>{note}</span></div>; }
function SkillCard({ skill, decision, editing, decide, setEditing, editSkill }: { skill: TranslatedSkill; decision: SkillDecision; editing: boolean; decide: (decision: SkillDecision) => void; setEditing: (id: string | null) => void; editSkill: (id: string, value: string) => void }) {
  return <article className={`skill-card ${decision}`}><div className="skill-top"><span>{skill.militarySkill}</span><strong>{skill.confidence}% confidence</strong></div>{editing ? <input autoFocus value={skill.civilianSkill} onChange={(e) => editSkill(skill.id, e.target.value)} onBlur={() => setEditing(null)} onKeyDown={(e) => e.key === "Enter" && setEditing(null)} /> : <h3>{skill.civilianSkill}</h3>}<div className="evidence"><small>Experience evidence · Self-reported</small><p>{skill.sourceEvidence}</p></div><div className="skill-actions"><button className={decision === "approved" ? "selected" : ""} onClick={() => decide("approved")}><Check size={14} /> Approve</button><button onClick={() => setEditing(skill.id)}><Pencil size={14} /> Edit</button><button className={decision === "rejected" ? "reject-selected" : ""} onClick={() => decide("rejected")}><X size={14} /> Reject</button></div></article>;
}
