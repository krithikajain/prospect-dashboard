import { themeVariants, type StatusVariant } from '@/lib/theme';

/**
 * Props for the StatusTag component.
 */
interface StatusTagProps {
    /** The text label to display within the tag. */
    label: string;
    /** 
     * The color variant of the tag, mapping to standard dashboard status colors.
     * @default 'slate'
     */
    variant?: StatusVariant;
    /** Optional Google Material Symbols icon name. */
    icon?: string;
    /** Optional circle dot prefix. */
    dot?: boolean;
    /** Additional CSS classes for the container. */
    className?: string;
}

/**
 * Small colored pill/tag component used for status indicators, confidence levels, and severity.
 * Uses centralized semantic colors from src/lib/theme.ts.
 * 
 * @param {StatusTagProps} props - The component props.
 * @returns {JSX.Element} The rendered StatusTag component.
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
