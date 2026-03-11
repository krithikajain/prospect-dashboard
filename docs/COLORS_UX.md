# Colors & UX Design Reference

> Complete reference of every color, font, spacing token, and styling pattern used across the Prospect Dashboard.

---

## 🎨 Color Palette

### Core Neutrals

| Token                 | Hex         | Usage                                          |
| --------------------- | ----------- | ---------------------------------------------- |
| `bg-neutral`          | `#F9FAFB`   | Page background (light warm gray)              |
| `primary-text`        | `#000000`   | Headings, primary text, active nav pills       |
| `secondary-text`      | `#6B7280`   | Subheadings, labels, descriptions              |
| `border-light`        | `#F1F5F9`   | Card borders, dividers                         |
| Slate 100             | `#F1F5F9`   | Subtle backgrounds, hover states               |
| Slate 200             | `#E2E8F0`   | Borders, separator lines                       |
| Slate 500             | `#64748B`   | Inactive tab text, muted labels                |
| Slate 800             | `#1E293B`   | High-contrast text on light backgrounds        |

### Accent Colors — Signals & Status
> **MANDATORY**: These mappings are centralized in `src/lib/theme.ts`. Do not use raw hex codes in components.

| Theme Key | Background    | Text          | Use Case                         |
| --------- | ------------- | ------------- | -------------------------------- |
| `emerald` | `#ECFDF5`     | `#047857`     | High confidence, positive signal |
| `amber`   | `#FFFBEB`     | `#B45309`     | Medium confidence, caution       |
| `red`     | `#FEF2F2`     | `#B91C1C`     | Low confidence, risk alert       |
| `blue`    | `#EFF6FF`     | `#1D4ED8`     | Information, feature highlights  |
| `purple`  | `#FAF5FF`     | `#7E22CE`     | Specialized analysis / Insights  |
| `slate`   | `#F8FAFC`     | `#475569`     | Muted / Default / Unknown        |

### Glassmorphism Surface

| Property          | Value                          |
| ----------------- | ------------------------------ |
| Background        | `rgba(255, 255, 255, 0.8)`     |
| Backdrop blur     | `blur(12px)`                   |
| Border            | `1px solid rgba(241, 245, 249, 0.5)` |
| Border radius     | `32px`                         |
| Box shadow        | `0 4px 24px -1px rgba(0,0,0,0.02)` |

---

## 🔤 Typography

### Font Family
**Inter** (200–600 weight range). Imported via Google Fonts.

### Font Weight Usage
- **200 (Extra Light)**: Material icon thin strokes.
- **400 (Regular)**: Body text, descriptions.
- **500 (Medium)**: Pill labels, emphasized metadata.
- **600 (Semibold)**: Card titles, tab labels, primary headers.

---

## 📐 Spacing & Layout Tokens

### Border Radius
- **32px**: Main content cards, glass containers.
- **20px**: Folder tab tops.
- **Full (9999px)**: Status tags, nav pills.

### Common Padding
- **Card internal**: `p-10` / `40px`.
- **Nav pills**: `px-5 py-2` / `20px 8px`.
- **Folder tabs**: `px-6 py-3` / `24px 12px`.

---

## 📐 Material Icon Style

We use **Material Symbols Outlined** with custom variation settings:
- **Weight**: 200
- **Fill**: 0
- **Opsz**: 24

**Standard Usage**:
`<span className="material-symbols-outlined text-[20px]">psychology</span>`

---

## 🎨 Design Philosophy

1. **Clean & Minimal** — White-dominant with soft shadows. No heavy borders.
2. **Signal-Driven** — Colors (Emerald, Amber, Red) always communicate a definitive state or score.
3. **Folder Metaphor** — The UI should feels tactile, like organized physical files.
4. **Context-Aware** — The dashboard adapts its layout and cards based on the enriched data available.
