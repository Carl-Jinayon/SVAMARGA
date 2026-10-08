# Curriculum Assessment & Sequential Completion Plan

**Source:** `src/data/curriculum.ts` — originally 5 phases, 27 subjects, 2,665 subject-hours against 2,840 phase-declared hours
**Purpose:** Subject-by-subject assessment of quality and ROI, followed by a dependency-correct sequential order for completing every course and topic.
**Date:** 2026-10-08

---

> ## ⚠️ This is the reasoning document, not the timetable
>
> **Follow `ROADMAP_PATH_C.md` for what to actually do.** It carries the arithmetic
> for your current data (28 subjects, 2,840 hours) and the Path C decision to stop
> Track A at week 78 and take a job.
>
> Use *this* document when you need to know **why** a subject is trimmed, what to cut
> if you fall behind, or the gate criteria for one specific subject. Don't read it
> cover to cover.
>
> The hour figures in [§3.1](#31-summary-table) are a **proposal**. Twelve of sixteen
> are now implemented in the code; four are not. Where this document and the roadmap
> disagree, **the roadmap is correct.**

---

## How To Read This Document

| Section | What it gives you |
|---|---|
| [1. Executive Summary](#1-executive-summary) | The 10 findings that matter most |
| [2. Dependency Map](#2-dependency-map) | What unlocks what, including gaps in the declared prerequisites |
| [3. Subject Assessment](#3-subject-assessment) | Verdict + recommended hours for all 27 subjects |
| [4. Cross-Cutting Gaps](#4-cross-cutting-gaps) | Topics absent from the entire curriculum |
| [5. The Sequential Plan](#5-the-sequential-plan) | Stage-by-stage execution order with week allocations |
| [6. Execution Cards](#6-execution-cards) | Per-subject cards: hours, weeks, projects, gate criteria |
| [7. Parallelisation](#7-parallelisation) | What can run concurrently, and the early-start opportunities |
| [8. Timeline Projection](#8-timeline-projection) | Honest calendar math at different weekly intensities |
| [9. Weekly Template](#9-weekly-template) | How to actually execute a week |

**Verdict legend**

| Symbol | Meaning |
|---|---|
| ✅ | Essential — non-negotiable, keep as-is |
| 🔧 | Essential but needs adjustment (scope or structure) |
| ⏳ | Valuable but deferrable to a later point in the sequence |
| ⚠️ | Materially underspecified — needs expansion |
| ✂️ | Overweighted — cut hours or move to optional |

---

## 1. Executive Summary

### 1.1 The ten findings

**1. The phase hour totals are correct; the subject hour totals are not.**
Phase totals sum to 2,840h. Subject totals sum to 2,665h. They disagree in 4 of 5 phases:

| Phase | Phase-declared | Sum of subjects | Delta |
|---|---|---|---|
| 1 — Foundations | 520 | 435 | **−85** |
| 2 — Core CS Mastery | 720 | 580 | **−140** |
| 3 — Full-Stack | 580 | 590 | +10 |
| 4 — ML & AI | 820 | 800 | −20 |
| 5 — Career | 200 | 260 | **+60** |
| **Total** | **2,840** | **2,665** | **−175** |

Any completion % or ETA computed from `phase.hours` will disagree with one computed by summing subjects. Pick one source of truth.

**2. Two Phase-3 subjects have no prerequisites at all.**
`CS306` (Production Engineering & Incident Response) and `CS307` (Legacy Code Mastery) both omit the `prerequisites` field, despite CS306's first project being *"Instrument your CS301 API"* and CS307 depending on the refactoring discipline taught in CS202/CS304. Any automated dependency checker will schedule them first, which is wrong.

**3. CS302 (Frontend, 140h) is blocked by nothing after Phase 1.**
Its only declared prerequisites are `CS101` and `CS105`. It is the second-largest subject in Phase 3, yet it sits behind CS201 → CS203 → CS204 → CS205 → CS301 in phase order. Starting it during Phase 2 removes ~15 weeks of serial dependency.

**4. CS501 (Interview Mastery) is scheduled 4 years too late.**
It requires only `CS201`. But interview readiness is a *habit*, not an event — and the curriculum's own `interviewHabit` fields embed daily LeetCode from Phase 1 and weekly Codeforces from Phase 2. Treating CS501 as a Phase-5 event contradicts its own embedded guidance. Start pattern practice at CS201 Module 9.

**5. CS402 places PyTorch last.**
Modules 1–6 are hand-derived mathematics (backprop, convolutions, attention) with Module 7 introducing the framework you need to *run* any of it. In practice you need PyTorch from week one or you will burn out before touching a tensor. Reorder.

**6. Two Phase-4 subjects try to teach ~10 tools in the hours allotted.**
CS403 lists DVC, MLflow, W&B, Feast, Great Expectations, Pandera, ONNX, TorchScript, BentoML, Triton, Evidently, LangChain, LlamaIndex, RAGAS — roughly 14 tools in 130 hours. CS406 lists Airflow, Prefect, Dagster, Spark, Kafka, Delta Lake, dbt, BigQuery in 80 hours. Neither is feasible. Both need their tool sprawl cut by half.

**7. CS103 is the most overweight subject in the curriculum for this career goal.**
80 hours on binary arithmetic, von Neumann architecture, and Nand2Tetris, for a learner whose target is ML engineering in the Philippines. The Linux/Shell portion (Part 3) is the only part with direct daily job value. Recommend 80h → 35h.

**8. The two most job-critical modules are the two thinnest.**
`CS306` (Production Engineering, 18 subtopic bullets, 2 resources) and `CS502B` (Professional Dynamics, 18 bullets, 6 one-line parts) are far more valuable per hour than, say, CS202 Design Patterns (70h, 23 patterns + UML) — yet they get the least detail. This is an authoring inversion.

**9. CS502 contradicts itself on timing.**
Its declared prerequisite is `CS301 + CS302` (Phase 3). Its own description says *"Build continuously from Phase 1"*, its `duration` says *"Build continuously from Phase 1"*, and its `commonMistakes` says *"Waiting to apply until everything feels ready — start at Phase 3"*. It needs splitting into a continuous half and an execution half.

**10. The 19–20 month estimate assumes ~40h/week, which is incompatible with being a second-year student.**
2,840h ÷ 19 months ÷ 30.4 days = **~15.6 h/day, every day**. See [§8](#8-timeline-projection) for realistic projections at 22h/week and 30h/week.

### 1.2 Overall verdict

This is a **genuinely high-quality curriculum** — well above the median of free self-taught roadmaps. Its pedagogical instincts are consistently correct and often unusually so: it correctly delays calculus until ML, correctly identifies feature engineering as the highest-leverage ML skill, correctly warns against pattern-mania in design patterns, correctly sequences system design *after* you have built something, and its "when stuck" fields consistently point toward experimentation rather than more reading.

Its weaknesses are **editorial, not conceptual**: uneven subject sizing, tool sprawl in the ML phase, two modules that are outline-grade rather than curriculum-grade, and a phase ordering that serialises work which could run in parallel.

**Overall:** keep the architecture, fix the budgeting, and re-sequence. Recommended total: **2,840h** — exactly the phase-declared figure, so the correction is a reallocation, not an expansion. 12 of the 16 proposed changes are now implemented in curriculum.ts; 4 are not.

---

## 2. Dependency Map

### 2.1 Declared vs. actual

Solid arrows = declared in `curriculum.ts`. Dashed arrows = required in practice but **not declared** (bugs in the data).

```
STAGE 0 ── Environment setup (no subject, ~10h)

        CS104 (Git)          CS101 (Python)          CS102 (Math)
           │ 45h                │ 160h                 │ 120h
           │                    │                       │
           ├────────────────────┤                       │
           │  ┌─────────────────┼───────────────┐       │
           ▼  ▼                 ▼               ▼       │
        CS105 (TypeScript) ──► CS302 (Frontend) │       │
           70h                    200h           │       │
                                     │           │       │
           CS103 (Arch/OS, trimmed)  │      CS201 (DSA)   │
              35h ◄──┐              │        320h        │
                   │  │             │         │          │
              CS204 (Networks)      │         │          │
                 60h ◄┘             │         │          │
                   │                │         ▼          ▼
               CS203 (DB/SQL) ◄─────┴──── CS401 (ML Foundations)
                  85h                       200h
                   │                           │
                   ▼                           ├──────────────┐
               CS205 (Security) 55h           ▼              ▼
                   │                      CS402 (Deep    CS405 (Data Viz)
                   ▼                        Learning)      60h
               CS301 (Backend) 150h          230h            │
                   │                            │              │
    ┌──────────┬───┴────────┬──────────┐        ▼              │
    ▼          ▼            ▼          ▼     CS404 (ML Spec.    │
 CS303     CS304         CS305     CS406     Track A)          │
 (SD)      (DevOps)      (Cloud)   (DataEng)  120h             │
  90h       60h  ◄── CS202          80h         │              │
              │      (Patterns) 40h               ▼              │
              ▼          │                       CS403 (MLOps/  │
           CS307          │        CS401 ─────────►  LLM) 160h   │
          (Legacy)        │            │                         │
            60h           │            └──────────────┬──────────┘
                         │                           │
                         └────────────┬──────────────┘
                                      ▼
                             CS501 (Interviews) 120h
                             CS502 (Portfolio)    100h
                             CS502B (Prof. Dyn.)   50h
                             CS502C (Comms)        40h
```

### 2.2 Declared prerequisite table

| Subject | Declared prereqs | Valid? | Notes |
|---|---|---|---|
| CS101 | — | ✅ | Entry point |
| CS102 | — | ✅ | Entry point |
| CS103 | — | ✅ | Entry point |
| CS104 | — | ✅ | Entry point |
| CS105 | — | ✅ | Entry point |
| CS201 | — | ⚠️ | Effectively needs CS101 (language fluency) + CS102 M1 |
| CS202 | — | ⚠️ | No hard prereq, but needs CS101 to refactor anything real |
| CS203 | — | ⚠️ | No SQL prerequisite needed — correctly open |
| CS204 | CS103 | ✅ | Correct |
| CS205 | CS203, CS204 | ✅ | Correct |
| CS301 | CS101, CS203, CS204, CS205 | ✅ | Correct and appropriately demanding |
| CS302 | CS101, CS105 | ✅ | **Correct — and under-used. Available early.** |
| CS303 | CS203, CS204, CS301 | ✅ | Correct |
| CS304 | CS202, CS301 | ✅ | Correct |
| CS305 | CS301, CS304 | ✅ | Correct |
| CS306 | **none** | 🐛 | **Should be CS301** ("Instrument your CS301 API") |
| CS307 | **none** | 🐛 | **Should be CS202, CS304** (refactoring discipline, code-review culture) |
| CS401 | CS102, CS101, CS201 | ✅ | Correct |
| CS402 | CS401, CS102 | ✅ | Correct |
| CS403 | CS301, CS401 | ✅ | Correct |
| CS404 | CS402 | ✅ | Correct |
| CS405 | CS401 | ✅ | Correct |
| CS406 | CS203, CS301 | ✅ | Correct |
| CS501 | CS201 | ✅ | Correct — and should be *used earlier* |
| CS502 | CS301, CS302 | ⚠️ | Correct for the job-search half, wrong for the portfolio half |
| CS502B | **none** | ✅ | Genuinely open |
| CS502C | **none** | ✅ | Genuinely open |

**Two data bugs, one debatable entry.** Fix `CS306` and `CS307` in `curriculum.ts` if you want any tooling to schedule this correctly.

### 2.3 The critical path

The longest dependency chain — the floor on your total time, no matter how you arrange everything else:

```
CS104 → CS105 → CS301 → CS303          45 + 70 + 150 + 90  =  355h
CS101 → CS102 → CS401 → CS402 → CS404  160 + 120 + 200 + 230 + 120 = 830h  ← LONGEST
```

**CS102 → CS401 → CS402 → CS404 = 770 hours is a fully serial chain with zero slack.** It alone is 27 weeks at 20h/week. If you want to shorten the total, this is the only place to attack it — and the only lever is CS102 Part 5 (Graph Theory, ~15h), which duplicates CS201 Module 7 and can be deleted outright.

---

## 3. Subject Assessment

### 3.1 Summary table

| ID | Subject | Declared | Recommended | Δ | Verdict | One-line assessment |
|---|---|---:|---:|---:|:---:|---|
| CS101 | Python Fundamentals | 160 | 160 | 0 | 🔧 | Right depth, right length. Missing testing and type hints. |
| CS102 | Math for CS | 120 | 120 | 0 | 🔧 | Essential. Contains ~15h of content duplicated by CS201 M7. |
| CS103 | Arch & OS | 80 | **35** | −45 | ✂️ | 55% of it has no job relevance for this goal. |
| CS104 | Git & Tooling | 30 | **45** | +15 | 🔧 | Highest ROI per hour in the curriculum — and it's 30h. |
| CS105 | TypeScript | 45 | **70** | +25 | 🔧 | Right call, wrong placement — must follow CS101. |
| CS201 | DSA | 320 | 320 | 0 | 🔧 | Correctly the centrepiece. Two missing modules. |
| CS202 | Design Patterns | 70 | **40** | −30 | ⏳ | Post-junior vocabulary. Deferrable, and the doc says so itself. |
| CS203 | Databases & SQL | 80 | **85** | +5 | 🔧 | Underrated and excellent. No Node ORM anywhere in the curriculum. |
| CS204 | Networks | 65 | **60** | −5 | 🔧 | Unusually good for a self-taught curriculum. Trim surface items. |
| CS205 | App Security | 45 | **55** | +10 | 🔧 | Best ROI in Phase 2. Needs modern auth topics. |
| CS301 | Backend (FastAPI) | 150 | 150 | 0 | 🔧 | Well-chosen stack. Async is taught too early. |
| CS302 | Frontend (React) | 140 | **200** | +60 | 🔧 | 140h cannot cover HTML+CSS+JS+TS+React+tooling. Cut scope or add hours. |
| CS303 | System Design | 90 | 90 | 0 | ✅ | Best-designed subject in Phase 3. Correct as written. |
| CS304 | DevOps & SWE Practices | 50 | **60** | +10 | 🔧 | The most underrated module in the document. |
| CS305 | Cloud (AWS & GCP) | 70 | 70 | 0 | 🔧 | Two clouds in 70h is a false choice. Pick one. |
| CS306 | Production Engineering | 50 | **80** | +30 | ⚠️ | Outline-grade. Highest value-per-hour in Phase 3. |
| CS307 | Legacy Code Mastery | 40 | **60** | +20 | ⚠️ | Rare and valuable. Duplicates a CS304 project. |
| CS401 | ML Foundations | 200 | 200 | 0 | ✅ | Best-designed ML subject. One real gap (time series). |
| CS402 | Deep Learning | 230 | 230 | 0 | 🔧 | Correctly the hardest. Module order is backwards for practice. |
| CS403 | MLOps & LLM | 130 | **160** | +30 | 🔧 | Most market-relevant subject. 14 tools is not a curriculum. |
| CS404 | ML Specialization | 120 | 120 | 0 | 🔧 | Right structure. Make Track A the default, demote C. |
| CS405 | Data Viz & Comms | 40 | **60** | +20 | ⚠️ | Half of ML work. Only 40h. |
| CS406 | Data Engineering | 80 | 80 | 0 | 🔧 | Correct PH bet. Same tool-sprawl problem as CS403. |
| CS501 | Technical Interviews | 120 | 120 | 0 | 🔧 | Best interview-prep structure in free material. Start too late. |
| CS502 | Portfolio & Job Search | 80 | **100** | +20 | 🔧 | Self-contradictory timing. Split into two tracks. |
| CS502B | Professional Dynamics | 40 | **50** | +10 | ⚠️ | Highest ROI in Phase 5. Outline-grade as written. |
| CS502C | Communication | 20 | **40** | +20 | ⚠️ | 20h for a subject requiring a 10-minute talk. |
| | **Total** | **2,665** | **2,840** | **+175** | | +6.6% |

Recommended values for the 12 implemented changes now match `curriculum.ts` exactly. The four still-proposed changes (CS203, CS204, CS205, CS304) are marked in [§3.2](#32-phase-level-totals--status).

### 3.2 Phase-level totals — status

| Phase | Original phase total | Original subject sum | **Current (after fixes)** |
|---|---:|---:|---:|
| 1 Foundations | 520 | 435 | **430** |
| 2 Core CS | 720 | 580 | **550** |
| 3 Full-Stack | 580 | 590 | **700** |
| 4 ML & AI | 820 | 800 | **850** |
| 5 Career | 200 | 260 | **310** |
| **Total** | **2,840** | **2,665** | **2,840** |

The current total lands on **2,840** — the same figure the original phase totals claimed. The original *per-phase* numbers were approximately right all along; the *per-subject* numbers were what drifted, and they were the numbers the app displayed.

Twelve of the sixteen recommended changes in [§3.1](#31-summary-table) are now implemented in `curriculum.ts`. Four remain proposed only, and they net to **+20 hours**:

| Subject | Proposed | Current | Change |
|---|---:|---:|---|
| CS203 | 85 | 80 | +5 — add the Node ORM module (Prisma/Drizzle) |
| CS204 | 60 | 65 | −5 — mark HTTP/3 + gRPC reference-only |
| CS205 | 55 | 45 | +10 — add passkeys/WebAuthn and secure SDLC |
| CS304 | 60 | 50 | +10 — add Terraform basics and test-writing |

**For scheduling, use `ROADMAP_PATH_C.md`.** It carries the arithmetic for the current data. The hour figures in this document are the rationale, not a timetable.

---

## 4. Cross-Cutting Gaps

These are absent from **all 27 subjects**. None is optional; several are interview-relevant.

| # | Gap | Where it belongs | Severity |
|---|---|---|---|
| 1 | **Node.js backend** — the curriculum teaches TypeScript + React but every backend is Python. No Express, no Fastify, no NestJS, no Prisma/Drizzle. | CS301 or new CS308 | 🔴 High — PH full-stack postings frequently ask for Node |
| 2 | **Time series / forecasting** — completely absent. No ARIMA, Prophet, temporal convolution, or even a "what is a lag feature". | CS401 module, or CS404 Track C | 🔴 High — a standard ML interview topic |
| 3 | **Testing fundamentals** — pytest first appears in CS301 (Phase 3). CS101/CS102 build 160+120h of projects with zero tests. | CS101 | 🔴 High — teaches a habit 2 phases too late |
| 4 | **GPU / compute fundamentals** — CS402 trains vision models with no mention of CUDA, VRAM, or training cost beyond `detect_anomaly`. | CS402 | 🟡 Medium |
| 5 | **Accessibility depth** — WCAG appears once, as a single bullet, inside a 140h frontend subject. | CS302 | 🟡 Medium — shows up in job postings |
| 6 | **ML-specific data structures** — CS201 covers algorithmic structures, never tensors, sparse matrices, or graph embeddings. | CS401 | 🟡 Medium |
| 7 | **Statistics for experimentation** — A/B testing gets one bullet in CS303 and one in CS405. No power analysis, no multiple-comparison correction, no sequential testing. | CS405 | 🟡 Medium |
| 8 | **HuggingFace & Kaggle presence** — CS502 covers GitHub and LinkedIn but not the two platforms that actually signal ML credibility in 2026. | CS502 | 🟡 Medium |
| 9 | **Infrastructure as Code depth** — Terraform is one bullet in CS305, nothing in CS304. | CS304 | 🟢 Low |
| 10 | **Model cost/latency benchmarking** — token cost, p50/p95 latency, and throughput as first-class engineering concerns. | CS403 | 🟡 Medium |

**Fork decision (gap #1):** Python-only + TypeScript-frontend, or add a Node track? For ML engineering specifically, **Python-only is correct** — the market for ML engineers does not care about your REST framework. For general PH full-stack roles, a thin Node competence (build one CRUD API, know Prisma and middleware) is worth ~60h. Recommend: do the 60h Node module *after* CS302, as optional, only if general full-stack roles are in scope.

---

## 5. The Sequential Plan

### 5.1 Design principles

1. **Respect the real dependency graph, not the phase boundaries.** Phases are motivational narrative; they are not scheduling constraints. Where a subject unlocks early, run it early.
2. **Fix the two missing prerequisites** (CS306→CS301, CS307→CS202+CS304) before scheduling.
3. **Cap the critical path.** CS102→CS401→CS402→CS404 is 770 serial hours. Protect it by starting it as early as legally possible and trimming CS102 M5.
4. **Front-load cheap unlocks.** CS104 (45h) and CS105 (70h) gate almost everything downstream.
5. **Start accumulative habits early.** CS501 practice and CS502 portfolio-building begin during Phase 1, not Phase 5.
6. **Instrument what you ship.** CS306 immediately follows CS301 so you have a real deployed API to instrument.

### 5.2 Stage overview

| Stage | Contents | Hours | Gate to next stage |
|---|---|---:|---|
| **0** | Environment setup (no subject) | 10 | You can commit to GitHub from the terminal |
| **1** | Foundations — CS104, CS101, CS105, CS102 | 395 | You can write a typed, tested, versioned Python program |
| **2** | Core CS — CS201, CS203, CS103, CS204, CS205 | 555 | You can build a secured, optimised SQL-backed REST service |
| **3** | Production — CS301, CS306, CS302 | 430 | You have a deployed, instrumented, full-stack product |
| **4** | Craft — CS202, CS304, CS307, CS305, CS303 | 320 | You can run infra, review code, and design a system |
| **5** | ML — CS401, CS402, CS403, CS404, CS405, CS406 | 850 | You have shipped an end-to-end ML product |
| **6** | Career — CS501, CS502, CS502B, CS502C | 310 | You are interviewing with evidence |
| **7** | Deferred & optional | ~50+ | — |
| | **Total core sequence** | **2,840** | |

### 5.3 The order, at a glance

```
STAGE 0  Environment                                          10h

STAGE 1  1. CS104  Git & Tooling                             45h   ← FIRST
         2. CS101  Python Fundamentals                      160h
         3. CS105  TypeScript                                 70h
         4. CS102  Math for CS (Parts 1,2,3 only)             85h   ← Part 4 deferred

STAGE 2  5. CS201  Data Structures & Algorithms              320h
         6. CS203  Databases & SQL                            85h
         7. CS103  Arch & OS (Linux + concurrency only)        35h
         8. CS204  Computer Networks                         60h
         9. CS205  Application Security                       55h

STAGE 3 10. CS301  Backend Development                       150h
         11. CS306  Production Engineering & Incidents         80h   ← immediately after CS301
         12. CS302  Frontend Development                     200h

STAGE 4 13. CS202  Design Patterns (trimmed)                   40h
         14. CS304  SWE Practices & DevOps                    60h
         15. CS307  Legacy Code Mastery                        60h
         16. CS305  Cloud Fundamentals (AWS-focused)           70h
         17. CS303  System Design                             90h

STAGE 5 18. CS401  ML Foundations                            200h
         19. CS402  Deep Learning (PyTorch moved to M1)       230h
         20. CS403  MLOps & LLM Engineering                   160h
         21. CS404  ML Specialization — Track A (NLP/LLM)    120h
         22. CS405  Data Visualization & Comms                 60h
         23. CS406  Data Engineering                          80h

STAGE 6 24. CS501  Technical Interview Mastery               120h
         25. CS502  Portfolio & Job Search (both tracks)      100h
         26. CS502B Professional Dynamics                     50h
         27. CS502C Communication Mastery                      40h
```

### 5.4 Why this order and not phase order

| Change from phase order | Reason |
|---|---|
| **CS104 moved to position 1** | Git is used by all 60+ projects in the curriculum. Doing it 45h in is indefensible. |
| **CS101 before CS105** | CS105's own `commonMistakes` says *"Learning TS without learning JS first — understand the runtime first"* — yet phase order puts it in Phase 1 before CS302's JS deep dive. CS101 supplies the static-typing mental model (type hints) and the fluency to read JS. |
| **CS302 moved into Stage 3, ahead of CS202/CS303/CS304/CS305** | Its only prereqs (CS101, CS105) complete in Stage 1. It is 200h of dead time otherwise. |
| **CS201 placed after CS102** | Not a declared prereq, but CS201 M1 (Big-O) directly extends CS102 P1 (Big-O intro). Doing CS102 first removes a re-teach. |
| **CS103 moved after CS203** | CS204 (which needs CS103) comes after CS203 in the sequence; CS103 is now just-in-time. Its Linux content should be picked up as a *thread* during Stage 1 (see [§6 card for CS103](#cs103--computer-architecture--operating-systems)). |
| **CS306 immediately after CS301** | Its first project is *"Instrument your CS301 API."* Doing it 3 subjects later means instrumenting a codebase you no longer remember. |
| **CS202 moved to Stage 4** | Its value is applying patterns to real code. Before CS301 you have no code worth applying them to. (Contrast with the doc's own Phase 3 `niceToHave`: *"vocabulary now, mastery on the job"*.) |
| **CS305 after CS307** | CS305 requires CS304, so it cannot precede it. CS307 also requires CS304 (corrected). CS303 last in the stage because it needs everything before it. |
| **CS405 after CS404** | CS405 is a `niceToHave` at phase level and its SHAP content is most valuable once you have a model from CS402/CS404 to explain. |
| **CS501 practice starts at CS201 M9** | The 120h formal subject stays in Stage 6, but the *habit* starts in Stage 2. See [§7](#7-parallelisation). |
| **CS502 portfolio track starts in Stage 1** | GitHub green squares and a profile README are compounding assets. Starting them at month 18 is a waste. |

### 5.5 The two mid-sequence decision points

**Decision point 1 — after CS201 (~1,700h mark): Job-first or finish the ML chain?**

| Path | Contents | Reaches | Timeline @22h/wk |
|---|---|---|---|
| **A — Job first** | Stages 0–4 + CS501 practice | Hireable junior/mid full-stack engineer | ~18–20 months |
| **B — Full ML** | Stages 0–6 | Hireable ML/ML-adjacent engineer | ~30–36 months |
| **C — Hybrid** | Stages 0–4, then job; Phase 5–6 on the job | Same as B, 3 years earlier | ~18 months to first offer |

**Recommendation: Path C.** Path A is what the curriculum's own `mustComplete` structure implies (Phase 4 lists CS402 Modules 1-6 as *nice-to-have* territory), but Path A alone under-sells you for ML roles. Path C gets you earning and learning real production ML at the same time — and real production ML is worth more than four more months of synthetic datasets.

**Decision point 2 — after CS401: which specialisation?**

| Track | Market (PH, 2026) | Hardware needed | Verdict |
|---|---|---|---|
| **A — NLP & LLM** | Highest by a wide margin | CPU + rented GPU | ✅ Default |
| **B — Computer Vision** | Strong, more competition | GPU strongly preferred | 🟡 If you own/have access to a GPU |
| **C — Reinforcement Learning** | Niche — research, robotics, some fintech | GPU + patience | 🟢 Only for research-adjacent roles |

The curriculum's ranking ("NLP/LLM has the most demand followed by Computer Vision") is correct for the current market. Take Track A unless you have a specific reason not to.

---

## 6. Execution Cards

Each card: hours, indicative weeks at 20h/week, gate criteria you must pass to move on, and the mandatory project.

> **Gate criteria are the point of this document.** The curriculum has `selfCheck` arrays per subject; those are your gate. Do not advance on "I finished the videos." Advance on "I answered every self-check question out loud, without notes."

---

### CS104 — Version Control & Developer Tooling
**45h · 2–3 weeks · Stage 1, position 1**

| | |
|---|---|
| **Prereqs** | None. This is the true entry point. |
| **Assessment** | 🔧 Highest ROI per hour in the entire curriculum. 30h is underfunded for Git + GitHub workflow + full dev environment + pre-commit + packaging. |
| **Adjustments** | Add Docker Desktop + `docker run hello-world` (10h). Add a DB client (TablePlus/DBeaver) and `psql` basics (5h). Add SSH key generation and GitHub SSH auth (partly covered). |

**Do first, because:** every one of the 60+ projects in this curriculum lives on GitHub, and CS502's GitHub-Profile scoring depends on a clean, consistent commit history. Learning Git in week 1 costs 45h; learning it in month 8 costs 45h *plus* rewriting a messy history.

**Gate criteria (`selfCheck`)**
- [ ] Can you recover a deleted commit using `git reflog`?
- [ ] Can you explain `rebase` vs `merge`, and when to use each?
- [ ] Can you set up a venv, install packages, and freeze dependencies?
- [ ] Can you write a pre-commit hook that runs `black` before every commit?

**Mandatory project:** GitHub Portfolio Setup — push all prior work with proper READMEs, `.gitignore`, and descriptive commits.

**Add to your own checklist:** before you go further, write your GitHub profile README. It takes 30 minutes now and is worth 3 months of accumulation later (see [§7](#7-parallelisation), CS502-Track-1).

---

### CS101 — Programming Fundamentals with Python
**160h · 8–10 weeks · Stage 1, position 2**

| | |
|---|---|
| **Prereqs** | CS104 (for pushing work) |
| **Assessment** | 🔧 Correct depth, correct length, correct pedagogy ("Don't rush this. Most self-taught developers skip fundamentals and spend the next 2 years patching holes" — the single most accurate sentence in the document). |
| **Adjustments** | ⚠️ **Add `pytest` in Week 7, not Phase 3.** The curriculum has you write 4 projects with zero tests, then introduce testing 400 hours later in CS301. Move `pytest`, fixtures, and parametrisation into "Week 7: File I/O & Error Handling". ⚠️ **Add type hints in Weeks 1–4** (PEP 484, `mypy --strict`) rather than deferring to CS301's "Advanced Python". The CS105 description literally says *"Think of it as Python's type hints but for JavaScript"* — so learn the concept here first. |

**Gate criteria (`selfCheck`)**
- [ ] Write a class with inheritance without looking it up
- [ ] Read a JSON file, modify it, write it back
- [ ] Explain list vs tuple (and *why you'd pick* each)
- [ ] Write a recursive function with a base case and test it
- [ ] Explain what a decorator does before studying them formally

**Mandatory projects (all 4):** CLI Calculator · Contact Book · Grade Tracker · Number Guessing Game

**Note:** the "Debugger Basics" bullet in Weeks 1-2, plus dedicated debugging bullets in Weeks 4 and 6, come from the `markdownData.ts` enhancement layer. They are good. Keep them — debugging-as-a-habit is the most transferable skill in the early curriculum.

---

### CS105 — TypeScript & Type-Safe Development
**70h · 4 weeks · Stage 1, position 3**

| | |
|---|---|
| **Prereqs** | CS104, CS101 |
| **Assessment** | 🔧 Strategically right call (TS before JS habits form), wrong placement. |
| **Adjustments** | 1. **Move after CS101.** As noted, its own `commonMistakes` warns against learning TS before the runtime. 2. **Pull three bullets forward from CS302's "JavaScript Deep Dive":** arrow-function `this` binding, closures, and prototypal inheritance. Learning TS syntax without those makes every later debugging session confusing. 3. Add `satisfies` operator, template literal types, and const type parameters (TS 4.9–5.x) — a 2026 curriculum should include these. |

**Gate criteria (`selfCheck`)**
- [ ] Explain `interface` vs `type`
- [ ] Write a generic function that works on any array type
- [ ] Use discriminated unions to handle different response shapes
- [ ] Configure `tsconfig.json` strict mode and explain each option
- [ ] Narrow a union type with a custom type guard

**Mandatory projects:** Type-Safe CLI Tool (rewrite your CS101 Grade Tracker in TS) · TS Utility Library (10+ generics, published to npm)

---

### CS102 — Mathematics for Computer Science
**85h of 120h · 5–6 weeks · Stage 1, position 4**

| | |
|---|---|
| **Prereqs** | None declared; CS101 strongly recommended |
| **Assessment** | 🔧 Genuinely necessary and unusually well-picked resource list (MIT 6.042J, 3Blue1Brown, Deisenroth). But 5 parts across 120h means ~24h per part — too shallow for linear algebra, which is the part that actually matters. |
| **Adjustments** | ✂️ **Delete Part 5 (Graph Theory), ~15h.** BFS/DFS, spanning trees, and applications are covered in depth at CS201 M7 with 320h behind them. This is 15h of pure duplication. ✅ **Reallocate those 15h to Part 3 (Linear Algebra)** — eigenvectors/eigenvalues are the highest-leverage 15 hours in the entire Phase 1 for the ML path that follows. ⏳ **Defer Part 4 (Calculus) to Stage 7** — the curriculum already says "delay to Phase 4," and gradients are far more learnable once you've seen gradient descent in CS401/CS402. ⏳ **Defer Part 2 (Combinatorics & Probability) to Stage 7** — keep Bayes' theorem and expected value; move counting/pigeonhole to interview-prep time. |

**The math you must not skip (non-negotiable, because CS401 and CS402 depend on them):**
- Linear algebra: dot product, matrix inverse, linear transformations, **eigenvalues/eigenvectors**, Gaussian elimination
- Calculus: partial derivatives, **the gradient**, gradient descent
- Probability: conditional probability, **Bayes' theorem**, expected value, variance
- Discrete: proofs, Big-O

**Gate criteria (`selfCheck`)**
- [ ] Explain what an eigenvector is geometrically — no formula
- [ ] Derive gradient descent from first principles on paper
- [ ] Prove by induction that Σ 1..n = n(n+1)/2
- [ ] Explain Bayes' theorem with a spam-filter example
- [ ] Compute a 2×2 matrix inverse by hand

**Mandatory projects:** Gaussian Elimination · Gradient Descent Visualizer · Truth Table Generator · Probability Simulator

---

### CS201 — Data Structures & Algorithms
**320h · 16–20 weeks · Stage 2, position 5**

| | |
|---|---|
| **Prereqs** | CS102 (Big-O), CS101 (language fluency) |
| **Assessment** | 🔧 Correctly identified as "the most important subject in this entire curriculum" — that is accurate. 320h is appropriate given it is simultaneously your interview gate and your problem-solving engine. |
| **Adjustments** | 1. **Add a Bit Manipulation module** (~25h) — missing entirely, and a standard interview category. Add missing subtopics: counting set bits, checking power-of-two, XOR tricks, subset enumeration via bitmask. 2. **Split Trees into Trees + Tries/Strings** (~30h) — tries, string algorithms (KMP, Z-function, Manacher), and anagram/grouping problems are currently 2 bullets inside M5 and 3 inside M2. They need their own module. 3. **Trim M8 Sorting** — counting sort and radix sort are 2 of the 7 sorts and rarely tested. Cut to the 5 that matter (~15h saved → reinvest in DP). 4. **Add a Module 10: Greedy + Intervals + Tries** (or fold into DP module) — intervals are in CS501 but never in CS201, despite being one of the "10 patterns." |

**Why this subject is the keystone:** it is simultaneously (a) the hiring filter, (b) the reason CS401/CS402 are tractable, and (c) the reason CS501 exists. Slow it down. Do not rush it.

**Gate criteria (`selfCheck`)**
- [ ] Implement a heap from scratch *including heapify* in under 20 minutes
- [ ] Solve an unseen DP problem by deriving the recurrence from scratch
- [ ] Explain Dijkstra vs Bellman-Ford — when each fails and why
- [ ] Trace BFS and DFS on an 8-node graph by hand in under 3 minutes
- [ ] Solve an unseen sliding-window problem in under 15 minutes
- [ ] Explain union-find with path compression and why it's nearly O(1)

**Mandatory projects:** DSA Library · NeetCode 150 · Codeforces 100+ (≥30 at 1200+, ≥10 Div 3 contests) · DP Visualizer

**🎯 Start here:** the moment you finish Module 9, begin CS501's 10-pattern rotation. Do not wait until Stage 6. See [§7](#7-parallelisation).

---

### CS203 — Databases & SQL
**85h · 5 weeks · Stage 2, position 6**

| | |
|---|---|
| **Prereqs** | None |
| **Assessment** | 🔧 The most underrated subject in Phase 2. Window functions, recursive CTEs, `EXPLAIN ANALYZE`, N+1 detection, and the CAP theorem are all junior-senior interview staples and all frequently absent from self-taught curricula. |
| **Adjustments** | 1. ✂️ **Cut MongoDB depth** — 1 bullet currently. If you want document DBs, keep it at that; the job market for PH junior roles is PostgreSQL-first. 2. ✅ **Add a Node ORM module** (~20h): Prisma or Drizzle, migrations, typed query results. There is currently **no Node.js data-access layer anywhere in the curriculum**, despite the learner spending 200h on TypeScript + React. This is the single largest structural gap after Python-vs-Node. 3. ✅ Add `EXPLAIN (ANALYZE, BUFFERS)` walkthroughs on a real 10M-row table — reading a plan for a toy dataset teaches the wrong intuition. |

**Gate criteria (`selfCheck`)**
- [ ] Write a query with 3 JOINs and a window function without looking it up
- [ ] Explain 2NF vs 3NF with a concrete example
- [ ] Describe when you'd choose MongoDB over PostgreSQL and why
- [ ] Write an Alembic migration that adds a column and backfills data
- [ ] Read an `EXPLAIN ANALYZE` output and identify the bottleneck

**Mandatory projects:** E-Commerce Schema (3NF, ER diagram first) · SQL 30 Challenge · Dual-DB App

---

### CS103 — Computer Architecture & Operating Systems *(trimmed)*
**35h of 80h · 2 weeks · Stage 2, position 7**

| | |
|---|---|
| **Prereqs** | None |
| **Assessment** | ✂️ **Most overweight subject in the curriculum for this goal.** 80h on binary/two's-complement, von Neumann architecture, fetch-decode-execute, and Nand2Tetris — none of which appears in PH ML or full-stack job postings. |
| **Keep (35h)** | **Part 2: OS Fundamentals** — processes vs threads, concurrency/race conditions/deadlocks, memory management, file systems. All directly relevant to CS301, CS303, and production debugging. **Part 3: Linux Mastery** — 100% essential, and it's already the largest section. |
| **Defer to Stage 7 (optional)** | Part 1 entirely. Nand2Tetris. Review on-demand when a specific perf question requires it. |
| **Important** | **Linux is a Stage-1 thread, not a Stage-2 block.** Start the CS103 Part 3 material *now*, spread across Stages 1–2: you need `grep`/`sed`/`awk`/`tmux`/`ssh` to do CS101 and CS201 at a reasonable pace. Formal assessment happens here; skill acquisition happens throughout. |

**Gate criteria (`selfCheck`)**
- [ ] Write a shell script with a loop, a conditional, and a function, from memory
- [ ] Explain virtual memory to a 10-year-old
- [ ] Describe a deadlock with a real-world analogy
- [ ] Find and kill a process by PID from the command line
- [ ] Explain what happens between typing a URL and seeing a page — at the OS layer

**Mandatory projects:** Backup Shell Script (cron, rotation, error handling) · Process Scheduler Sim (Gantt chart) · `/proc` Explorer

---

### CS204 — Computer Networks
**60h of 65h · 4 weeks · Stage 2, position 8**

| | |
|---|---|
| **Prereqs** | CS103 |
| **Assessment** | 🔧 Unusually good. The Wireshark packet-capture project is the correct pedagogical move — theory + observation. Most curricula omit it entirely. |
| **Adjustments** | ✂️ Mark **reference-only, do not study**: HTTP/3 + QUIC, gRPC/Protobuf, and the OAuth 2.0/OIDC bullets. Each is one line; you cannot learn a protocol from one line. Read them at 2am when a bug demands it. ✅ Expand slightly: **DNS in depth** (you will debug CORS and resolution issues constantly), and **HTTP caching** (ETag/Last-Modified/Cache-Control — under-taught, immediately practical). |

**Gate criteria (`selfCheck`)**
- [ ] Draw the TCP three-way handshake from memory
- [ ] Describe what happens at each OSI layer when you visit google.com
- [ ] Explain why HTTPS prevents MITM — specifically, what TLS prevents
- [ ] Explain CORS: what it is, why browsers enforce it, how to fix an error
- [ ] Explain authentication vs authorization

**Mandatory projects:** HTTP Server from raw sockets · TCP Chat Server · Packet Capture Analysis (Wireshark, with screenshots)

---

### CS205 — Application Security
**55h of 45h · 3 weeks · Stage 2, position 9**

| | |
|---|---|
| **Prereqs** | CS203, CS204 |
| **Assessment** | 🔧 **Highest ROI per hour in Phase 2.** The PH fintech framing (GCash, Paymaya, UnionDigital) is accurate, and security is the single most common reason junior backend candidates get filtered out. |
| **Adjustments** | 1. ✅ **Add passkeys / WebAuthn** (~5h). Password-based auth is being actively deprecated in 2026; a 2026 curriculum should teach the replacement. 2. ✅ Add **Secure SDLC / threat modelling in the design phase** (~5h). 3. ✅ Add **SBOM and dependency provenance** (~5h) — the curriculum mentions "the next Log4Shell" but doesn't teach `SBOM`, Sigstore, or pinning. |

**Gate criteria (`selfCheck`)**
- [ ] Explain SQL injection and write a query that prevents it
- [ ] Explain XSS vs CSRF
- [ ] Explain why MD5 is unsafe for password storage
- [ ] Describe 5 secure HTTP headers and what each does
- [ ] Explain SSRF with a real attack example

**Mandatory projects:** Vulnerable App Audit (DVWA/WebGoat, document each finding + fix) · Secure FastAPI Endpoint

---

### CS301 — Backend Development
**150h · 8–10 weeks · Stage 3, position 10**

| | |
|---|---|
| **Prereqs** | CS101, CS203, CS204, CS205 |
| **Assessment** | 🔧 Stack selection is excellent and current: FastAPI + SQLAlchemy 2.0 + Alembic + pytest + Docker + structured logging + Sentry. This is what PH and remote international postings actually ask for. |
| **Adjustments** | 1. ⚠️ **Move `async/await` to the back half.** Currently `asyncio.gather`, `TaskGroup`, async context managers, and async SQLAlchemy + asyncpg all appear in the *first* topic block. For a solo learner at ~1,700 cumulative hours, this is the single largest burnout risk in the curriculum. Sequence: sync FastAPI → tests → Docker → deployment → *then* async. 2. ✂️ Trim **Gunicorn + Uvicorn worker tuning** to a reading item — it is a 20-minute config, not 5 hours of study. 3. ✅ Add **HTMX or server-rendered forms** (~5h). "Should I even use a SPA?" is a question you'll be asked, and having an answer requires having built the alternative. 4. ✅ Expand the **`whenStuck` advice into a real skill**: the "80% of slowness is an N+1 query" heuristic is excellent — teach `sqlalchemy.echo=True`, `py-spy`, and `EXPLAIN` as a *unit*. |

**Gate criteria (`selfCheck`)**
- [ ] Build JWT + refresh-token auth from scratch in under 2 hours
- [ ] Explain PUT vs PATCH semantically
- [ ] Write a complete pytest suite for a FastAPI route including error cases
- [ ] Write a multi-stage Dockerfile producing a slim production image
- [ ] Set up GitHub Actions that lints, tests, builds Docker, and deploys on merge

**Mandatory projects:** Blog API (JWT + refresh, cursor pagination, Redis, full tests, CI/CD) · Task Manager API (RBAC, S3, WebSockets, Celery, Sentry) · **Live Production Deployment** (this is the artefact CS306 and CS502 will both reference)

---

### CS306 — Production Engineering & Incident Response
**80h of 50h · 4–5 weeks · Stage 3, position 11**

| | |
|---|---|
| **Prereqs** | **CS301** *(corrected — currently missing from the data)* |
| **Assessment** | ⚠️ **Highest value-per-hour in Phase 3 and the thinnest content in the document.** 18 subtopic bullets total against CS401's 40. Only 2 resources. Fragments like `'Detection and Initial Response'` and `'Monitoring and Alerting'` are section headers masquerading as curriculum. Compare: the equivalent real-world scenario content in `src/data/markdownData.ts` (17 detailed scenarios) is *far* better than the subject body. |
| **Adjustments** | ✅ **Rewrite as real subtopics** (2–3 concrete items each, not one per section). ✅ **Merge in `markdownData.ts` scenarios** — the 17 production scenarios are genuinely excellent content that currently lives in a Markdown string consumed by one component. Promote them into CS306 proper. ✅ Expand 50h → 80h. ✅ Add: SLO/SLI error-budget practice, runbook authoring, and a load-testing section. |

**Why expand this:** this module teaches the thing that separates "someone who deployed a tutorial app" from "someone who has been on-call." For a self-taught applicant with no professional experience, demonstrating a written postmortem and a working runbook is unusually persuasive evidence — and it's cheap to produce.

**Gate criteria (`selfCheck`)**
- [ ] What are the four golden signals, and why is p99 more important than average?
- [ ] You are paged at 2am and error rate spiked — walk me through your first 15 minutes
- [ ] Write a blameless postmortem for signup being slow for 2 hours

**Mandatory projects:** Instrument your CS301 Blog API (structured logging + metrics + tracing + Grafana) · **Simulate and debug an incident with a friend, timeboxed, using only production signals** · Write a postmortem

---

### CS302 — Frontend Development
**200h of 140h · 10–13 weeks · Stage 3, position 12**

| | |
|---|---|
| **Prereqs** | CS101, CS105 — **both complete by end of Stage 1. This subject has no hard blockers after Week 17.** |
| **Assessment** | 🔧 **The clearest budgeting error in the curriculum.** 140h to cover HTML5 semantics + CSS box model/Flexbox/Grid/custom properties/animations + full JS deep dive + TS-in-React + 12 React topics + 10 tooling topics. That is roughly two full-time months of work, not ten weeks. Compare CS301: 150h for backend, and CS301's content is *less* dense. |
| **Adjustments — pick one, not both** | **Option A — expand to 200h (recommended).** Keeps the scope. **Option B — cut to 140h** by removing: Storybook, the Axios-vs-Fetch comparison, "Migrating JS to TS," and Tailwind specifics. Also **add accessibility as a topic block (not one bullet)** — WCAG AA, keyboard navigation, screen-reader testing, and axe DevTools is currently a single bullet in a 140h subject, and it appears in real job postings. |
| **Note** | If you choose Option A, this becomes the largest subject in Phase 3 and it correctly so — React+TS at hire-ready level genuinely takes 200h. |

**Gate criteria (`selfCheck`)**
- [ ] Explain the JS event loop with an example that surprises most developers
- [ ] Build a fully typed React form with validation using Zod + React Hook Form
- [ ] Explain all three forms of `useEffect` dependency array and when each is appropriate
- [ ] Implement an optimistic update in TanStack Query from scratch
- [ ] Score 90+ on Lighthouse for your portfolio site

**Mandatory projects:** Portfolio Site (mobile-first, dark mode, WCAG AA, Vercel, Lighthouse 90+) · Weather Dashboard · Full-Stack Task App (consuming your CS301 Task API) · Real-Time Chat UI

**🎯 This is your portfolio site.** Build it first in this subject, not in CS502. CS502 is about *marketing* it.

---

### CS202 — Object-Oriented Design & Design Patterns *(trimmed)*
**40h of 70h · 2–3 weeks · Stage 4, position 13**

| | |
|---|---|
| **Prereqs** | CS301 *(practical)* — declared as none |
| **Assessment** | ⏳ 70h for 23 patterns + UML is heavy for a learner targeting ML engineering, and the subject's own `commonMistakes` warns *"Applying patterns everywhere — patterns solve specific problems, not all problems."* The curriculum itself gives GoF a 3-star rating. |
| **Adjustments** | 1. ✂️ **Keep SOLID + 4 patterns: Observer, Strategy, Factory, Decorator.** These are the four you will actually use. Move Singleton, Prototype, Proxy, Composite, Command, Iterator, State, Template Method to a reference appendix. 2. ✂️ **Drop UML diagrams** — no tool is named, no project uses them, and they have near-zero interview value for this path. 3. ✅ **Keep and expand the SOLID violations exercise** — *"identify which SOLID principle a piece of code violates"* is the genuinely useful activity. |

**Placement note:** this subject is deferred to Stage 4 on purpose. Patterns are vocabulary for *discussing* solutions to code you have already written. Before CS301 you have no code to discuss.

**Gate criteria (`selfCheck`)**
- [ ] Identify which SOLID principle a piece of code violates, and why
- [ ] Implement Observer from memory in under 15 minutes
- [ ] Explain why Singleton is often called an anti-pattern in testable code
- [ ] Draw a class diagram for a simple ride-sharing system from scratch
- [ ] Explain Decorator vs inheritance with a concrete example

**Mandatory projects:** Refactor Grade Tracker (add new grade types without touching existing classes) · Plugin System (Strategy + Factory, demonstrates OCP) · Event System (pub/sub with filtering and dead-letter queue)

---

### CS304 — Software Engineering Practices & DevOps
**60h of 50h · 3 weeks · Stage 4, position 14**

| | |
|---|---|
| **Prereqs** | CS202, CS301 |
| **Assessment** | 🔧 **The most underrated module in the entire document.** The "Engineering Soft Skills" block — bug reports, asking for help effectively, estimating work, giving feedback, meeting discipline — is the content most self-taught curricula omit entirely and most self-taught candidates most conspicuously lack. It is worth more than most of CS402. |
| **Adjustments** | 1. ✅ Expand 50h → 60h. 2. ✅ **Move the soft-skills block earlier** — it is needed at your *first* internship, not your first senior role. 3. ✅ Add **Terraform (basic)** — currently one bullet in CS305 and nothing here, which is backwards given IaC is now table stakes. 4. ✅ Add "**how to write a good test**" beyond just "CI must run tests" — test naming, AAA structure, what not to test. |

**Gate criteria (`selfCheck`)**
- [ ] Write a complete GitHub Actions workflow from scratch including matrix builds
- [ ] Explain CI vs CD with examples of each
- [ ] Write a constructive, kind, specific code-review comment on a junior's PR
- [ ] Write an Architecture Decision Record for a technology choice you made

**Mandatory projects:** Full CI/CD Pipeline (test/lint/build/deploy) · **Open Source Contribution** — a real merged PR

**Overlap note:** the Open Source Contribution project overlaps almost exactly with CS307's "Refactor an Open-Source Project." **Do CS304's PR first**, then use CS307 to go deeper on the same repository. See the CS307 card.

---

### CS307 — Legacy Code Mastery & Refactoring
**60h of 40h · 3 weeks · Stage 4, position 15**

| | |
|---|---|
| **Prereqs** | **CS202, CS304** *(corrected — currently missing from the data)* |
| **Assessment** | ⚠️ Rare, honest, and genuinely valuable — "real jobs consist of maintaining code you didn't write, written in a rush by people who left 2 years ago" is more true than most curricula admit. But 14 bullets and 2 books is outline-grade, and it duplicates a CS304 project. |
| **Adjustments** | 1. ✅ **De-duplicate:** CS304's "Open Source Contribution" and CS307's "Refactor an Open-Source Project" are the same project. Merge them: submit the PR under CS304, then do a deeper refactor pass on that same repo under CS307. 2. ✅ Expand 40h → 60h and rewrite as real subtopics. 3. ✅ Add **code archaeology** tooling: `git log -S`, `git blame`, `git log --follow`, `lsof`-style tracing. These are the actual skills of reading legacy code and are never taught. |

**Gate criteria (`selfCheck`)**
- [ ] Describe your approach to understanding an unfamiliar 5,000-line codebase
- [ ] What is a characterization test?
- [ ] You find duplicated validation logic in 3 places — walk me through the refactoring

**Mandatory projects:** Characterization Tests & Refactor (your own messiest project) · Open-source refactor (continuing CS304's repo)

---

### CS305 — Cloud Fundamentals
**70h · 4 weeks · Stage 4, position 16**

| | |
|---|---|
| **Prereqs** | CS301, CS304 |
| **Assessment** | 🔧 **70h for both AWS and GCP is a false choice.** You end up shallow in both. |
| **Adjustments** | 1. ✅ **Pick AWS as primary** and compress GCP to a comparison table (~8h: *"same concepts, different names — Compute Engine=EC2, Cloud SQL=RDS, Cloud Run≈Lambda with containers"*). The subject's own subtopics already contain these equivalences, so the mapping is nearly free. Rationale: AWS has the broader PH market (enterprise, BPO, and the multinational list in CS502), and skills transfer AWS→GCP far more readily than the reverse. 2. ✅ Expand **CloudFront/CDN** and **S3 presigned URLs** (already required by CS301's Task Manager project but not taught here). 3. ✅ Keep **billing alerts** as a non-negotiable — the `commonMistakes` are right and this is a real career hazard. 4. 🟡 Kubernetes: the honest "overview only" treatment is correct. Do not expand it. |

**Gate criteria (`selfCheck`)**
- [ ] Security group vs NACL in AWS
- [ ] Deploy a containerised FastAPI app to Cloud Run using Cloud Build
- [ ] Why IAM roles are more secure than IAM users
- [ ] Estimate the monthly cost of running a small web app on AWS
- [ ] Lambda vs Cloud Run — when to use each

**Mandatory projects:** Cloud-Deployed API (private subnet for DB, S3, Redis/ElastiCache, CloudWatch alerts) · Serverless Image Processor (S3-triggered)

---

### CS303 — System Design
**90h · 4–5 weeks · Stage 4, position 17**

| | |
|---|---|
| **Prereqs** | CS203, CS204, CS301 |
| **Assessment** | ✅ **The best-designed subject in Phase 3. Change nothing structural.** "You won't master this in 8 weeks — but you must build the vocabulary now and deepen it on the job" is exactly the right framing, and the phase-level placement as `niceToHave` ("vocabulary now, mastery on the job") is correct. The 8 case studies cover the right ground and in the right order (simple → compound). |
| **Minor** | ✅ Add **"design a cache invalidation strategy"** as an explicit case study — it is the single most-asked system design question and is only implicitly covered. |

**Gate criteria (`selfCheck`)**
- [ ] Design a URL shortener end-to-end in 45 minutes *including tradeoffs*
- [ ] Explain CAP with a concrete example of each combination
- [ ] Describe 3 strategies to scale a read-heavy PostgreSQL database
- [ ] Explain what a message queue solves that a synchronous call cannot
- [ ] Describe the fanout problem in social feeds and both solutions

**Mandatory projects:** URL Shortener (end-to-end, Redis, analytics, load-tested) · **Design Documents for 5 case studies** (requirements → capacity estimates → component diagram → data model → API design → tradeoffs). These documents are directly reusable interview artefacts.

---

### CS401 — Machine Learning Foundations
**200h · 12–14 weeks · Stage 5, position 18**

| | |
|---|---|
| **Prereqs** | CS102, CS101, CS201 |
| **Assessment** | ✅ **The best-designed ML subject in the document, and possibly of any free curriculum.** Three things it gets right that most get wrong: (1) Module 4 is *feature engineering*, flagged as the highest-leverage skill — correct, and rare; (2) the target-leakage bullet is called "the silent killer" and placed in the feature-engineering module where it belongs; (3) `whenStuck` correctly says *"80% of the time the problem is the data, not the algorithm."* |
| **Adjustments** | 1. ✅ **Add a time-series module** (~25h) — forecasting, lag/rolling features, temporal splits, backtesting. Entirely absent from the curriculum and a standard ML interview topic. Cut SVM/KNN/Naive Bayes depth (each is 1 bullet and rarely wins a real modelling decision) to fund it. 2. ✅ Add **recommender systems** (collaborative filtering, matrix factorisation) — currently only in the Phase 4 capstone, but it's the most commonly requested ML project in interviews. |

**Gate criteria (`selfCheck`)**
- [ ] Explain bias-variance with a diagram you drew yourself
- [ ] Derive gradient descent for linear regression on paper
- [ ] Explain why target leakage is dangerous, with a real example
- [ ] Describe 5 ways to handle imbalanced classification, with tradeoffs
- [ ] Explain what a kernel does in SVM without using the word "kernel"
- [ ] Explain when you'd choose XGBoost over Random Forest

**Mandatory projects:** Kaggle Titanic (top 10%) · Spam Classifier · **PH Customer Segmentation** (a Philippine e-commerce dataset — this one is worth more than the others for PH interviews specifically) · House Price Prediction (RMSE < 0.13)

---

### CS402 — Deep Learning & Neural Networks
**230h · 14–16 weeks · Stage 5, position 19**

| | |
|---|---|
| **Prereqs** | CS401, CS102 |
| **Assessment** | 🔧 Correctly labelled the hardest subject ("Every expert in this field struggled at backpropagation once. Be patient."). Module *content* ordering is pedagogically sound: foundations → regularisation → CNN → RNN → Transformer → generative. **But Module 7 breaks it.** |
| **Adjustments — the most important single fix in this plan** | 1. ✅ **Move PyTorch from Module 7 to Module 1.** You will spend 6 modules deriving backpropagation, convolutions, and attention by hand without being able to run a single line of it. You will quit. Instead: hand-derive backprop once on paper (as the curriculum insists), then implement it in PyTorch immediately and verify your derivation numerically with `gradcheck`. Every subsequent module then has runnable code. 2. ✂️ **Compress Module 4 (RNN/LSTM/GRU) from a full module to ~2 weeks.** Transformers subsumed most of it; 8 topics is over-weighted for 2026. Reallocate to Module 5. 3. ✅ **Expand Module 5 (Transformers)** — it is the single most valuable module in the curriculum for 2026 hiring and currently gets the same airtime as CNNs. 4. ✅ Add **FlashAttention and KV-cache** (~5h) — inference-time topics that every current LLM role assumes. |

**Gate criteria (`selfCheck`)**
- [ ] Derive backpropagation for a 2-layer network on paper without reference
- [ ] Explain why ResNet's skip connections solve vanishing gradients
- [ ] Explain scaled dot-product attention intuitively, step by step
- [ ] Implement a complete PyTorch training loop from scratch in under 30 minutes
- [ ] Explain what makes BERT different from GPT architecturally
- [ ] Explain how diffusion models generate images at a high level

**Mandatory projects:** MNIST from Scratch · Transfer Learning (custom PH dataset, Grad-CAM) · BERT Sentiment Analysis · Kaggle Deep Learning (top 30%)

**Hardware note:** none of these require a local GPU at this scale, except possibly the Kaggle competition — use Kaggle's free GPUs.

---

### CS403 — MLOps & LLM Engineering
**160h of 130h · 10–12 weeks · Stage 5, position 20**

| | |
|---|---|
| **Prereqs** | CS301, CS401 |
| **Assessment** | 🔧 **The most market-relevant subject in the entire curriculum** — "LLM Engineering is the hottest skill in the PH tech market," and the RAG-before-fine-tuning guidance is exactly right. The problem is tool density: roughly **14 named tools in 130 hours** is not a curriculum, it's a list. |
| **Adjustments — cut the sprawl by half** | **Pick one spine and go deep:** MLflow (experiment tracking) + FastAPI serving + one drift tool (Evidently). **Move to "read when needed":** DVC (learn `git` for data first — it is 90% as good and you already know it), Feast, Great Expectations/Pandera, Triton, BentoML, TorchScript. **Cut entirely:** LangChain *or* LlamaIndex — **not both.** Pick LangChain (larger ecosystem, more PH job mentions) and delete the LlamaIndex bullets. ✅ **Add:** token cost tracking and p50/p95 latency benchmarking as first-class engineering concerns (gap #10). ✅ **Add:** a caching layer (semantic cache over embeddings) — the single most common production RAG optimisation and it appears in no curriculum. |
| **Restructure** | Six topics → four: (1) Experiment tracking & reproducibility, (2) Model serving & deployment, (3) **RAG & LLM applications** (double weight), (4) Fine-tuning & production hardening. |

**Gate criteria (`selfCheck`)**
- [ ] Explain data drift vs concept drift with real examples
- [ ] Describe the RAG architecture completely, document → answer
- [ ] Explain when fine-tuning beats RAG and when RAG beats fine-tuning
- [ ] Set up MLflow experiment tracking from scratch
- [ ] Implement a ReAct agent with custom tools
- [ ] Explain what RAGAS measures and how to interpret the scores

**Mandatory projects:** ML Production API · RAG Document System · LLM Agent · Fine-Tuned Model (QLoRA 7B)

---

### CS404 — ML Specialization *(Track A default)*
**120h · 8–10 weeks · Stage 5, position 21**

| | |
|---|---|
| **Prereqs** | CS402 |
| **Assessment** | 🔧 "Pick one track and go deep" is correct, and the PH-market ranking (NLP/LLM > CV > RL) is defensible for 2026. |
| **Adjustments** | 1. ✅ **Make Track A the default** and publish B and C as clearly-labelled appendices. 2. 🟢 **Demote Track C (RL)** to optional. It is 10 bullets and the least employable in the PH market — the realistic paths are research, robotics, or a few fintech/optimisation roles. 3. ✅ **Add to Track A:** retrieval reranking (cross-encoders), structured output/function calling depth, and evaluation harness design — the three things a 2026 LLM role assumes. 4. ✅ Add **tokenizer internals depth** — BPE/WordPiece are 1 bullet but they explain most LLM failure modes you'll debug. |

**Gate criteria (`selfCheck`)**
- [ ] Fine-tune a HuggingFace model end-to-end on a custom dataset
- [ ] Explain BLEU vs ROUGE and when each is appropriate
- [ ] Explain why PPO is more stable than vanilla policy gradient, mathematically
- [ ] Train a YOLOv8 model and evaluate its mAP *(Track B)*

**Mandatory projects:** Track A — Full Document QA (100+ docs, citations, React frontend, RAGAS-evaluated)

---

### CS405 — Data Visualization & Communication
**60h of 40h · 3–4 weeks · Stage 5, position 22**

| | |
|---|---|
| **Prereqs** | CS401 |
| **Assessment** | ⚠️ **Undersold.** "Half the job of any ML or data role is communicating your findings to people who don't understand the math" is true, and it gets 40 hours — the joint-smallest subject in the curriculum. Meanwhile the **Model Card** and **SHAP values** topics are the highest-ROI ML-hiring content in Phase 4 and they appear as single bullets. |
| **Adjustments** | 1. ✅ Expand 40h → 60h. 2. ✅ **Move model cards and SHAP out of bullet status** into proper subtopic blocks — a model card is a portfolio artefact you can show an interviewer. 3. ✅ Add **A/B test statistics**: statistical significance, p-values explained properly, multiple-comparison correction, minimum detectable effect (gap #7). 4. ✅ Add "**visualise your model's failures**" as a graded activity — the `commonMistakes` note it but the projects don't require it. |

**Gate criteria (`selfCheck`)**
- [ ] Explain SHAP values to a non-technical stakeholder
- [ ] Build an interactive Streamlit dashboard in under 2 hours
- [ ] Identify 3 things wrong with a poorly designed chart
- [ ] Write a one-paragraph executive summary of model performance

**Mandatory projects:** EDA Dashboard (Streamlit) · **ML Explainability Report (SHAP)** · **Model Card**

---

### CS406 — Data Engineering Foundations
**80h · 5 weeks · Stage 5, position 23**

| | |
|---|---|
| **Prereqs** | CS203, CS301 |
| **Assessment** | 🔧 **The correct strategic bet** — "many 'ML Engineer' job postings in the Philippines are actually Data Engineering roles in disguise" is accurate, and this subject is your hedge against a thin ML market. But it repeats CS403's mistake: ~8 named tools in 80h. |
| **Adjustments** | 1. ✅ **Pick Airflow + dbt + one warehouse (BigQuery or Snowflake).** 2. ✂️ Move Spark, Delta Lake, and Kafka to reference. Spark deserves a full course or none; a week of Spark teaches the wrong intuition about shuffles and partitioning, and that's the concept that matters. 3. ✅ Add **data contracts and schema evolution in practice** — `commonMistakes` mentions it but no project exercises it. 4. ✅ Add **cost of a pipeline** — BigQuery slot-hours and storage costs are the "surprise bill" of data work, exactly as cloud bills are in CS305. |

**Gate criteria (`selfCheck`)**
- [ ] Explain ETL vs ELT
- [ ] Write a PySpark job reading Parquet and writing to Cloud Storage
- [ ] Explain star schema and why it's preferred for analytics
- [ ] Design a simple Airflow DAG for a daily pipeline

**Mandatory projects:** Airflow ETL Pipeline (retries, DQ checks, alerting, Streamlit dashboard) · dbt Project (staging/intermediate/mart, all tests passing)

---

### CS501 — Technical Interview Mastery
**120h · 6–8 weeks · Stage 6, position 24**

| | |
|---|---|
| **Prereqs** | CS201 — **but start practising at CS201 Module 9, ~400h earlier** |
| **Assessment** | 🔧 **The best-structured interview-prep material in any free curriculum I've seen.** Five things it does right that most get wrong: (1) the **UCTPV** framework; (2) *"the goal is not to be the smartest — it is to be the most practiced"*; (3) the **explicit 45-minute budget** broken into 5/5/10/20/5; (4) "brute force first"; (5) *"never go silent for more than 30 seconds."* All five are things experienced interviewers look for and no standard course teaches. |
| **Adjustments** | 1. ✅ **Distribute the practice.** Do not spend 120h in a Phase-5 block. See [§7](#7-parallelisation): start the 10-pattern rotation at CS201 M9, add one mock/month from Phase 3, and use Stage 6 only for *rehearsal and refinement*. 2. ✅ **Add ML-specific interview loops:** "explain this model's training pipeline," "how would you debug a model that works locally but not in production," "design a feature store." PH ML interviews weight these heavily and CS501 contains none. 3. ✅ Add **take-home exercise practice** — most PH companies give a 4-hour take-home, not a whiteboard. |

**Gate criteria (`selfCheck`)**
- [ ] Solve any unseen Medium DP problem in 35 minutes
- [ ] Design a URL shortener from scratch in 45 minutes
- [ ] Deliver "tell me about yourself" in 90 seconds
- [ ] Name all 10 patterns with 2 example problems each
- [ ] Identify the applicable pattern for an unseen problem in 2 minutes

**Mandatory projects:** NeetCode 150 · 20 Mock Interviews · 7 System Design Walkthroughs · Behavioural Stories Bank (10 STAR stories)

---

### CS502 — Portfolio, Brand & Job Search
**100h of 80h · 6 weeks · Stage 6, position 25 — but split**

| | |
|---|---|
| **Prereqs** | **Split.** See below. |
| **Assessment** | 🔧 The PH-specific content (GCash/Mynt, Paymaya/Voyager, Kumu, Exist, Pointwest, DevCon PH, P40-70K junior band) is genuinely rare and useful. But the subject contradicts itself on timing. |

### Split the subject into two tracks:

| | **Track 1 — Portfolio & Brand** | **Track 2 — Job Search Execution** |
|---|---|---|
| **When** | **Stage 1, continuously** | **Stage 5–6** |
| **Hours** | ~50h spread across the whole curriculum | ~50h in Stage 6 |
| **Prereqs** | CS104 (GitHub + profile README) | CS301, CS302, CS501 |
| **Contents** | Profile README · README quality · commit hygiene · pinned repos · blog cadence · portfolio site | Application targeting · resume optimisation · salary negotiation · follow-up discipline · inbound vs outbound |
| **Rationale** | These assets **compound**. A profile README written in month 1 and maintained for 30 months shows something no resume can: sustained work. A portfolio site built in month 18 shows nothing about consistency. | These require evidence to exist. Applying in Stage 1 wastes your one-shot credibility with recruiters who remember you. |

**Adjustments:**
1. ✅ Add **HuggingFace profile and Kaggle profile** to Track 1 (gap #8). For ML roles in 2026 these are the equivalent of GitHub stars, and the curriculum mentions neither.
2. ⚠️ **Date-stamp the salary bands.** "Junior P40-70K, Mid P80-120K, Senior P150-250K" is stated as fact with no source. Add *"as of 2025 — verify on Glassdoor/levels.fyi before negotiating."*
3. ✅ The negotiation section's 8 bullets are platitudes ("never give a number first" is right; "the silence tactic" is filler). Replace with 2 scripted dialogues — one phone screen, one offer negotiation — with exact wording.

**Gate criteria (`selfCheck`)**
- [ ] Do you have 3 projects deployed live with URLs right now?
- [ ] Can you explain any portfolio project in 3 minutes with clear depth?
- [ ] Is your GitHub showing consistent activity for the past 3+ months?
- [ ] Have you researched and written down your target salary range?
- [ ] Can you deliver your counter-offer without hesitating?

**Mandatory projects:** Portfolio Website · 10 Technical Blog Posts (≥2 with 500+ views) · Job Campaign (60 applications tracked)

---

### CS502B — Professional Dynamics & Working in Teams
**50h of 40h · 3 weeks · Stage 6, position 26**

| | |
|---|---|
| **Prereqs** | None *(genuinely — correct as declared)* |
| **Assessment** | ⚠️ **Highest ROI per hour in Phase 5, and outline-grade.** 6 parts, 3 bullets each, mostly fragments: `'Unwritten rules: Speak up early, assume best intent'`, `'On-call burnout prevention'`, `'Addressing toxic behavior properly'`. Meanwhile `src/data/markdownData.ts` contains **17 fully-written, genuinely excellent workplace scenarios** that are far better teaching material than this subject body. |
| **Adjustments** | 1. ✅ **Promote the 17 scenarios from `markdownData.ts` into this subject.** They currently live in a Markdown string rendered by `Enhancements.tsx` — they should be the curriculum. 2. ✅ Expand to 50h and rewrite as real subtopics. 3. ✅ Add **the first-90-days plan** (the subject has 30 days; 90 is the real milestone) and **career progression mechanics** (how promotions actually work, how to ask for one). 4. ✅ Add **managing up when your manager is wrong** — the hardest junior skill and it's absent. |

**Gate criteria (`selfCheck`)**
- [ ] How do you properly ask a senior engineer for help?
- [ ] A teammate gives you harsh feedback on a PR — how do you respond?
- [ ] Your manager asks for a 2-week task with 3 days left — what do you say?

**Mandatory projects:** 1-on-1 Agenda · Feedback Response Practice

**Portfolio note:** the `markdownData.ts` integration guide explicitly asks for a blog post *"Lessons from My First 30 Days."* This is a strong signal the author knows the content matters. It just isn't weighted as a subject.

---

### CS502C — Communication Mastery
**40h of 20h · 2–3 weeks · Stage 6, position 27**

| | |
|---|---|
| **Prereqs** | None *(correct as declared)* |
| **Assessment** | ⚠️ **Under-resourced to the point of incoherence.** 20 hours for a subject whose mandatory project is *"Give a 10-minute presentation on a technical topic"* — and whose Part 4 is *"Public Speaking Anxiety."* 4 parts, 7 bullets total. |
| **Adjustments — two options** | **Option A (recommended): fold into CS502B** as Modules 7–8 ("Writing for Engineers" and "Presenting"). The two subjects have real overlap — CS502B already covers bug reports and CS304 already covers technical communication. Merging gives ~60h of coherent communication training instead of 60h split across two thin ones. **Option B: expand to 40h** with real subtopics, and add **writing a design document / ADR for a non-technical reader** (currently only CS304 touches ADRs, and only for engineers). |
| **Note** | CS304 already contains a "Code Quality & Professionalism" block with docstrings, READMEs, ADRs, and structured logging. **Deduplicate against CS304** before expanding either subject. |

**Gate criteria (`selfCheck`)**
- [ ] What makes a good code comment vs a bad one?
- [ ] How do you structure an RFC?
- [ ] How do you explain a database migration to a product manager?

**Mandatory projects:** Write an RFC · Technical Presentation (tailored to a non-technical audience)

---

## 7. Parallelisation

### 7.1 Early-start opportunities

These are the highest-value scheduling wins available. Each is a small time investment that unlocks or accumulates something over 20–36 months.

#### 🎯 CS501 pattern practice — start at CS201 Module 9, not Stage 6

| Stage | Action | Hours | Accumulated by Stage 6 |
|---|---|---:|---|
| CS201 M9 complete | Begin the 10-pattern rotation: 3 problems per pattern per week | ~5h/wk × 30wk = 150h | 150h |
| Phase 3 | One 45-min system design mock per month | 45min × 12 = 9h | 9h |
| Stage 6 | Formal CS501 block: rehearsal, refinement, full mocks | 120h | **279h** |

**Net effect: 279h of interview practice instead of 120h.** This is the single largest quality improvement available in the entire plan, and it costs nothing but redistribution.

#### 🎯 CS502 Track 1 — GitHub presence from week 1

| When | Action |
|---|---|
| Day 1 | Profile README: who you are, what you're building, current focus |
| Every subject | Every project pushed with a real README |
| Weekly | A commit, even a small one — consistency is the signal |
| Monthly | One short blog post, even 300 words |
| Stage 3 | Portfolio site goes live (from CS302) |
| Stage 5 | HuggingFace + Kaggle profiles, model cards (from CS405) |

**By Stage 6 you have 2–3 years of visible continuous work.** That is the single strongest differentiator you can have against every other applicant who started their GitHub when they needed a portfolio.

#### 🎯 CS103 Linux — a thread, not a block

Start `linuxcommand.org` in Stage 1. One chapter per week alongside your actual subject. By Stage 2 you will already be fluent, and CS103's formal assessment takes 2 weeks instead of 6.

#### 🎯 CS401 math — just-in-time reinforcement

CS102 Part 3 (Linear Algebra) is 85h in Stage 1 and CS401 is 700h later. Re-derive eigenvectors once during CS401 M1. One 3-hour session prevents six months of decay.

### 7.2 What can genuinely run concurrently

A single learner cannot literally do two subjects at once. But these pairs have **near-zero context-switching cost** because they use the same mental context or the same project:

| Pair | Why concurrent is cheap | Benefit |
|---|---|---|
| **CS104 + CS101** | Every CS101 project needs git | CS104 effectively becomes free |
| **CS102 Part 3 + CS401 M1** | Same math, immediately applied | Eliminates a full re-learn |
| **CS203 + CS301** | CS301's DB layer is CS203 applied | CS203's investment pays off immediately |
| **CS202 + CS307** | CS307 is literally "apply refactoring patterns to real code" | Merge into one subject |
| **CS304 + CS305** | Same infrastructure concerns | Merge into one subject |
| **CS402 + CS403** | Both in the same LLM-era context | Reduces load-shedding |
| **CS306 + CS301** | Instrument what you just built | CS306 becomes 4 weeks, not 8 |

### 7.3 Where parallel work actually causes failure

| Risk | Why it kills progress | Mitigation |
|---|---|---|
| **CS302 + CS301 concurrently** | Different languages, different runtimes, different mental models | Never. One at a time, full attention |
| **Two ML subjects concurrently** | CS402 and CS403 both have huge concept loads that interfere with retention | Strictly serial: CS401 → CS402 → CS403 |
| **Anything during exam weeks** | Curriculum slip compounds — this is the #1 cause of abandonment | Pre-plan 2 buffer weeks per semester. Budget them now |
| **"Nice to have" subjects alongside must-complete** | Must-completes slip; nice-to-haves never get done | Finish must-complete list before starting any nice-to-have. Non-negotiable |

---

## 8. Timeline Projection

### 8.1 The arithmetic

Core sequence: **2,840 hours** (excluding Stage 7 optional material).

| Weekly hours | Typical context | Wall-clock time | Weeks | Months |
|---:|---|---:|---:|---:|
| 40 | Full-time, no other commitments | **~19 months** | 72 | 19 |
| 30 | Summer break / between terms | ~24 months | 96 | 24 |
| **22** | **Realistic alongside a 2nd-year load** | **~30 months** | 130 | 30 |
| 15 | Heavy semester + coursework | ~44 months | 191 | 44 |
| 10 | Casual / 2h × 5 days | ~67 months | 287 | 67 |

Add a **15% buffer** for exam weeks, illness, holidays, and inevitable rework. Realistic figures:

| Intensity | With buffer | Milestone |
|---|---:|---|
| 40h/wk | **~22 months** | Matches the curriculum's own "19–20 months" claim |
| 30h/wk | **~28 months** | |
| **22h/wk** | **~35 months** | ← **the realistic figure for a 2nd-year student** |
| 15h/wk | **~51 months** | |

### 8.2 Reconciling with the curriculum's claim

`markdownData.ts` states: *"Original Curriculum: 2,840 hours, ~19 months at 5 hrs/day."*

5h/day × 7 days × 52 weeks = 1,820h/year. 2,840 ÷ 1,820 = 1.56 years = **18.7 months**. The arithmetic is internally correct — **but it requires 5 hours of study every single day, including all 104 weekend days, for nineteen consecutive months.** For someone simultaneously enrolled in a second-year university programme, that is not achievable.

**The curriculum does not lie, but its headline figure describes a full-time learner.** Do not plan against it.

### 8.3 Milestones

| Milestone | Hours done | @22h/wk | @30h/wk |
|---|---:|---:|---:|
| GitHub profile README live | 10 | Week 1 | Week 1 |
| CS101 complete — first real projects | 205 | Week 9 | Week 7 |
| DSA complete — interview-ready on paper | 525 | Week 24 | Week 18 |
| CS301 Blog API **deployed in production** | 1,395 | Week 63 | Week 47 |
| CS306 instrumented — **first hireable milestone** | 1,475 | Week 67 | Week 49 |
| Phase 3 complete — full-stack portfolio | 1,710 | Week 78 | Week 57 |
| CS303 complete — can design a system | 1,800 | Week 82 | Week 60 |
| CS401 complete — ML foundations | 2,000 | Week 91 | Week 67 |
| CS402 + CS403 complete — deep learning + LLM | 2,390 | Week 109 | Week 80 |
| **CS501 ready — interview-ready for real** | **2,510** | **Week 114** | **Week 84** |
| CS404 Track A complete — specialisation | 2,630 | Week 120 | Week 88 |
| **Full sequence complete** | **2,840** | **Week 132** | **Week 95** |

### 8.4 The critical-path floor

Even with unlimited parallelism elsewhere, this chain cannot be compressed:

```
CS102 (85h) → CS401 (200h) → CS402 (230h) → CS404 (120h)  =  635h of pure serial dependency
```

At 22h/week that is a **29-week floor** for the ML specialisation alone, regardless of how efficiently you handle everything else. This is the number to plan around when setting expectations.

**Available levers on the critical path:**
1. Trim CS102 Part 4 (Calculus) — already deferred to Stage 7 (~20h)
2. Trim CS102 Part 5 (Graph Theory) — deleted, duplicated by CS201 M7 (~15h)
3. Compress CS402 Module 4 (RNN) — 3 weeks → 2 weeks (~20h)
4. Accept a longer ML timeline — start CS401 before finishing Phase 4 craft subjects

---

## 9. Weekly Template

### 9.1 The standard week (22h)

| Day | Focus | Hours |
|---|---|---:|
| **Mon** | Current subject — theory/new material | 3.0 |
| **Tue** | Current subject — practice/implementation | 3.0 |
| **Wed** | Current subject — implementation | 3.0 |
| **Thu** | Current subject — implementation + LeetCode/Codeforces | 3.5 |
| **Fri** | Current subject — implementation | 3.0 |
| **Sat** | **Project work** — the artefact that goes on GitHub | 4.0 |
| **Sun** | Rest, review, weekly retrospective, blog post (optional) | 1.5 |
| | **Total** | **21.0** |

### 9.2 Non-negotiable daily habits

These are from the curriculum's own `interviewHabit` fields and are cumulative — they are not subject-specific.

| Habit | From | Frequency | Cost |
|---|---|---|---|
| Solve 1 easy LeetCode problem | Phase 1 | Daily | 30–45 min |
| 1 Codeforces contest (Div 3 to start) | Phase 2 | Weekly | 2h |
| Push to GitHub | All | Daily | 15 min |
| One blog post or learning note | CS502 Track 1 | Weekly | 30–60 min |
| One mock interview (peer) | CS304 / Phase 3 | Monthly | 30–60 min |
| One system design session (timed, on paper) | CS303 | Monthly from Phase 3 | 45 min |
| Say every `selfCheck` answer out loud, no notes | All subjects | End of each subject | — |

### 9.3 The gate review

At the end of every subject, do this **before starting the next one**:

```
□  Can I answer every selfCheck question out loud, without notes?
□  Are all mandatory projects pushed to GitHub with real READMEs?
□  Can I explain this subject to a beginner in 5 minutes?
□  Did I record what took longer than estimated, and why?
□  What is the one concept I still can't explain?  →  spend 1 more week on it
```

**Rule: no advancing past an unmet gate.** The most common failure mode in self-taught curricula is treating "watched the videos" as "learned the material." The `selfCheck` arrays exist to prevent exactly this — use them as hard gates, not suggestions.

---

## Appendix A — Deferred & Optional Material

| Item | Hours | When | Why deferred |
|---|---:|---|---|
| CS102 Part 4 — Calculus for ML | ~20 | Stage 7, or during CS402 | Learn gradients once gradient descent has meaning |
| CS102 Part 2 — Combinatorics | ~15 | Stage 7, or CS501 prep | Low direct ROI; counting principles are learnable on demand |
| CS103 Part 1 — Architecture | ~25 | On demand | Only when a performance question demands it |
| CS202 — 15 remaining patterns | ~30 | On demand | 4 patterns cover ~90% of real usage |
| CS203 — deeper MongoDB | ~10 | On demand | PostgreSQL-first for PH market |
| CS404 Track B (Computer Vision) | ~120 | Optional | Requires GPU access; strong competition |
| CS404 Track C (Reinforcement Learning) | ~120 | Optional | Niche in PH; research/robotics only |
| CS305 — deeper GCP | ~20 | On demand | AWS→GCP transfers; reverse does not |
| CS406 — Spark / Delta Lake | ~25 | On demand | Deserves a full course or none |
| **Total optional** | **~285** | | |

---

## Appendix B — Source Data Fixes

Apply these to `src/data/curriculum.ts` to make the data self-consistent. None is required for the plan above; all make the data usable by any automated tooling.

```ts
// 1. CS306 — missing prerequisites
{ id: 'CS306', name: 'Production Engineering & Incident Response',
  prerequisites: ['CS301'],        // ← ADD (was absent)

// 2. CS307 — missing prerequisites
{ id: 'CS307', name: 'Legacy Code Mastery & Refactoring',
  prerequisites: ['CS202', 'CS304'],   // ← ADD (was absent)

// 3. Phase-level hours disagree with subject sums.
//    Either correct the phase totals or the subject hours — pick one source of truth.
Phase 1: declared 520, subjects sum 435
Phase 2: declared 720, subjects sum 580
Phase 3: declared 580, subjects sum 590
Phase 4: declared 820, subjects sum 800
Phase 5: declared 200, subjects sum 260

// 4. Phase 4 mustComplete references "CS402 (Modules 1-6)"
//    but CS402 has 7 modules — Module 7 (PyTorch in Depth) is excluded
//    by omission. Clarify whether Module 7 is required.

// 5. CS502's prerequisites contradict its own duration/description
//    ("Build continuously from Phase 1"). Split into two subjects or
//    remove the prerequisite and document the two-track structure.

// 6. Dead files — nothing in src/ imports these:
//    src/data/cs501.txt
//    src/data/cs501_corrected.txt
//    src/data/cs501_temp.txt
//    curriculum_backup.ts
//    curriculum_text.txt
//    cs501_corrected.txt also contains mojibake (em-dashes mangled to '\uFFFD?')

// 7. src/data/markdownData.ts contains 17 high-quality workplace
//    scenarios that belong inside CS502B. Promote them.

// 8. README.md documents a "Mock Interview" tool in CareerTools.tsx.
//    CareerTools.tsx contains only Resume Optimizer + Portfolio Builder.
//    Either build it or correct the documentation.
```

---

## Summary

| | |
|---|---|
| **Subjects assessed** | 27 |
| **Recommended hours** | 2,840 (+6.6% vs the original 2,665) |
| **Core sequence length** | 7 stages, 130 weeks @22h/wk (~35 months with buffer) |
| **Critical path floor** | 635h serial (CS102→CS401→CS402→CS404) — cannot be compressed |
| **First hireable milestone** | After CS306, ~1,475h, week ~67 @22h/wk |
| **Biggest single fix** | Move PyTorch from CS402 M7 to M1 |
| **Biggest ROI gain** | Distribute CS501 practice from Stage 2 (279h vs 120h) |
| **Biggest budgeting error** | CS302 at 140h — it needs 200h for its scope |
| **Biggest strategic gap** | No Node.js data-access layer anywhere, despite 200h of TypeScript |

**The curriculum's architecture is sound. Fix the budgeting, fix the two missing prerequisites, move PyTorch to the front of CS402, cut the tool sprawl in CS403/CS406, and start GitHub and interview practice in week 1 rather than month 18.**

---

*Assessment derived from `src/data/curriculum.ts` (2,367 lines, 27 subjects) and `src/data/markdownData.ts`.*
*Recommendations reflect a PH-based, self-taught learner targeting ML engineering via a full-stack backend.*