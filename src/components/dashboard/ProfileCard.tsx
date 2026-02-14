import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { Mail, Linkedin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Globe } from "lucide-react";

interface ProfileCardProps {
    identity: DashboardData['identity'];
    industry?: string;
    website?: string;
    className?: string;
}

export function ProfileCard({ identity, industry, website, className }: ProfileCardProps) {
    // Defensive check
    if (!identity) return null;

    const name = identity.name || "Unknown";
    const linkedInUrl = identity.linkedin || "https://www.linkedin.com/login";

    return (
        <GlassCard
            className={`relative overflow-hidden flex flex-col items-center ${className}`}
            hoverEffect={true}
        >
            {/* Cover Image */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-50">
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
            </div>

            {/* Avatar - Overlapping Cover */}
            <div className="relative mt-8 mb-3 z-10">
                <div className="h-24 w-24 rounded-full p-1 bg-slate-950 ring-4 ring-slate-900/50 shadow-xl">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256"
                        alt={name}
                        className="h-full w-full rounded-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-slate-950 rounded-full z-20" />
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col items-center text-center pb-6 z-10 w-full px-4">
                <h2 className="text-xl font-bold text-white tracking-tight leading-tight">{name}</h2>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">{identity.role}</div>

                {/* Company & Industry */}
                <div className="flex items-center gap-2 mt-2 mb-4">
                    <span className="text-xs font-bold text-slate-300 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                        {identity.company}
                    </span>
                    {industry && (
                        <span className="text-xs font-bold text-slate-300 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                            {industry}
                        </span>
                    )}
                </div>

                {/* Social / Connect Actions */}
                <div className="flex items-center gap-3 justify-center">
                    <TooltipProvider delayDuration={0}>
                        {identity.email && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href={`mailto:${identity.email}`}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 hover:border-white/20 transition-all duration-200"
                                    >
                                        <Mail className="w-4 h-4" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="text-xs font-semibold">Email</TooltipContent>
                            </Tooltip>
                        )}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a
                                    href={linkedInUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5] text-[#0077b5] hover:text-white border border-[#0077b5]/20 hover:border-transparent transition-all duration-200"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-xs font-semibold">LinkedIn</TooltipContent>
                        </Tooltip>

                        {/* Website Button */}
                        {website && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/20 hover:border-transparent transition-all duration-200"
                                    >
                                        <Globe className="w-4 h-4" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="text-xs font-semibold">Website</TooltipContent>
                            </Tooltip>
                        )}

                    </TooltipProvider>
                </div>
            </div>
        </GlassCard>
    );
}
