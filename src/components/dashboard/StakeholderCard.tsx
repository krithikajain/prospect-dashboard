import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { Users, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface StakeholderCardProps {
    stakeholders: DashboardData['stakeholders'];
    className?: string;
}

export function StakeholderCard({ stakeholders, className }: StakeholderCardProps) {
    const decisionMakers = stakeholders.filter(s => s.influence === 'High');
    const influencers = stakeholders.filter(s => s.influence !== 'High');

    return (
        <GlassCard className={`p-6 flex flex-col h-full ${className}`} hoverEffect>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-indigo-400">
                    <Users className="h-4 w-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wide">Stakeholder Map</h3>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 hover:text-indigo-300">
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            <Tabs defaultValue="dm" className="flex-grow flex flex-col">
                <TabsList className="w-full grid grid-cols-2 mb-4 bg-white/5 data-[state=active]:bg-white/10">
                    <TabsTrigger value="dm" className="text-xs data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-slate-400">Decision Makers</TabsTrigger>
                    <TabsTrigger value="inf" className="text-xs data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 text-slate-400">Influencers</TabsTrigger>
                </TabsList>

                <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <TabsContent value="dm" className="mt-0 space-y-2">
                        {decisionMakers.length === 0 ? (
                            <div className="text-center py-4 text-xs text-slate-500 italic">None identified.</div>
                        ) : (
                            decisionMakers.map((person, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-indigo-500/20">
                                    <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 font-bold text-xs ring-1 ring-indigo-500/30">
                                        {person.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-slate-200 truncate">{person.name}</div>
                                        <div className="text-xs text-slate-400 truncate">{person.role}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="inf" className="mt-0 space-y-2">
                        {influencers.length === 0 ? (
                            <div className="text-center py-4 text-xs text-slate-500 italic">None identified.</div>
                        ) : (
                            influencers.map((person, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-purple-500/20">
                                    <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-xs ring-1 ring-purple-500/30">
                                        {person.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-slate-200 truncate">{person.name}</div>
                                        <div className="text-xs text-slate-400 truncate">{person.role}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </TabsContent>
                </div>
            </Tabs>
        </GlassCard>
    );
}
