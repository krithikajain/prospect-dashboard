import { Card } from '@/components/ui/Card';

interface PowerMetricsProps {
    influenceScore: number;
    accessLevel: string;
    championProbability: string;
}

/**
 * Top-row cards: Stakeholder Influence score, Access Level, Champion Probability.
 */
export function PowerMetrics({ influenceScore, accessLevel, championProbability }: PowerMetricsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Influence Score */}
            <Card className="p-5 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Stakeholder Influence</p>
                <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl text-slate-800 font-light leading-none">{influenceScore}</span>
                    <span className="text-sm text-emerald-500 font-bold mb-1 leading-none">/100</span>
                </div>
                <div className="mt-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${influenceScore}%` }} />
                </div>
            </Card>

            {/* Access Level */}
            <Card className="p-5 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">Access Level</p>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500 text-2xl">admin_panel_settings</span>
                    <span className="text-xl text-slate-800 font-light leading-none">{accessLevel.replace('Direct / ', '')}</span>
                </div>
            </Card>

            {/* Champion Probability */}
            <Card className="p-5 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">Champion Prob.</p>
                <div className="flex items-center justify-between">
                    <span className="text-3xl text-slate-800 font-light leading-none">{championProbability}</span>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600">
                        <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    </div>
                </div>
            </Card>

            {/* Buying Style */}
            <Card className="p-5 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Buying Style</p>
                <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-[18px]">bolt</span>
                    <p className="text-[10px] text-slate-600 leading-snug font-medium">Early adopter. Prefers best-of-breed specialized solutions.</p>
                </div>
            </Card>

            {/* Friction Point */}
            <Card className="p-5 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Friction Point</p>
                <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-red-500 text-[18px]">gavel</span>
                    <p className="text-[10px] text-slate-600 leading-snug font-medium">Requires stringent POC. IT review adds 3-4wks.</p>
                </div>
            </Card>
        </div>
    );
}
