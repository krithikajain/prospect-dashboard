import { GlassCard } from "@/components/ui/GlassCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { DashboardData } from "@/types/dashboard";
import { AlertCircle, Clock, Target, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InsightsCardProps {
    data: DashboardData['pain_urgency'];
    className?: string;
}

export function InsightsCard({ data, className }: InsightsCardProps) {
    return (
        <GlassCard className={`p-6 flex flex-col h-full ${className}`} hoverEffect>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Strategic Insights</h3>
            </div>

            <Tabs defaultValue="pain" className="w-full flex-grow flex flex-col">
                <TabsList className="w-full grid grid-cols-3 mb-4 bg-white/5 p-1 rounded-xl">
                    <TabsTrigger value="pain" className="rounded-lg text-xs font-medium data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-300 text-slate-400">Pain Points</TabsTrigger>
                    <TabsTrigger value="timing" className="rounded-lg text-xs font-medium data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 text-slate-400">Timing</TabsTrigger>
                    <TabsTrigger value="drivers" className="rounded-lg text-xs font-medium data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-slate-400">Drivers</TabsTrigger>
                </TabsList>

                <div className="flex-grow relative min-h-[160px]">
                    <AnimatePresence mode="wait">
                        <TabsContent value="pain" className="mt-0 h-full">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3 h-full"
                            >
                                <div className="flex items-center gap-2 text-rose-400 mb-2">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase">Critical Issues</span>
                                </div>
                                {data.pain_points.length === 0 ? (
                                    <p className="text-sm text-slate-500 italic">No explicit pain points found.</p>
                                ) : (
                                    <ul className="space-y-3">
                                        {data.pain_points.map((pain, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed group">
                                                <div className="mt-1.5 min-w-[6px] h-1.5 rounded-full bg-rose-500 group-hover:scale-150 transition-transform" />
                                                <span>{pain}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="timing" className="mt-0 h-full">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3 h-full"
                            >
                                <div className="flex items-center gap-2 text-amber-500 mb-2">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase">Urgency Signals</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.timing_insights.length === 0 ? (
                                        <p className="text-sm text-slate-500 italic">No timing signals identified.</p>
                                    ) : (
                                        data.timing_insights.map((insight, i) => (
                                            <Badge key={i} variant="secondary" className="bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20 transition-colors">
                                                {insight}
                                            </Badge>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="drivers" className="mt-0 h-full">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3 h-full"
                            >
                                <div className="flex items-center gap-2 text-indigo-400 mb-2">
                                    <Target className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase">Why They Buy</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {data.decision_drivers.length === 0 ? (
                                        <p className="text-sm text-slate-500 italic">Decision drivers unknown.</p>
                                    ) : (
                                        data.decision_drivers.map((driver, i) => (
                                            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-colors cursor-default group">
                                                <ArrowRight className="w-3 h-3 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                                <span className="text-sm text-slate-300 font-medium">{driver}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        </TabsContent>
                    </AnimatePresence>
                </div>
            </Tabs>
        </GlassCard>
    );
}
