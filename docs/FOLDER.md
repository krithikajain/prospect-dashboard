# Folder Structure & Code Reusability Guide

> A complete map of every directory and file in the project, with notes on **what each piece does** and **how to reuse it**.

---

## Root Directory

```
prospect-dashboard/
├── index.html                 # Vite entry point — mounts React into #root
├── package.json               # Dependencies & scripts (dev / build / lint / preview)
├── vite.config.ts             # Vite config — path aliases (@/ → src/)
├── tailwind.config.js         # Tailwind theme: custom colors, fonts, border-radius
├── postcss.config.js          # PostCSS pipeline (Tailwind + Autoprefixer)
├── tsconfig.json              # Root TS config — references app + node configs
├── tsconfig.app.json          # App-level TypeScript paths and settings
├── tsconfig.node.json         # Node/tooling TypeScript config
├── eslint.config.js           # ESLint rules (React Hooks + React Refresh)
├── design.html                # Static design reference (standalone HTML)
├── stitch_screen.html         # Stitch-generated screen reference
│
├── README.md                  # Project overview & quick start
├── DASHBOARD_ARCHITECTURE.md  # High-level system design document
├── FOLDER.md                  # ← You are here
├── COLORS_UX.md               # Color palette, typography, styling tokens
├── RULES.md                   # Code generation rules & conventions
│
├── public/                    # Static assets served as-is by Vite
├── dist/                      # Production build output (gitignored)
└── src/                       # ← All application source code
```

---

## `src/` — Application Source

```
src/
├── main.tsx                   # React DOM entry — renders <App />
├── App.tsx                    # Root component: nav config, routing, layout shell
├── App.css                    # Minimal app-level overrides
├── index.css                  # Global styles: fonts, Tailwind layers, glass-card, folder-tabs
│
├── assets/                    # Static assets imported by components
├── components/                # ← All React components
├── data/                      # ← Data layer (JSON + exports)
├── lib/                       # ← Utility functions
└── types/                     # ← TypeScript type definitions
```

---

## `src/components/` — Component Library

### `layout/` — App Shell (Reusable Across Any Page)

These components form the **persistent chrome** around every page. They are **fully reusable** — they accept config via props and know nothing about specific stages.

| File                   | What it does                                                    | How to reuse                                           |
| ---------------------- | --------------------------------------------------------------- | ------------------------------------------------------ |
| `Navbar.tsx`           | Renders pill-style top navigation from a config array           | Pass any `NavSection[]` config to add/remove sections  |
| `PageHeader.tsx`       | Displays breadcrumb + current page title                        | Pass `label` and `breadcrumb` props                    |
| `ProfileDropdown.tsx`  | Avatar with dropdown menu (top-right corner)                    | Drop in anywhere — self-contained                      |
| `index.ts`             | Barrel export for clean imports                                 | `import { Navbar, PageHeader } from '@/components/layout'` |

---

### `ui/` — Design-System Primitives (Reusable Everywhere)

These are the **most reusable** components in the project. Every card across every stage imports from here. If you want to build a new card, start with these:

| File               | Pattern                                    | Props                                             | Usage Example                                 |
| ------------------ | ------------------------------------------ | ------------------------------------------------- | --------------------------------------------- |
| `Card.tsx`         | Card wrapper + `CardHeader`                | `className`, `children`, `title`, `icon`          | Wrap any card content in `<Card>`             |
| `MetricBox.tsx`    | Stat tile (label + big number + optional chart) | `label`, `value`, `trend`, `icon`, `color`   | Funding amounts, user counts, revenue figures |
| `StatusTag.tsx`    | Colored pill badge                         | `label`, `variant` (success/warning/danger/info)  | "High", "Medium", "Low" confidence tags       |
| `InfoRow.tsx`      | Icon + label + value row                   | `icon`, `label`, `value`, `sublabel`              | Stakeholder details, committee members        |
| `ChecklistItem.tsx`| Checkbox item with description             | `checked`, `label`, `description`                 | Urgency checklists, requirement lists         |
| `ScoreDisplay.tsx` | Large score with `/100` and confidence tag | `score`, `maxScore`, `confidence`                 | ICP Fit Score, Influence Score                |
| `index.ts`         | Barrel export                              | —                                                 | `import { MetricBox, StatusTag } from '@/components/ui'` |

