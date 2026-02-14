import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";

interface CompanySnapshotCardProps {
    identity: DashboardData['identity'];
    className?: string;
}

export function CompanySnapshotCard({ className }: CompanySnapshotCardProps) {
    // Mock data for Scale/Signals not strictly in DashboardData
    const scaleMetrics = [
        { label: "Active Users", value: "10M+", suffix: "Users" },
        { label: "Organizations", value: "1,500+", suffix: "Orgs" },
        { label: "Funding Status", value: "Series C", suffix: "$120M" },
    ];

    return (
        <GlassCard className={`p-6 flex flex-col justify-between ${className}`} hoverEffect>
            <div className="flex items-center gap-2 text-indigo-400 mb-6">
                <Building2 className="h-4 w-4" />
                <h3 className="text-sm font-bold uppercase tracking-wide">Scale & Impact</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 h-full">
                {scaleMetrics.map((metric, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                    >
                        <span className="text-[10px] font-bold text-slate-500 uppercase mb-1">{metric.label}</span>
                        <div className="text-3xl font-bold text-slate-100 tracking-tight">{metric.value}</div>
                        <div className="text-xs text-indigo-400 font-medium mt-1">{metric.suffix}</div>
                    </motion.div>
                ))}
            </div>
        </GlassCard>
    );
}
