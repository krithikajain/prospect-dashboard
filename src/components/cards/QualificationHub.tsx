import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Target, Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { DashboardData } from '@/types/dashboard';
import { GlassCard } from '@/components/ui/glass-card';

interface QualificationHubProps {
    data: DashboardData;
}

export const QualificationHub: React.FC<QualificationHubProps> = ({ data }) => {
    const { qualification_framework } = data;
    const [expandedStep, setExpandedStep] = useState<string | null>(null);

    const toggleStep = (name: string) => {
        setExpandedStep(expandedStep === name ? null : name);
    };

    return (
        <GlassCard className="col-span-1 lg:col-span-4" noPadding>
            <div className="p-6 pb-2">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-50 rounded-xl">
                            <Target className="h-5 w-5 text-pink-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">{qualification_framework.name}</h2>
                    </div>
                    <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-500 to-orange-400 w-3/4" />
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6 space-y-3">
                {qualification_framework.criteria.map((item, index) => {
                    const isExpanded = expandedStep === item.name;
                    return (
                        <div
                            key={index}
                            className={`rounded-2xl transition-all duration-300 border ${isExpanded
                                    ? 'bg-white border-pink-200 shadow-sm'
                                    : 'bg-white/40 border-slate-100 hover:bg-white/60'
                                }`}
                        >
                            <div
                                className="p-4 flex items-center justify-between cursor-pointer"
                                onClick={() => toggleStep(item.name)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`
                                        h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold
                                        ${item.status === 'Met' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}
                                    `}>
                                        {item.status === 'Met' ? <Check className="h-4 w-4" /> : item.name[0]}
                                    </div>
                                    <span className="font-bold text-slate-800">{item.name}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Badge variant="secondary" className={`
                                        rounded-lg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider
                                        ${item.status === 'Met' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-50 text-slate-500 border-slate-100'}
                                    `}>
                                        {item.status}
                                    </Badge>
                                    {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="px-14 pb-4 animate-in fade-in slide-in-from-top-1">
                                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/80 p-3 rounded-xl">
                                        {item.notes}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </GlassCard>
    );
};
