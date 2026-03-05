import { Card, CardHeader } from '@/shared/components/Card';
import type { BudgetBehavioralSignals as BehavioralData } from '@/data/budgetData';
import { themeVariants, getSeverityTheme } from '@/lib/theme';
import { StatusTag } from '@/shared/components/StatusTag';

interface Props { data: BehavioralData }

/**
 * Section F — Behavioral Budget Signals.
 * Engagement level, pricing sensitivity, evidence, and inferred appetite.
 */
export function BehavioralSignals({ data }: Props) {
    const engagementConfig: Record<string, { segments: number; theme: keyof typeof themeVariants }> = {
        'Low': { segments: 1, theme: 'amber' },
        'Moderate': { segments: 2, theme: 'blue' },
        'High': { segments: 3, theme: 'emerald' },
    };

    const eng = engagementConfig[data.commercialEngagement.value] || engagementConfig['Moderate'];
    const engColor = themeVariants[eng.theme].split(' ').find(c => c.startsWith('bg-')) || 'bg-slate-500';
    const engText = themeVariants[eng.theme].split(' ').find(c => c.startsWith('text-')) || 'text-slate-600';
    const appetiteTheme = getSeverityTheme(data.inferredAppetite.value);

    return (
        <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <CardHeader icon="psychology_alt" title="F. Behavioral Signals"
                action={
                    <StatusTag label={`${data.inferredAppetite.value} Appetite`} variant={appetiteTheme} />
                }
            />

            {/* Engagement Level */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Commercial Engagement</p>
                    <span className={`text-xs font-bold ${engText}`}>
                        {data.commercialEngagement.value}
                        {data.commercialEngagement.isMock && <span className="ml-1 text-[8px] text-slate-300">mock</span>}
                    </span>
                </div>
                <div className="flex gap-1.5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-2 flex-1 rounded-full ${i <= eng.segments ? engColor : 'bg-slate-100'} transition-all duration-300`} />
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
