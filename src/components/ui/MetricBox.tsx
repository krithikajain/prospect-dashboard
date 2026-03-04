import * as React from 'react';

/**
 * Props for the MetricBox component.
 */
interface MetricBoxProps {
    /** The title/label for the metric at the top. */
    label: string;
    /** The main numeric or text value to display prominently. */
    value: string;
    /** Optional trend data showing an up/down arrow and a label. */
    trend?: {
        /** The direction of the trend arrow. */
        direction: 'up' | 'down';
        /** Text label to display next to the trend arrow. */
        label: string
    };
    /** Optional background chart component to display at the bottom. */
    chart?: React.ReactNode;
    /** Optional large background icon (material symbol name). */
    icon?: string;
    /** Optional small icon to display next to the label. */
    smallIcon?: string;
    /** Additional CSS classes for the container. */
    className?: string;
}

/**
 * A reusable stat tile component displaying a label, a large value, and supporting
 * metadata like trends, background icons, or mini-charts.
 * 
 * @param {MetricBoxProps} props - The component props.
 * @returns {JSX.Element} The rendered MetricBox component.
 */
export function MetricBox({ label, value, trend, chart, icon, smallIcon, className = '' }: MetricBoxProps) {
    return (
        <div className={`bg-gray-50/80 border border-gray-100 rounded-2xl p-4 flex flex-col shadow-sm relative overflow-hidden ${className}`}>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 relative z-10 w-full flex justify-between items-center">
                <span className="flex items-center gap-1.5 flex-1 truncate">
                    {smallIcon && <span className="material-symbols-outlined text-[13px] leading-none shrink-0 text-gray-400">{smallIcon}</span>}
                    <span className="truncate">{label}</span>
                </span>
                {trend && (
                    <span className={`text-[9px] font-bold tracking-tight flex items-center ${trend.direction === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                        <span className="material-symbols-outlined text-[10px] pr-0.5 mt-px">
                            {trend.direction === 'up' ? 'arrow_upward' : 'arrow_downward'}
                        </span>
                        {trend.label}
                    </span>
                )}
            </p>
            <p className="text-2xl tracking-tight font-semibold text-slate-800 relative z-10">{value}</p>

            {/* Optional decorative icon */}
            {icon && !chart && (
                <div className="absolute top-5 right-5 text-gray-200 rotate-12 -z-0">
                    <span className="material-symbols-outlined text-[64px]">{icon}</span>
                </div>
            )}

            {/* Optional background chart */}
            {chart && (
                <div className="absolute inset-x-0 bottom-0 h-16 opacity-30 mix-blend-multiply">
                    {chart}
                </div>
            )}
        </div>
    );
}