> **Reusability tip**: Before creating a new visual pattern, check if one of these primitives already covers it. If not, add a new primitive here rather than inlining styles in a card.

---

### `stages/` — Stage Orchestrators & Cards

This is where **page-specific content** lives. Each stage maps to a navigation tab.

#### Top-Level Orchestrators (Direct children of `stages/`)

These files are **routers/layouts** — they import card components and arrange them in a grid. They contain zero business logic.

| File                     | Section       | Tab       | What it orchestrates                        |
| ------------------------ | ------------- | --------- | ------------------------------------------- |
| `Stage0Home.tsx`         | Home          | —         | Landing page (self-contained)               |
| `Stage1Profile.tsx`      | Prospect      | Profile   | Profile cards (delegates to `profile/`)     |
| `Stage2Stakeholder.tsx`  | Prospect      | Power     | Power cards (delegates to `power/`)         |
| `Stage3Authority.tsx`    | Prospect      | —         | Legacy authority layout                     |
| `Stage4Need.tsx`         | Prospect      | Pain      | Pain cards (delegates to `need/`)           |
| `Stage5Path.tsx`         | Prospect      | Path      | Velocity cards (delegates to `velocity/`)   |
| `Stage6Timeline.tsx`     | Proposition   | Timeline  | Timeline visualization                     |
| `index.ts`               | —             | —         | Barrel export for all stages                |

---

#### `stages/profile/` — Profile Fit Cards

| File                        | Purpose                                                         | Reuse notes                                |
| --------------------------- | --------------------------------------------------------------- | ------------------------------------------ |
| `ProfileCard.tsx`           | Flip card with contact info (front) and extended details (back) | Reusable flip-card pattern                 |
| `IcpScoreCard.tsx`          | ICP Fit Score gauge + breakdown                                 | Uses `ScoreDisplay`                        |
| `OrganizationalFootprint.tsx` | Funding, org size, active users metrics                       | Uses `MetricBox`                           |
| `CompanyHealth.tsx`         | Revenue, hiring, growth chart tiles                             | Uses `MetricBox` + Recharts                |
| `BusinessContext.tsx`       | News, pressures, market maturity                                | Uses `InfoRow`                             |
| `ProfessionalJourney.tsx`   | Career timeline chart + education                               | Custom Recharts visualization              |
| `profileScoring.ts`        | Pure logic — calculates ICP + timing scores                     | Import and call from any component         |

---

#### `stages/power/` — Power & Stakeholder Cards

| File                        | Purpose                                       |
| --------------------------- | --------------------------------------------- |
| `PowerMetrics.tsx`          | Influence, access, champion score cards        |
| `AuthorityPath.tsx`         | Signature path / authority chain visualization |
| `BudgetLogic.tsx`           | Spending velocity & budget pocket              |
| `StakeholdersInvolved.tsx`  | List of involved stakeholders                  |
| `BuyingHistory.tsx`         | Past purchasing behavior                       |

---

#### `stages/pain/` — Pain & Urgency Cards

| File                     | Purpose                              |
| ------------------------ | ------------------------------------ |
| `SignaturePath.tsx`      | Distance-to-buyer visualization      |
| `ShadowCommittee.tsx`   | Shadow buying committee breakdown    |
| `ProcurementHistory.tsx`| Known champion card                  |
| `ForcingEvent.tsx`      | Timeline countdown to forcing event  |
| `CapitalFlow.tsx`       | Budget / capital flow logic          |
| `UrgencyDrivers.tsx`    | Urgency checklist items              |

---

#### `stages/need/` — Need Analysis Cards

