/**
 * Central Theme Utilities
 * Reusable color mappings, Tailwind class groupings, and UI configurations.
 * Prevents hardcoded duplicated CSS combinations across components.
 */

// 1. Core Semantic Status Variants
export type StatusVariant = 'emerald' | 'amber' | 'red' | 'blue' | 'purple' | 'teal' | 'orange' | 'gray' | 'slate';

/** Standardized background + border + text combos for semantic states */
export const themeVariants: Record<StatusVariant, string> = {
    emerald: 'border-emerald-200 text-emerald-700 bg-emerald-50',
    amber: 'border-amber-200 text-amber-700 bg-amber-50',
    red: 'border-red-200 text-red-700 bg-red-50',
    blue: 'border-blue-200 text-blue-700 bg-blue-50',
    purple: 'border-purple-200 text-purple-700 bg-purple-50',
    teal: 'border-teal-200 text-teal-700 bg-teal-50',
    orange: 'border-orange-200 text-orange-700 bg-orange-50',
    gray: 'border-gray-200 text-gray-700 bg-gray-50',
    slate: 'border-slate-200 text-slate-600 bg-slate-50', // Default / Muted
};

/** Semi-transparent backgrounds for cards or layout blocks (Glassmorphism) */
export const glassVariants: Record<StatusVariant, string> = {
    emerald: 'bg-emerald-50/40 border-emerald-100/50',
    amber: 'bg-amber-50/40 border-amber-100/50',
    red: 'bg-red-50/40 border-red-100/50',
    blue: 'bg-blue-50/40 border-blue-100/50',
    purple: 'bg-purple-50/40 border-purple-100/50',
    teal: 'bg-teal-50/40 border-teal-100/50',
    orange: 'bg-orange-50/40 border-orange-100/50',
    gray: 'bg-gray-50/40 border-gray-100/50',
    slate: 'bg-slate-50/40 border-slate-100/50',
};
