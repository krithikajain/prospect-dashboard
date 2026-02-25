import { Card, CardHeader } from '@/components/ui/Card';
import type { BudgetFundingSources as FundingData } from '@/data/budgetData';

interface Props { data: FundingData }

/**
 * Section D — Funding Sources & Flexibility.
 * Primary source, flexibility gauge, and alternative funding paths.
 */
export function FundingSources({ data }: Props) {
    const flexConfig: Record<string, { width: string; color: string; label: string }> = {
        'High': { width: 'w-full', color: 'bg-emerald-500', label: 'text-emerald-600' },
        'Moderate': { width: 'w-2/3', color: 'bg-blue-500', label: 'text-blue-600' },
        'Low': { width: 'w-1/3', color: 'bg-amber-500', label: 'text-amber-600' },
    };
    const flex = flexConfig[data.flexibilityLevel.value] || flexConfig['Moderate'];

    return (
        <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <CardHeader icon="savings" title="D. Funding Sources" />

            {/* Primary Source */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Primary Source</p>
                <p className="text-sm font-semibold text-slate-800">
                    {data.primarySourceType.value}
                    {data.primarySourceType.isMock && <span className="ml-1 text-[8px] text-slate-300 font-bold uppercase">mock</span>}
                </p>
            </div>

            {/* Flexibility Gauge */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Financial Flexibility</p>
                    <span className={`text-xs font-bold ${flex.label}`}>
                        {data.flexibilityLevel.value}
                        {data.flexibilityLevel.isMock && <span className="ml-1 text-[8px] text-slate-300">mock</span>}
                    </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${flex.color} ${flex.width} rounded-full transition-all duration-500`} />
                </div>
            </div>

            {/* Alternative Paths */}
            <div className="mt-auto">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Alternative Funding Paths</p>
                <ul className="space-y-2">
                    {data.alternativePaths.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                            <span className="material-symbols-outlined text-[14px] text-amber-500 mt-0.5 shrink-0">lightbulb</span>
                            <span>{p.value}</span>
                            {p.isMock && <span className="text-[8px] text-slate-300 font-bold uppercase shrink-0">mock</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