| File                      | Purpose                                 |
| ------------------------- | --------------------------------------- |
| `ProblemClarity.tsx`      | How well the problem is understood      |
| `ImpactSeverity.tsx`      | Business impact severity visualization  |
| `NeedUrgencyDrivers.tsx`  | Need-specific urgency factors           |
| `InternalFriction.tsx`    | Internal friction / resistance analysis |
| `PoliticalWeight.tsx`     | Emotional & political weight assessment |

---

#### `stages/qualification/` — BANT Qualification Cards

| File                      | Purpose                                        |
| ------------------------- | ---------------------------------------------- |
| `BudgetAssessment.tsx`    | Budget tab orchestrator                        |
| `SpendCapacity.tsx`       | Spending capacity analysis                     |
| `FundingSources.tsx`      | Funding sources breakdown                      |
| `DirectSignals.tsx`       | Direct budget signals                          |
| `BehavioralSignals.tsx`   | Behavioral budget indicators                   |
| `ProcurementHistory.tsx`  | Past procurement patterns                      |
| `BudgetTrends.tsx`        | Budget trend charts                            |
| `BudgetSynthesis.tsx`     | Budget synthesis / summary                     |
| `AuthorityDeepDive.tsx`   | Authority tab — decision rights & stakeholders |
| `TimelineDeepDive.tsx`    | Timeline tab orchestrator                      |

---

#### `stages/qualification/timeline/` — Timeline & Compelling Events Cards

| File                        | Purpose                                        |
| --------------------------- | ---------------------------------------------- |
| `BuyingPhaseAndVelocity.tsx`| Buying phase and velocity metrics              |
| `CompellingEventsStrip.tsx` | Compelling events indicator row                |
| `ImplementationReadiness.tsx`| Implementation readiness gauge                 |
| `ProcurementArchitecture.tsx`| Step-by-step procurement visualization         |

---

#### `stages/velocity/` — Deal Velocity & Path Cards

| File                       | Purpose                                       |
| -------------------------- | --------------------------------------------- |
| `VelocityMetrics.tsx`      | Deal velocity score cards                     |
| `IntentSignals.tsx`        | Buying intent signals                         |
| `CompetitiveFriction.tsx`  | Competitive landscape friction                |
| `EcosystemFit.tsx`         | Ecosystem / tech-stack fit analysis           |
| `AccessStrategy.tsx`       | Access strategy timeline (vertical collapse)  |
| `velocityScoring.ts`       | Pure logic — velocity score calculations      |

---

## `src/data/` — Data Layer

| File                                  | Purpose                                            |
| ------------------------------------- | -------------------------------------------------- |
| `studio_results_20260212_1512.json`   | Raw prospect intelligence JSON (~107 KB)           |
| `prospectData.ts`                     | Re-exports the current prospect for direct import  |
| `budgetData.ts`                       | Budget / financial supplementary data structures   |

---

## `src/lib/` — Utilities

| File              | Purpose                                                  | Reuse notes                              |
| ----------------- | -------------------------------------------------------- | ---------------------------------------- |
| `normalizer.ts`   | Transforms raw JSON into typed TS objects (~20 KB)       | `normalizeProspectData(rawJson)` — single entry point |
| `utils.ts`        | General utilities (e.g. `cn()` for conditional classes)  | `import { cn } from '@/lib/utils'`       |

---

## `src/types/` — Type Definitions

| File             | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| `dashboard.ts`   | All TypeScript interfaces for normalized data   |

---

## How New Devs Should Navigate

1. **Start at `App.tsx`** — understand the nav config and routing.
2. **Pick a stage** — go to `src/components/stages/{folder}/` and read the orchestrator file first.
3. **Drill into cards** — each card file is self-contained and easy to read.
4. **Need a new card?** — Create a new `.tsx` in the right stage folder, import primitives from `ui/`, and add it to the orchestrator grid.
5. **Need a new UI pattern?** — Add it to `components/ui/` so every stage can use it.
