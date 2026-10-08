# Roadmap — Path C (Hybrid)

**Get hireable first. Learn ML on the job.**

**Companion to:** `CURRICULUM_ASSESSMENT_AND_SEQUENCE.md` (per-subject assessment and full sequencing rationale)
**Data source:** `src/data/curriculum.ts` as corrected — 28 subjects, 2,775 hours
**Date:** 2026-10-08

---

## What Path C Is

You split the curriculum in two at Phase 3, and you **start earning while you finish it**.

| | Track A — Pre-Employment | Track B — On the Job |
|---|---|---|
| **Contents** | Stage 0–4 (Setup → CS101→CS403 foundations) | Phase 4 (ML) + Phase 5 (Career) |
| **Hours** | **1,655h** + 50h CS502 | **1,070h** |
| **Duration @22h/wk** | ~20 months (with buffer) | ~31 months at 8h/wk alongside work |
| **You become…** | Hireable junior/mid full-stack engineer | ML engineer |
| **Ends at** | First job offer accepted | ML-capable, earning, certified by production |

### Why this and not the alternatives

| Path | Time to first offer | Risk | Verdict |
|---|---|---|---|
| **A — Stop after craft subjects** | ~20 months | You plateau at "full-stack dev with ML hobbies" | Rejected — leaves your actual goal unrealised |
| **B — Full sequence first** | ~35 months | 35 months of no income; the 2nd-year dropout risk is real | Rejected — too much exposure on one bet |
| **C — Hybrid** | ~20 months | Requires discipline to keep studying while working | ✅ **Chosen** |

The deciding factor: **production ML is worth more than four more months of synthetic datasets.** Data quality problems, drift, cost ceilings, and on-call reality cannot be simulated in a Kaggle notebook — and CS403's "Production ML Monitoring" content only lands once you have actually shipped something. You will learn CS402's backpropagation better in month 2 of a job than in month 14 of a classroom, because you will know what the gradient is *for*.

