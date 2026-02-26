import { Card, CardHeader } from '@/components/ui/Card';
import { glassVariants, solidFills } from '@/lib/theme';

/**
 * Capital Flow card — reproduced from Stage3Authority budget section.
 */
export function CapitalFlow() {
    return (
        <Card className="p-6">
            <CardHeader icon="account_balance_wallet" title="Capital Flow" />
            <div className="mt-4 space-y-5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-1">The Pocket</h4>
                        <p className="text-[11px] text-gray-500">Source of funding</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${glassVariants.emerald} shadow-sm border`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${solidFills.emerald}`} />
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
