# WayPoint Codex Instructions

## Product

WayPoint is a military-to-civilian career-development and mentorship platform.

Tagline:

> Redeploy your skills. Not your life.

WayPoint serves active-duty personnel, National Guard members, Reservists,
veterans, and veteran mentors.

It translates military experience into civilian-recognized skills, identifies
career and credential gaps, recommends accessible training, and connects
members with appropriate mentors.

## Current objective

Build a polished two-hour demonstration MVP.

The demo must prove this user journey:

1. A member enters military experience.
2. The WayPoint Career Agent analyzes the experience.
3. The agent translates it into civilian skills.
4. The agent recommends career pathways.
5. The agent identifies skill and credential gaps.
6. The agent recommends free or funded learning.
7. The agent recommends relevant mentors.
8. The agent produces a 30-day action plan.
9. The member approves, edits, or rejects translated skills.

## Demo scope

Include:

- polished landing page
- guided profile form
- WayPoint Career Agent workspace
- visible analysis stages
- translated skill cards
- evidence and confidence scores
- career pathway recommendations
- gap analysis
- course recommendations
- mentor recommendations
- 30-day plan
- résumé/certificate attachment interface
- deterministic local recommendation engine
- synthetic demo profiles
- automated evaluation cases
- responsive design
- accessibility
- README and demo instructions

Do not include yet:

- authentication
- Supabase
- persistent database
- payments
- social feed
- employer portal
- job applications
- DD-214 processing
- security-clearance verification
- Social Security numbers
- production file storage
- native mobile application

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Server Components where appropriate
- Client Components only where interactivity requires them
- Zod for data validation
- Vitest for unit and agent evaluation tests
- Lucide React for icons

Avoid adding a large component framework.

## Agent architecture

Keep these concerns separate:

- domain types
- synthetic military occupation data
- civilian occupation data
- course catalog
- mentor catalog
- recommendation logic
- confidence calculations
- UI components
- agent evaluation cases

The deterministic agent must expose a typed interface so an LLM-backed
implementation can replace or augment it later.

Suggested pipeline:

1. normalize profile
2. collect military evidence
3. translate skills
4. rank civilian careers
5. identify gaps
6. rank courses
7. rank mentors
8. create action plan
9. return explainable structured result

## Agentic UX

The interface must show:

- what stage the agent is performing
- what source experience produced each skill
- why each recommendation was made
- confidence or match percentage
- where information is self-reported
- controls to approve, edit, or reject conclusions

Never present the agent as automatically authoritative.

## Multimodal demo behavior

Allow users to attach PDF, image, or text résumé/certificate files.

For this demonstration:

- keep files in browser memory only
- do not upload files to a server
- show file name, type, and size
- preview images where practical
- clearly state that automated document extraction is not enabled yet
- never claim that an attachment was analyzed when it was not

## Language

Use strength-based language.

Use:

- transferable experience
- military-trained professional
- civilian-recognized credential
- experience evidence
- career pathway
- capability

Avoid:

- uneducated
- low-skilled
- deficient
- start over
- only qualified for security work

## Visual direction

Professional, modern, confident, and human.

Do not use:

- camouflage backgrounds
- excessive flags
- weapon imagery
- government-portal styling
- stereotypical military clip art

Use a restrained navigation/wayfinding visual language.

The final product should feel credible to veterans, mentors, employers,
workforce programs, and investors.

## Safety and privacy

- Use synthetic data only.
- Do not request classified or operational details.
- Do not collect SSNs.
- Do not process DD-214 records.
- Do not collect medical information.
- Display a warning against entering sensitive military information.
- Do not persist uploaded documents.

## Engineering requirements

- Use strict TypeScript.
- Do not use `any`.
- Validate form input with Zod.
- Use semantic HTML.
- Ensure keyboard usability.
- Include visible focus states.
- Support mobile and desktop.
- Avoid unnecessary dependencies.
- Keep components maintainable.
- Add tests for domain logic.
- Never commit secrets.

## Required commands

Before considering work complete, run:

- npm run lint
- npm run typecheck
- npm run test
- npm run evals
- npm run build

Add missing scripts and tooling as required.

## Codex workflow

Before editing:

1. Read this file.
2. Inspect the repository.
3. State the implementation plan.
4. Identify dependencies to install.
5. Identify tests and evals to add.

After editing:

1. Run all required validation commands.
2. Fix failures.
3. Summarize changed files.
4. Report test and eval results.
5. Report unresolved limitations.
6. Stop after completing the requested scope.
