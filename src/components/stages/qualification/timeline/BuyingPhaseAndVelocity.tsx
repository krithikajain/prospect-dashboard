import { Card, CardHeader } from '@/components/ui/Card';
import type { TimelineEvaluation } from '@/lib/domain/timelineEvaluation';

export function BuyingPhaseAndVelocity({
    phase,
    velocity,
}: {
    phase: TimelineEvaluation['buyingPhase'];
    velocity: TimelineEvaluation['velocity'];
}) {
    return (
        <Card className="p-0 bg-white border border-gray-200 overflow-hidden flex flex-col h-full">
            <CardHeader
                icon="radar"
                title="Buying Phase & Velocity"
                className="px-6 py-5 border-b border-gray-100 bg-slate-50/50"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 flex-1">
                {/* SECTION A: Phase Position */}
                <div className="p-6 flex flex-col gap-5">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Current Position</span>
                        <h4 className="text-[15px] font-bold text-slate-800">{phase.currentStage}</h4>
                    </div>

                    <div className="flex flex-col gap-2 flex-1 justify-center">
                        {phase.allStages.map((stage, i) => {
                            const isActive = i === phase.currentIndex;
                            const isPast = i < phase.currentIndex;

                            return (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center
                                        ${isActive ? 'border-blue-500 bg-blue-50' :
                                            isPast ? 'border-emerald-500 bg-emerald-500' :
                                                'border-slate-200 bg-slate-50'}`}
                                    >
                                        {isActive && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                                        {isPast && <span className="material-symbols-outlined text-white text-[9px] font-bold">check</span>}
                                    </div>
                                    <span className={`text-[12px] font-semibold 
                                        ${isActive ? 'text-blue-700' :
                                            isPast ? 'text-slate-600' : 'text-slate-400'}`}>
                                        {stage}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-500">Time in Stage</span>
                        <span className={`text-[12px] font-bold px-2 py-0.5 rounded-md ${phase.daysInPhase > 30 ? 'bg-red-100 text-red-700' : 'bg-white border border-slate-200 text-slate-700'}`}>
                            {phase.daysInPhase} days
                        </span>
                    </div>
                </div>

                {/* SECTION B: Velocity Pattern */}
                <div className="p-6 flex flex-col gap-5 bg-slate-50/30">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Momentum</span>
                        <div className="flex items-center gap-2">
                            {velocity.pattern === 'Accelerating' && <span className="material-symbols-outlined text-emerald-500 text-[20px]">keyboard_double_arrow_up</span>}
                            {velocity.pattern === 'Stable' && <span className="material-symbols-outlined text-blue-500 text-[20px]">trending_flat</span>}
                            {velocity.pattern === 'Slowing' && <span className="material-symbols-outlined text-amber-500 text-[20px]">trending_down</span>}
                            {velocity.pattern === 'Stalled' && <span className="material-symbols-outlined text-red-500 text-[20px]">pause_circle</span>}
                            <h4 className="text-[15px] font-bold text-slate-800">{velocity.pattern}</h4>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-4 border-l-2 border-slate-200 pl-4 py-2 ml-2">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Avg Stage Duration</span>
                            <span className="text-[13px] font-semibold text-slate-700">{velocity.avgDays} days</span>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Recent Cadence</span>
                            <span className="text-[13px] font-semibold text-slate-700">{velocity.cadence}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
