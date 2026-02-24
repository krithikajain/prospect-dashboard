# Dashboard Architecture

## Quick Reference: Where to Find Things

### To change navigation or app shell
→ `src/components/layout/` — `Navbar.tsx`, `PageHeader.tsx`, `ProfileDropdown.tsx`

### To change a specific card on a specific page
→ `src/components/stages/{stage-folder}/{CardName}.tsx`

| Page | Folder | Files |
|------|--------|-------|
| Home | `stages/` | `Stage0Home.tsx` |
| Profile | `stages/profile/` | `ProfileCard`, `IcpScoreCard`, `OrganizationalFootprint`, `CompanyHealth`, `BusinessContext`, `ProfessionalJourney`, `profileScoring` |
| Power | `stages/power/` | `PowerMetrics`, `AuthorityPath`, `BudgetLogic`, `StakeholdersInvolved`, `BuyingHistory` |
| Pain (Authority) | `stages/pain/` | `SignaturePath`, `ShadowCommittee`, `ProcurementHistory`, `ForcingEvent`, `CapitalFlow`, `UrgencyDrivers` |
| Need | `stages/need/` | `ProblemClarity`, `ImpactSeverity`, `NeedUrgencyDrivers`, `InternalFriction`, `PoliticalWeight` |
| Engagement | `stages/` | `Stage5Engagement.tsx` |
| Timeline | `stages/` | `Stage6Timeline.tsx` |

### To change a shared UI pattern (tag, metric box, etc.)
→ `src/components/ui/`

| Component | What it replaces |
|-----------|-----------------|
| `MetricBox` | All stat tiles (Funding, Revenue, Active Users, etc.) |
| `StatusTag` | All colored pill badges (High/Medium/Low, confidence tags) |
| `InfoRow` | Icon + title + description rows (stakeholders, committee members) |
| `ChecklistItem` | Check/unchecked urgency items |
| `ScoreDisplay` | Large score numerics (ICP, Influence) |
| `Card` / `CardHeader` | Every card wrapper |

### To change business logic (scoring, data normalization)
→ `src/lib/normalizer.ts` — JSON → typed data
→ `src/components/stages/profile/profileScoring.ts` — ICP/timing score calculation

### To change types
→ `src/types/dashboard.ts`

---

## Architecture Principles

1. **Orchestrator pattern**: Each Stage file (`Stage1Profile.tsx`, etc.) is a pure layout grid that imports and arranges sub-components. No logic, no markup beyond grid placement.

2. **One card = one file**: Every visual card on the dashboard has its own file. File names match what the user sees.

3. **Shared primitives**: Repeated patterns (`MetricBox`, `StatusTag`, `InfoRow`, `ChecklistItem`) live in `components/ui/` and are imported wherever needed.

4. **Props down, no global state**: Data flows from `App.tsx` → Stage orchestrator → sub-components via props. No context providers or state management libraries.

5. **< 100 lines per file**: No component file exceeds ~100 lines of code. If it does, it should be decomposed further.

---

## Tech Stack
- **Framework**: React 19 + TypeScript (Vite)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Fonts**: Inter (Google Fonts), Material Symbols
