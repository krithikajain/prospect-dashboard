# Prospect Dashboard Architecture

This project implements a "Stage Dashboard" pattern for the Prospecting stage.
It is designed to be modular and extensible for other pipeline stages (Discovery, Evaluation, Decision, etc.).

## Directory Structure

- `src/components/dashboard`: Shared layout components (StageDashboardShell).
- `src/components/cards`: Reusable widget cards.
- `src/components/dialogs`: Action dialogs.
- `src/lib/selectors`: Pure functions to map raw JSON -> UI models.
- `src/types`: TypeScript definitions.

## How to Add a New Stage (e.g., Discovery)

1.  **Define Stage Data Requirements**:
    - Update `src/types/prospectIntel.ts` if new fields are needed.
    - Create new selectors in `src/lib/selectors` for stage-specific data.

2.  **Create New Cards (if needed)**:
    - If the "Discovery" stage needs a "Technical Requirements" card, create `src/components/cards/RequirementsCard.tsx`.
    - Reuse existing cards (e.g., `StakeholderCard`, `NotesCard`) if they apply.

3.  **Assemble the Dashboard**:
    - Duplicate `src/App.tsx` (or create a new route/page component).
    - Swap out the cards in the Left/Right columns.
    - Example:
      ```tsx
      <StageDashboardShell data={data} ...>
        <div className="left-col">
           <RequirementsCard data={data} />
           <StakeholderCard data={data} />
        </div>
        <div className="right-col">
           <NextStepsCard data={data} />
        </div>
      </StageDashboardShell>
      ```

4.  **Configuration (Advanced)**:
    - You can create a `stageConfig` object to dynamically render cards based on the current stage if you prefer a configuration-driven approach.

## Data Flow

- **Raw Data**: `ProspectIntel` JSON object.
- **Selectors**: Transform raw data into simple props for cards (e.g., `getDecisionMakers(data)`).
- **Persistence**: `src/lib/storage.ts` handles local persistence for Notes and Tasks. In a real app, replace this with API calls.
