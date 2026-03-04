import * as React from 'react';

/**
 * Props for the ScoreDisplay component.
 */
interface ScoreDisplayProps {
    /** The actual score value to display. */
    score: number;
    /** 
     * The maximum possible score value. 
     * @default 100
     */
    maxScore?: number;
    /** Optional content for the hover tooltip. */
    tooltip?: React.ReactNode;
    /** Additional CSS classes for the container. */
    className?: string;
}

/**
 * A reusable component for displaying scores (e.g., ICP Fit Score) prominently.
 * Features a large main score, a maximum score indicator, and a hover-activated tooltip.
 * 
 * @param {ScoreDisplayProps} props - The component props.
 * @returns {JSX.Element} The rendered ScoreDisplay component.
 */
export function ScoreDisplay({ score, maxScore = 100, tooltip, className = '' }: ScoreDisplayProps) {
    return (
        <div className={`relative group cursor-pointer flex items-baseline gap-1.5 shrink-0 ${className}`}>
            <span className="text-[64px] font-light tracking-tighter text-slate-900 leading-none">{score}</span>
            <span className="text-lg font-medium text-gray-400 leading-none pb-1.5">/ {maxScore}</span>

            {tooltip && (
                <div className="absolute left-0 bottom-full mb-3 ml-2 hidden group-hover:block w-[240px] p-4 bg-slate-900 rounded-xl shadow-2xl text-[12px] text-gray-300 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {tooltip}
                </div>
            )}
        </div>
    );
}
