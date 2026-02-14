import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { Building2, Globe, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface CompanySnapshotCardProps {
    identity: DashboardData['identity'];
    className?: string;
}

export function CompanySnapshotCard({ identity, className }: CompanySnapshotCardProps) {
    // Mock data for Scale/Signals not strictly in DashboardData
    const coreOfferings = ["Enterprise LMS", "Virtual Classroom", "Learning Analytics"];
    const signals = ["10M Users", "1500+ Orgs", "Series C"];

    return (
        <GlassCard className={`p-6 flex flex-col justify-between ${className}`} hoverEffect>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-indigo-400">
                    <Building2 className="h-4 w-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wide">Company Snapshot</h3>
                </div>
                {identity.website && (
                    <a
                        href={identity.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-300 hover:text-indigo-100 flex items-center gap-1 font-medium bg-indigo-500/20 px-2 py-1 rounded-full border border-indigo-500/30"
                    >
                        <Globe className="w-3 h-3" />
                        Website
                    </a>
                )}
            </div>

            <div className="space-y-6">
                {/* Identity */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 tracking-tight">{identity.company || "Unknown Company"}</h2>
                    <p className="text-sm text-slate-400 mt-1">
                        {identity.target_customers || "Global Enterprise Learning Solutions"}
                    </p>
                </div>

                {/* Core Offerings */}
                <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Core Offerings</div>
                    <div className="flex flex-wrap gap-2">
                        {coreOfferings.map((offer, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 text-slate-300 text-xs font-medium border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                                {offer}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Scale & Growth Graph (Demo) */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1.5 text-indigo-400">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Growth Signal</span>
                        </div>
                        <span className="text-xs font-bold text-indigo-300">+124% YoY</span>
                    </div>

                    {/* Dummy Bar Graph */}
                    <div className="flex items-end gap-1.5 h-16 w-full">
                        {[0.3, 0.4, 0.35, 0.5, 0.45, 0.6, 0.55, 0.7, 0.65, 0.8, 0.75, 0.9, 0.85, 1].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h * 100}%` }}
                                transition={{ delay: i * 0.05 }}
                                className="flex-1 bg-indigo-500/40 hover:bg-indigo-400 rounded-sm transition-colors cursor-crosshair min-w-[4px]"
                            />
                        ))}
                    </div>
                </div>

                {/* Proof of Scale Signals */}
                <div className="grid grid-cols-3 gap-2">
                    {signals.map((sig, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                            <span className="text-xs font-bold text-slate-300">{sig}</span>
                        </div>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
}
