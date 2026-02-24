# Refactoring Plan: Prospect Dashboard

## Goals
- **Modular**: Every component does one thing and is < 100 lines
- **Navigable**: A senior dev can find any card/section in < 30 seconds
- **Reusable**: Shared UI patterns extracted into composable primitives
- **Maintainable**: Changes to a card don't risk breaking unrelated code

---

## New Folder Structure

```
src/
├── components/
│   ├── layout/                    # App shell components
│   │   ├── Navbar.tsx             # Top navigation pills
│   │   ├── PageHeader.tsx         # Breadcrumb + page title
│   │   ├── ProfileDropdown.tsx    # User avatar + dropdown menu
│   │   └── index.ts
│   │
│   ├── ui/                        # Reusable design-system primitives
│   │   ├── Card.tsx               # Card, CardHeader (existing)
│   │   ├── MetricBox.tsx          # Stat box (label + big number + optional chart)
│   │   ├── ScoreDisplay.tsx       # Large score with /100 and confidence tag
│   │   ├── StatusTag.tsx          # Colored pill tag (High/Medium/Low etc.)
│   │   ├── InfoRow.tsx            # Icon + label + value row
│   │   ├── ChecklistItem.tsx      # Check/uncheck item with description
│   │   ├── StakeholderRow.tsx     # Stakeholder avatar + role + friction tag
│   │   └── index.ts
│   │
│   └── stages/                    # One folder per stage
│       ├── home/
│       │   └── Stage0Home.tsx
│       ├── profile/
│       │   ├── Stage1Profile.tsx          # Orchestrator (layout grid only)
│       │   ├── ProfileCard.tsx            # Flip card (front/back)
│       │   ├── IcpScoreCard.tsx           # ICP score display
│       │   ├── OrganizationalFootprint.tsx # Funding/org/users metrics
│       │   ├── CompanyHealth.tsx          # Revenue/hiring/growth charts
│       │   ├── BusinessContext.tsx         # News/pressures/maturity
│       │   ├── ProfessionalJourney.tsx     # Career chart + education
│       │   └── profileScoring.ts          # calculateScores() logic
│       ├── power/
│       │   ├── Stage2Stakeholder.tsx       # Orchestrator
│       │   ├── PowerMetrics.tsx            # Influence/access/champion cards
│       │   ├── AuthorityPath.tsx           # Signature path visualization
│       │   ├── BudgetLogic.tsx             # The pocket + spending velocity
│       │   ├── StakeholdersInvolved.tsx    # Stakeholder list
│       │   └── BuyingHistory.tsx           # Past behavior
│       ├── pain/
│       │   ├── Stage3Authority.tsx         # Orchestrator (renamed)
│       │   ├── SignaturePath.tsx           # Distance-to-buyer viz
│       │   ├── ShadowCommittee.tsx         # Shadow buying committee
│       │   ├── ProcurementHistory.tsx      # Known champion card
│       │   ├── ForcingEvent.tsx            # Timeline countdown
│       │   ├── CapitalFlow.tsx             # Budget logic
│       │   └── UrgencyDrivers.tsx          # Urgency checklist
│       ├── need/                           # (currently Stage4Need)
│       │   ├── Stage4Need.tsx              # Orchestrator
│       │   ├── ProblemClarity.tsx
│       │   ├── ImpactSeverity.tsx
│       │   ├── UrgencyDrivers.tsx
│       │   ├── InternalFriction.tsx
│       │   └── PoliticalWeight.tsx
│       ├── engagement/
│       │   └── Stage5Engagement.tsx
│       ├── timeline/
│       │   └── Stage6Timeline.tsx
│       └── index.ts
│
├── data/                          # (unchanged)
├── lib/                           # (unchanged) 
├── types/                         # (unchanged)
└── App.tsx                        # Clean: just <Layout> + <StageRouter>
```

## What Changed & Why

| Before | After | Why |
|--------|-------|-----|
| `Stage1Profile.tsx` (429 lines) | 7 files, each < 80 lines | Find any card in seconds |
| `Stage2Stakeholder.tsx` (207 lines) | 5 files, each < 60 lines | Isolated changes |
| `Stage3Authority.tsx` (221 lines) | 7 files, each < 50 lines | Each section = 1 file |
| `App.tsx` has nav + dropdown + header + routing | Split into `Navbar`, `ProfileDropdown`, `PageHeader` | App.tsx is now ~30 lines |
| Same metric box pattern copied 10+ times | `MetricBox` component | Change once, update everywhere |
| Same stakeholder row pattern x 3 | `StakeholderRow` component | DRY |
| Same status tag pattern x 15+ | `StatusTag` component | Consistent styling |
| `App.css` has dead Vite boilerplate | Deleted | Cleanup |
| `prospectData.ts` unused in App | App uses shared `currentProspect` | Single source of truth |
