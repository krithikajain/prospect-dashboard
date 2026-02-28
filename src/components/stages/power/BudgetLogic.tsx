import { Card, CardHeader } from '@/components/ui/Card';

/**
 * Budget Logic card: funding source ("The Pocket") + spending velocity.
 */
export function BudgetLogic() {
    return (
        <Card className="p-6 group hover:shadow-lg transition-all duration-300">
            <CardHeader icon="account_balance_wallet" title="3. The Budget Logic" />
            <div className="mt-6 grid grid-cols-1 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-start">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">The Pocket</h4>
                    <p className="text-[11px] text-gray-500 mb-3">Source of funding</p>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100/50 shadow-sm mt-auto">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-bold">Existing Line Item</span>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-start">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Spending Velocity</h4>
                    <p className="text-[11px] text-gray-500 mb-3">Department budget trajectory</p>
                    <div className="flex items-end gap-2 mt-auto">
                        <p className="text-xl font-light tracking-tight text-emerald-600">+18% YoY</p>
                        <p className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-wider mb-1.5 px-2 py-0.5 bg-emerald-50 rounded-md">Expanding</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
