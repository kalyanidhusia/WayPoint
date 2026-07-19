import { CareerExperience } from "@/components/career-experience";
import { ArrowRight, Compass, GraduationCap, Route, Users } from "lucide-react";
import Link from "next/link";

const pillars = [
  { icon: Compass, step: "01", title: "Translate", text: "Turn service experience into civilian language—always with evidence you can review." },
  { icon: GraduationCap, step: "02", title: "Develop", text: "See specific skill and credential gaps, then find accessible ways to close them." },
  { icon: Users, step: "03", title: "Connect", text: "Meet mentors who understand both your background and the path ahead." },
  { icon: Route, step: "04", title: "Advance", text: "Leave with a focused, achievable 30-day plan built around your goals." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="WayPoint home"><span className="brand-mark">W</span><span>WayPoint</span></a>
        <nav aria-label="Primary navigation">
          <a href="#how">How it works</a><a href="#career-agent">Career Agent</a>
          <Link className="button small" href="/companion">Open companion <ArrowRight size={15} /></Link>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Built for what comes next</p>
          <h1>Your experience has<br /><em>more places to go.</em></h1>
          <p className="hero-lead">WayPoint translates military experience into civilian opportunity—then helps you build the skills, relationships, and plan to move forward with confidence.</p>
          <div className="hero-actions">
            <Link className="button" href="/companion">Meet Marcus · flagship demo <ArrowRight size={17} /></Link>
            <a className="text-link" href="#how">See how it works <span>↓</span></a>
          </div>
          <p className="privacy-line">Private by design · No account required · Your data stays in this browser</p>
        </div>
        <div className="route-visual" aria-hidden="true">
          <div className="route-card top"><span className="route-icon">11B</span><div><small>SERVICE EXPERIENCE</small><strong>Team leadership</strong></div><span className="status-dot" /></div>
          <div className="route-path"><i /><i /><i /></div>
          <div className="route-card middle"><span className="route-icon teal">↗</span><div><small>TRANSFERABLE CAPABILITY</small><strong>Operations planning</strong></div><b>93%</b></div>
          <div className="route-path short"><i /><i /></div>
          <div className="route-card bottom"><span className="route-icon gold">◎</span><div><small>CAREER PATHWAY</small><strong>Operations Coordinator</strong></div><b>91%</b></div>
          <p>One experience. A wider field of view.</p>
        </div>
      </section>

      <section className="trust-strip" aria-label="Product commitments">
        <span>Built for the military community</span><span>•</span><span>Evidence behind every insight</span><span>•</span><span>You stay in control</span>
      </section>

      <section className="how-section" id="how">
        <div className="section-heading"><p className="eyebrow"><span /> Your route forward</p><h2>From experience to opportunity.</h2><p>WayPoint connects the dots across four parts of your transition—without asking you to start over.</p></div>
        <div className="pillar-grid">
          {pillars.map(({ icon: Icon, step, title, text }) => <article className="pillar" key={title}><div className="pillar-top"><Icon size={24} /><span>{step}</span></div><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="agent-intro" id="career-agent">
        <p className="eyebrow light"><span /> Interactive demonstration</p>
        <h2>Meet your WayPoint Career Agent.</h2>
        <p>Choose a sample profile or tell us about your own experience. Every recommendation is explainable, editable, and yours to decide.</p>
      </section>
      <section className="companion-cta"><div><p className="eyebrow light"><span /> New six-stage companion</p><h2>WayPoint stays for the whole journey.</h2><p>Follow Marcus Reed—a clearly labeled synthetic member—from translated experience through learning, mentorship, an eight-week roadmap, applications, and interview preparation.</p></div><Link className="button" href="/companion">Open career companion <ArrowRight size={17}/></Link></section>
      <CareerExperience />
      <footer><a className="brand light-brand" href="#top"><span className="brand-mark">W</span><span>WayPoint</span></a><p>Redeploy your skills. Not your life.</p><span>Demonstration MVP · Synthetic data only</span></footer>
    </main>
  );
}
