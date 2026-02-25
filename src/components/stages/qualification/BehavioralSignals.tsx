import { Card, CardHeader } from '@/components/ui/Card';
import type { BudgetBehavioralSignals as BehavioralData } from '@/data/budgetData';

interface Props { data: BehavioralData }

/**
 * Section F — Behavioral Budget Signals.
 * Engagement level, pricing sensitivity, evidence, and inferred appetite.
 */
export function BehavioralSignals({ data }: Props) {
    const engagementConfig: Record<string, { segments: number; color: string; label: string }> = {
        'Low': { segments: 1, color: 'bg-amber-500', label: 'text-amber-600' },
        'Moderate': { segments: 2, color: 'bg-blue-500', label: 'text-blue-600' },
        'High': { segments: 3, color: 'bg-emerald-500', label: 'text-emerald-600' },
    };
    const appetiteColors: Record<string, string> = {
        'Strong': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'Moderate': 'bg-blue-100 text-blue-700 border-blue-200',
        'Weak': 'bg-red-100 text-red-700 border-red-200',
        'Unknown': 'bg-slate-100 text-slate-500 border-slate-200',
    };

    const eng = engagementConfig[data.commercialEngagement.value] || engagementConfig['Moderate'];

    return (
        <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <CardHeader icon="psychology_alt" title="F. Behavioral Signals"
                action={
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${appetiteColors[data.inferredAppetite.value]}`}>
                        {data.inferredAppetite.value} Appetite
                    </span>
                }
            />

            {/* Engagement Level */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Commercial Engagement</p>
                    <span className={`text-xs font-bold ${eng.label}`}>
                        {data.commercialEngagement.value}
                        {data.commercialEngagement.isMock && <span className="ml-1 text-[8px] text-slate-300">mock</span>}
                    </span>
                </div>
                <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-2 flex-1 rounded-full ${i <= eng.segments ? eng.color : 'bg-slate-100'} transition-all duration-300`} />
                    ))}
                </div>
            </div>

            {/* Pricing Sensitivity */}
            <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Pricing Sensitivity</p>
                <ul className="space-y-1.5">
                    {data.pricingSensitivity.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                            <span className="material-symbols-outlined text-[14px] text-blue-400 mt-0.5 shrink-0">attach_money</span>
                            <span>{p.value}</span>
                            {p.isMock && <span className="text-[8px] text-slate-300 font-bold uppercase shrink-0">mock</span>}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Evidence */}
            <div className="mt-auto">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Engagement Evidence</p>
                <ul className="space-y-1.5">
                    {data.evidenceBullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                            <span className="text-slate-300 mt-0.5 text-[10px]">▸</span>
                            <span>{b.value}</span>
                            {b.isMock && <span className="text-[8px] text-slate-300 font-bold uppercase shrink-0">mock</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
