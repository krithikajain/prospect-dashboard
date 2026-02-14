import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { Users, Shield, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StakeholderCardProps {
    stakeholders: DashboardData['stakeholders'];
    className?: string;
}

export function StakeholderCard({ stakeholders, className }: StakeholderCardProps) {
    // Sort by influence (High first)
    const sorted = [...stakeholders].sort((a, b) => {
        if (a.influence === 'High' && b.influence !== 'High') return -1;
        if (a.influence !== 'High' && b.influence === 'High') return 1;
        return 0;
    });

    return (
        <GlassCard className={`p-6 flex flex-col h-full ${className}`} hoverEffect>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-slate-400">
                    <Users className="w-4 h-4" />
                    <h3 className="text-sm font-semibold uppercase tracking-wide">Stakeholder Map</h3>
                </div>
                <Badge variant="outline" className="text-xs border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
                    {stakeholders.length} Key Players
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar">
                {sorted.map((s, i) => (
                    <div
                        key={i}
                        className="group flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                    >
                        {/* Standard img fallback for Avatar */}
                        <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden border border-white/10 bg-slate-700">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`}
                                alt={s.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-200 truncate pr-2">
                                    {s.name}
                                </p>
                                {s.influence === 'High' && (
                                    <Shield className="w-3 h-3 text-amber-400 shrink-0" />
                                )}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <Briefcase className="w-3 h-3 text-slate-500" />
                                <p className="text-xs text-slate-400 truncate">{s.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
