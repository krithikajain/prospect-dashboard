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

/** Solid backgrounds used for gauges, bars, and strong accents */
export const solidFills: Record<StatusVariant, string> = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-400',
    red: 'bg-red-400',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    teal: 'bg-teal-500',
    orange: 'bg-orange-500',
    gray: 'bg-gray-400',
    slate: 'bg-slate-300',
};

/** Lighter backgrounds used usually for icons or specific chip elements */
export const iconVariants: Record<StatusVariant, string> = {
    emerald: 'bg-emerald-50 text-emerald-500 border-emerald-100',
    amber: 'bg-amber-50 text-amber-500 border-amber-100',
    red: 'bg-red-50 text-red-500 border-red-100',
    blue: 'bg-blue-50 text-blue-500 border-blue-100',
    purple: 'bg-purple-50 text-purple-500 border-purple-100',
    teal: 'bg-teal-50 text-teal-500 border-teal-100',
    orange: 'bg-orange-50 text-orange-500 border-orange-100',
    gray: 'bg-gray-50 text-gray-500 border-gray-100',
    slate: 'bg-slate-50 text-slate-500 border-slate-100',
};

/** Semi-transparent backgrounds for cards or layout blocks */
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

// 2. Domain-Specific Mappings

export type PressureLevel = 'High' | 'Medium' | 'Low' | 'Unknown';

/** Maps High/Medium/Low pressure to standard colors */
export const getPressureTheme = (level: PressureLevel): StatusVariant => {
    switch (level) {
        case 'High': return 'red';
        case 'Medium': return 'amber';
        case 'Low': return 'emerald';
        default: return 'slate';
    }
};

/** Maps standard High/Medium/Low/Unknown severity to colors */
export const getSeverityTheme = (severity: string): StatusVariant => {
    switch (severity) {
        case 'High': return 'red'; // e.g. High risk/friction
        case 'Moderate':
        case 'Medium': return 'amber';
        case 'Low': return 'emerald';
        default: return 'slate';
    }
};

/** Maps positive/stable/negative trends to colors */
export const getTrendTheme = (trend: 'Increasing' | 'Stable' | 'Decreasing' | 'Mixed' | string): StatusVariant => {
    switch (trend) {
        case 'Increasing': return 'emerald';
        case 'Decreasing': return 'red';
        case 'Mixed': return 'amber';
        case 'Stable': return 'blue';
        default: return 'slate';
    }
};

// 3. Procurement / Array Sequences
// Used for sequences of steps (e.g. Procurement Architecture)
const sequencePastels = [
    'bg-[#FFF6D6]', // Soft Cream Yellow
    'bg-[#FFEBD9]', // Soft Peach
    'bg-[#E6F4F1]', // Soft Mint
    'bg-[#EAF2FF]', // Soft Sky Blue
    'bg-[#F1ECFF]', // Soft Lavender
    'bg-[#FFEAF3]', // Soft Blush Pink
];

export const getSequencePastelColor = (index: number) => {
    return sequencePastels[index % sequencePastels.length];
};

const sequenceIcons = [
    'savings',       // piggy bank
    'settings',      // gear
    'pie_chart',     // pie
    'shopping_cart', // cart
    'mail',          // envelope
    'check_circle'   // fallback
];

export const getSequenceIcon = (index: number) => {
    return sequenceIcons[index % sequenceIcons.length];
};
