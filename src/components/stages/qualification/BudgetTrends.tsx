import { Card, CardHeader } from '@/components/ui/Card';
import type { BudgetTrends as BudgetTrendsData } from '@/data/budgetData';

interface Props { data: BudgetTrendsData }

/**
 * Section C — Budget Trends & Investment Direction.
 * Trend arrow, strategic signals, and risk indicators.
 */
export function BudgetTrendsCard({ data }: Props) {
    const trendConfig: Record<string, { icon: string; color: string; bg: string }> = {
        'Increasing': { icon: 'trending_up', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
        'Stable': { icon: 'trending_flat', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
        'Decreasing': { icon: 'trending_down', color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
        'Unknown': { icon: 'help', color: 'text-slate-500', bg: 'bg-slate-50 border-slate-100' },
    };
    const trend = trendConfig[data.recentTrend.value] || trendConfig['Unknown'];

    return (
        <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <CardHeader icon="insights" title="C. Budget Trends" />

            {/* Trend Indicator */}
            <div className={`flex items-center gap-3 p-3 rounded-xl border ${trend.bg} mb-4`}>
                <span className={`material-symbols-outlined text-2xl ${trend.color}`}>{trend.icon}</span>
                <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Recent Trend</p>
                    <p className={`text-sm font-bold ${trend.color}`}>
                        {data.recentTrend.value}
                        {data.recentTrend.isMock && <span className="ml-1 text-[8px] text-slate-300 font-bold uppercase">mock</span>}
                    </p>
                </div>
            </div>

            {/* Strategic Signals */}
            <div className="mb-4 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Strategic Investment Signals</p>
                <ul className="space-y-2">
                    {data.strategicSignals.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                            <span className="text-emerald-500 mt-0.5 text-[10px]">◆</span>
                            <span>{s.value}</span>
                            {s.isMock && <span className="text-[8px] text-slate-300 font-bold uppercase shrink-0">mock</span>}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Risks */}
            {data.riskIndicators.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3 mt-auto">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-1">Risk Indicators</p>
                    {data.riskIndicators.map((r, i) => (
                        <p key={i} className="text-xs text-red-700 leading-snug">
                            {r.value}
                            {r.isMock && <span className="ml-1 text-[8px] text-red-300 font-bold uppercase">mock</span>}
                        </p>
                    ))}
                </div>
            )}
        </Card>
    );
}
