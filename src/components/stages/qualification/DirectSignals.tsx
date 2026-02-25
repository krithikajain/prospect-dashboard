import { Card, CardHeader } from '@/components/ui/Card';
import type { BudgetDirectSignals as DirectSignalsData } from '@/data/budgetData';

interface Props { data: DirectSignalsData }

/**
 * Section A — Direct Budget Signals (Highest Confidence).
 * Shows allocation status, budget amount, fiscal context, and evidence bullets.
 */
export function DirectSignals({ data }: Props) {
    const statusColors: Record<string, string> = {
        'Allocated': 'bg-emerald-50 text-emerald-700 border-emerald-200',
        'Pending Approval': 'bg-blue-50 text-blue-700 border-blue-200',
        'Exploratory': 'bg-amber-50 text-amber-700 border-amber-200',
        'Unknown': 'bg-slate-50 text-slate-500 border-slate-200',
    };
    const confColors: Record<string, string> = {
        'Confirmed': 'bg-emerald-500 text-white',
        'Verbal': 'bg-blue-500 text-white',
        'Inferred': 'bg-amber-500 text-white',
        'Unknown': 'bg-slate-400 text-white',
    };

    return (
        <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <CardHeader icon="receipt_long" title="A. Direct Budget Signals"
                action={
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${confColors[data.confidenceLevel.value]}`}>
                        {data.confidenceLevel.value}
                    </span>
                }
            />

            {/* Key Fields */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <FieldBox label="Allocation Status" value={data.allocationStatus.value}
                    pillClass={statusColors[data.allocationStatus.value]} isMock={data.allocationStatus.isMock} />
                <FieldBox label="Budget Amount" value={data.budgetAmount.value} isMock={data.budgetAmount.isMock} />
                <FieldBox label="Fiscal Year" value={data.fiscalYearContext.value} isMock={data.fiscalYearContext.isMock} />
                <FieldBox label="Finance Involved" value={data.financeInvolvement.value} isMock={data.financeInvolvement.isMock} />
            </div>

            {/* Evidence Bullets */}
            <div className="mt-auto">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Evidence</p>
                <ul className="space-y-2">
                    {data.evidenceBullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                            <span className="material-symbols-outlined text-[14px] text-blue-400 mt-0.5 shrink-0">format_quote</span>
                            <span>{b.value}</span>
                            {b.isMock && <MockBadge />}
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}

function FieldBox({ label, value, pillClass, isMock }: { label: string; value: string; pillClass?: string; isMock: boolean }) {
    return (
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
            {pillClass ? (
                <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${pillClass}`}>{value}</span>
            ) : (
                <p className="text-sm font-medium text-slate-800">{value}</p>
            )}
            {isMock && <span className="ml-1 text-[8px] text-slate-300 font-bold uppercase">mock</span>}
        </div>
    );
}

function MockBadge() {
    return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[7px] font-bold uppercase bg-slate-100 text-slate-400 tracking-wider leading-none shrink-0">mock</span>;
}
