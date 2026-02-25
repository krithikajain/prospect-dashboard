import { Card, CardHeader } from '@/components/ui/Card';
import type { BudgetProcurement as ProcurementData } from '@/data/budgetData';

interface Props { data: ProcurementData }

/**
 * Section E — Procurement & Vendor History.
 * Prior vendor presence, contract tier, maturity, renewal window, stickiness.
 */
export function ProcurementHistory({ data }: Props) {
    const stickinessColors: Record<string, string> = {
        'Low': 'bg-emerald-50 text-emerald-700 border-emerald-200',
        'Moderate': 'bg-amber-50 text-amber-700 border-amber-200',
        'High': 'bg-red-50 text-red-700 border-red-200',
    };

    return (
        <Card className="p-6 bg-white border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full">
            <CardHeader icon="inventory" title="E. Procurement History" />

            <div className="grid grid-cols-2 gap-3 mb-4">
                <InfoCell label="Prior Vendors" value={data.priorVendorPresence.value} isMock={data.priorVendorPresence.isMock} />
                <InfoCell label="Contract Tier" value={data.estimatedContractTier.value} isMock={data.estimatedContractTier.isMock} />
                <InfoCell label="Procurement Maturity" value={data.procurementMaturity.value} isMock={data.procurementMaturity.isMock} />
                <InfoCell label="Renewal Window" value={data.renewalWindow.value} isMock={data.renewalWindow.isMock} />
            </div>

            {/* Vendor Stickiness */}
            <div className="mt-auto">
                <div className={`flex items-center justify-between p-3 rounded-xl border ${stickinessColors[data.vendorStickinessRisk.value] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">Vendor Stickiness Risk</p>
                        <p className="text-sm font-bold">{data.vendorStickinessRisk.value}</p>
                    </div>
                    <span className="material-symbols-outlined text-2xl opacity-50">
                        {data.vendorStickinessRisk.value === 'High' ? 'lock' : data.vendorStickinessRisk.value === 'Moderate' ? 'lock_open' : 'lock_open_right'}
                    </span>
                </div>
                {data.vendorStickinessRisk.isMock && <p className="text-[8px] text-slate-300 font-bold uppercase mt-1 text-right">mock</p>}
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
