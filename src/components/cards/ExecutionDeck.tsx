import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import type { DashboardData } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/glass-card';

interface ExecutionDeckProps {
    data: DashboardData;
}

export const ExecutionDeck: React.FC<ExecutionDeckProps> = ({ data }) => {
    const { buying_process, risk_analysis } = data;
    const [activeTab, setActiveTab] = useState('process');

    const totalSteps = buying_process.steps.length;
    const completedSteps = buying_process.steps.filter(s => s.status === 'Completed').length;
    const progress = Math.round((completedSteps / totalSteps) * 100);

    return (
        <GlassCard className="col-span-1 lg:col-span-8 flex flex-col h-full min-h-[500px]" noPadding>
            <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-xl">
                            <TrendingUp className="h-5 w-5 text-indigo-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Execution Deck</h2>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                        <TabsList className="bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
                            <TabsTrigger
                                value="process"
                                className="rounded-full px-4 py-1.5 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all"
                            >
                                Buying Process
                            </TabsTrigger>
                            <TabsTrigger
                                value="risks"
                                className="rounded-full px-4 py-1.5 text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all"
                            >
                                Drivers & Risks
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pt-2 custom-scrollbar">
                <Tabs value={activeTab} className="h-full">
                    <TabsContent value="process" className="h-full mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Progress Header */}
                        <div className="mb-8 bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100/50">
                            <div className="flex justify-between items-end mb-3">
                                <div>
                                    <span className="text-sm font-semibold text-indigo-900 block mb-1">Deal Momentum</span>
                                    <div className="text-3xl font-bold text-indigo-600">{progress}%</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-medium text-indigo-400 bg-white px-2 py-1 rounded-lg border border-indigo-100">
                                        {completedSteps} of {totalSteps} Steps Complete
                                    </span>
                                </div>
                            </div>
                            <Progress value={progress} className="h-2.5 bg-indigo-100" indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-500" />
                        </div>

                        {/* Timeline Steps */}
                        <div className="relative pl-8 border-l-2 border-slate-100 space-y-8">
                            {buying_process.steps.map((step, index) => {
                                const isCompleted = step.status === 'Completed';
                                const isCurrent = step.status === 'In Progress';

                                return (
                                    <div key={index} className="relative group">
                                        <div className={cn(
                                            "absolute -left-[39px] top-1 h-6 w-6 rounded-full border-4 flex items-center justify-center transition-all bg-white z-10",
                                            isCompleted ? "border-indigo-500 text-indigo-600" :
                                                isCurrent ? "border-indigo-500 ring-4 ring-indigo-50 animate-pulse" :
                                                    "border-slate-200 text-slate-300"
                                        )}>
                                            {isCompleted && <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />}
                                            {isCurrent && <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />}
                                        </div>

                                        <div className={cn(
                                            "p-4 rounded-2xl border transition-all duration-300",
                                            isCurrent ? "bg-white border-indigo-200 shadow-md translate-x-2" :
                                                isCompleted ? "bg-slate-50/50 border-slate-100 opacity-80 decoration-slate-400" :
                                                    "bg-white border-slate-100 opacity-60"
                                        )}>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className={cn("font-bold text-base", isCompleted ? "text-slate-500 line-through" : "text-slate-900")}>
                                                    {step.name}
                                                </h4>
                                                {step.date && <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-md">{step.date}</span>}
                                            </div>
                                            {isCurrent && (
                                                <div className="mt-3 flex gap-2">
                                                    <Button size="sm" className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm">
                                                        Mark Complete
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </TabsContent>

                    <TabsContent value="risks" className="h-full mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                            {/* Key Drivers */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-1">Key Drivers</h3>
                                {buying_process.key_drivers.map((driver, i) => (
                                    <div key={i} className="bg-green-50/50 p-4 rounded-2xl border border-green-100/50 flex gap-3 items-start group hover:bg-green-50 transition-colors">
                                        <div className="mt-0.5 bg-green-100 text-green-600 p-1.5 rounded-lg">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">{driver}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Risks */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-1">Identified Risks</h3>
                                {risk_analysis.risks.map((risk, i) => (
                                    <div key={i} className="bg-red-50/50 p-4 rounded-2xl border border-red-100/50 flex gap-3 items-start group hover:bg-red-50 transition-colors">
                                        <div className="mt-0.5 bg-red-100 text-red-600 p-1.5 rounded-lg">
                                            <AlertTriangle className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold text-red-700 uppercase">{risk.severity} Risk</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">{risk.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </GlassCard>
    );
};
