import { GlassCard } from "@/components/ui/GlassCard";
import type { DashboardData } from "@/types/dashboard";
import { Mail, Linkedin, Globe } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfileCardProps {
    identity: DashboardData["identity"];
    industry?: string;
    website?: string;
    className?: string;
}

export function ProfileCard({
    identity,
    industry,
    website,
    className,
}: ProfileCardProps) {
    if (!identity) return null;

    const name = identity.name || "Unknown";
    const linkedInUrl = identity.linkedin || "https://www.linkedin.com/login";

    return (
        <GlassCard
            className={`relative overflow-hidden flex flex-col items-center justify-center text-center 
      min-h-[420px] px-10 py-12 ${className}`}
            hoverEffect
        >
            {/* Subtle Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-purple-500/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-30%] right-[-20%] w-[80%] h-[80%] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">

                {/* Name */}
                <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                    {name}
                </h1>

                {/* Role Subtitle */}
                <p className="text-lg md:text-xl text-slate-300 font-medium tracking-wide">
                    {identity.role}
                </p>
                {/* Industry (replaced Company) */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {industry ? (
                        <span className="text-[11px] uppercase font-bold text-slate-200 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                            {industry}
                        </span>
                    ) : null}
                </div>



                {/* Social Icons */}
                <TooltipProvider delayDuration={0}>
                    <div className="flex items-center gap-4 pt-6">
                        {identity.email && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href={`mailto:${identity.email}`}
                                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all duration-300 hover:scale-110"
                                    >
                                        <Mail className="w-5 h-5" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>Email</TooltipContent>
                            </Tooltip>
                        )}

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a
                                    href={linkedInUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 rounded-full bg-[#0077b5]/10 hover:bg-[#0077b5] text-[#0077b5] hover:text-white border border-[#0077b5]/20 transition-all duration-300 hover:scale-110"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent>LinkedIn</TooltipContent>
                        </Tooltip>

                        {website && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href={website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-3 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/20 transition-all duration-300 hover:scale-110"
                                    >
                                        <Globe className="w-5 h-5" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>Website</TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </TooltipProvider>
            </div>
        </GlassCard>
    );
}
