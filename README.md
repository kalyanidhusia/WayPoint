# WayPoint

> Redeploy your skills. Not your life.

WayPoint is a military-to-civilian career-development and mentorship demonstration. It stays with a member through a six-stage career companion loop: **Translate → Learn → Connect → Roadmap → Apply → Interview**.

Repository: [github.com/kalyanidhusia/WayPoint](https://github.com/kalyanidhusia/WayPoint)

Deployed site: [kalyanidhusia.github.io/WayPoint](https://kalyanidhusia.github.io/WayPoint/)

Direct companion: [kalyanidhusia.github.io/WayPoint/companion](https://kalyanidhusia.github.io/WayPoint/companion/)

The flagship companion follows **Marcus Reed**, a clearly labeled synthetic Army 11B Sergeant in Little Rock with warehouse leadership experience and a Construction / Site Safety Coordinator target. Marcus, his stories, mentor requests, events, and application records are demonstration data.

## Judge Pitch

- **Repository:** [github.com/kalyanidhusia/WayPoint](https://github.com/kalyanidhusia/WayPoint)
- **Deployed demo:** [kalyanidhusia.github.io/WayPoint](https://kalyanidhusia.github.io/WayPoint/)
- **Direct companion:** [kalyanidhusia.github.io/WayPoint/companion](https://kalyanidhusia.github.io/WayPoint/companion/)
- **Web slide deck:** [kalyanidhusia.github.io/WayPoint/pitch](https://kalyanidhusia.github.io/WayPoint/pitch/)
- **Pitch source and speaker notes:** [`docs/judge-pitch.md`](docs/judge-pitch.md)

### Two-minute presentation script

Military professionals should not have to restart their identity or career when they transition. The problem is not a lack of capability. It is a translation gap between military experience and the language civilian careers expect.

Our demonstration follows Marcus Reed, a synthetic Army 11B Sergeant in Little Rock moving toward construction and site safety. WayPoint stays with Marcus through six connected stages: Translate, Learn, Connect, Roadmap, Apply, and Interview.

First, it turns Marcus’s Army and warehouse experience into evidence-backed safety-field language he can approve, edit, or reject. It starts with a transparent 35% planning-readiness baseline, then shows exactly how courses and completed actions move that indicator upward. It recommends clearly labeled synthetic veteran mentors, creates an eight-week roadmap, drafts truthful résumé and cover-letter content, and prepares interview STAR answers from confirmed stories only.

WayPoint is not a job board, a one-click résumé generator, or a generic chatbot. It is an explainable transition companion. Every recommendation shows its reason and supporting evidence, while the member stays in control.

Trust is part of the product: no DD-214 uploads, SSNs, classified information, fake applications, or fake mentor messages. Readiness is a planning indicator—not a hiring decision.

The MVP is built with Next.js, TypeScript, a deterministic local domain agent, browser-local persistence, and automated tests and evaluations. Next, we can connect this trusted workflow to verified mentors, live courses, employers, a portable skills passport, and optional user-controlled document extraction.

WayPoint turns military experience into an actionable civilian career path. Redeploy your skills. Not your life.

### Feature checklist

- [x] Six-stage career companion
- [x] Evidence-backed military-to-civilian skill translation
- [x] Approve, edit, and reject controls
- [x] Transparent readiness planning indicator
- [x] Curated learning and credential recommendations
- [x] Clearly labeled synthetic veteran mentors
- [x] Eight-week action roadmap
- [x] Provenance-aware résumé and cover-letter drafts
- [x] STAR preparation from confirmed stories only
- [x] Browser-local progress and reset
- [x] Responsive, keyboard-usable interface
- [x] Unit tests and deterministic agent evals
- [ ] Verified production mentor, course, and employer integrations
- [ ] Secure, opt-in document extraction

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

WayPoint never submits an external application. Referral and application actions are simulated and recorded locally. “Open official application” opens the employer’s official site, and an application is tracked only after the member confirms they submitted it there.

## Mentor and STAR provenance

All companion mentors and demo member records are synthetic. Companion mentors visibly say “Synthetic demonstration mentor.” Intro and referral requests are stored locally; no message is delivered. Production requires verified mentor identity, messaging, availability, consent, and referral workflows.

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

PDF, text, and image attachments remain in browser memory. Their name, type, and size are displayed, but document extraction is not enabled and the agent never claims to have analyzed them. The demo uses no authentication, database, server upload, external API, or secrets. Do not enter classified, sensitive operational, medical, SSN, or DD-214 information.

Course, eligibility, mentor, occupation, story, and calendar content is synthetic demonstration data. Course and official career-page URLs are curated, but availability, pricing, jobs, and eligibility must be verified.

Companion progress is stored in the browser under the schema-versioned key `waypoint-companion-v1` in `localStorage`. Stale or invalid versions fall back to a clean demo. “Reset WayPoint demo” deletes local progress and returns readiness to 35%. Attachments remain in browser memory only and are never added to local storage. The readiness score is a planning indicator, not an employer score, credential, eligibility decision, or hiring prediction.

## Run locally

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Local development does not use a base path. To build and serve the same repository-subpath export used by GitHub Pages:

```bash
npm run pages:build
npm run pages:serve
```

Open the `/WayPoint/` path printed by the static server. The direct companion path is `/WayPoint/companion/`.

## Test and evaluate

```bash
npm run lint
npm run typecheck
npm run test
npm run evals
npm run build
```

`npm run test` runs unit and hydration regression tests. `npm run evals` runs the fixed Career Agent cases plus the complete companion journey and prints translation, course alignment, mentor explanation, roadmap, credential, application, STAR provenance, and readiness-bound summaries.

## Deployment architecture

WayPoint uses the Next.js App Router and `output: "export"` to generate static files in `out/`. GitHub Actions builds with `PAGES_BASE_PATH=/WayPoint`, uploads the export as a Pages artifact, and deploys it through GitHub Pages. Next.js `Link` handles navigation under both localhost and the repository base path. There is no application server, API route, database, authentication service, server session, or runtime secret.

Static hosting means WayPoint cannot run server-side document extraction, securely store uploaded files, send mentor messages, submit applications, authenticate users, or provide cross-device synchronization. External course and employer availability must be verified at the linked source. Browser storage is specific to the current browser and GitHub Pages origin.

## Two-minute demonstration

1. **0:00–0:25** — Open the companion and introduce synthetic member Marcus Reed, the construction-safety target, and the 35% planning indicator.
2. **0:25–0:55** — Review evidence-backed translated capabilities and approve, edit, or reject one suggestion.
3. **0:55–1:20** — Mark a demonstration course in progress, request a synthetic mentor introduction, and check a roadmap task.
4. **1:20–1:45** — Review the synthetic résumé and employer watchlist; explain that WayPoint never submits an application.
5. **1:45–2:00** — Show confirmed-story interview preparation, browser-local progress, and the reset control.

## Production roadmap

- Validated, governed occupation/career datasets and live source attribution
- User-controlled accounts, consent, data retention, deletion, and encrypted storage
- Secure document ingestion with explicit extraction status and review
- Human-in-the-loop LLM translation with deterministic fallback and audit trails
- Verified education funding, eligibility, credential, and labor-market integrations
- Mentor identity, availability, safety, matching, and scheduling workflows
- Accessibility audits, security review, threat modeling, analytics consent, and evaluation monitoring
