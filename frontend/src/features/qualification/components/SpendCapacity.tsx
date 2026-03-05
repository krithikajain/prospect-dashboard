import { Card, CardHeader } from '@/shared/components/Card';
import type { BudgetSpendCapacity as SpendCapacityData } from '@/data/budgetData';
import { themeVariants, solidFills } from '@/lib/theme';

interface Props { data: SpendCapacityData }

/**
 * Section B — Organizational Spend Capacity.
 * Revenue tier, funding stage, profitability, department scale, and spend tier.
 */
export function SpendCapacity({ data }: Props) {
    const tierThemeInfo: Record<string, { theme: keyof typeof themeVariants, width: string }> = {
        'High': { theme: 'emerald', width: 'w-full' },
        'Moderate': { theme: 'blue', width: 'w-2/3' },
        'Constrained': { theme: 'red', width: 'w-1/3' }
    };
    const tierConfig = tierThemeInfo[data.spendCapacityTier.value] || { theme: 'slate', width: 'w-1/2' };
    const tierTextColor = themeVariants[tierConfig.theme].split(' ').find(c => c.startsWith('text-')) || 'text-slate-600';
    const tierBgColor = themeVariants[tierConfig.theme].split(' ').find(c => c.startsWith('bg-')) || 'bg-slate-50';
    const tierFillColor = solidFills[tierConfig.theme] || 'bg-slate-400';
    return (
        <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <CardHeader icon="account_balance" title="B. Spend Capacity" />

            {/* Tier Bar */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Capacity Tier</p>
                    <span className={`text-xs font-bold ${tierTextColor}`}>
                        {data.spendCapacityTier.value}
                        {data.spendCapacityTier.isMock && <span className="ml-1 text-[8px] text-slate-300">mock</span>}
                    </span>
                </div>
                <div className={`w-full h-2 ${tierBgColor} rounded-full overflow-hidden`}>
                    <div className={`h-full ${tierFillColor} ${tierConfig.width} rounded-full transition-all duration-500`} />
                </div>
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <InfoCell label="Revenue Tier" value={data.revenueTier.value} isMock={data.revenueTier.isMock} />
                <InfoCell label="Funding Stage" value={data.fundingStage.value} isMock={data.fundingStage.isMock} />
                <InfoCell label="Profitability" value={data.profitabilitySignal.value} isMock={data.profitabilitySignal.isMock} />
                <InfoCell label="Department Scale" value={data.departmentScale.value} isMock={data.departmentScale.isMock} />
            </div>

            {/* Evidence */}
            <div className="mt-auto">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Supporting Evidence</p>
                <ul className="space-y-1.5">
                    {data.evidence.map((e, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                            <span className="text-blue-400 mt-0.5 text-[10px]">▸</span>
                            <span>{e.value}</span>
                            {e.isMock && <span className="text-[8px] text-slate-300 font-bold uppercase shrink-0">mock</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}

function InfoCell({ label, value, isMock }: { label: string; value: string; isMock: boolean }) {
    return (
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{label}</p>
            <p className="text-sm font-medium text-slate-800">
                {value}{isMock && <span className="ml-1 text-[8px] text-slate-300 font-bold uppercase">mock</span>}
            </p>
        </div>
    );
}
