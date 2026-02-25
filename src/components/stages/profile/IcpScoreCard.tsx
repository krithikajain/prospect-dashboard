import { Card } from '@/components/ui/Card';
import { ScoreDisplay } from '@/components/ui/ScoreDisplay';
import { StatusTag } from '@/components/ui/StatusTag';

interface IcpScoreCardProps {
    score: number;
}

/**
 * Displays the ICP Fit Score with confidence badge, hover tooltip, and factor pills.
 */
export function IcpScoreCard({ score }: IcpScoreCardProps) {
    const confidence = score >= 80 ? 'High' : score >= 60 ? 'Medium' : 'Low';
    const variant = score >= 80 ? 'emerald' : score >= 60 ? 'amber' : 'gray';
    const bgStyle = score >= 80
        ? 'bg-emerald-50/40 border-emerald-100/50'
        : score >= 60
            ? 'bg-amber-50/40 border-amber-100/50'
            : 'bg-white';

    return (
        <Card className={`flex flex-col shrink-0 p-6 pt-5 min-h-[160px] border shadow-sm transition-colors duration-300 ${bgStyle}`}>
            <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-bold text-gray-500 tracking-[0.15em] uppercase">ICP Fit Score</p>
                <StatusTag
                    label={`${confidence} Confidence`}
                    variant={variant as any}
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
                                <div className="flex justify-between"><span>Base:</span> <span className="text-white">50</span></div>
                                <div className="flex justify-between"><span>Target Industry SaaS:</span> <span className="text-emerald-400">+15</span></div>
                                <div className="flex justify-between"><span>Enterprise Size:</span> <span className="text-emerald-400">+15</span></div>
                                <div className="flex justify-between"><span>Executive Authority:</span> <span className="text-blue-400">+20</span></div>
                            </div>
                        </>
                    }
                />
            </div>

            <div className="flex items-center gap-2 mt-auto">
                <StatusTag label="Industry" variant="blue" icon="domain" />
                <StatusTag label="Seniority" variant="purple" icon="person" />
            </div>
        </Card>
    );
}
