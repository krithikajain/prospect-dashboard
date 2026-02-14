import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import type { DashboardData } from "@/types/dashboard";
import { motion } from "framer-motion";

interface ProcurementStepsCardProps {
    steps: DashboardData['buying_process']['steps'];
    className?: string;
}

export function ProcurementStepsCard({ steps, className }: ProcurementStepsCardProps) {
    const displaySteps = steps || [];

    return (
        <GlassCard className={`p-6 ${className}`} hoverEffect>
            <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                </div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Buying Process</h3>
            </div>

            <div className="flex flex-wrap gap-2">
                {displaySteps.length === 0 ? (
                    <span className="text-sm text-slate-400 italic">No steps identified</span>
                ) : (
                    displaySteps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Badge
                                variant="outline"
                                className="bg-white/40 hover:bg-white/80 transition-colors border-slate-200 text-slate-600 font-normal py-1 px-3 shadow-sm hover:border-indigo-200 hover:text-indigo-600 cursor-default"
                            >
                                {step.name}
                            </Badge>
                        </motion.div>
                    ))
                )}
            </div>
        </GlassCard>
    );
}
