# Engineering Standards & Rules

> This document defines the architectural patterns and coding standards for the Prospect Dashboard. Adherence to these rules ensures the codebase remains modular, performant, and maintainable for senior developers.

---

## 🏗️ 1. Architecture & Folder Strategy

### 1.1 "Feature-First" Organization
- All major functional views (Stages) must live in `src/features/`.
- Each feature is a self-contained module with its own components and barrel exports (`index.ts`).
- Cross-cutting UI atoms must live in `src/shared/components/`.

### 1.2 The Orchestrator Pattern
- Top-level feature components (e.g., `ProfileStage.tsx`) are **Orchestrators**.
- Orchestrators must only contain **Layout (CSS Grid/Flex)** and delegate content to smaller components.
- Keep business logic (scoring, derivations) out of the orchestrator; move it to `src/lib/domain/`.

### 1.3 Config-Driven Navigation
- Navigation structure (Sidebar and Tabs) is strictly controlled by `src/config/navigation.ts`.
- Components like `Navbar` and `DashboardLayout` must consume this config to render UI, ensuring a Single Source of Truth (SSoT).

### 1.4 Centralized Type Contract
- All domain-specific types must reside in `src/types/dashboard.ts`.
- Use **Type-Only Imports** (`import type { ... }`) for better tree-shaking and to satisfy `verbatimModuleSyntax`.

---

## 🧱 2. Component Development

### 2.1 Reusability First
- If a visual pattern is used in more than one stage, it **must** move to `src/shared/components/`.
- Components should be "Dumb" (Functional) over "Smart". They receive data via props and render accordingly.

### 2.2 Functional Registry Pattern
- Use **Registry Objects** for dynamic rendering (as seen in `App.tsx`'s `renderStageView`).
- Avoid giant switch statements. Map tab IDs directly to Component instances.

### 2.3 Self-Documentation
- Add concise JSDoc comments to exports to explain the component's purpose.
- Use meaningful prop names that describe the data, not the source (e.g., `score` vs `icp_score_final_v1`).

---

## 🎨 3. Styling & Performance

### 3.1 Tailwind & Semantic Tokens
- Use Tailwind utility classes for 99% of styling.
- Use semantic tokens defined in `tailwind.config.js` (e.g., `text-secondary-text`, `bg-slate-100`).
- **Do not hardcode hex codes** or raw color names in components.

### 3.2 Layout Encapsulation
- Use the `DashboardLayout` component for all dashboard pages to ensure consistent shell behavior (PageHeader, Tabs, Padding).

### 3.3 Conditional Styling
- Use the `cn()` utility (`clsx` + `tailwind-merge`) for conditional classes.
- Avoid messy template literal strings for class logic.

---

## 💾 4. Data & State Management

### 4.1 Single Source of Truth (SSoT)
- All prospect data is normalized via `src/lib/normalizer.ts` before reaching the UI.
- Components should rely on the `DashboardData` interface and never handle raw JSON-string parsing.

### 4.2 Lazy Loading (Prompt Controller)
- Insight tabs (`profile`, `power`, `pain`, `path`) use the `usePromptController` for dynamic data fetching.
- Tab-specific components must handle the loading state (e.g., using `SkeletonCard`) provided by the controller.

---

## 🧹 5. Code Quality & Maintenance

### 5.1 No Dead Code
- **MANDATORY**: Remove all commented-out code, unused imports, and dead variables before finalizing a task.
- If a component is no longer used, delete the file; do not leave it in the codebase.

### 5.2 Naming Conventions
- **Components**: PascalCase (`ProfileCard.tsx`).
- **Utilities/Hooks**: camelCase (`usePromptController.ts`).
- **Types**: PascalCase (`DashboardData`).

### 5.3 File Length
- Aim for components under **100 lines**. If a card gets too complex, split it into local sub-components within the same feature folder.