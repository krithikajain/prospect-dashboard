import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { AlertCircle, Clock, Target, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// ---------- helpers ----------
function clampWords(text: string, n = 6) {
    const cleaned = text.replace(/\s+/g, " ").trim();
    const words = cleaned.split(" ");
    const short = words.slice(0, Math.min(n, words.length)).join(" ");
    return short.length < cleaned.length ? `${short}…` : short;
}
function pct(n: number) {
    return Math.max(0, Math.min(100, Math.round(n)));
}

function Meter({
    label,
    value,
    tone = "neutral",
    hint,
}: {
    label: string;
    value: number; // 0-100
    tone?: "danger" | "warn" | "good" | "neutral";
    hint?: string;
}) {
    const v = pct(value);
    const bar =
        tone === "danger"
            ? "bg-rose-500/40"
            : tone === "warn"
                ? "bg-amber-500/40"
                : tone === "good"
                    ? "bg-emerald-500/40"
                    : "bg-white/20";

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold">
                    {label}
                </div>
                <div className="text-[11px] text-slate-200">{v}%</div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/5 border border-white/10">
                <motion.div
                    className={`h-2 rounded-full ${bar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${v}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </div>
            {hint ? (
                <div className="mt-2 text-[11px] text-slate-500">{hint}</div>
            ) : null}
        </div>
    );
}

function Sparkline({ values }: { values: number[] }) {
    const w = 220;
    const h = 56;
    const pad = 6;
    const step = (w - pad * 2) / (values.length - 1);

    const pts = values.map((v, i) => {
        const x = pad + i * step;
        const y = pad + (h - pad * 2) * (1 - v / 100);
        return { x, y };
    });

    const d = pts
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
        .join(" ");
    const area =
        d +
        ` L ${pts[pts.length - 1].x.toFixed(2)} ${(h - pad).toFixed(
            2
        )} L ${pts[0].x.toFixed(2)} ${(h - pad).toFixed(2)} Z`;

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold">
                    Momentum
                </div>
                <div className="text-[11px] text-slate-300">proxy</div>
            </div>
            <div className="mt-2">
                <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
                    <path d={area} fill="rgba(255,255,255,0.06)" />
                    <motion.path
                        d={d}
                        fill="none"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </svg>
            </div>
        </div>
    );
}

function MiniBars({
    aLabel,
    aValue,
    bLabel,
    bValue,
    cLabel,
    cValue,
}: {
    aLabel: string;
    aValue: number;
    bLabel: string;
    bValue: number;
    cLabel: string;
    cValue: number;
}) {
    const items = [
        { label: aLabel, v: pct(aValue) },
        { label: bLabel, v: pct(bValue) },
        { label: cLabel, v: pct(cValue) },
    ];

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold">
                Driver Lift
            </div>
            <div className="mt-3 space-y-2">
                {items.map((it) => (
                    <div key={it.label} className="flex items-center gap-3">
                        <div className="w-20 text-[11px] text-slate-300">{it.label}</div>
                        <div className="flex-1 h-2 rounded-full bg-white/5 border border-white/10">
                            <motion.div
                                className="h-2 rounded-full bg-indigo-500/35"
                                initial={{ width: 0 }}
                                animate={{ width: `${it.v}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                        </div>
                        <div className="w-10 text-right text-[11px] text-slate-200">
                            {it.v}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
            <div className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">
                {label}
            </div>
            <div className="mt-1 text-lg font-bold text-white tracking-tight">
                {value}
            </div>
            {sub ? <div className="text-[11px] text-indigo-100/80 mt-0.5 font-medium">{sub}</div> : null}
        </div>
    );
}

// ---------- component ----------
interface InsightsCardProps {
    data: DashboardData["pain_urgency"];
    industry?: DashboardData["industry_trends"];
    className?: string;
}

export function InsightsCard({ data, industry, className }: InsightsCardProps) {
    const pain = data?.pain_points ?? [];
    const timing = data?.timing_insights ?? [];
    const drivers = data?.decision_drivers ?? [];

    const painSeverity = pct(20 + pain.length * 18);
    const timingMomentum = pct(15 + timing.length * 12);
    const driverStrength = pct(25 + drivers.length * 10);

    const spark = Array.from({ length: 14 }, (_, i) => {
        const x = i / 13;
        const eased = x * x * (3 - 2 * x);
        const wiggle = Math.sin(i * 0.9) * 4;
        return pct(30 + eased * timingMomentum + wiggle);
    });

    const riskChips =
        pain.length === 0
            ? ["No explicit pain"]
            : ["Adoption friction", "Change mgmt", "Integration", "Multi-team buy-in"].slice(0, 4);

    return (
        <GlassCard className={`p-4 flex flex-col h-full ${className}`} hoverEffect>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wide text-glow">
                    Strategic Signals
                </h3>
                <span className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200">
                    {pain.length + timing.length + drivers.length} signals
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                {/* PAIN SECTION */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-rose-300 mb-1">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wide">Pain Snapshot</span>
                    </div>

                    <Meter
                        label="Pain Severity"
                        value={painSeverity}
                        tone={painSeverity >= 70 ? "danger" : painSeverity >= 45 ? "warn" : "neutral"}
                        hint={painSeverity >= 70 ? "strong urgency potential" : "needs confirmation"}
                    />

                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-[10px] uppercase tracking-widest text-slate-300 font-semibold">
                                Key Risks
                            </div>
                            <div className="flex items-center gap-1 text-slate-400">

                                <TriangleAlert className="w-3.5 h-3.5" />
                                <span className="text-[11px]">{riskChips.length}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {riskChips.map((r) => (
                                <Badge
                                    key={r}
                                    variant="secondary"
                                    className="bg-rose-500/10 text-rose-200 border border-rose-500/20 hover:bg-rose-500/15"
                                >
                                    {r}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {pain.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {pain.slice(0, 3).map((p, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10"
                                >
                                    {clampWords(p, 6)}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* TIMING SECTION */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-amber-300 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wide">Timing Window</span>
                    </div>

                    <Sparkline values={spark} />

                    <Meter
                        label="Window Strength"
                        value={timingMomentum}
                        tone={timingMomentum >= 70 ? "good" : timingMomentum >= 45 ? "warn" : "neutral"}
                        hint={timingMomentum >= 70 ? "good time to engage" : "warm-up needed"}
                    />

                    {timing.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {timing.slice(0, 4).map((t, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-amber-500/10 text-amber-200 border-amber-500/20 hover:bg-amber-500/15"
                                >
                                    {clampWords(t, 6)}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* DRIVERS SECTION */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-indigo-300 mb-1">
                        <Target className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wide">Growth Drivers</span>
                    </div>

                    <div className="flex gap-2">
                        <Stat label="Market" value={industry?.market_cap || "600B+"} sub="Est. Size" />
                        <Stat label="CAGR" value={industry?.growth_rate || "12%+"} sub="Growth Rate" />
                    </div>

                    <MiniBars
                        aLabel="Demand"
                        aValue={pct(driverStrength + 10)}
                        bLabel="Shift"
                        bValue={pct(driverStrength - 5)}
                        cLabel="Spend"
                        cValue={pct(driverStrength + 3)}
                    />

                    {drivers.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {drivers.slice(0, 4).map((d, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-indigo-500/10 text-indigo-200 border-indigo-500/20 hover:bg-indigo-500/15"
                                >
                                    {clampWords(d, 6)}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </GlassCard>
    );
}

