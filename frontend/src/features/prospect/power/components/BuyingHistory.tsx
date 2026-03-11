import { Card, CardHeader } from '@/shared/components/Card';

/**
 * Buying Behavior History card showing past purchase patterns and top investments.
 */
export function BuyingHistory() {
    return (
        <Card className="p-6 group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            <CardHeader icon="history" title="4. Track Record & Past Investments" />

            <div className="mt-2 flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-4">Top 3 Enterprise Investments</p>
                    <div className="relative min-h-[300px] w-full flex items-center justify-center p-4">

                        {/* 1. Largest Bubble (Salesforce) */}
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#E0E2FF] flex flex-col items-center justify-center text-center shadow-sm hover:scale-105 transition-transform cursor-pointer border border-[#CCD0FF]">
                            <span className="text-3xl font-light tracking-tight text-slate-800">$1.2M</span>
                            <span className="text-[10px] font-semibold text-slate-600 mt-1 uppercase tracking-wider">Salesforce</span>
                        </div>

                        {/* 2. Medium Bubble (Workday) */}
                        <div className="absolute top-[20%] right-[30%] -translate-x-1/2 w-28 h-28 rounded-full bg-[#FFF3D6] flex flex-col items-center justify-center text-center shadow-sm hover:scale-105 transition-transform cursor-pointer border border-[#FFE7A8]">
                            <span className="text-xl font-light tracking-tight text-slate-800">$850k</span>
                            <span className="text-[9px] font-semibold text-slate-600 mt-1 uppercase tracking-wider">Workday</span>
                        </div>

                        {/* 3. Smallest Bubble (Outreach) */}
                        <div className="absolute bottom-[10%] right-[15%] w-24 h-24 rounded-full bg-[#E8EBFF] flex flex-col items-center justify-center text-center shadow-sm hover:scale-105 transition-transform cursor-pointer border border-[#D0D6FF]">
                            <span className="text-lg font-light tracking-tight text-slate-800">$400k</span>
                            <span className="text-[8px] font-semibold text-slate-600 mt-1 uppercase tracking-wider">Outreach.io</span>
                        </div>

                    </div>
                </div>

            </div>
        </Card>
    );
}
