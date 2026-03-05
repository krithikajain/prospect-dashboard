import { Card } from '@/shared/components/Card';

interface ForcingEventProps {
    requiresConsensus: boolean;
}

/**
 * Dark card showing timeline countdown to a forcing event.
 */
export function ForcingEvent({ requiresConsensus }: ForcingEventProps) {
    return (
        <Card className="p-6 relative overflow-hidden bg-slate-900 border-none shadow-xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-20" />

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className="text-white font-bold text-lg tracking-tight">The Forcing Event</h3>
                    <p className="text-gray-400 text-[11px] mt-0.5 font-medium uppercase tracking-wider">Critical Timeline</p>
                </div>
                <span className="material-symbols-outlined text-blue-400 border border-blue-400/30 bg-blue-400/10 p-2 rounded-full text-[18px]">av_timer</span>
            </div>

            <div className="flex items-end gap-3 mb-6 relative z-10">
                <div className="text-[56px] font-light text-white leading-none tracking-tighter">45</div>
                <div className="pb-2 text-sm text-gray-400 font-medium">Days remaining</div>
            </div>

            <p className="text-xs text-gray-300 relative z-10 mb-5 leading-relaxed">
                approaching End of Fiscal Year (Q4), historical spend data indicates unallocated budget must be consumed.
            </p>

            <div className="mt-auto relative z-10 flex gap-2">
                {requiresConsensus ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        Consensus Required (&gt;500 emp)
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Independent Authority
                    </div>
                )}
            </div>
        </Card>
    );
}
