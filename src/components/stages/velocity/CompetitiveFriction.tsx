import { Card, CardHeader } from '@/components/ui/Card';
import { StatusTag } from '@/components/ui/StatusTag';

export function CompetitiveFriction() {
    return (
        <Card className="p-6 h-full flex flex-col group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            {/* Background watermark */}
            <div className="absolute -right-6 -top-6 opacity-[0.03] z-0 pointer-events-none">
                <span className="material-symbols-outlined text-[150px]">gavel</span>
            </div>

            <div className="relative z-10">
                <CardHeader icon="swap_horiz" title="4.4 Competitive Friction" />

                <p className="text-[12px] text-gray-500 font-medium mb-4 pr-4 leading-relaxed">
                    How hard is it to displace the status quo?
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Incumbent Contract</span>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">O</div>
                            <span className="text-[14px] font-bold text-slate-800">Oracle (3 Yr Deal)</span>
                        </div>
                        <StatusTag label="< 90 Days" variant="amber" icon="timer" />
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1 relative">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                        <span>Signed Jan 2024</span>
                        <span>Renews Jan 2027</span>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-[12px]">
                        <span className="font-semibold text-slate-600">Switching Cost Proxy</span>
                        <span className="font-bold text-red-600">High ($150k+ Services)</span>
                    </div>
                    <div className="flex justify-between items-center text-[12px]">
                        <span className="font-semibold text-slate-600">Buyer Maturity</span>
                        <span className="font-bold text-emerald-600">High (Has migrated before)</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between relative z-10">
                <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Competitive Risk</span>
                    <span className="text-sm font-semibold text-red-600">High</span>
                </div>
                <StatusTag label="Golden Window" variant="amber" icon="key" />
            </div>
        </Card>
    );
}
