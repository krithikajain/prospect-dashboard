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

/** Solid vibrant backgrounds for progress bars or markers */
export const solidFills: Record<StatusVariant, string> = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    teal: 'bg-teal-500',
    orange: 'bg-orange-500',
    gray: 'bg-gray-400',
    slate: 'bg-slate-500',
};

/** Shared color pairs for status icons (border + text) */
export const iconVariants: Record<StatusVariant, string> = {
    emerald: 'border-emerald-200 text-emerald-600 bg-emerald-50',
    amber: 'border-amber-200 text-amber-600 bg-amber-50',
    red: 'border-red-200 text-red-600 bg-red-50',
    blue: 'border-blue-200 text-blue-600 bg-blue-50',
    purple: 'border-purple-200 text-purple-600 bg-purple-50',
    teal: 'border-teal-200 text-teal-600 bg-teal-50',
    orange: 'border-orange-200 text-orange-600 bg-orange-50',
    gray: 'border-gray-200 text-gray-500 bg-gray-50',
    slate: 'border-slate-200 text-slate-500 bg-slate-50',
};

/**
 * Maps common severity/level strings to theme keys.
 */
export function getSeverityTheme(value?: string): StatusVariant {
    if (!value) return 'slate';
    const v = value.toLowerCase();
    if (v.includes('high') || v.includes('critical') || v.includes('confirmed') || v.includes('strong')) return 'emerald';
    if (v.includes('moderate') || v.includes('medium') || v.includes('likely')) return 'blue';
    if (v.includes('low') || v.includes('minor') || v.includes('exploratory')) return 'amber';
    if (v.includes('risk') || v.includes('constrained') || v.includes('no budget')) return 'red';
    return 'slate';
}

export type PressureLevel = 'High' | 'Medium' | 'Low' | 'Stable' | 'Critical';

/**
 * Maps BANT pressure levels to theme colors.
 */
export function getPressureTheme(level: PressureLevel): StatusVariant {
    switch (level) {
        case 'High':
        case 'Critical':
            return 'red';
        case 'Medium':
            return 'amber';
        case 'Low':
            return 'emerald';
        case 'Stable':
            return 'blue';
        default:
            return 'slate';
    }
}

/**
 * Returns a sequence of pastel colors for step-based layouts.
 */
export function getSequencePastelColor(index: number): string {
    const colors = [
        'bg-blue-50 border-blue-100',
        'bg-indigo-50 border-indigo-100',
        'bg-purple-50 border-purple-100',
        'bg-emerald-50 border-emerald-100',
        'bg-teal-50 border-teal-100',
        'bg-amber-50 border-amber-100',
    ];
    return colors[index % colors.length];
}

/**
 * Returns a sequence of material icons for step-based layouts.
 */
export function getSequenceIcon(index: number): string {
    const icons = [
        'assignment',
        'fact_check',
        'gavel',
        'security',
        'verified_user',
        'draw',
    ];
    return icons[index % icons.length];
}
