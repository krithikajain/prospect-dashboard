import { Card, CardHeader, MetricBox, StatusTag, InfoRow, ChecklistItem } from '@/shared/components';
import { themeVariants, glassVariants } from '@/lib/theme';

/**
 * Budget Assessment — BANT Qualification (B).
 * High-end dashboard layout with the 4 Pillars.
 */
export function BudgetAssessment() {
    return (
        <div className="flex flex-col gap-6">
            <BudgetVerdict />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FundingSource />
                <EconomicBuyer />
                <InvestmentRange />
            </div>

            <ProcurementPath />
        </div>
    );
}

/* ━━ Budget Verdict (compact full-width summary) ━━━━━━━━━━ */
function BudgetVerdict() {
    return (
        <Card className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
                <StatusTag variant="amber" label="Likely — Unconfirmed" />
                <div className="h-6 w-px bg-slate-200" />
                <VerdictMetric icon="bar_chart" label="Deal Strength" value="Moderate" color="text-blue-600" />
                <VerdictMetric icon="target" label="Opp. Score" value="Medium" color="text-amber-600" />
                <VerdictMetric icon="person_off" label="Finance" value="Unknown" color="text-slate-400" />
            </div>

            <div className={`flex items-center gap-2 rounded-lg px-4 py-2 ${themeVariants.red}`}>
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span className="text-sm font-medium">Risk Flagged: Budget constraints</span>
            </div>
        </Card>
    );
}

