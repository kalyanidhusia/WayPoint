# WayPoint

> Redeploy your skills. Not your life.

WayPoint is a military-to-civilian career-development and mentorship demonstration. It stays with a member through a six-stage career companion loop: **Translate → Learn → Connect → Roadmap → Apply → Interview**.

The flagship companion follows **Marcus Reed**, a clearly labeled synthetic Army 11B Sergeant in Little Rock with warehouse leadership experience and a Construction / Site Safety Coordinator target. Marcus, his stories, mentor requests, events, and application records are demonstration data.

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

The companion adds a shared `CompanionState` model, schema-versioned local storage, curated course/mentor/employer/roadmap/interview data, deterministic readiness logic, and provenance-aware résumé, cover-letter, and STAR builders. The original landing page and Career Agent remain intact at `/`; the extended loop is at `/companion`.

## Six-stage companion loop

1. **Translate** — Review 12 evidence-backed construction-safety capabilities, the professional summary, advisory consultant note, and editable story bank.
2. **Learn** — Track five demonstration training recommendations and their exact planning-point gains.
3. **Connect** — Save local intro or referral requests for three synthetic Central Arkansas veteran mentors.
4. **Roadmap** — Complete an eight-week, dependency-aware action plan.
5. **Apply** — Edit truthful résumé and cover-letter drafts, review employer career pages, and confirm externally submitted applications.
6. **Interview** — Break down requirements, build STAR responses only from confirmed stories, and manage a synthetic interview week.

## Readiness planning indicator

WayPoint profile readiness starts at **35%** for validated experience. It adds curated points for completed learning (up to 25), roadmap tasks (up to 16), an approved translated profile (5), résumé (5), cover letter (3), confirmed external applications (up to 6), network actions, and interview preparation (up to 4), capped at 100.

It is explicitly a planning indicator—not an employer score, eligibility decision, credential, or hiring prediction.

## Opportunity and application truthfulness

- A **recommendation** is a WayPoint planning suggestion.
- An **employer watchlist** links to an official employer career page but does not claim an exact opening.
- A **verified-open** record requires a direct official job URL, a manual verification date, and `verifiedOpen: true`.
- A **synthetic-demo** role exists only to demonstrate workflow.

WayPoint never submits an application. “Open official application” opens the employer’s official site, and an application is tracked only after the member confirms they submitted it there.

## Mentor and STAR provenance

All companion mentors visibly say “Synthetic demonstration mentor.” Intro and referral requests are stored locally; no message is delivered. Production requires verified mentor identity, messaging, availability, consent, and referral workflows.

STAR answers use only a matching story marked user-confirmed. Unconfirmed synthetic prompts are never presented as Marcus’s real experience. When no confirmed story matches, WayPoint shows a blank worksheet.

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

Course, eligibility, mentor, occupation, story, and calendar content is synthetic demonstration data. Course and official career-page URLs are curated, but availability, pricing, jobs, and eligibility must be verified.

Companion progress is stored under the schema-versioned key `waypoint-companion-v1` in `localStorage`. Stale versions fall back to a clean demo. “Reset WayPoint demo” deletes local progress and returns readiness to 35%. Attachments still remain browser-memory-only and are never added to local storage.

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

`npm run evals` runs the fixed Career Agent cases plus the complete companion journey and prints translation, course alignment, mentor explanation, roadmap, credential, application, STAR provenance, and readiness-bound summaries.

## Five-minute demo script

1. **0:00–0:40** — Open `/companion`; introduce synthetic member Marcus Reed, his safety target, 35% planning readiness, and persistent six-stage navigation.
2. **0:40–1:30** — In Translate, review military and civilian evidence, edit a capability, approve the profile, and explain why this is a non-security pathway. Show that synthetic story prompts remain unconfirmed.
3. **1:30–2:10** — In Learn, mark OSHA 30 in progress, clarify that it is Outreach Training rather than an OSHA certification, then complete one fundamentals course and watch readiness change.
4. **2:10–2:45** — In Connect, request a synthetic mentor intro and demonstrate the specific-job/referral warning. Emphasize that requests are saved locally only.
5. **2:45–3:25** — In Roadmap, complete tasks and add a note. Show current-week, progress, dependency, overdue, and readiness updates.
6. **3:25–4:20** — In Apply, review training truthfulness in the generated résumé, tailor/copy the cover letter, open an official employer career page, and confirm an externally submitted application.
7. **4:20–5:00** — In Interview, show the requirement breakdown, blank STAR worksheet, confirm a story in Translate, return to see a provenance-backed answer, and review the visibly synthetic Nabholz demo event.

## Production roadmap

- Validated, governed occupation/career datasets and live source attribution
- User-controlled accounts, consent, data retention, deletion, and encrypted storage
- Secure document ingestion with explicit extraction status and review
- Human-in-the-loop LLM translation with deterministic fallback and audit trails
- Verified education funding, eligibility, credential, and labor-market integrations
- Mentor identity, availability, safety, matching, and scheduling workflows
- Accessibility audits, security review, threat modeling, analytics consent, and evaluation monitoring
