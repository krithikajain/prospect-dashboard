import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, User, Shield, Zap } from 'lucide-react';
import type { DashboardData } from '@/types/dashboard';
import { GlassCard } from '@/components/ui/glass-card';

interface StakeholderMapProps {
    data: DashboardData;
}

export const StakeholderMap: React.FC<StakeholderMapProps> = ({ data }) => {
    const { stakeholders } = data;

    // Helper to get initials
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Helper for role badge icon
    const getRoleIcon = (role: string) => {
        if (role.includes('Champion')) return <Zap className="h-3 w-3 mr-1" />;
        if (role.includes('Blocker')) return <Shield className="h-3 w-3 mr-1" />;
        return <User className="h-3 w-3 mr-1" />;
    };

    // Helper for role badge color
    const getRoleColor = (role: string) => {
        if (role.includes('Champion')) return 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200';
        if (role.includes('Decision')) return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200';
        if (role.includes('Blocker')) return 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200';
        return 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
    };

    return (
        <GlassCard className="col-span-1 lg:col-span-4 min-h-[400px] flex flex-col" noPadding>
            <div className="p-6 pb-0 mb-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-xl">
                            <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Stakeholders</h2>
                    </div>
                    <Badge variant="outline" className="rounded-full bg-white text-slate-500 border-slate-200">
                        {stakeholders.length} Active
                    </Badge>
                </div>
            </div>

            <ScrollArea className="flex-1 px-6 pb-6">
                <div className="space-y-4">
                    {stakeholders.map((person) => (
                        <div key={person.name} className="flex items-start gap-4 p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 hover:shadow-sm transition-all group">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                <AvatarImage src={person.avatar} />
                                <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 font-bold">
                                    {getInitials(person.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-sm font-bold text-slate-900 truncate pr-2 group-hover:text-indigo-700 transition-colors">{person.name}</h4>
                                    <Badge variant="secondary" className={`rounded-full px-2 py-0.5 text-[10px] font-medium border ${getRoleColor(person.role)} shadow-none`}>
                                        {getRoleIcon(person.role)}
                                        {person.role.split(' ')[0]}
                                    </Badge>
                                </div>
                                <p className="text-xs text-slate-500 font-medium mb-2">{person.title}</p>
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                                            style={{ width: `${person.influence === 'High' ? 90 : person.influence === 'Medium' ? 60 : 30}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium">{person.influence} Inf</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="p-4 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-500 cursor-pointer transition-all">
                        + Add Stakeholder
                    </div>
                </div>
            </ScrollArea>
        </GlassCard>
    );
};
