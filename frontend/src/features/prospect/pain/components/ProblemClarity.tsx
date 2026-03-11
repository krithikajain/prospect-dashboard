import { Card, CardHeader } from '@/shared/components/Card';
import { themeVariants } from '@/lib/theme';

interface ProblemClarityProps {
    firstPainPoint?: string;
}

/**
 * Problem Clarity card — what process is failing, who experiences it, how long.
 */
export function ProblemClarity({ firstPainPoint }: ProblemClarityProps) {
    return (
        <Card className="p-6 group hover:shadow-md transition-all duration-300 bg-white border border-gray-100 flex flex-col h-full">
            <CardHeader icon="target" title="1. Problem Clarity" />
            <div className="flex flex-col gap-4 mt-2">
                <QuestionBlock label="What exact process is failing?" value={firstPainPoint || 'Our onboarding process takes 12 days, causing 18% customer drop-off.'} />
                <div className="grid grid-cols-2 gap-4">
                    <QuestionBlock label="Who experiences it?" value="Sales Enablement & RevOps" small />
                    <QuestionBlock label="How long has it existed?" value="9+ Months" small />
                </div>
                <div className={`${themeVariants.amber} p-3 rounded-xl mt-auto`}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1">Why didn't past attempts work?</p>
                    <p className="text-xs font-medium text-amber-800 leading-snug">Legacy band-aid solutions lacked centralized data integration across the GTM stack.</p>
                </div>
            </div>
        </Card>
    );
}

function QuestionBlock({ label, value, small }: { label: string; value: string; small?: boolean }) {
    return (
        <div className={`bg-slate-50 border border-slate-100 ${small ? 'p-3' : 'p-4'} rounded-xl`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
            <p className={`${small ? 'text-sm' : 'text-sm'} font-medium text-slate-800 leading-relaxed`}>{value}</p>
        </div>
    );
}
