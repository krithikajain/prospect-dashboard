import * as React from 'react';

interface MetricBoxProps {
    label: string;
    value: string;
    trend?: { direction: 'up' | 'down'; label: string };
    chart?: React.ReactNode;
    icon?: string;
    className?: string;
}

/**
 * A stat tile showing a label, a big value, an optional trend badge,
 * and an optional background chart or decorative icon.
 */
export function MetricBox({ label, value, trend, chart, icon, className = '' }: MetricBoxProps) {
    return (
        <div className={`bg-gray-50/80 border border-gray-100 rounded-2xl p-4 flex flex-col shadow-sm relative overflow-hidden ${className}`}>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 relative z-10 w-full flex justify-between">
                <span>{label}</span>
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
