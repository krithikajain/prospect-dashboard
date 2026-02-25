import { Card, CardHeader } from '@/components/ui/Card';
import type { DashboardData } from '@/types/dashboard';
import { evaluateNeed } from '@/lib/domain/needEvaluation';

/**
 * Need Deep Dive — BANT Qualification (N).
 * Signal-board layout mapping the 5 Core Categories.
 * Core question: Is this a bleeding neck or a nice-to-have?
 */
export function NeedDeepDive({ data }: { data: DashboardData }) {
    const evaluation = evaluateNeed(data);

    return (
        <div className="flex flex-col gap-5">
            {/* Top Row — The Heaviest Weight Priorities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <CorePain {...evaluation.corePain} />
                <StrategicMandates {...evaluation.strategicMandates} />
            </div>

            {/* Bottom Row — Context & Catalysts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <CompetitivePressures {...evaluation.competitivePressures} />
                <WorkflowGaps {...evaluation.workflowGaps} />
                <ExecutiveVisibility {...evaluation.executiveVisibility} />
            </div>
        </div>
    );
}

/* ── 1. The Core Pain & Economic Impact ────────────────── */
function CorePain({ impact, metrics }: { impact: string; metrics: string[] }) {
    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="bloodtype" title="1. The Core Pain & Economic Impact" />
            <p className="text-[12px] text-gray-500 font-medium mb-2 leading-relaxed italic">
                “What is the actual cost of this problem right now?”
            </p>

            <div className="bg-red-50/50 border border-red-100 p-4 rounded-xl mb-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-1">The "Bleeding Neck"</p>
                <p className="text-sm font-semibold text-slate-800 leading-snug">{impact}</p>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
                {metrics.map((metric, i) => (
                    <SignalRow key={i} icon="payments" label={metric} variant="red" value="High Impact" />
                ))}
            </div>
        </Card>
    );
}

/* ── 2. Strategic Mandates & Urgency Drivers ───────────── */
function StrategicMandates({ urgencyLevel, drivers }: { urgencyLevel: string; drivers: string[] }) {
    const isHigh = urgencyLevel === 'High';

    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="explore" title="2. Strategic Mandates & Urgency" />
            <p className="text-[12px] text-gray-500 font-medium mb-2 leading-relaxed italic">
                “Is the company's leadership forcing this change?”
            </p>

            <div className="flex items-center justify-between mb-4 bg-slate-50 border border-slate-100 p-3 rounded-xl">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Urgency Level</span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isHigh ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
                    {urgencyLevel}
                </span>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500">The "North Star" Drivers</p>
                {drivers.map((driver, i) => (
                    <SignalRow key={i} icon="flag" label={driver} variant={isHigh ? 'amber' : 'gray'} value="Active Directive" />
                ))}
            </div>
        </Card>
    );
}

/* ── 3. Market & Competitive Pressures ─────────────────── */
function CompetitivePressures({ marketPressures, industryGrowth }: { marketPressures: string; industryGrowth?: string }) {
    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="monitoring" title="3. Competitive Pressures" />
            <p className="text-[12px] text-gray-500 font-medium mb-2 leading-relaxed italic">
                “What happens if they do nothing?”
            </p>

            <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl mb-2">
                <p className="text-sm font-semibold text-slate-700 leading-snug">{marketPressures}</p>
            </div>

            {industryGrowth && (
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Industry Growth Rate</span>
                    <span className="text-xs font-bold text-emerald-600">{industryGrowth}</span>
                </div>
            )}

            <div className="mt-2 text-right">
                <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">Survival Instinct Trigger</span>
            </div>
        </Card>
    );
}

/* ── 4. Current Gaps & "Broken" Workflow ───────────────── */
function WorkflowGaps({ painPoints, infrastructure }: { painPoints: string[]; infrastructure: string }) {
    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="build" title="4. Current Gaps & Workflows" />
            <p className="text-[12px] text-gray-500 font-medium mb-2 leading-relaxed italic">
                “Why is their current tool failing them?”
            </p>

            <div className="flex flex-col gap-2 mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">The "Friction Point"</p>
                {painPoints.slice(0, 3).map((point, i) => (
                    <div key={i} className="flex items-start gap-2 py-1">
                        <span className="material-symbols-outlined text-[14px] text-red-400 shrink-0 mt-0.5">error</span>
                        <span className="text-[12px] text-slate-600 font-medium leading-snug">{point}</span>
                    </div>
                ))}
            </div>

            <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Infrastructure</span>
                <span className="text-xs font-bold text-slate-700">{infrastructure}</span>
            </div>
        </Card>
    );
}

/* ── 5. Executive Visibility & Sponsorship ─────────────── */
function ExecutiveVisibility({ visibility }: { visibility: string }) {
    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="visibility" title="5. Executive Visibility" />
            <p className="text-[12px] text-gray-500 font-medium mb-2 leading-relaxed italic">
                “Does anyone with a C-suite title care?”
            </p>

            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex-1 flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-2">The "Political Weight"</p>
                <p className="text-sm font-semibold text-slate-800 leading-snug">{visibility}</p>
            </div>

            <div className="mt-3 text-right">
                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">Air Cover Verified</span>
            </div>
        </Card>
    );
}

/* ── Shared Primitives ──────────────────────────────────── */

function SignalRow({ label, value, icon, variant }: {
    label: string; value: string; icon: string; variant: 'emerald' | 'amber' | 'red' | 'gray';
}) {
    const dotColor = { emerald: 'bg-emerald-400', amber: 'bg-amber-400', red: 'bg-red-400', gray: 'bg-slate-300' }[variant];
    const valColor = { emerald: 'text-emerald-700', amber: 'text-amber-700', red: 'text-red-600', gray: 'text-slate-600' }[variant];
    return (
        <div className="flex items-center gap-2.5 py-1.5 border-b border-slate-50 last:border-b-0">
            <span className="material-symbols-outlined text-[14px] text-slate-400 shrink-0">{icon}</span>
            <p className="text-[11px] text-slate-500 flex-1">{label}</p>
            <div className="flex items-center gap-1.5 shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                <span className={`text-[10px] uppercase tracking-wider font-bold ${valColor}`}>{value}</span>
            </div>
        </div>
    );
}
