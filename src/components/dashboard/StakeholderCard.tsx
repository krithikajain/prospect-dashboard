import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { Users, Shield } from "lucide-react";
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
        <GlassCard className={`p-4 flex flex-col ${className}`} hoverEffect>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-white">
                    <Users className="w-4 h-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wide">Stakeholders</h3>
                </div>
                <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
                    {stakeholders.length}
                </Badge>
            </div>

            <div className="flex overflow-x-auto gap-3 pb-2 -mx-1 px-1 custom-scrollbar">
                {sorted.map((s, i) => (
                    <div
                        key={i}
                        className="group flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all min-w-[200px] shrink-0"
                    >
                        {/* Avatar */}
                        <div className="h-8 w-8 shrink-0 rounded-full overflow-hidden border border-white/10 bg-slate-700">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`}
                                alt={s.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-white truncate">
                                    {s.name}
                                </p>
                                {s.influence === 'High' && (
                                    <Shield className="w-3 h-3 text-amber-400 shrink-0" />
                                )}
                            </div>
                            <p className="text-[10px] text-slate-200 font-medium truncate">{s.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    );
}
