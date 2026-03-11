import { Card } from '@/shared/components/Card';
import { ScoreDisplay } from '@/shared/components/ScoreDisplay';
import { StatusTag } from '@/shared/components/StatusTag';
import { glassVariants, type StatusVariant } from '@/lib/theme';

/**
 * Props for the IcpScoreCard component.
 */
interface IcpScoreCardProps {
    /** The calculated score for Ideal Customer Profile (ICP) fit. */
    score: number;
    /** Optional breakdown of the factors contributing to the score. */
    breakdown?: {
        /** Descriptive name for the score factor (e.g., 'Revenue Range'). */
        label: string;
        /** The positive or negative score adjustment from this factor. */
        delta: number
    }[];
    /** 
     * The statistical confidence level of the calculated ICP score.
     * @default "Medium"
     */
    confidence?: "High" | "Medium" | "Low";
}

/**
 * A stylized component that visualizes the ICP Fit Score.
 * Includes a large numeric gauge, a confidence indicator, and a breakdown of contributing factors.
 * Uses glassmorphism styling that adaptively changes based on the score intensity.
 * 
 * @param {IcpScoreCardProps} props - The component props.
 * @returns {JSX.Element} The rendered IcpScoreCard component.
 */
export function IcpScoreCard({ score, breakdown = [], confidence = "Medium" }: IcpScoreCardProps) {
    const variant = score >= 80 ? 'emerald' : score >= 60 ? 'amber' : 'gray';
    const bgStyle = score >= 80
        ? glassVariants.emerald
        : score >= 60
            ? glassVariants.amber
            : 'bg-white';

    return (
        <Card className={`flex flex-col shrink-0 p-6 pt-5 min-h-[160px] border shadow-sm transition-colors duration-300 ${bgStyle}`}>
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5 relative group/tooltip cursor-help">
                    <p className="text-xs font-bold text-gray-500 tracking-[0.15em] uppercase">ICP Fit Score</p>
                    <span className="material-symbols-outlined text-[14px] text-gray-400">info</span>

                    {/* Tooltip Content */}
                    <div className="absolute left-0 top-full mt-2 hidden group-hover/tooltip:block w-[280px] p-4 bg-slate-900 rounded-xl shadow-2xl text-[12px] text-gray-300 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="font-semibold text-white text-sm mb-2 pb-2 border-b border-gray-700">Calculation Logic</div>
                        <div className="space-y-1.5 font-medium">
                            {breakdown.length === 0 ? (
                                <div className="text-gray-400 text-xs italic">No data factors matched.</div>
                            ) : (
                                breakdown.map((item, idx) => (
                                    <div key={idx} className="flex justify-between gap-4">
                                        <span>{item.label}:</span>
                                        <span className="text-emerald-400">+{item.delta}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <StatusTag
                    label={`${confidence} Confidence`}
                    variant={variant as StatusVariant}
                    icon="auto_awesome"
                    className="h-fit"
                />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 relative z-10 w-full">
                <ScoreDisplay score={score} />
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-auto">
                {breakdown.length > 0 ? (
                    [...breakdown]
                        .sort((a, b) => b.delta - a.delta)
                        .slice(0, 2)
                        .map((item, idx) => (
                            <StatusTag
                                key={idx}
                                label={item.label}
                                variant={idx === 0 ? "blue" : "purple"}
                                icon={idx === 0 ? "stars" : "check"}
                            />
                        ))
                ) : (
                    <StatusTag label="Needs More Data" variant="gray" icon="hourglass_empty" />
                )}
            </div>
        </Card>
    );
}
