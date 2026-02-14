import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface RiskFlagsCardProps {
    risks: DashboardData['risk_analysis']['risks'];
    className?: string;
}

export function RiskFlagsCard({ risks, className }: RiskFlagsCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (risks.length === 0) return null;

    return (
        <GlassCard className={`p-4 transition-all duration-300 ${className}`} hoverEffect>
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3 text-rose-500">
                    <div className="bg-rose-500/20 p-2 rounded-full">
                        <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide">Risk Flags</h3>
                        <p className="text-xs text-rose-400 font-medium">
                            {risks.length} potential issues detected
                        </p>
                    </div>
                </div>
                <button className="text-slate-400 hover:text-slate-200 transition-colors">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 space-y-2">
                            {risks.map((risk, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-sm text-slate-300"
                                >
                                    <div className="min-w-[6px] h-1.5 mt-1.5 rounded-full bg-rose-500" />
                                    <span>{risk.description}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GlassCard>
    );
}