The cost of Path C is real and you should name it: you will learn CS401–CS406 slower, in fragments, without a clean block of time. Mitigation is in [§7](#7-the-fragmented-learning-protocol).

---

## The Shape of It

```
                    ┌─────────────────────────────────────────────┐
                    │  CS502 Portfolio & Brand — continuous        │
                    │  50h amortised, ~40min/week, week 1 onward   │
                    │  (GitHub README, commits, blog, portfolio)   │
                    └─────────────────────────────────────────────┘

TRACK A — ~1,655h, ~20 months @22h/wk
─────────────────────────────────────
  Stage 0   Environment                          10h    wk 1
  Stage 1   Foundations                           355h    wk 2–17
            CS104 → CS101 → CS105 → CS102
  Stage 2   Core CS                               590h    wk 18–44
            CS201 → CS203 → CS103 → CS204 → CS205
  Stage 3   Production + Frontend                 370h    wk 45–61
            CS301 → CS306 → CS302
  Stage 4   Craft                                  340h    wk 62–76
            CS202 → CS304 → CS307 → CS305 → CS303
                                                    ─────
                                          checkpoint ~1,655h  wk 77
                                                        ↓
                                              ★ ACCEPT A JOB ★
                                                        ↓
TRACK B — ~1,070h, on your own time
─────────────────────────────────────
  Stage 5   ML                                    830h
            CS401 → CS402 → CS403 → CS404 → CS405 → CS406
  Stage 6   Career                                240h
            CS501 → CS502D → CS502B → CS502C
                                                    ─────
                                             total  1,070h
```

**The checkpoint is wk 77, not the end.** Everything after that is paid for.

---

## Track A — Stage by Stage

### Stage 0 — Environment
**10h · Week 1 · No subject**

Do this before anything else. It is the cheapest 10 hours in the entire curriculum and nothing works without it.

```
□ WSL2 or a Linux VM working (every CS subject assumes it)
□ Git installed, SSH keys generated, GitHub SSH auth working
□ GitHub account with a profile README already written  ← do this in week 1
□ Python 3.12 + venv/uv, Node 22 + pnpm
□ VS Code + Pylance, GitLens, Prettier, ESLint
□ A terminal you are comfortable in
□ A place to keep learning notes (Obsidian, Notion, or a repo)
```

**Gate:** push an empty repo with a README to GitHub from the command line. If you can do that, you can start.

---

### Stage 1 — Foundations
**355h · Weeks 2–17 · 16 weeks**

| # | Subject | Hours | Weeks | Why here |
|---|---|---:|---:|---|
| 1 | **CS104** Git & Tooling | 30 | 2 | Everything depends on it. Do it first. |
| 2 | **CS101** Python Fundamentals | 160 | 8 | The language you will use for the next 4 years. |
| 3 | **CS105** TypeScript | 45 | 3 | Cheap. Unlocks CS302 60 weeks early. |
| 4 | **CS102** Math for CS | 120 | 6 | Feeds CS201 and CS401. Delay Part 4 (calculus). |

**Parallel thread (2h/week, starting week 2):** Linux from `linuxcommand.org`, one chapter per week. This is CS103's Part 3 — you are picking up the skill now and formally assessing it in Stage 2.

**Gate before Stage 2:**
```
□ Can I answer all 5 CS101 selfChecks out loud, no notes?
□ Are all 4 CS101 projects pushed with real READMEs?
□ Can I recover a deleted commit with git reflog?
□ Can I write a generic function that works on any array in TS?
□ Can I explain what an eigenvector is geometrically?
□ Is my GitHub profile README live?
```

---

### Stage 2 — Core CS Mastery
**590h · Weeks 18–44 · 27 weeks**

This is the long slog. CS201 is 320 of the 590 hours — more than half. Do not rush it; it is simultaneously your interview gate and the reason CS401 is tractable.

| # | Subject | Hours | Weeks | Notes |
|---|---|---:|---:|---|
| 5 | **CS201** DSA | 320 | 15 | The keystone. Add bit-manipulation + a Trie/String module per the assessment. |
| 6 | **CS203** Databases & SQL | 80 | 4 | Add a Node ORM module (~20h) per the assessment. |
| 7 | **CS103** Arch & OS | 80 | 4 | Trim Part 1 to on-demand. Keep Linux + concurrency. |
| 8 | **CS204** Networks | 65 | 3 | Wireshark lab is the point. Mark HTTP/3 + gRPC reference-only. |
| 9 | **CS205** App Security | 45 | 2 | Best ROI in this stage. Add passkeys/WebAuthn. |

**🎯 Start CS501 practice at CS201 Module 9.** Do not wait for Stage 6. From here:
- 3 problems per pattern per week, rotating through the 10 patterns
- 1 Codeforces contest weekly (start Div 3)
- This costs ~5h/week and gives you 150h of interview practice by the checkpoint instead of 120h crammed at the end

**Realistic attrition warning:** CS201 is where people quit. It is week 24, you will be tired, and the modules feel endless. The 15-pattern rotation is the thing keeping you sane — problems feel tractable because you recognise a pattern. **If you quit anywhere, it is here.** Plan a deliberate 1-week break at the CS201 halfway point rather than an unplanned collapse.

**Gate before Stage 3:**
```
□ Can I implement a heap from scratch including heapify, in <20 min?
□ Can I derive an unseen DP recurrence from scratch?
□ Can I write a 3-JOIN query with a window function without looking it up?
□ Can I read an EXPLAIN ANALYZE output and find the bottleneck?
□ Can I write a parameterized query that prevents SQL injection?
□ Have I done 10+ Codeforces contests?
```

---

### Stage 3 — Production + Frontend
**370h · Weeks 45–61 · 17 weeks**

The stage that makes you employable. Note the order: CS306 immediately after CS301, because its first project is *"Instrument your CS301 API"* — instrument code you still remember.

| # | Subject | Hours | Weeks | Notes |
|---|---|---:|---:|---|
| 10 | **CS301** Backend (FastAPI) | 150 | 7 | Move async to the back half per the assessment. |
| 11 | **CS306** Production Engineering | 80 | 3 | The highest-value module here. Now 80h, now prerequisites declared. |
| 12 | **CS302** Frontend (React) | 140 | 7 | Cut scope or expand to 200h — decide now, per the assessment. |

**Mandatory artefact:** the CS301 **Blog API deployed live** with HTTPS, CI/CD, health checks, Sentry, and structured logging. This is the single most important line on your resume for Path C. Everything in CS306 instruments *this*.

**Parallel:** 1 system-design session per month (45 min, on paper, timed). 12 of these by the checkpoint.

**Gate before Stage 4:**
```
□ Can I build JWT + refresh-token auth from scratch in <2 hours?
□ Do I have a Blog API live on a public URL right now?
□ Does it have CI running tests on every PR?
□ Can I write a multi-stage Dockerfile producing a slim image?
□ Do I have structured logs, 2 metrics, and 1 dashboard on it?
□ Is my portfolio site deployed (from CS302)?
```

---

### Stage 4 — Craft
**340h · Weeks 62–76 · 15 weeks**

| # | Subject | Hours | Weeks | Notes |
|---|---|---:|---:|---|
| 13 | **CS202** Design Patterns | 70 | 3 | Trim to SOLID + 4 patterns per the assessment. |
| 14 | **CS304** SWE Practices & DevOps | 50 | 2 | The most underrated module in the document. |
| 15 | **CS307** Legacy Code | 60 | 3 | Do the CS304 PR first, then go deeper on the same repo. |
| 16 | **CS305** Cloud (AWS) | 70 | 3 | AWS only. GCP as a comparison table. |
| 17 | **CS303** System Design | 90 | 4 | 8 case studies + 5 written design docs. Reusable interview artefacts. |

**Gate before job hunting:**
```
□ Can I design a URL shortener end-to-end in 45 minutes with tradeoffs?
□ Do I have 3 projects deployed live with URLs?
□ Have I written 5 system design documents?
□ Have I merged a real PR into an open-source project?
□ Have I written a runbook for my own Blog API?
□ Have I written a blameless postmortem?
□ Is my GitHub showing consistent activity over the last 3 months?
```

---

## ★ The Checkpoint — Week 77

**You are now applying for jobs.** Here is what you actually have:

| Evidence | Why it matters |
|---|---|
| 3 deployed, live production projects | Proof you can finish, not just tutorial |
| 1 instrumented with real observability + a postmortem + a runbook | Proof you understand production, which is what distinguishes juniors |
| NeetCode 150 + 10+ Codeforces contests + 150h pattern practice | Proof you can pass a coding screen |
| 12 system-design sessions + 5 written design docs | Proof you can be in a senior conversation |
| A merged open-source PR | Third-party validation of your code |
| GitHub with 20 months of consistent activity | Work-habit signal that no resume line conveys |
| A professional portfolio site | Where every recruiter lands first |
| LinkedIn + 3+ published blog posts | Inbound candidates start arriving |

**Apply now.** Do not extend Track A. Do not start CS401 "since you are nearly there." Phase 4 without production experience is exactly the thing CS401's own `whenStuck` warns about — you will learn theory you cannot connect to anything, and you will retain almost none of it.

### The offer filter (Path C specific)

You are optimising for *learning rate*, not just salary. When offers arrive, rank by:

| Signal | Good | Bad |
|---|---|---|
| **Mentorship** | You will get code reviewed by someone senior | Solo on a team of juniors — you learn nothing |
| **Production incidents** | Real traffic, real failures | No users, green dashboards forever |
| **Data/ML adjacency** | Any team with data pipelines | Pure CRUD features |
| **On-call** | Yes, and you'll learn from it | Yes, and you'll be paged at 2am alone with no runbook |
| **Manager** | Gives feedback, owns your growth | "We don't really do code review" |
| **Salary** | Competitive | Irrelevant if the mentorship is bad |

A lower offer with real mentorship beats a higher one where you are the most junior person on a team of juniors. You can change jobs in 18 months from a better position; you cannot un-learn a year of no feedback.

---

## Track B — On the Job

**1,070h · ~8h/week alongside full-time work · ~31 months**

### The priority order changed

On the job, two subjects jump the queue:

1. **CS306 practices** — already done. Use them daily.
2. **CS305 practices** — apply the cloud patterns you learned, for real.
3. **CS501 interview practice** — becomes mandatory *again* before any job hop.

And two defer:

- **CS502C** (Communication) — you are getting this for free, daily, by writing design docs at work.
- **CS202** further patterns — you will learn them on demand from a real codebase.

### Stage 5 — ML (830h)

| # | Subject | Hours | Weeks @8h/wk | On-the-job angle |
|---|---|---:|---:|---|
| 18 | **CS401** ML Foundations | 200 | 25 | Find a problem in your company's actual data. |
| 19 | **CS402** Deep Learning | 230 | 29 | PyTorch is Module 1 now — you can run everything immediately. |
| 20 | **CS403** MLOps & LLM | 160 | 20 | Ship one internal LLM tool at work. Highest leverage of all six. |
| 21 | **CS404** Specialization (Track A: NLP/LLM) | 120 | 15 | Follow the LLM thread you started in CS403. |
| 22 | **CS405** Data Viz & Comms | 40 | 5 | Do this for your actual manager. Immediately visible value. |
| 23 | **CS406** Data Engineering | 80 | 10 | Optional hedge — many PH "ML" roles are DE roles. |

**The single highest-ROI move in Track B:** inside your first 6 months at the job, find a recurring manual task someone does by hand, and automate it with a script or an LLM call. It becomes:
- a live portfolio artefact with a real business outcome
- the CS403 capstone, with actual stakes
- a promotion conversation

### Stage 6 — Career (240h)

| # | Subject | Hours | When |
|---|---|---:|---|
| 24 | **CS501** Technical Interviews | 120 | Before your next job hop — not now |
| 25 | **CS502D** Job Search & Negotiation | 50 | When you decide to move |
| 26 | **CS502B** Professional Dynamics | 50 | Read the 16 scenarios in month 1 of the job. You will recognise them all. |
| 27 | **CS502C** Communication | 20 | On the job, from real writing |

**CS502B timing:** read it in your first 90 days. You will have lived SCENARIO 12 ("I don't belong") and SCENARIO 15 ("imposter syndrome") and SCENARIO 4 ("how much longer?") for real. Reading it *after* the experience lands far harder than reading it before.

---

## The Fragmented Learning Protocol

This is the main risk of Path C. Eight hours a week, in fragments, after a full day of work, is a bad learning environment. Five rules make it work:

**1. Never study on zero rest.** One 8-hour day leaves no capacity. Target **6h/week across 4 days** (1.5h × 4) rather than 1 × 8h. Spacing beats duration for retention — and this is exactly what distributed practice in CS501 teaches.

**2. One subject at a time, always.** Do not have CS401 and CS402 both open. Switch only at a natural boundary (a completed module, a shipped project).

**3. Cap it at 90 minutes.** Set a hard stop. Learning that you stop reliably will start reliably. A 90-minute session you actually do beats a 4-hour session you skip.

**4. Mandatory weekend block.** One 3h block on Saturday or Sunday for the week's project artefact. Projects are what make Track B visible; theory without them is not a portfolio.

**5. Job-first rule.** When work is busy for two consecutive weeks, **work wins**. Pause the curriculum, not the job. You will lose 8 hours; you will not lose the habit. The people who fail Path C are the ones who try to do both at full intensity and burn out in month 4.

### Review loop

| Cadence | Action |
|---|---|
| Daily | Log study time to the tracker. Non-negotiable — it is your streak. |
| Weekly | 15-min retrospective: what shipped, what is blocked, next week's one goal |
| Monthly | Check the `selfCheck` gates for your current subject. Fail them? Re-do that module. |
| Quarterly | Re-read the Stage 4–6 roadmap. Reorder to fit the job you actually have. |

---

## Continuous: CS502 Portfolio & Brand

**50h total · ~40 min/week · from week 1 to whenever you stop**

This is the only subject with no finish line, and it is the one that compounds most. Split as of this commit:

**Track 1 (this half — runs continuously):**
- Profile README, updated to reflect what you are building *right now*
- Every project pushed with a real README
- Pinned repos curated to your best 6
- One blog post per week, written the day a project finishes
- Portfolio site live from CS302
- HuggingFace + Kaggle profiles once CS405 lands

**Track 2 (that half — Phase 6):** targeting, resumes, negotiation. See CS502D.

**By the checkpoint you have 20 months of visible continuous work.** No applicant who started their GitHub when they needed a portfolio can match that. It is the single strongest differentiator in Path C, and it is the cheapest thing on this page.

---

## Milestones

| Milestone | Hours | @22h/wk | @30h/wk |
|---|---:|---:|---:|
| GitHub profile README live | 10 | wk 1 | wk 1 |
| CS101 complete — first real projects | 200 | wk 10 | wk 7 |
| CS201 complete — interview-capable | 520 | wk 24 | wk 18 |
| Blog API live in production | 985 | wk 45 | wk 33 |
| Blog API instrumented + postmortem written | 1,065 | wk 49 | wk 36 |
| Portfolio site live | 1,205 | wk 55 | wk 41 |
| **★ Job-ready checkpoint** | **1,655** | **wk 77** | **wk 56** |
| Accepted a job | 1,655 | wk 77 | wk 56 |
| CS401 complete | 1,855 | on the job, mo 12 | — |
| CS403 complete — LLM capable | 2,245 | on the job, mo 22 | — |
| Track A complete | 2,655 | wk 124 | wk 90 |
| Full curriculum | 2,775 | wk 130 | wk 94 |

**Realistic with 15% buffer:** Track A is **~20 months @22h/wk** or **~15 months @30h/wk**. The curriculum's own "~19–20 months" figure assumes 5h/day every day — not achievable in a second-year programme.

**The number that matters: week 77.** Everything after is a bonus.

---

## Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Quit during CS201 (wk 24) | **High** | Fatal | Pattern rotation keeps it tractable. Plan a deliberate break at the halfway point. |
| 2 | Semester exams kill 3 consecutive weeks | High | Moderate | Budget 2 buffer weeks per semester now. |
| 3 | Reach wk 77 with no deployed project | Low | Fatal | CS306's gate requires a live instrumented API. Do not skip it. |
| 4 | Burn out while doing Track A + full-time job | Moderate | Fatal | 6h/week not 8h. One subject at a time. Work always wins ties. |
| 5 | CS502 stalls at month 4 | High | Moderate | 40 min/week is not optional. This is the compounding asset. |
| 6 | Job has no ML path at all | Moderate | High | Filter on mentorship during interviews. Automate something manual in the first 6 months. |
| 7 | Math decay before CS401 | Moderate | Moderate | One 3h re-derivation session during CS401 M1. |
| 8 | Interview prep never starts | Moderate | High | Start at CS201 M9. It is 150h of the difference. |

---

## What Changed in the Curriculum Data

Applied to `src/data/curriculum.ts` while building this. Typechecks clean, production build passes.

| Change | Detail |
|---|---|
| **CS306 prerequisites** | Added `['CS301']`. Was absent, despite its first project being *"Instrument your CS301 API."* |
| **CS307 prerequisites** | Added `['CS202', 'CS304']`. Was absent. |
| **CS306 hours** | 50 → **80**. Was the thinnest module in the document and the highest-value one in Phase 3. |
| **CS307 hours** | 40 → **60**. |
| **CS502 split** | Was `Portfolio, Brand & Job Search Strategy` (80h) declaring `prerequisites: ['CS301','CS302']` while its own duration said *"build continuously from Phase 1"* — self-contradictory. Now: **CS502 Portfolio & Brand** (50h, no prerequisites, continuous) + **CS502D Job Search Execution & Negotiation** (50h, Phase 6). |
| **CS502B rewritten** | The 16 workplace scenarios were stranded in a Markdown string consumed by one component. Now first-class subtopics in 7 parts, hours 40 → **50**. |
| **CS402 reordered** | PyTorch moved from Module 7 → **Module 1**. Six modules of undeliverable hand-derivation was the biggest burnout risk in the subject. RNN compressed into Module 5 alongside an expanded Transformers section (now 17 items). New Module 7 covers GPU/performance. |
| **CS403 de-sprawled** | 6 topics / ~14 tools → **4 topics / 1 spine** (MLflow + FastAPI serving + RAG). LlamaIndex dropped. Drift monitoring folded back into serving. Hours 130 → **160**. |
| **CS406 de-sprawled** | Spark/Delta/Kafka marked **REFERENCE**; Airflow + dbt + warehouse is the spine. 80h unchanged. |
| **Hours reconciled** | `phase.hours` now equals the exact sum of its subjects, documented in a comment at the top of the file. P1 435 · P2 580 · P3 640 · P4 830 · P5 290 = **2,775**. Previously the phase total was 2,840 and the subject total 2,665. |
| **Phase 3 mustComplete** | CS306 added. It was missing from both mustComplete and niceToHave despite being the highest-ROI module — and Path C ends at Phase 3. |
| **Phase 5 mustComplete** | Reflects the CS502 split. CS502B promoted to mustComplete; CS502C left as nice-to-have. |
| **Phase 4 mustComplete** | Was `"CS402 Deep Learning (Modules 1-6)"`, excluding Module 7 by accident. Now all 7 modules. |
| **Components updated** | `CurriculumViewer.tsx` NEW-badge list includes CS502D. `CurriculumGuide.tsx` phase hours and descriptions updated. |

**Not changed** (assessment only, deliberately left to you):
- CS103 (80h → 35h), CS104 (30h → 45h), CS105 (45h → 70h), CS302 (140h → 200h), CS202 (70h → 40h), CS501C (20h → 40h)
- The ~10 topics absent from all 28 subjects (Node.js data layer, time series, testing fundamentals, GPU fundamentals, accessibility depth, HuggingFace/Kaggle presence)

---

## Week 1 — Do This Now

```
□ Read CURRICULUM_ASSESSMENT_AND_SEQUENCE.md §5 (the sequential plan)
□ Run the Stage 0 environment checklist above
□ Write your GitHub profile README — 30 minutes, today
□ Start CS104 Git & Tooling
□ Pick your weekly hours honestly (22 or 30 — do not pick 40)
□ Put both roadmap milestones in your calendar: week 24 (CS201 done), week 77 (apply)
```

---

*The plan optimises for one outcome: reaching wk 77 with a deployed, instrumented, documented portfolio and an interview-ready skill set — then never stopping. Stage 6 is the end of this roadmap. There is no Stage 7.*