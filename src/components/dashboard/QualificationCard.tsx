import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import type { DashboardData } from "@/types/dashboard";
import { TrendingUp } from "lucide-react";

interface QualificationCardProps {
    dealStrength: DashboardData['deal_strength'];
    budget: DashboardData['budget'];
    className?: string;
}

export function QualificationCard({ dealStrength, budget, className }: QualificationCardProps) {
    const strengthRating = dealStrength.rating || "Unknown";

    // Determine colors based on rating
    let strengthColor = "bg-slate-100 text-slate-700";
    if (strengthRating.toLowerCase().includes("high")) strengthColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (strengthRating.toLowerCase().includes("medium")) strengthColor = "bg-amber-100 text-amber-800 border-amber-200";
    if (strengthRating.toLowerCase().includes("low")) strengthColor = "bg-rose-100 text-rose-800 border-rose-200";

    // Budget signal
    let budgetColor = "bg-slate-100 text-slate-600";
    if (budget.status === "Likely") budgetColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (budget.status === "Unclear") budgetColor = "bg-amber-50 text-amber-700 border-amber-100";

    return (
        <GlassCard className={`p-6 relative overflow-hidden group ${className}`} hoverEffect>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/10 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Qualification Snapshot</h3>
                        <div className="flex items-center gap-2">
                            <Badge className={`text-sm px-3 py-1 border ${strengthColor} rounded-full font-semibold shadow-sm`}>
                                {strengthRating} Priority
                            </Badge>
                            <Badge variant="outline" className={`text-xs px-2 py-0.5 ${budgetColor} border rounded-full`}>
                                Budget: {budget.status}
                            </Badge>
                        </div>
                    </div>

                    {/* Visual Score Circle (simplified) */}
                    <div className="h-12 w-12 rounded-full border-4 border-slate-100 border-t-indigo-500 flex items-center justify-center bg-white/50 shadow-sm">
                        <TrendingUp className="h-5 w-5 text-indigo-600" />
                    </div>
                </div>

                {/* Mini Bars / Signals */}
                <div className="space-y-3 mt-2">
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-slate-500">
                            <span>Authority</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full w-[80%]" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-slate-500">
                            <span>Pain Points</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full w-[60%]" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-slate-500">
                            <span>Procurement Process</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-400 rounded-full w-[40%]" />
                        </div>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
