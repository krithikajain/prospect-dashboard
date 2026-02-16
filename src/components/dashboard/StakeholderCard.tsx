import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { Users, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
            <div className="flex items-center justify-between mb-4 pl-1 pr-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        <Users className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide text-glow">Key Stakeholders</h3>
                        <p className="text-[11px] text-slate-300">Decision Makers</p>
                    </div>
                </div>
                <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
                    {stakeholders.length}
                </Badge>
            </div>

            <div className="space-y-3">
                {sorted.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden shrink-0">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`}
                                alt={s.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-slate-100 truncate group-hover:text-white transition-colors">
                                    {s.name}
                                </h4>
                                {s.influence === 'High' && (
                                    <Shield className="w-3 h-3 text-amber-400 shrink-0" />
                                )}
                            </div>
                            <p className="text-xs text-slate-300 truncate">{s.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </GlassCard>
    );
}
