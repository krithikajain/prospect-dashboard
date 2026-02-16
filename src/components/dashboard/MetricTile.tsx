import { GlassCard } from "@/components/ui/GlassCard";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MetricTileProps {
    label: string;
    value: string;
    subValue?: string;
    icon?: LucideIcon;
    trend?: "up" | "down" | "neutral";
    delay?: number;
    className?: string;
}

export function MetricTile({ label, value, subValue, icon: Icon, trend, delay = 0, className }: MetricTileProps) {
    return (
        <GlassCard
            className={`flex flex-col justify-between p-5 ${className}`}
            hoverEffect={true}
            variant="default"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay, duration: 0.4 }}
                className="h-full flex flex-col justify-between"
            >
                <div className="flex justify-between items-start">
                    <span className="text-[11px] font-extrabold text-slate-100 uppercase tracking-wider">{label}</span>
                    {Icon && <Icon className="w-4 h-4 text-indigo-300" />}
                </div>

                <div className="mt-2">
                    <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
                    {subValue && (
                        <div className="flex items-center gap-2 mt-1">
                            <div className="text-xs text-slate-200 font-semibold">{subValue}</div>
                            {trend === 'up' && <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">↑</span>}
                        </div>
                    )}
                </div>
            </motion.div>
        </GlassCard>
    );
}
