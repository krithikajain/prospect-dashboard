import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { AlertCircle, Clock, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InsightsCardProps {
    data: DashboardData["pain_urgency"];
    className?: string;
}

export function InsightsCard({ data, className }: InsightsCardProps) {
    return (
        <GlassCard className={`p-6 flex flex-col h-full ${className}`} hoverEffect>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                    Strategic Insights
                </h3>
            </div>

            {/* Tabs for Strategic Areas */}
            <Tabs defaultValue="pain" className="w-full flex flex-col flex-1">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 mb-4 h-9 p-1">
                    <TabsTrigger
                        value="pain"
                        className="text-xs data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-300 text-slate-400 hover:text-slate-200"
                    >
                        Pain
                    </TabsTrigger>
                    <TabsTrigger
                        value="timing"
                        className="text-xs data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 text-slate-400 hover:text-slate-200"
                    >
                        Timing
                    </TabsTrigger>
                    <TabsTrigger
                        value="drivers"
                        className="text-xs data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-slate-400 hover:text-slate-200"
                    >
                        Drivers
                    </TabsTrigger>
                </TabsList>

                {/* CONTENT: Pain Points */}
                <TabsContent value="pain" className="flex-1 outline-none mt-0">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-rose-400 mb-1">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Pain Points</span>
                        </div>
                        {data.pain_points.length === 0 ? (
                            <p className="text-sm text-slate-500 italic">No explicit pain points found.</p>
                        ) : (
                            <ul className="space-y-3">
                                {data.pain_points.slice(0, 4).map((pain, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                                        <div className="mt-1.5 min-w-[6px] h-1.5 rounded-full bg-rose-500/50" />
                                        <span>{pain}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </TabsContent>

                {/* CONTENT: Timing */}
                <TabsContent value="timing" className="flex-1 outline-none mt-0">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-amber-400 mb-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Timing Signals</span>
                        </div>
                        {data.timing_insights.length === 0 ? (
                            <p className="text-sm text-slate-500 italic">No timing signals identified.</p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {data.timing_insights.slice(0, 8).map((insight, i) => (
                                    <Badge
                                        key={i}
                                        variant="secondary"
                                        className="bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                                    >
                                        {insight}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* CONTENT: Drivers */}
                <TabsContent value="drivers" className="flex-1 outline-none mt-0">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-indigo-400 mb-1">
                            <Target className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Decision Drivers</span>
                        </div>
                        {data.decision_drivers.length === 0 ? (
                            <p className="text-sm text-slate-500 italic">Decision drivers unknown.</p>
                        ) : (
                            <ul className="space-y-2">
                                {data.decision_drivers.slice(0, 5).map((driver, i) => (
                                    <li
                                        key={i}
                                        className="text-sm text-slate-300 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
                                    >
                                        {driver}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </GlassCard>
    );
}