function VerdictMetric({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
    return (
        <div className="flex items-center gap-1.5">
            <span className={`material-symbols-outlined text-[16px] ${color}`}>{icon}</span>
            <span className="text-xs text-slate-500 font-medium">{label}:</span>
            <span className={`text-sm font-bold ${color}`}>{value}</span>
        </div>
    );
}

/* ━━ Pillar 1 — Funding Source (The "Where") ━━━━━━━━━━━━━ */
function FundingSource() {
    return (
        <Card className="p-6 flex flex-col gap-5 h-full">
            <div>
                <CardHeader icon="account_balance_wallet" title="1. Funding Source" />
                <PillarSubtitle>The "Where" — where the money sits</PillarSubtitle>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-2">
                <MetricBox
                    smallIcon="attach_money"
                    label="Funding Amount"
                    value="$120M"
                    trend={{ direction: 'up', label: 'Series C' }}
                />
                <MetricBox
                    smallIcon="category"
                    label="Source Type"
                    value="Initiative"
                />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <InfoRow
                    icon="receipt_long"
                    title="Budget Stated"
                    description="Direct Ask"
                    trailing={<StatusTag label="Not Disclosed" variant="red" dot />}
                />
                <InfoRow
                    icon="swap_horiz"
                    title="CapEx vs OpEx"
                    description="Fund Type"
                    trailing={<StatusTag label="Unknown" variant="amber" dot />}
                />
            </div>

            <RepInsight color="blue">
                VC-backed = growth-phase spend. Budget likely exists but isn't formally allocated.
            </RepInsight>
        </Card>
    );
}

/* ━━ Pillar 2 — Economic Buyer (The "Who") ━━━━━━━━━━━━━━ */
function EconomicBuyer() {
    return (
        <Card className="p-6 flex flex-col gap-5 h-full">
            <div>
                <CardHeader icon="shield_person" title="2. Economic Buyer" />
                <PillarSubtitle>The "Who" — who authorizes the spend</PillarSubtitle>
            </div>

            {/* Decision Maker */}
            <div className={`${glassVariants.emerald} rounded-2xl p-4 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-100/50 to-transparent rounded-bl-full" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Decision Maker</p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-emerald-600">person</span>
                    </div>
                    <div>
                        <p className="text-base font-bold text-slate-900">Michael Chasen</p>
                        <p className="text-[11px] text-slate-500 font-medium">Founder & CEO</p>
                    </div>
                </div>
            </div>

            {/* Buying Committee */}
            <div className="flex flex-col gap-1 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 mt-1">Buying Committee</p>
                <InfoRow
                    icon="person"
                    title="CFO"
                    description="C-Suite Level"
                    trailing={<StatusTag label="Unnamed" variant="amber" />}
                />
                <InfoRow
                    icon="person"
                    title="CIO / CTO"
                    description="C-Suite Level"
                    trailing={<StatusTag label="Unnamed" variant="amber" />}
                />
                <InfoRow
                    icon="person"
                    title="Procurement"
                    description="Manager Level"
                    trailing={<StatusTag label="Unnamed" variant="amber" />}
                />
            </div>

            <RepInsight color="emerald">
                CEO engaged directly. Final sign-off requires CEO + CFO + CIO/CTO consensus.
            </RepInsight>
        </Card>
    );
}

/* ━━ Pillar 3 — Investment Range & Flex (The "How Much") ━━ */
function InvestmentRange() {
    return (
        <Card className="p-6 flex flex-col gap-5 h-full">
            <div>
                <CardHeader icon="payments" title="3. Investment Range" />
                <PillarSubtitle>The "How Much" — bracket & ROI case</PillarSubtitle>
            </div>

            <div className={`${glassVariants.amber} rounded-2xl px-4 py-3 flex items-center justify-between`}>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Budget Status</p>
                    <p className="text-sm font-bold text-amber-900">TBD — Not Disclosed</p>
                </div>
                <StatusTag variant="amber" label="Unconfirmed" />
            </div>

            {/* Scale limits */}
            <div className="flex gap-2">
                <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-center">
                    <p className="text-[10px] font-semibold text-slate-400 mb-0.5">REVENUE</p>
                    <p className="text-[13px] font-bold text-slate-700">$50–100M</p>
                </div>
                <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-center">
                    <p className="text-[10px] font-semibold text-slate-400 mb-0.5">EMPLOYEES</p>
                    <p className="text-[13px] font-bold text-slate-700">500–1,000</p>
                </div>
            </div>

            {/* ROI levers */}
            <div className="flex flex-col gap-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 mt-1">Expected ROI</p>
                <RoiRow metric="R&D Rework" value="↓ 20%" />
                <RoiRow metric="Quality Issues" value="↓ 15%" />
                <RoiRow metric="Data Validation" value="↑ 25%" />
                <RoiRow metric="Dev Cycle Time" value="↓ 10–20%" />
                <RoiRow metric="Cost Reduction" value="↓ 5–10%" />
            </div>

            <RepInsight color="amber">
                No price discussed yet. Use ROI savings metrics to justify budget creation.
            </RepInsight>
        </Card>
    );
}

/* ━━ Pillar 4 — Procurement & Approval Path (The "How") ━━ */
function ProcurementPath() {
    const steps = [
        { label: 'RFP / POC', status: 'checked' },
        { label: 'Evaluation', status: 'warning' },
        { label: 'Compliance', status: 'unchecked' },
        { label: 'Security', status: 'unchecked' },
        { label: 'Legal Review', status: 'danger' },
        { label: 'Integration', status: 'danger' },
        { label: 'Sign-off', status: 'unchecked' },
    ];

    return (
        <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <CardHeader icon="route" title="4. Procurement Path" />
                    <PillarSubtitle>The "How" — from Yes to Signed Contract</PillarSubtitle>
                </div>
                <StatusTag variant="amber" label="Awareness / Evaluation Stage" icon="timelapse" />
            </div>

            {/* Full width visual timeline tracker */}
            <div className="w-full flex justify-between relative mt-10 mb-12 px-4 md:px-12">
                {/* Connecting background line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0 mx-4 md:mx-12" />

                {/* Status nodes */}
                {steps.map((step, i) => {
                    const isChecked = step.status === 'checked';
                    const isWarn = step.status === 'warning';
                    const isDanger = step.status === 'danger';

                    const bgClass = isChecked ? 'bg-emerald-500 border-emerald-500'
                        : isDanger ? 'bg-red-50 border-red-200'
                            : isWarn ? 'bg-amber-500 border-amber-500'
                                : 'bg-white border-slate-200';

                    const iconClass = isChecked ? 'text-white'
                        : isDanger ? 'text-red-500'
                            : isWarn ? 'text-white'
                                : 'text-transparent';

                    return (
                        <div key={i} className="relative z-10 flex flex-col items-center group md:w-16">
                            {/* Circle node */}
                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${bgClass} ${isDanger ? 'animate-pulse' : ''}`}>
                                <span className={`material-symbols-outlined text-[12px] md:text-[16px] ${iconClass}`}>
                                    {isChecked ? 'check' : isWarn ? 'hourglass_bottom' : isDanger ? 'warning' : 'circle'}
                                </span>
                            </div>

                            {/* Label underneath */}
                            <div className="absolute top-8 md:top-10 w-24 text-center">
                                <p className={`text-[9px] md:text-[11px] font-semibold leading-tight ${isDanger ? 'text-red-600' : isChecked ? 'text-emerald-700' : isWarn ? 'text-amber-700' : 'text-slate-400'}`}>
                                    {step.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16 pt-6 border-t border-slate-100">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-red-500 mb-3 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">gavel</span>
                        Known Bottlenecks & Risks
                    </p>
                    <div className="flex flex-col gap-2">
                        <ChecklistItem label="Lengthy legal reviews anticipated" checked={false} />
                        <ChecklistItem label="Complex integration requirements" checked={false} />
                        <ChecklistItem label="Multi-stakeholder consensus needed" checked={false} />
                    </div>
                </div>

                <div className="flex items-end">
                    <RepInsight color="red">
                        Timeline unknown. No PO cut-off date identified. Plan for extended legal cycle causing delays.
                    </RepInsight>
                </div>
            </div>
        </Card>
    );
}

/* ━━ Local Shared Primitives ━━━━━━━━━━━━━ */

function PillarSubtitle({ children }: { children: React.ReactNode }) {
    return <p className="text-[12px] text-slate-500 font-medium -mt-1 ml-1 leading-snug">{children}</p>;
}

function RoiRow({ metric, value }: { metric: string; value: string }) {
    const isUp = value.startsWith('↑');
    return (
        <div className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
            <span className="text-xs text-slate-600 font-medium">{metric}</span>
            <span className={`text-[13px] font-bold ${isUp ? 'text-blue-600' : 'text-emerald-600'}`}>{value}</span>
        </div>
    );
}

function RepInsight({ children, color }: { children: React.ReactNode; color: 'blue' | 'emerald' | 'amber' | 'red' }) {
    const bg = glassVariants[color] || glassVariants.slate;
    const text = { blue: 'text-blue-700', emerald: 'text-emerald-700', amber: 'text-amber-800', red: 'text-red-700' }[color];
    return (
        <div className={`w-full mt-4 rounded-xl px-4 py-3 border ${bg}`}>
            <div className="flex gap-2">
                <span className={`material-symbols-outlined text-[18px] shrink-0 ${text}`}>lightbulb</span>
                <p className={`text-xs leading-relaxed font-medium ${text}`}>{children}</p>
            </div>
        </div>
    );
}
