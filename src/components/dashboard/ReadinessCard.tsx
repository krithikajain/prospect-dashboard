import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ReadinessCardProps {
    data: DashboardData;
    className?: string;
}

export function ReadinessCard({ data, className }: ReadinessCardProps) {
    // 1. Calculate Readiness Score
    // Base = opportunity_score (default 50)
    let score = data.deal_strength.score || 50;

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
    if (data.risk_analysis.risks.length >= 3) score -= 10;

    // -5 if budget unknown/null
    if (!data.budget?.status || data.budget.status === 'Unknown') score -= 5;

    // Clamp 0-100
    score = Math.max(0, Math.min(100, score));

    // Gauge Logic
    const radius = 36;
    const stroke = 8;
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

    return (
        <GlassCard className={`p-6 flex flex-col justify-between ${className}`} hoverEffect={true}>
            {/* 1) Top Row: Title + Badge */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Readiness Index</h3>
                <Badge variant={score > 70 ? "default" : "secondary"} className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-emerald-500/30 text-[10px] px-2 h-5">
                    {data.deal_strength.signal}
                </Badge>
            </div>

            {/* 2) Center Row: Big Metric (Left/Center) + Ring (Right) */}
            <div className="flex items-center justify-between mb-6">
                {/* Metric */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl font-bold text-slate-100 tracking-tighter"
                    >
                        {score}%
                    </motion.div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Engagement Potential</div>
                </div>

                {/* Ring (Right Side) */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
                        {/* Background Ring */}
                        <circle
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth={stroke}
                            fill="transparent"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        {/* Progress Ring */}
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

            {/* 3) Below: 3 Thin Bars */}
            <div className="space-y-4 mb-2">
                <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                        <span>Authority Coverage</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: hasDecisionMaker ? "80%" : "30%" }}
                            className="h-full bg-indigo-500 rounded-full"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                        <span>Pain Validation</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: data.pain_urgency.pain_points.length > 0 ? "70%" : "20%" }}
                            transition={{ delay: 0.1 }}
                            className="h-full bg-purple-500 rounded-full"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                        <span>Buying Clarity</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: data.buying_process.steps.length > 0 ? "60%" : "10%" }}
                            transition={{ delay: 0.2 }}
                            className="h-full bg-blue-500 rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* 4) Bottom Right: Risks (Text Only) */}
            <div className="mt-auto flex justify-end">
                <div className="text-xs text-rose-400 font-medium">
                    {data.risk_analysis.risks.length} Risks identified
                </div>
            </div>
        </GlassCard>
    );
}
