import React from 'react';
import type { DashboardData } from '@/types/dashboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Calendar, CheckSquare, MessageSquare, Linkedin,
    Briefcase, Building2, User, Search, Bell
} from 'lucide-react';

interface StageDashboardShellProps {
    data: DashboardData;
    children: React.ReactNode;
    onAddNote: () => void;
    onCreateTask: () => void;
    onSendInvite: () => void;
}

export const StageDashboardShell: React.FC<StageDashboardShellProps> = ({
    data,
    children,
    onAddNote,
    onCreateTask,
    onSendInvite
}) => {
    const { identity, deal_strength } = data;

    // Map rating string to color
    const strengthColor =
        deal_strength.rating === 'High' ? 'bg-green-100/50 text-green-700' :
            (deal_strength.rating === 'Medium' || deal_strength.rating === 'Moderate') ? 'bg-yellow-100/50 text-yellow-700' :
                'bg-red-100/50 text-red-700';

    return (
        <div className="min-h-screen bg-background font-sans text-foreground relative overflow-x-hidden selection:bg-accent-lavender/30">
            {/* Soft Pastel Background Blobs - MoneyLot Style */}
            <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent-lavender/20 blur-[130px] pointer-events-none animate-pulse-slow" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-sky/20 blur-[130px] pointer-events-none animate-pulse-slow delay-700" />
            <div className="fixed top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-accent-mint/15 blur-[100px] pointer-events-none animate-pulse-slow delay-1000" />

            {/* Glass Header */}
            <header className="sticky top-0 z-40 w-full">
                <div className="container py-4 mx-auto max-w-7xl">
                    <div className="bg-white/60 backdrop-blur-xl rounded-[24px] shadow-sm border border-white/50 px-6 py-4 flex items-center justify-between">
                        {/* Search / Brand placeholder */}
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-accent-lavender">
                                Prospect<span className="font-light text-slate-800">Dash</span>
                            </h2>
                            <div className="hidden md:flex items-center bg-white/40 rounded-full px-4 py-2 border border-white/60 focus-within:border-accent-lavender/50 focus-within:ring-2 ring-accent-lavender/20 transition-all w-[320px] shadow-inner">
                                <Search className="h-4 w-4 text-slate-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search details..."
                                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 text-slate-700"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50 text-slate-500 hover:text-indigo-600 transition-colors">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-accent-lavender to-accent-sky p-[2px] shadow-sm cursor-pointer hover:shadow-md transition-all">
                                <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container py-8 mx-auto max-w-7xl relative z-10">
                {/* Identity & Context Row */}
                <div className="mb-8 p-8 bg-white/55 backdrop-blur-3xl rounded-[32px] border border-white/40 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent pointer-events-none" />

                    <div className="lg:col-span-8 flex items-center gap-8 relative z-10">
                        <div className="h-28 w-28 rounded-[36px] bg-gradient-to-br from-white to-slate-50 shadow-soft flex items-center justify-center border border-white/60 group-hover:scale-105 transition-transform duration-500">
                            <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 to-accent-lavender">
                                {identity.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{identity.name}</h1>
                                <Badge className={`rounded-full px-4 py-1.5 text-xs font-semibold border-0 ${strengthColor}`}>
                                    {deal_strength.rating} Priority
                                </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-accent-lavender" />
                                    {identity.role}
                                </div>
                                <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-accent-sky" />
                                    {identity.company}
                                </div>
                                <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                                <a href={identity.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                                    <Linkedin className="h-4 w-4 text-blue-500" />
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-4 relative z-10">
                        <Button className="w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 h-14 shadow-lg hover:shadow-xl transition-all text-base font-semibold" onClick={onCreateTask}>
                            <CheckSquare className="h-5 w-5 mr-3" />
                            Create Task
                        </Button>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="rounded-2xl border-white/60 bg-white/40 hover:bg-white text-slate-600 h-12 font-medium" onClick={onSendInvite}>
                                <Calendar className="h-4 w-4 mr-2" /> Schedule
                            </Button>
                            <Button variant="outline" className="rounded-2xl border-white/60 bg-white/40 hover:bg-white text-slate-600 h-12 font-medium" onClick={onAddNote}>
                                <MessageSquare className="h-4 w-4 mr-2" /> Add Note
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
