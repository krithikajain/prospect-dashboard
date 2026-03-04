# Dashboard Architecture — High-Level System Design

> This document describes the overall architecture, data flow, and design principles of the Prospect Dashboard.

---

## System Overview

```
                         ┌──────────────────────────┐
                         │    Raw JSON Data          │
                         │ (studio_results_*.json)   │
                         └──────────┬───────────────┘
                                    │
                                    ▼
                         ┌──────────────────────────┐
                         │    normalizer.ts          │
                         │  JSON → Typed TS Objects  │
                         └──────────┬───────────────┘
                                    │
                                    ▼
                         ┌──────────────────────────┐
                         │       App.tsx             │
                         │ (root layout + routing)   │
                         └──────────┬───────────────┘
                                    │
              ┌─────────────────────┼──────────────────────┐
              ▼                     ▼                      ▼
   ┌──────────────────┐  ┌──────────────────┐   ┌──────────────────┐
   │  Layout Shell    │  │  Stage Orch.     │   │  Shared UI       │
   │  (Navbar, Header,│  │  (Stage1Profile, │   │  (MetricBox,     │
   │   ProfileDrop.)  │  │   Stage2Stake…)  │   │   StatusTag…)    │
   └──────────────────┘  └────────┬─────────┘   └──────────────────┘
                                  │
                     ┌────────────┼────────────┐
                     ▼            ▼            ▼
              ┌───────────┐ ┌──────────┐ ┌──────────┐
              │ CardA.tsx │ │ CardB.tsx│ │ CardC.tsx│
              └───────────┘ └──────────┘ └──────────┘
```

---

## Data Layer

### Source

Raw prospect intelligence data lives in `src/data/studio_results_20260212_1512.json` (~107 KB). This is the single source of truth for all dashboard content.

### Normalization Pipeline

| File                  | Role                                                         |
| --------------------- | ------------------------------------------------------------ |
| `src/lib/normalizer.ts` | Transforms raw JSON into strongly-typed TypeScript objects. Contains ~20KB of field mappings, fallback logic, and safe-access patterns. |
| `src/types/dashboard.ts` | TypeScript interfaces for the normalized data shape.       |
| `src/data/prospectData.ts` | Re-exports the current prospect as a convenient import.   |
| `src/data/budgetData.ts` | Supplementary budget/financial data structures.            |

### Scoring

| File                                         | Role                                              |
| -------------------------------------------- | ------------------------------------------------- |
| `src/components/stages/profile/profileScoring.ts` | Calculates ICP Fit Score and Strategic Timing Signal from normalized data. |
| `src/components/stages/velocity/velocityScoring.ts` | Calculates velocity/deal-readiness metrics.     |

---

## Rendering Layer

### App Shell (`App.tsx`)

- Declares `NAV_CONFIG` — a static array defining every navigation section and its tabs.
- Renders `<Navbar>`, `<ProfileDropdown>`, and the active `<StageView>`.
- Folder-tab UI is rendered inline based on the current section's tab config.
- Routes to the correct Stage orchestrator based on `activeSection` + `activeTab` state.

### Layout Components (`src/components/layout/`)

| Component             | Responsibility                                          |
| --------------------- | ------------------------------------------------------- |
| `Navbar.tsx`          | Top-level pill navigation across sections               |
| `PageHeader.tsx`      | Breadcrumb trail + page title inside the content card   |
| `ProfileDropdown.tsx` | User avatar + dropdown menu (top-right)                 |

### Stage Orchestrators (`src/components/stages/`)

Each stage file is a **pure layout grid** — no business logic, no complex markup. It imports sub-card components and arranges them via CSS Grid / Flexbox.

| Orchestrator           | Section        | Tab        | Cards it renders                                                                    |
| ---------------------- | -------------- | ---------- | ----------------------------------------------------------------------------------- |
| `Stage0Home.tsx`       | Home           | —          | (self-contained landing page)                                                       |
| `Stage1Profile.tsx`    | Prospect       | Profile    | ProfileCard, IcpScoreCard, OrganizationalFootprint, CompanyHealth, BusinessContext, ProfessionalJourney |
| `Stage2Stakeholder.tsx`| Prospect       | Power      | PowerMetrics, AuthorityPath, BudgetLogic, StakeholdersInvolved, BuyingHistory       |
| `Stage4Need.tsx`       | Prospect       | Pain       | ProblemClarity, ImpactSeverity, NeedUrgencyDrivers, InternalFriction, PoliticalWeight |
| `Stage5Path.tsx`       | Prospect       | Path       | VelocityMetrics, IntentSignals, CompetitiveFriction, EcosystemFit, AccessStrategy   |
| `Stage6Timeline.tsx`   | Proposition    | Timeline   | (timeline visualization)                                                            |
| `BudgetAssessment.tsx` | Qualification  | Budget     | SpendCapacity, FundingSources, DirectSignals, BehavioralSignals, ProcurementHistory, BudgetTrends, BudgetSynthesis |
| `AuthorityDeepDive.tsx`| Qualification  | Authority  | (authority analysis — self-contained)                                               |

### Shared UI Primitives (`src/components/ui/`)

These are **design-system building blocks** imported by every card:

| Component          | Pattern it replaces                                |
| ------------------ | -------------------------------------------------- |
| `Card` / `CardHeader` | Every card wrapper with consistent border-radius, shadow, padding |
| `MetricBox`        | All stat tiles (Funding, Revenue, Active Users…)   |
| `StatusTag`        | All colored pill badges (High / Medium / Low)      |
| `InfoRow`          | Icon + label + description rows                    |
| `ChecklistItem`    | Check / uncheck urgency items                      |
| `ScoreDisplay`     | Large score numerics (ICP, Influence, etc.)         |

---

## Architecture Principles

1. **Orchestrator pattern** — Stage files are pure layout grids. No logic beyond grid placement.
2. **One card = one file** — Every visual card has its own `.tsx` file. File names match what the user sees.
3. **Shared primitives** — Repeated UI patterns live in `components/ui/` and are imported wherever needed.
4. **Props down, no global state** — Data flows `App.tsx → Stage → Card` via props. No context providers or state management libraries.
5. **< 100 lines per file** — If a file exceeds ~100 lines, it should be split further.
6. **Glassmorphism surfaces** — Cards use the `.glass-card` class (frosted glass with backdrop blur).
7. **Folder-tab metaphor** — Tabs connect visually to the content card below, creating a "file folder" metaphor with inverted corner radii.

---

## Quick Reference: Where to Find Things

### To change navigation or app shell
→ `src/components/layout/` — `Navbar.tsx`, `PageHeader.tsx`, `ProfileDropdown.tsx`

### To change a specific card on a page
→ `src/components/stages/{stage-folder}/{CardName}.tsx`

### To change a shared UI pattern (tag, metric box, etc.)
→ `src/components/ui/`

### To change business logic (scoring, data normalization)
→ `src/lib/normalizer.ts` — JSON → typed data  
→ `src/components/stages/profile/profileScoring.ts` — ICP / timing score  
→ `src/components/stages/velocity/velocityScoring.ts` — velocity metrics

### To change types
→ `src/types/dashboard.ts`
