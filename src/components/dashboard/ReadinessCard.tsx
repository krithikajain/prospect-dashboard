import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ReadinessCardProps {
    data: DashboardData;
    className?: string;
}

export function ReadinessCard({ data, className }: ReadinessCardProps) {
    const [isRisksExpanded, setIsRisksExpanded] = useState(false);

    // 1. Calculate Readiness Score
    // Base = opportunity_score (default 50)
    let score = data.deal_strength.score || 50;
    const risks = data.risk_analysis.risks;

    // +15 if decision maker exists
    const hasDecisionMaker = data.stakeholders.some(s => s.role.toLowerCase().includes('decision') || s.influence === 'High');
    if (hasDecisionMaker) score += 15;

    // +10 if 2+ pain points
    if (data.pain_urgency.pain_points.length >= 2) score += 10;

    // +10 if procurement steps known (not empty)
    if (data.buying_process.steps.length > 0) score += 10;

    // +5 if next steps exist (Action Engine tasks)
    if (data.action_engine.tasks.length > 0) score += 5;

    // -10 if 3+ risks
    if (risks.length >= 3) score -= 10;

    // -5 if budget unknown/null
    if (!data.budget?.status || data.budget.status === 'Unknown') score -= 5;

    // Clamp 0-100
    score = Math.max(0, Math.min(100, score));

    // Ring Logic
    const radius = 40;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    // Color logic
    const getColor = (s: number) => {
        if (s >= 70) return "#10b981"; // Emerald 500
        if (s >= 40) return "#fbbf24"; // Amber 400
        return "#ef4444"; // Red 500
    };

    const meterColor = getColor(score);

    // 2. Calculate Factors (Authority, Pain, Clarity)
    const authorityScore = hasDecisionMaker ? 90 : 40;
    const painScore = Math.min(100, data.pain_urgency.pain_points.length * 35);
    const clarityScore = data.buying_process.steps.length > 0 ? 80 : 30;

    const factors = [
        { label: "Authority", score: authorityScore, color: "text-emerald-400", bg: "bg-emerald-500" },
        { label: "Pain", score: painScore, color: "text-rose-400", bg: "bg-rose-500" },
        { label: "Clarity", score: clarityScore, color: "text-blue-400", bg: "bg-blue-500" },
    ];

    return (
        <GlassCard className={`p-0 flex flex-col ${className}`} hoverEffect={true}>
            {/* Upper Section: Score & Ring */}
            <div className="p-6 pb-2">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Readiness Index</h3>
                    <Badge variant={score > 70 ? "default" : "secondary"} className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] px-2 h-5">
                        {data.deal_strength.signal}
                    </Badge>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-6xl font-bold text-slate-100 tracking-tighter"
                        >
                            {score}%
                        </motion.div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Deal Probability</div>
                    </div>

                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
                            <circle
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth={stroke}
                                fill="transparent"
                                r={normalizedRadius}
                                cx={radius}
                                cy={radius}
                            />
                            <motion.circle
                                stroke={meterColor}
                                strokeWidth={stroke}
                                fill="transparent"
                                r={normalizedRadius}
                                cx={radius}
                                cy={radius}
                                strokeLinecap="round"
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset }}
                                style={{ strokeDasharray: circumference + ' ' + circumference }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Middle Section: Risks Expander */}
            <div className="mt-2 border-t border-white/5">
                <button
                    onClick={() => setIsRisksExpanded(!isRisksExpanded)}
                    className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
                >
                    <div className="flex items-center gap-2 text-rose-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">Risk Flags</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">{risks.length} Detected</span>
                        {isRisksExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </div>
                </button>

                <AnimatePresence>
                    {isRisksExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-black/20"
                        >
                            <div className="p-4 pt-0 space-y-2">
                                {risks.length === 0 ? (
                                    <div className="text-xs text-slate-500 italic p-2">No risks detected.</div>
                                ) : (
                                    risks.map((risk, i) => (
                                        <div key={i} className="flex gap-3 p-2 rounded-lg bg-rose-500/5 border border-rose-500/10">
                                            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                                            <span className="text-xs text-rose-200/80 leading-relaxed">{risk.description}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Section: 3 Bars (Restored) */}
            <div className="p-6 pt-2 border-t border-white/5 space-y-4">
                {factors.map((factor, i) => (
                    <div key={i} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                            <span className="font-medium text-slate-400 uppercase tracking-tight">{factor.label}</span>
                            <span className={`font-bold ${factor.color}`}>{factor.score}/100</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${factor.score}%` }}
                                transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                                className={`h-full ${factor.bg}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
