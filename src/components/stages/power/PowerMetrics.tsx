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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Influence Score */}
            <Card className="p-6 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-2">Stakeholder Influence</p>
                <div className="flex items-end gap-3">
                    <span className="text-4xl text-slate-800 font-light">{influenceScore}</span>
                    <span className="text-lg text-emerald-500 mb-1">/100</span>
                </div>
                <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${influenceScore}%` }} />
                </div>
            </Card>

            {/* Access Level */}
            <Card className="p-6 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-2">Access Level Rating</p>
                <div className="flex items-center gap-3 h-full pb-6">
                    <span className="material-symbols-outlined text-blue-500 text-3xl">admin_panel_settings</span>
                    <span className="text-2xl text-slate-800 font-light">{accessLevel}</span>
                </div>
            </Card>

            {/* Champion Probability */}
            <Card className="p-6 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-2">Champion Probability</p>
                <div className="flex items-center justify-between h-full pb-6">
                    <span className="text-4xl text-slate-800 font-light">{championProbability}</span>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
                        <span className="material-symbols-outlined">trending_up</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
