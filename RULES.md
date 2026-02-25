# Code Generation Rules

> These are the rules and conventions followed when generating code for the Prospect Dashboard. Follow these instructions when adding new features, fixing bugs, or extending the dashboard.

---

## 1. Architecture Rules

### 1.1 Orchestrator Pattern
- Every **stage/tab** has a **single orchestrator file** (e.g. `Stage1Profile.tsx`, `BudgetAssessment.tsx`).
- Orchestrators are **pure layout grids** — they import card components and arrange them using CSS Grid or Flexbox.
- Orchestrators contain **zero business logic** and **no complex markup** beyond grid placement.

### 1.2 One Card = One File
- Every visual card on the dashboard has its **own `.tsx` file**.
- File names **match what the user sees** in the UI (e.g. `IcpScoreCard.tsx` for the ICP card).
- Cards are self-contained and import only from `@/components/ui`, `@/lib`, or `@/types`.

### 1.3 File Size Limit
- **No file exceeds ~100 lines of code.** If a file grows beyond this, decompose it into smaller sub-components.
- Scoring logic and pure functions belong in separate `.ts` files (e.g. `profileScoring.ts`).

### 1.4 No Global State
- Data flows **top-down via props**: `App.tsx → Stage Orchestrator → Card Component`.
- Avoid global state unless absolutely necessary.
- If global state is required, use a lightweight scoped Zustand store.
- No Redux.
- Each component receives exactly the data it needs through typed props.

### 1.5 Barrel Exports
- Use `index.ts` barrel files in `components/layout/`, `components/ui/`, and `components/stages/`.
- All imports should use the barrel: `import { MetricBox, StatusTag } from '@/components/ui'`.

### 1.6 Domain Layer Separation

- Pure business logic lives in `src/lib/domain/`.
- Scoring engines, evaluation logic, and aggregations must never live inside components.
- Stages may import domain functions but must not implement domain rules.
- Cross-stage calculations must live in shared domain modules.

---

## 2. Component Rules

### 2.1 Use Shared UI Primitives
Before writing custom markup, check if a primitive already exists in `src/components/ui/`:
- `Card` / `CardHeader` — for any card wrapper
- `MetricBox` — for stat tiles (number + label + trend)
- `StatusTag` — for colored pill badges (High / Medium / Low)
- `InfoRow` — for icon + label + value rows
- `ChecklistItem` — for checkbox items with descriptions
- `ScoreDisplay` — for large score numerics

### 2.2 New UI Patterns Must Be Extracted
- If you find yourself **writing the same visual pattern more than twice**, extract it into `components/ui/`.
- New primitives must be **generic and props-driven** — no stage-specific logic inside.

### 2.3 Props Must Be TypeScript Typed
- All component props use TypeScript interfaces or type aliases.
- Use the types from `src/types/dashboard.ts` for data shapes.
- Avoid `any` — use `unknown` with type guards if the shape is uncertain.

---

## 3. Styling Rules

### 3.1 Tailwind CSS First
- Use Tailwind utility classes for all styling.
- Use the custom theme tokens defined in `tailwind.config.js` (e.g. `bg-bg-neutral`, `text-secondary-text`, `rounded-card`).

### 3.2 Custom CSS Only for Complex Patterns
- Only use custom CSS (in `index.css`) for patterns that Tailwind cannot express:
  - Glassmorphism (`.glass-card`)
  - Folder-tab inverted corners (`.folder-tab-active::before/after`)
  - 3D flip transforms (`.perspective-1000`, `.preserve-3d`, `.backface-hidden`)
  - SVG gauge animations (`.thin-gauge`)

### 3.3 `cn()` for Conditional Classes
- Use the `cn()` utility from `@/lib/utils` (wraps `clsx` + `tailwind-merge`) for conditional class names.
- Never use string concatenation or template literals for classes.

### 3.4 No Inline Styles
- Avoid `style={{}}` attributes. Use Tailwind classes or custom CSS classes instead.
- Exception: dynamic values that cannot be expressed as classes (e.g. calculated widths for progress bars).

### 3.5 Design Consistency
- **Border radius**: `32px` for cards, `9999px` (full) for pills and tags.
- **Shadows**: Use `shadow-[0_4px_24px_rgba(0,0,0,0.02)]` — extremely subtle.
- **Colors**: Refer to `COLORS_UX.md` for exact hex values. Never use raw color names (e.g. `text-red-500`). Use the semantic tokens.

