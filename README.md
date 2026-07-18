# WayPoint

> Redeploy your skills. Not your life.

WayPoint is a military-to-civilian career-development and mentorship demonstration. It helps active-duty personnel, National Guard members, Reservists, and veterans translate transferable experience into civilian-recognized capabilities, explore career pathways, identify gaps, find demonstration learning options and mentors, and leave with a 30-day plan.

## The problem

Military-trained professionals often have deep leadership, logistics, healthcare, safety, training, and operations experience whose value is obscured by military terminology. Generic job matching can flatten that experience or recommend a narrow set of roles. WayPoint makes the translation visible and explainable while keeping the member in control.

## Architecture

The Next.js App Router renders a server landing page and a focused client workspace for interaction. Zod validates browser-held profiles. The deterministic domain layer is isolated in `src/lib/waypoint`:

- `types.ts` and `schemas.ts`: typed agent contract and input validation
- `military-data.ts`, `career-data.ts`, `course-data.ts`, `mentor-data.ts`: synthetic catalogs
- `translator.ts`: evidence-backed capability translation
- `career-matcher.ts`, `gap-analyzer.ts`, `course-matcher.ts`, `mentor-matcher.ts`: inspectable matching concerns
- `action-plan.ts`: structured 30-day next steps
- `agent.ts`: typed orchestration entry point

This boundary allows a future LLM-backed implementation to augment or replace the local agent without coupling it to UI components.

## Agent pipeline

1. Validate and normalize the member profile.
2. Identify the closest curated military occupation or use a safe fallback.
3. Translate capabilities and retain source experience evidence.
4. Rank civilian pathways with stable weighted scoring.
5. Identify missing capabilities and curated credentials.
6. Rank synthetic learning opportunities.
7. Rank synthetic mentors.
8. Generate a practical 30-day plan.
9. Return one explainable, typed result.

Identical input always yields identical output. There are no random values or external APIs.

## Agentic UX principles

The interface shows each analysis stage, evidence and confidence for every translated skill, and a reason for each pathway. Members can approve, edit, or reject translations. Recommendations are advisory and never represented as authoritative or automatically applied.

## Attachments and privacy

PDF, text, and image attachments remain in browser memory. Their name, type, and size are displayed, but automated extraction is not enabled and the agent never claims to have analyzed them. The demo uses no authentication, database, server upload, persistent storage, external API, or secrets. Do not enter classified, sensitive operational, medical, SSN, or DD-214 information.

Course, eligibility, mentor, and occupation content is synthetic demonstration data. Course sources are explicit placeholders and must be verified before real-world use.

## Run locally

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm run lint
npm run typecheck
npm run test
npm run evals
npm run build
```

`npm run evals` runs five fixed agent cases and prints a concise stability, evidence, reason, confidence, and top-match report.

## Three-minute demo script

1. **0:00–0:30** — Start on the landing page. Explain Translate, Develop, Connect, and Advance.
2. **0:30–1:00** — Select the Army 11B synthetic profile. Point out the safety warning and add a small sample text attachment; note that it remains in browser memory and is not analyzed.
3. **1:00–1:20** — Start the Career Agent and call out each visible analysis stage.
4. **1:20–2:10** — Review the professional summary and evidence-backed skills. Approve one, edit one, and reject one. Show that infantry experience maps to broad operations/project pathways—not a security-only track.
5. **2:10–2:40** — Open the top three pathways, skill gaps, demonstration courses, and synthetic mentors. Emphasize the reasons and match scores.
6. **2:40–3:00** — Complete an item in the 30-day plan and close on member control, privacy, and the advisory notice.

## Production roadmap

- Validated, governed occupation/career datasets and live source attribution
- User-controlled accounts, consent, data retention, deletion, and encrypted storage
- Secure document ingestion with explicit extraction status and review
- Human-in-the-loop LLM translation with deterministic fallback and audit trails
- Verified education funding, eligibility, credential, and labor-market integrations
- Mentor identity, availability, safety, matching, and scheduling workflows
- Accessibility audits, security review, threat modeling, analytics consent, and evaluation monitoring
