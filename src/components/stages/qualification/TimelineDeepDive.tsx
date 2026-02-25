import { Card, CardHeader } from '@/components/ui/Card';
import type { DashboardData } from '@/types/dashboard';
import { evaluateTimeline, type TimelineEvaluation } from '@/lib/domain/timelineEvaluation';

/**
 * Timeline Deep Dive — BANT Qualification (T).
 * Executive Grade Refinement: 
 * - Elevated Compelling Events Strip
 * - Separated Buying Phase & Velocity
 * - Readiness Heat Grid
 */
export function TimelineDeepDive({ data }: { data: DashboardData }) {
    const evaluation = evaluateTimeline(data);

    return (
        <div className="flex flex-col gap-5">
            {/* Elevated Strip: Compelling Events */}
            <CompellingEventsStrip {...evaluation.compellingEvents} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Left Column: Phase & Velocity */}
                <BuyingPhaseAndVelocity phase={evaluation.buyingPhase} velocity={evaluation.velocity} />

                {/* Right Column: Implementation Readiness */}
                <ImplementationReadiness {...evaluation.implementationReadiness} />

                {/* Full Width or Bottom Right: Procurement */}
                <div className="lg:col-span-2">
                    <ProcurementArchitecture {...evaluation.procurementArchitecture} />
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────── */
/* ── 1. Elevated Strip: Compelling Events & Deadlines     ── */
/* ─────────────────────────────────────────────────────────── */
function CompellingEventsStrip({
    events,
}: TimelineEvaluation['compellingEvents']) {
    if (events.length === 0) {
        return (
            <Card className="p-4 bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-slate-300 text-[20px]">hourglass_empty</span>
                <span className="text-[12px] text-slate-500 font-medium">No active forcing function identified.</span>
            </Card>
        );
    }

    const typeIcons: Record<string, string> = {
        regulatory: 'gavel',
        fiscal: 'account_balance',
        competitive: 'flag',
        market: 'trending_up'
    };

    const typeColors: Record<string, string> = {
        regulatory: 'bg-purple-100 border-purple-200 text-purple-700',
        fiscal: 'bg-blue-100 border-blue-200 text-blue-700',
        competitive: 'bg-orange-100 border-orange-200 text-orange-700',
        market: 'bg-teal-100 border-teal-200 text-teal-700'
    };

    const typeIconColors: Record<string, string> = {
        regulatory: 'text-purple-600',
        fiscal: 'text-blue-600',
        competitive: 'text-orange-600',
        market: 'text-teal-600'
    };

    const pressureColors: Record<string, string> = {
        High: 'bg-red-100 border-red-200 text-red-700',
        Medium: 'bg-amber-100 border-amber-200 text-amber-700',
        Low: 'bg-emerald-100 border-emerald-200 text-emerald-700',
    };

    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-slate-500 ml-1">Compelling Events & Deadlines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {events.map((evt, i) => {
                    const tColor = typeColors[evt.type] || 'bg-slate-100 border-slate-200 text-slate-600';
                    const tIconColor = typeIconColors[evt.type] || 'text-slate-500';
                    const pColor = pressureColors[evt.pressure] || 'bg-slate-50 border-slate-200 text-slate-500';

                    return (
                        <Card key={i} className="p-4 bg-white border border-slate-200 shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-start mb-3 mt-1">
                                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border ${tColor}`}>
                                    <span className={`material-symbols-outlined text-[12px] ${tIconColor}`}>{typeIcons[evt.type] || 'event'}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-wider">{evt.type}</span>
                                </div>

                                <div className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${pColor}`}>
                                    {evt.pressure}
                                </div>
                            </div>

                            <p className="text-[13px] font-semibold text-slate-800 leading-snug mb-4" title={evt.label}>
                                {evt.label.split('.')[0] + (evt.label.includes('.') ? '.' : '')}
                            </p>

                            <div className="flex items-end justify-between mt-auto">
                                <div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Target Date</span>
                                    <span className="text-[12px] font-bold text-slate-700">{evt.date || 'TBD'}</span>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────── */
/* ── 2. Split View: Buying Phase & Velocity               ── */
/* ─────────────────────────────────────────────────────────── */
function BuyingPhaseAndVelocity({
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

/* ─────────────────────────────────────────────────────────── */
/* ── 3. Implementation Readiness ("The Capacity")         ── */
/* ─────────────────────────────────────────────────────────── */
function ImplementationReadiness({
    level,
    notes,
}: {
    level: 'High' | 'Medium' | 'Low' | 'Unknown';
    notes: string[];
}) {
    const levelConfig = {
        High: { color: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500', width: 'w-[80%]', icon: 'check_circle' },
        Medium: { color: 'bg-amber-100 text-amber-700', bar: 'bg-amber-400', width: 'w-[50%]', icon: 'warning' },
        Low: { color: 'bg-red-100 text-red-700', bar: 'bg-red-400', width: 'w-[20%]', icon: 'cancel' },
        Unknown: { color: 'bg-slate-100 text-slate-600', bar: 'bg-slate-300', width: 'w-[10%]', icon: 'help' },
    };
    const cfg = levelConfig[level];

    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="engineering" title="3. Implementation Readiness" />
            <p className="text-[12px] text-gray-500 font-medium mb-1 leading-relaxed italic">
                "The Capacity" — can they receive what you're selling?
            </p>

            {/* Readiness gauge */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Readiness Level</span>
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>
                        <span className="material-symbols-outlined text-[12px]">{cfg.icon}</span>
                        {level}
                    </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${cfg.bar} ${cfg.width}`} />
                </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2 mt-auto">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Readiness Signals</p>
                {notes.map((note, i) => (
                    <div key={i} className="flex items-start gap-2 py-1.5 border-b border-slate-50 last:border-0">
                        <span className="material-symbols-outlined text-[14px] text-slate-400 shrink-0 mt-0.5">info</span>
                        <p className="text-[11px] text-slate-600 font-medium leading-snug">{note}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}

/* ─────────────────────────────────────────────────────────── */
/* ── 4. Procurement Architecture ("The Friction")         ── */
/* ─────────────────────────────────────────────────────────── */
function ProcurementArchitecture({
    steps,
    bottlenecks,
}: {
    steps: string[];
    bottlenecks: string[];
}) {
    if (steps.length === 0 && bottlenecks.length === 0) return null;

    const bgColors = [
        'bg-[#FFF6D6]', // Soft Cream Yellow
        'bg-[#FFEBD9]', // Soft Peach
        'bg-[#E6F4F1]', // Soft Mint
        'bg-[#EAF2FF]', // Soft Sky Blue
        'bg-[#F1ECFF]', // Soft Lavender
        'bg-[#FFEAF3]', // Soft Blush Pink
    ];

    const iconMap = [
        'savings', // piggy bank
        'settings', // gear
        'pie_chart', // pie
        'shopping_cart', // cart
        'mail', // envelope
        'check_circle' // fallback
    ];

    const mappedSteps = steps.map(step => {
        const matched = bottlenecks.filter(b => {
            const bNormalized = b.toLowerCase();
            const sNormalized = step.toLowerCase();
            return bNormalized.includes(sNormalized) || sNormalized.includes(bNormalized.split('(')[0].trim());
        });
        return { step, bottlenecks: matched };
    });

    const mappedStrs = mappedSteps.flatMap(s => s.bottlenecks);
    const unmappedBottlenecks = bottlenecks.filter(b => !mappedStrs.includes(b));

    return (
        <Card className="p-6 bg-white border border-gray-200 flex flex-col gap-6 overflow-hidden">
            <CardHeader icon="account_tree" title="Procurement Architecture" />

            {mappedSteps.length > 0 && (
                <div className="flex w-full py-2 hidden sm:flex">
                    {mappedSteps.map((mapped, i) => {
                        const isFirst = i === 0;
                        const isLast = i === mappedSteps.length - 1;

                        let clip = 'polygon(0 0, calc(100% - 24px) 0, 100% 50%, calc(100% - 24px) 100%, 0 100%, 24px 50%)';
                        if (isFirst && isLast) {
                            clip = 'none';
                        } else if (isFirst) {
                            clip = 'polygon(0 0, calc(100% - 24px) 0, 100% 50%, calc(100% - 24px) 100%, 0 100%)';
                        }

                        const bgColor = bgColors[i % bgColors.length];
                        const icon = iconMap[i % iconMap.length];

                        return (
                            <div key={i} className={`flex-1 flex flex-col items-center relative ${!isFirst ? '-ml-4' : ''}`}>
                                <div
                                    className={`w-full flex-shrink-0 flex flex-col items-center justify-center min-h-[90px] ${bgColor} text-slate-800 px-2 py-4 relative shadow-sm`}
                                    style={{ clipPath: clip }}
                                >
                                    <span className={`material-symbols-outlined text-[28px] mb-2 font-light ${isFirst ? 'pl-2' : ''} ${isLast ? 'pr-2' : 'pr-6'}`}>
                                        {icon}
                                    </span>
                                    <span className={`text-center font-bold text-[10px] md:text-[11px] uppercase tracking-wider px-1 leading-snug ${isFirst ? 'pl-2' : ''} ${isLast ? 'pr-2' : 'pr-6'}`}>
                                        {mapped.step}
                                    </span>
                                </div>

                                {mapped.bottlenecks.length > 0 && (
                                    <div className={`mt-2 flex flex-col items-center text-center px-1 ${!isFirst ? 'pl-5' : ''}`}>
                                        <div className="w-0.5 h-6 bg-red-200 mb-1" />
                                        <span className="material-symbols-outlined text-[16px] text-red-500 mb-1">warning</span>
                                        {mapped.bottlenecks.map((b, idx) => {
                                            const bText = b.replace(mapped.step, '').replace(/[\(\)]/g, '').trim() || b;
                                            return (
                                                <p key={idx} className="text-[11px] text-red-700 font-bold leading-tight bg-red-50 border border-red-100 px-2 py-1 rounded w-full max-w-[120px] break-words shadow-sm">
                                                    {bText}
                                                </p>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {mappedSteps.length > 0 && (
                <div className="flex flex-col gap-2 sm:hidden">
                    {mappedSteps.map((mapped, i) => {
                        const bgColor = bgColors[i % bgColors.length];
                        const icon = iconMap[i % iconMap.length];
                        return (
                            <div key={i} className="flex flex-col gap-2">
                                <div className={`flex items-center gap-3 p-3 rounded-md ${bgColor} text-slate-800 shadow-sm`}>
                                    <span className="material-symbols-outlined">{icon}</span>
                                    <span className="font-bold text-[12px] uppercase tracking-wider">{mapped.step}</span>
                                </div>
                                {mapped.bottlenecks.map((b, idx) => {
                                    const bText = b.replace(mapped.step, '').replace(/[\(\)]/g, '').trim() || b;
                                    return (
                                        <div key={idx} className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-md p-2 ml-4">
                                            <span className="material-symbols-outlined text-[14px] text-red-500 shrink-0">warning</span>
                                            <p className="text-[11px] text-red-700 font-bold leading-snug">{bText}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            )}

            {unmappedBottlenecks.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 flex items-center gap-1.5 mb-4">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        General Bottlenecks
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {unmappedBottlenecks.map((b, i) => (
                            <div key={i} className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3">
                                <span className="material-symbols-outlined text-[15px] text-red-500 shrink-0 mt-0.5">block</span>
                                <p className="text-[12px] text-red-800 font-semibold leading-snug">{b}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
}
