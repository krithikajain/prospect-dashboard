import { Card, CardHeader } from '@/components/ui/Card';

/**
 * Budget Logic card: funding source ("The Pocket") + spending velocity.
 */
export function BudgetLogic() {
    return (
        <Card className="p-6 group hover:shadow-lg transition-all duration-300">
            <CardHeader icon="account_balance_wallet" title="2. The Budget Logic" />
            <div className="mt-8 space-y-8">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">The Pocket</h4>
                        <p className="text-[11px] text-gray-500">Source of funding</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100/50 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[11px] font-bold">Existing Line Item</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">Spending Velocity</h4>
                        <p className="text-[11px] text-gray-500">Department budget trajectory</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-light tracking-tight text-emerald-600">+18% YoY</p>
                        <p className="text-[10px] font-medium text-emerald-600/60 uppercase tracking-wider">Expanding</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
