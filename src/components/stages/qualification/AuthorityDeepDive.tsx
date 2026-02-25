import { Card, CardHeader } from '@/components/ui/Card';

/**
 * Authority Deep Dive — BANT Qualification (A).
 * Signal-board layout: no narrative, just structured signals.
 * Core question: Is authority real, aligned, and navigable?
 */
export function AuthorityDeepDive() {
    return (
        <div className="flex flex-col gap-5">

            {/* Row 1 — Decision Rights + Stakeholder Map + Buying Process */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <DecisionRights />
                <StakeholderMap />
                <BuyingProcess />
            </div>

            {/* Row 2 — Vendor Dynamics + Authority Confidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <VendorDynamics />
                <AuthorityConfidence />
            </div>

        </div>
    );
}

/* ── S1: Decision Rights & Economic Control ─────────────── */
function DecisionRights() {
    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="account_balance" title="S1 — Decision Rights" />

            {/* Hidden question insight */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Hidden Question</p>
                <p className="text-[12px] font-semibold text-slate-700 leading-snug italic">
                    "If I send a contract today, whose desk does it land on?"
                </p>
            </div>

            {/* Key Roles */}
            <div className="flex flex-col gap-2">
                <RoleRow label="Economic Buyer" value="CFO — Sarah Kim" icon="payments" status="identified" />
                <RoleRow label="Signature Authority" value="CEO — Board co-sign >$500k" icon="draw" status="identified" />
                <RoleRow label="Budget Owner" value="VP Engineering" icon="account_balance_wallet" status="identified" />
            </div>

            {/* Contact Role */}
            <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Contact Role:</span>
                <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-200">Decision Maker</span>
            </div>

            {/* Authority Structure */}
            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Authority Structure</span>
                    <span className="text-sm font-semibold text-slate-800">Committee-Based</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-amber-500 text-[14px]">groups</span>
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Board Oversight Active</span>
                </div>
            </div>
        </Card>
    );
}

/* ── S2: Stakeholder Map (Influence Web) ────────────────── */
function StakeholderMap() {
    const stakeholders = [
        { role: 'Project Initiator', name: 'VP Engineering', influence: 'High' as const, icon: 'rocket_launch' },
        { role: 'Vendor Evaluator', name: 'Dir. of IT', influence: 'High' as const, icon: 'search' },
        { role: 'Security Gate', name: 'CISO', influence: 'Med' as const, icon: 'shield' },
        { role: 'Legal Gate', name: 'General Counsel', influence: 'Med' as const, icon: 'gavel' },
        { role: 'KPI Owner', name: 'CRO', influence: 'High' as const, icon: 'monitoring' },
        { role: 'Potential Blocker', name: 'Procurement Lead', influence: 'Med' as const, icon: 'block' },
    ];

    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="hub" title="S2 — Stakeholder Map" />

            <div className="flex flex-col gap-2">
                {stakeholders.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-b-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.role === 'Potential Blocker' ? 'bg-red-50 text-red-500' :
                                s.influence === 'High' ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-400'
                            }`}>
                            <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-slate-700 truncate">{s.role}</p>
                            <p className="text-[10px] text-slate-500 truncate">{s.name}</p>
                        </div>
                        <InfluenceBadge level={s.influence} />
                    </div>
                ))}
            </div>

            {/* Political Risk Flags */}
            <div className="mt-auto pt-3 border-t border-slate-100">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Political Signals</p>
                <div className="flex flex-wrap gap-1.5">
                    <PoliticalFlag label="Cross-functional deal" variant="blue" />
                    <PoliticalFlag label="Silent exec sponsor" variant="amber" />
                    <PoliticalFlag label="Dept. tension" variant="red" />
                </div>
            </div>
        </Card>
    );
}

/* ── S3: Internal Buying Process Architecture ───────────── */
function BuyingProcess() {
    const steps = [
        { label: 'Technical Evaluation', status: 'done' as const },
        { label: 'Security Review (CISO)', status: 'active' as const },
        { label: 'Legal Redlines', status: 'pending' as const },
        { label: 'Procurement Approval', status: 'pending' as const },
        { label: 'Finance ROI Sign-off', status: 'pending' as const },
        { label: 'Executive Approval', status: 'pending' as const },
        { label: 'Pilot (Mandatory)', status: 'pending' as const },
    ];

    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="route" title="S3 — Buying Process"
                action={<ProcessTypeBadge label="RFP-Driven" />}
            />

            {/* Steps Checklist */}
            <div className="flex flex-col gap-1">
                {steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-2.5 py-1.5">
                        <span className={`material-symbols-outlined text-[16px] shrink-0 ${s.status === 'done' ? 'text-emerald-500' :
                                s.status === 'active' ? 'text-blue-500' : 'text-slate-300'
                            }`}>
                            {s.status === 'done' ? 'check_circle' : s.status === 'active' ? 'pending' : 'radio_button_unchecked'}
                        </span>
                        <span className={`text-[12px] ${s.status === 'done' ? 'text-slate-500 line-through' :
                                s.status === 'active' ? 'text-blue-700 font-bold' : 'text-slate-600'
                            }`}>{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Cycle + Bottlenecks */}
            <div className="mt-auto pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Approval Cycle</span>
                    <span className="text-xs font-bold text-slate-800">6–9 Weeks</span>
                </div>
                <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Bottleneck Risks</p>
                    <div className="flex flex-wrap gap-1.5">
                        <RiskPill label="Legal redlines slow" />
                        <RiskPill label="Pilot mandatory" />
                    </div>
                </div>
            </div>
        </Card>
    );
}

/* ── S4: Vendor & Incumbent Dynamics ────────────────────── */
function VendorDynamics() {
    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="swap_horiz" title="S4 — Vendor & Incumbent" />

            {/* Hidden question */}
            <div className="bg-amber-50/60 border border-amber-100 rounded-xl px-3 py-2.5">
                <p className="text-[9px] font-bold uppercase tracking-widest text-amber-500 mb-1">Hidden Question</p>
                <p className="text-[12px] font-semibold text-amber-800 leading-snug italic">
                    "Am I replacing someone's friend?"
                </p>
            </div>

            {/* Incumbent Info */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg border border-red-200">O</div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Oracle ERP (5 Yr)</p>
                            <p className="text-[10px] text-slate-500 font-medium">Enterprise Agreement</p>
                        </div>
                    </div>
                </div>
                {/* Entrenchment bar */}
                <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Entrenchment Level</span>
                    <span className="text-[11px] font-bold text-red-600">High</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full mb-3">
                    <div className="h-full w-[85%] bg-red-500 rounded-full" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <SignalRow icon="timer" label="Renewal Window" value="< 90 Days" variant="amber" />
                <SignalRow icon="person" label="Relationship Owner" value="CTO (Internal)" variant="gray" />
                <SignalRow icon="warning" label="Failed Initiative" value="2023 Migration Stalled" variant="red" />
                <SignalRow icon="psychology" label="Switching Culture" value="Risk-Averse" variant="amber" />
            </div>

            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span className="text-[11px] font-semibold text-amber-700">Political Risk: Moderate — CTO is incumbent champion</span>
            </div>
        </Card>
    );
}

/* ── S5: Authority Confidence & Gaps ────────────────────── */
function AuthorityConfidence() {
    const unanswered = [
        'Is economic buyer fully engaged?',
        'Is finance looped in for ROI validation?',
        'Has procurement been formally notified?',
        'Are decision criteria formally defined?',
        'Is champion empowered to drive consensus?',
    ];

    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="checklist" title="S5 — Authority Confidence" />

            {/* Clarity Level */}
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Clarity Level</span>
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200 shadow-sm">
                    Partial
                </span>
            </div>

            {/* Unanswered Critical Questions */}
            <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Unanswered Critical Questions</p>
                <div className="flex flex-col gap-1.5">
                    {unanswered.map((q, i) => (
                        <div key={i} className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-b-0">
                            <span className="material-symbols-outlined text-[14px] text-slate-300 shrink-0">help_outline</span>
                            <span className="text-[12px] text-slate-600">{q}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Risk Flags */}
            <div className="mt-auto pt-3 border-t border-slate-100">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Risk Flags</p>
                <div className="flex flex-wrap gap-1.5">
                    <RiskPill label="Single-thread risk" />
                    <RiskPill label="Procurement unknown" />
                    <PoliticalFlag label="Champion untested" variant="amber" />
                </div>
            </div>
        </Card>
    );
}

/* ── Shared Primitives ──────────────────────────────────── */

function RoleRow({ label, value, icon, status }: {
    label: string; value: string; icon: string; status: 'identified' | 'unknown';
}) {
    return (
        <div className="flex items-center gap-2.5 py-1.5 border-b border-slate-50">
            <span className="material-symbols-outlined text-[14px] text-slate-400 shrink-0">{icon}</span>
            <p className="text-[11px] text-slate-500 flex-1">{label}</p>
            <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status === 'identified' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                <span className={`text-[11px] font-bold ${status === 'identified' ? 'text-emerald-700' : 'text-red-600'}`}>{value}</span>
            </div>
        </div>
    );
}

function SignalRow({ label, value, icon, variant }: {
    label: string; value: string; icon: string; variant: 'emerald' | 'amber' | 'red' | 'gray';
}) {
    const dotColor = { emerald: 'bg-emerald-400', amber: 'bg-amber-400', red: 'bg-red-400', gray: 'bg-slate-300' }[variant];
    const valColor = { emerald: 'text-emerald-700', amber: 'text-amber-700', red: 'text-red-600', gray: 'text-slate-600' }[variant];
    return (
        <div className="flex items-center gap-2.5 py-1.5 border-b border-slate-50">
            <span className="material-symbols-outlined text-[14px] text-slate-400 shrink-0">{icon}</span>
            <p className="text-[11px] text-slate-500 flex-1">{label}</p>
            <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                <span className={`text-[11px] font-bold ${valColor}`}>{value}</span>
            </div>
        </div>
    );
}

function InfluenceBadge({ level }: { level: 'High' | 'Med' | 'Low' }) {
    const cls = level === 'High' ? 'bg-blue-100 text-blue-700 border-blue-200' :
        level === 'Med' ? 'bg-slate-100 text-slate-600 border-slate-200' :
            'bg-gray-50 text-gray-500 border-gray-200';
    return <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${cls}`}>{level}</span>;
}

function PoliticalFlag({ label, variant }: { label: string; variant: 'blue' | 'amber' | 'red' }) {
    const cls = { blue: 'bg-blue-50 text-blue-600 border-blue-100', amber: 'bg-amber-50 text-amber-600 border-amber-100', red: 'bg-red-50 text-red-600 border-red-100' }[variant];
    return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${cls}`}>{label}</span>;
}

function RiskPill({ label }: { label: string }) {
    return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-100">{label}</span>;
}

function ProcessTypeBadge({ label }: { label: string }) {
    return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700 border border-purple-200">{label}</span>;
}
