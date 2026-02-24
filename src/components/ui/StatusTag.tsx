interface StatusTagProps {
    label: string;
    variant?: 'emerald' | 'amber' | 'red' | 'blue' | 'purple' | 'gray';
    icon?: string;
    dot?: boolean;
    className?: string;
}

const variantStyles: Record<string, string> = {
    emerald: 'border-emerald-200 text-emerald-700 bg-emerald-50',
    amber: 'border-amber-200 text-amber-700 bg-amber-50',
    red: 'border-red-200 text-red-700 bg-red-50',
    blue: 'border-blue-200 text-blue-700 bg-blue-50',
    purple: 'border-purple-200 text-purple-700 bg-purple-50',
    gray: 'border-gray-200 text-gray-700 bg-gray-50',
};

/**
 * Small colored pill/tag used throughout the dashboard for status indicators.
 */
export function StatusTag({ label, variant = 'gray', icon, dot, className = '' }: StatusTagProps) {
    return (
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider shadow-sm ${variantStyles[variant]} ${className}`}>
            {dot && <span className={`w-1.5 h-1.5 rounded-full bg-current`} />}
            {icon && <span className="material-symbols-outlined text-[13px]">{icon}</span>}
            {label}
        </div>
    );
}
