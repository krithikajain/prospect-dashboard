import { Card, CardHeader } from '@/shared/components/Card';
import type { BudgetSynthesisData } from '@/data/budgetData';

interface Props { data: BudgetSynthesisData }

/**
 * Budget Synthesis — top-level readiness summary with strengths, risks, and data gaps.
 */
export function BudgetSynthesis({ data }: Props) {
    const stateColors: Record<string, string> = {
        'Confirmed & Allocated': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'Likely but Unconfirmed': 'bg-blue-100 text-blue-700 border-blue-200',
        'Exploratory': 'bg-amber-100 text-amber-700 border-amber-200',
        'High Risk / No Budget Evidence': 'bg-red-100 text-red-700 border-red-200',
    };

    const tierColors: Record<string, string> = {
        'High': 'text-emerald-600',
        'Moderate': 'text-blue-600',
        'Low': 'text-amber-600',
        'Constrained': 'text-red-600',
    };

    return (
        <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <CardHeader icon="summarize" title="Budget Synthesis" />

            {/* Readiness State Pill */}
            <div className="flex items-center gap-3 mb-5">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${stateColors[data.readinessState.value] || 'bg-gray-100 text-gray-600'}`}>
                    {data.readinessState.value}
                </span>
                {data.readinessState.isMock && <MockBadge />}
            </div>

            {/* Quick Metrics Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <QuickMetric label="Spend Capacity" value={data.spendCapacityTier.value} color={tierColors[data.spendCapacityTier.value]} isMock={data.spendCapacityTier.isMock} />
                <QuickMetric label="Procurement" value={data.procurementMaturity.value} color={tierColors[data.procurementMaturity.value]} isMock={data.procurementMaturity.isMock} />
                <QuickMetric label="Appetite" value={data.commercialAppetite.value} color={tierColors[data.commercialAppetite.value]} isMock={data.commercialAppetite.isMock} />
            </div>

            {/* Strengths + Risks — 2 Column */}
            <div className="grid grid-cols-2 gap-4 mb-4 flex-1">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-2">Key Strengths</p>
                    <ul className="space-y-1.5">
                        {data.keyStrengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                                <span className="text-emerald-500 mt-0.5 text-[10px]">●</span>
                                <span>{s.value}</span>
                                {s.isMock && <MockBadge />}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-2">Key Risks</p>
                    <ul className="space-y-1.5">
                        {data.keyRisks.map((r, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                                <span className="text-red-500 mt-0.5 text-[10px]">●</span>
                                <span>{r.value}</span>
                                {r.isMock && <MockBadge />}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Data Gaps Callout */}
            {data.dataGaps.length > 0 && (
                <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl mt-auto">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1.5">Data Gaps</p>
                    <div className="flex flex-wrap gap-2">
                        {data.dataGaps.map((g, i) => (
                            <span key={i} className="px-2.5 py-1 bg-amber-100/60 text-amber-700 rounded-full text-[10px] font-medium">{g}</span>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}

function QuickMetric({ label, value, color, isMock }: { label: string; value: string; color: string; isMock: boolean }) {
    return (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
            <p className={`text-sm font-semibold ${color}`}>
                {value}
                {isMock && <span className="ml-1 text-[8px] text-slate-300">mock</span>}
            </p>
        </div>
    );
}

function MockBadge() {
    return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[7px] font-bold uppercase bg-slate-100 text-slate-400 tracking-wider leading-none shrink-0">mock</span>;
}
