import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import type { DashboardData } from "@/types/dashboard";
import { AlertCircle, Clock, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface PainUrgencyCardProps {
    data: DashboardData['pain_urgency'];
    className?: string;
}

export function PainUrgencyCard({ data, className }: PainUrgencyCardProps) {
    const [activeDriver, setActiveDriver] = useState<string | null>(null);

    return (
        <GlassCard className={`p-6 relative overflow-hidden ${className}`} hoverEffect>
            {/* Subtle background wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 via-transparent to-indigo-50/30 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {/* Left: Pain Points */}
                <div>
                    <div className="flex items-center gap-2 mb-3 text-rose-600">
                        <AlertCircle className="h-4 w-4" />
                        <h3 className="text-sm font-bold uppercase tracking-wide">Key Pain Points</h3>
                    </div>
                    <ul className="space-y-3">
                        {data.pain_points.length === 0 ? (
                            <li className="text-sm text-slate-400 italic">No explicit pain points found.</li>
                        ) : (
                            data.pain_points.map((pain, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-3 group"
                                >
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 group-hover:scale-150 transition-transform" />
                                    <span className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">
                                        {pain}
                                    </span>
                                </motion.li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Right: Drivers & Timing */}
                <div className="space-y-6">
                    {/* Timing */}
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-amber-600">
                            <Clock className="h-4 w-4" />
                            <h3 className="text-xs font-bold uppercase tracking-wide">Timing Insights</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data.timing_insights.length === 0 ? (
                                <span className="text-sm text-slate-400 italic">No timing signals.</span>
                            ) : (
                                data.timing_insights.map((insight, idx) => (
                                    <Badge key={idx} variant="secondary" className="bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-100">
                                        {insight}
                                    </Badge>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Decision Drivers */}
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-indigo-600">
                            <Target className="h-4 w-4" />
                            <h3 className="text-xs font-bold uppercase tracking-wide">Decision Drivers</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data.decision_drivers.length === 0 ? (
                                <span className="text-sm text-slate-400 italic">Unknown.</span>
                            ) : (
                                data.decision_drivers.map((driver, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveDriver(activeDriver === driver ? null : driver)}
                                        className={`text-xs px-2.5 py-1 rounded-md border transition-all duration-200 font-medium ${activeDriver === driver
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                                            }`}
                                    >
                                        #{driver}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
