"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import styles from "./pitch.module.css";

type Slide = {
  eyebrow: string;
  title: string;
  lead?: string;
  body?: string;
  bullets?: readonly string[];
  kind?: "title" | "profile" | "sequence" | "contrast" | "closing";
};

const slides: readonly Slide[] = [
  { eyebrow: "WayPoint", title: "Redeploy your skills.\nNot your life.", lead: "Military experience, translated into an actionable civilian career path.", kind: "title" },
  { eyebrow: "The problem", title: "Valuable experience gets lost in translation.", body: "Military professionals bring operational, leadership, and safety experience. Civilian systems often fail to recognize it in career-ready language." },
  { eyebrow: "Target user · synthetic demo", title: "Meet Marcus Reed.", lead: "Army 11B Sergeant · Little Rock, Arkansas", bullets: ["Warehouse leadership experience", "Target: Construction / Site Safety Coordinator"], kind: "profile" },
  { eyebrow: "The solution", title: "One companion for the whole transition.", bullets: ["Translate", "Learn", "Connect", "Roadmap", "Apply", "Interview"], kind: "sequence" },
  { eyebrow: "What the demo shows", title: "Evidence becomes a route forward.", bullets: ["Army + warehouse experience translated into safety-field language", "Readiness grows from a transparent 35% baseline", "Synthetic veteran mentor recommendations", "An eight-week, dependency-aware roadmap", "Truthful résumé and cover-letter drafts", "STAR answers from confirmed stories only"] },
  { eyebrow: "Why this is different", title: "More than a point solution.", bullets: ["Not a job board.", "Not a résumé generator.", "Not a generic chatbot."], lead: "An explainable, evidence-backed transition companion.", kind: "contrast" },
  { eyebrow: "Agentic UX", title: "The member stays in control.", body: "WayPoint shows why each recommendation was made, the experience evidence behind it, and its confidence or match level.", bullets: ["Approve", "Edit", "Reject"] },
  { eyebrow: "Trust & safety", title: "Trust is part of the product.", bullets: ["Synthetic demo data only", "No DD-214 uploads", "No SSNs or classified information", "No fake applications or mentor messages", "Readiness is a planning indicator—not a hiring decision"] },
  { eyebrow: "Technical build", title: "Built for a reliable demonstration.", bullets: ["Next.js + TypeScript", "Deterministic local domain agent", "Browser-local progress", "Static GitHub Pages deployment", "Unit tests + agent evaluations"] },
  { eyebrow: "Impact", title: "Redeploy capability into opportunity.", body: "WayPoint helps service members move forward without forcing them to restart their identity or career from zero." },
  { eyebrow: "Roadmap", title: "Build the trusted transition network.", bullets: ["Verified mentor network", "Real course integrations", "Employer partnerships", "Verified skills passport", "Optional AI-assisted document extraction"] },
  { eyebrow: "WayPoint", title: "Military experience →\nan actionable civilian career path.", lead: "Redeploy your skills. Not your life.", kind: "closing" },
];

const deployedUrl = "https://kalyanidhusia.github.io/WayPoint/";

export function PitchDeck({ assetBasePath }: { assetBasePath: string }) {
  const [active, setActive] = useState(0);
  const last = slides.length - 1;
  const previous = useCallback(() => setActive((value) => Math.max(0, value - 1)), []);
  const next = useCallback(() => setActive((value) => Math.min(last, value + 1)), [last]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        next();
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        previous();
      }
      if (event.key === "Home") setActive(0);
      if (event.key === "End") setActive(last);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [last, next, previous]);

  const slide = slides[active];

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Return to WayPoint home">
          <span aria-hidden="true">W</span> WayPoint
        </Link>
        <div className={styles.headerLinks}>
          <span>Judge pitch · 2 minutes</span>
          <Link href="/companion">Open demo <ExternalLink size={14} /></Link>
        </div>
      </header>

      <section
        className={`${styles.stage} ${styles[slide.kind ?? "standard"]}`}
        aria-live="polite"
        aria-label={`Slide ${active + 1} of ${slides.length}: ${slide.title.replace("\n", " ")}`}
      >
        <div className={styles.routeLine} aria-hidden="true"><i /><i /><i /></div>
        <div className={`${styles.content} ${slide.kind === "closing" ? styles.closingContent : ""}`}>
          <p className={styles.eyebrow}><span />{slide.eyebrow}</p>
          <h1>{slide.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          {slide.lead && <p className={styles.lead}>{slide.lead}</p>}
          {slide.body && <p className={styles.body}>{slide.body}</p>}
          {slide.bullets && (
            <ul className={styles.bullets}>
              {slide.bullets.map((bullet, index) => (
                <li key={bullet}>
                  {slide.kind === "sequence" ? <b>0{index + 1}</b> : <Check size={18} aria-hidden="true" />}
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {slide.kind === "closing" && (
          <aside className={styles.qrPanel} aria-label="Open the live WayPoint demonstration">
            <p>Scan to try WayPoint</p>
            {/* A server-provided base path keeps the public asset valid locally and under GitHub Pages. */}
            <Image
              src={`${assetBasePath}/waypoint-qr.svg`}
              width="240"
              height="240"
              alt="QR code opening the deployed WayPoint demonstration"
            />
            <span>kalyanidhusia.github.io/WayPoint/</span>
            <a className={styles.demoButton} href={deployedUrl}>
              Open live demo <ExternalLink size={16} aria-hidden="true" />
            </a>
          </aside>
        )}
        {active === 7 && <ShieldCheck className={styles.watermark} aria-hidden="true" />}
        <span className={styles.slideNumber}>{String(active + 1).padStart(2, "0")}</span>
      </section>

      <nav className={styles.controls} aria-label="Presentation controls">
        <button onClick={previous} disabled={active === 0} aria-label="Previous slide"><ArrowLeft size={19} /></button>
        <div className={styles.progress} aria-label={`Slide ${active + 1} of ${slides.length}`}>
          {slides.map((item, index) => (
            <button
              key={item.title}
              className={index === active ? styles.activeDot : ""}
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}: ${item.eyebrow}`}
              aria-current={index === active ? "step" : undefined}
            />
          ))}
        </div>
        <button onClick={next} disabled={active === last} aria-label="Next slide"><ArrowRight size={19} /></button>
      </nav>
      <p className={styles.hint}>Use arrow keys, space, or the controls to navigate.</p>
    </main>
  );
}
