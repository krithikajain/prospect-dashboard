import { themeVariants, type StatusVariant } from '@/lib/theme';

interface StatusTagProps {
    label: string;
    variant?: StatusVariant;
    icon?: string;
    dot?: boolean;
    className?: string;
}

/**
 * Small colored pill/tag used throughout the dashboard for status indicators.
 * Uses centralized semantic colors from src/lib/theme.ts.
 */
export function StatusTag({ label, variant = 'slate', icon, dot, className = '' }: StatusTagProps) {
    const variantClass = themeVariants[variant] || themeVariants.slate;

    return (
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider shadow-sm ${variantClass} ${className}`}>
            {dot && <span className={`w-1.5 h-1.5 rounded-full bg-current`} />}
            {icon && <span className="material-symbols-outlined text-[13px]">{icon}</span>}
            {label}
        </div>
    );
}
