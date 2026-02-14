import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { motion } from "framer-motion";
import { Mail, Linkedin, Building2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProfileCardProps {
    identity: DashboardData['identity'];
    className?: string;
}

export function ProfileCard({ identity, className }: ProfileCardProps) {
    // Defensive check
    if (!identity) return null;

    const name = identity.name || "Unknown";
    const linkedInUrl = identity.linkedin || "https://www.linkedin.com/login";

    // Initials logic
    const names = name.split(' ');
    const initials = names.length >= 2
        ? `${names[0][0]}${names[names.length - 1][0]}`
        : name.slice(0, 2);

    return (
        <GlassCard
            className={`flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group ${className}`}
            hoverEffect={true}
            variant="cyber"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-indigo-500/30 transition-colors duration-500" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center gap-6 w-full">
                {/* Avatar */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="relative"
                >
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-4 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
                        <span className="text-3xl font-bold text-white tracking-widest drop-shadow-md">
                            {initials}
                        </span>
                    </div>
                    {/* Status Dot */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center">
                        <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
                    </div>
                </motion.div>

                {/* Text Info */}
                <div className="space-y-1">
                    <motion.h2
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="text-3xl font-bold text-white tracking-tight"
                    >
                        {name}
                    </motion.h2>

                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="flex flex-col items-center gap-1"
                    >
                        <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">
                            {identity.role}
                        </span>

                        {identity.company && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 mt-2">
                                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                                <span className="text-xs font-semibold text-slate-200">
                                    {identity.company}
                                </span>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Social Actions */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="flex items-center gap-3 mt-2"
                >
                    <TooltipProvider delayDuration={0}>
                        {identity.email && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href={`mailto:${identity.email}`}
                                        className="p-3 rounded-xl bg-white/5 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 hover:border-white/20 transition-all duration-200 group/btn"
                                    >
                                        <Mail className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="text-xs font-semibold">
                                    Email
                                </TooltipContent>
                            </Tooltip>
                        )}

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a
                                    href={linkedInUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 rounded-xl bg-[#0077b5]/10 hover:bg-[#0077b5] text-[#0077b5] hover:text-white border border-[#0077b5]/20 hover:border-transparent transition-all duration-200 group/btn"
                                >
                                    <Linkedin className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-xs font-semibold">
                                LinkedIn
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </motion.div>
            </div>

            {/* Decorative Cyber Lines */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </GlassCard>
    );
}
