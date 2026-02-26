import { Card } from '@/components/ui/Card';
import { ScoreDisplay } from '@/components/ui/ScoreDisplay';
import { StatusTag } from '@/components/ui/StatusTag';
import { glassVariants, type StatusVariant } from '@/lib/theme';

interface IcpScoreCardProps {
    score: number;
    breakdown?: { label: string; delta: number }[];
    confidence?: "High" | "Medium" | "Low";
}

/**
 * Displays the ICP Fit Score with confidence badge, hover tooltip, and factor pills.
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
                <p className="text-xs font-bold text-gray-500 tracking-[0.15em] uppercase">ICP Fit Score</p>
                <StatusTag
                    label={`${confidence} Confidence`}
                    variant={variant as StatusVariant}
                    icon="auto_awesome"
                    className="h-fit"
                />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 relative z-10 w-full">
                <ScoreDisplay
                    score={score}
                    tooltip={
                        <>
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
                        </>
                    }
                />
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
