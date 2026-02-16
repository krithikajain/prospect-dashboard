import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { computeReadiness } from "@/lib/computeReadiness";
import { cn } from "@/lib/utils";
import {
    PolarGrid,
    RadialBar,
    RadialBarChart,
} from "recharts";
import {
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart";

interface ReadinessCardProps {
    data: DashboardData;
    className?: string;
}

const levelToBadgeClass: Record<string, string> = {
    High: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    Warm: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    Early: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    Cold: "bg-slate-500/15 text-slate-300 border-slate-500/25",
};

export function ReadinessCard({ data, className }: ReadinessCardProps) {
    const [isRisksExpanded, setIsRisksExpanded] = useState(false);

    const model = useMemo(() => computeReadiness(data), [data]);
    const risks = data.risk_analysis?.risks ?? [];

    // Helper to describe a full circle arc (or almost full)
    // For full circle, we can use simple circle element, but let's stick to path for animation control if needed.
    // Actually, circle is easier for concentric rings.

    return (
        <GlassCard className={cn("p-0 flex flex-col", className)} hoverEffect>
            {/* Header */}
            <div className="w-full p-4 pb-0 flex items-start justify-between">
                <div>
                    <div className="text-sm font-bold text-white uppercase tracking-wide text-glow">
                        Readiness Index
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                        Signal coverage & engagement
                    </div>
                </div>
                <Badge
                    variant="secondary"
                    className={cn(
                        "text-[10px] px-2 h-5 border",
                        levelToBadgeClass[model.level]
                    )}
                >
                    {model.level}
                </Badge>
            </div>

            {/* Main Content: Chart */}
            <div className="flex flex-col items-center justify-center p-1">
                <div className="relative flex items-center justify-center w-[180px] h-[180px]">
                    <ChartContainer
                        config={{
                            authority: { label: "Authority", color: "rgba(16, 185, 129, 0.9)" }, // emerald-500
                            pain: { label: "Pain Points", color: "rgba(244, 63, 94, 0.9)" },     // rose-500 (Matches Insights Pain)
                            process: { label: "Process", color: "rgba(139, 92, 246, 0.9)" },     // violet-500
                            next_steps: { label: "Next Steps", color: "rgba(14, 165, 233, 0.9)" }, // sky-500
                            risk: { label: "Risk", color: "rgba(245, 158, 11, 0.9)" },           // amber-500
                            budget: { label: "Budget", color: "rgba(100, 116, 139, 0.9)" },      // slate-500
                        }}
                        className="mx-auto w-full h-full"
                    >
                        <RadialBarChart
                            // Map all factors to the chart
                            data={model.factors.map(f => ({
                                name: f.label,
                                key: f.key,
                                score: f.score,
                                weightPoints: f.weightPoints,
                                fill: `var(--color-${f.key})`,
                            }))}
                            innerRadius={40}
                            outerRadius={90}
                            barSize={10}
                            startAngle={90}
                            endAngle={450}
                        >
                            <PolarGrid
                                gridType="circle"
                                radialLines={false}
                                stroke="none"
                                className="first:fill-muted last:fill-background"
                                polarRadius={[90, 80]}
                            />
                            <RadialBar
                                dataKey="score"
                                background={{ fill: "rgba(255,255,255,0.05)" }}
                                cornerRadius={10}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
                                                <div className="grid gap-1.5">
                                                    <div className="flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground items-center">
                                                        <div
                                                            className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                                                            style={{ "--color-bg": data.fill } as React.CSSProperties}
                                                        />
                                                        <div className="flex flex-1 justify-between leading-none">
                                                            <div className="grid gap-1.5">
                                                                <span className="text-muted-foreground">
                                                                    {data.name}
                                                                </span>
                                                            </div>
                                                            <span className="font-mono font-medium tabular-nums text-foreground">
                                                                {data.weightPoints > 0 ? "+" : ""}{data.weightPoints}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </RadialBarChart>
                    </ChartContainer>

                    {/* Centered Total Score - Dark color small */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-extrabold text-white text-glow">
                            {model.score}%
                        </span>
                        <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">
                            Total
                        </span>
                    </div>
                </div>
            </div>

            {/* Risk Flags expander */}
            <div className="w-full border-t border-white/5">
                <button
                    onClick={() => setIsRisksExpanded(v => !v)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-2 text-amber-500">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wide">Risk Flags</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        {isRisksExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                    </div>
                </button>

                <AnimatePresence>
                    {isRisksExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 pb-5 space-y-2">
                                {risks.length === 0 ? (
                                    <div className="text-xs text-slate-500 italic py-2">
                                        No explicit risk flags found.
                                    </div>
                                ) : (
                                    risks.slice(0, 6).map((risk, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-3 p-2 rounded-xl bg-white/5 border border-white/5"
                                        >
                                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                            <span className="text-xs text-slate-400 leading-relaxed">
                                                {risk.description}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </GlassCard>
    );
}