---

## 4. Data Rules

### 4.1 Single Source of Truth
- All data originates from `src/data/studio_results_20260212_1512.json`.
- Never hardcode data inside components. Always pull from the normalized data.

### 4.2 Normalizer Pattern
- Raw JSON is normalized in `src/lib/normalizer.ts` before being passed to components.
- The normalizer handles **safe access**, **fallback values**, and **type coercion**.
- If raw data is missing a field, the normalizer provides a sensible default — components should never crash on `undefined`.

### 4.3 Fallback Text
- If a data field is missing or empty, display a **descriptive fallback** (e.g. "Not available", "Pending analysis") rather than blank space or an error.

---

## 5. Animation Rules

### 5.1 Use Framer Motion for UI Animations
- Page transitions, card entrance animations, expand/collapse, hover scale effects → **Framer Motion**.
- Keep animation durations short: `0.2s–0.4s` for micro-interactions, `0.5s–0.8s` for page transitions.

### 5.2 Use GSAP for Complex Timelines
- Coordinated multi-step animations, scroll-driven effects → **GSAP**.
- Always clean up GSAP timelines in `useEffect` return functions.

### 5.3 CSS Transitions for Simple Hovers
- Tab hover effects, color transitions, simple opacity changes → pure CSS `transition` property.
### 5.4 Performance Constraint

- Avoid animating layout-affecting properties (height, width, top, left).
- Prefer transform and opacity for performance.
- Do not animate more than 5 elements simultaneously in a grid.
---

## 6. Code Quality Rules

### 6.1 Naming Conventions
- **Files**: PascalCase for components (`ProfileCard.tsx`), camelCase for utilities (`profileScoring.ts`).
- **Components**: PascalCase function names matching the filename.
- **Props interfaces**: `{ComponentName}Props` (e.g. `MetricBoxProps`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g. `NAV_CONFIG`).

### 6.2 Import Order
1. React / library imports
2. Internal modules (`@/lib`, `@/types`)
3. Components (`@/components/ui`, sibling components)
4. Data (`@/data`)
5. Styles (if any)

### 6.3 Path Aliases
- Always use `@/` prefix for imports (mapped to `src/` in `tsconfig.app.json`).
- Never use relative paths like `../../lib/normalizer`.

### 6.4 No Dead Code
- Remove unused imports, variables, and commented-out code.
- Delete files that are no longer imported anywhere.

---

## 7. Charts & Visualizations

### 7.1 Use Recharts
- All standard charts (bar, line, area, pie) use **Recharts**.
- Match chart colors to the project color palette (see `COLORS_UX.md`).
- Use `ResponsiveContainer` to ensure charts resize properly.
- Charts must receive fully normalized and formatted data.
- Charts must never perform data transformations internally.

### 7.2 Custom SVG for Gauges/Scores
- Circular score gauges use custom SVG with the `.thin-gauge` class.
- Animate stroke-dashoffset for score reveal effects.

---

## 8. Responsiveness

### 8.1 Max Content Width
- Dashboard content is capped at `max-w-[1400px]` and centered with `mx-auto`.

### 8.2 Grid Layouts
- Use CSS Grid (`grid-cols-*`) in orchestrators for card arrangement.
- Cards should fill their grid cells without overflowing.
- Use `min-h-[500px]` on the content container to prevent layout collapse.

### 8.3 Mobile Behavior

- On screens < 768px, cards stack vertically.
- No horizontal scroll.
- Charts collapse to simplified versions if necessary.
---

## 9. Adding a New Stage/Tab

Follow this checklist when adding a new tab or stage:

1. **Create the card components** in `src/components/stages/{new-folder}/`.
2. **Create the orchestrator** — pure layout grid importing the cards.
3. **Export from barrel** — add to `src/components/stages/index.ts`.
4. **Add navigation entry** — update `NAV_CONFIG` in `App.tsx`.
5. **Route to the orchestrator** — add a `case` in the `StageView` switch.
6. **Normalize data** — if new JSON fields are needed, update `src/lib/normalizer.ts` and `src/types/dashboard.ts`.

## 10. Loading & Error States

- All stages must support:
  - loading state
  - error state
  - empty state

- Cards should show skeleton loaders when loading.
- Orchestrators control loading state visibility.