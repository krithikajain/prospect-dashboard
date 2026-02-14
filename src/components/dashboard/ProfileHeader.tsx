import type { DashboardData } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckSquare, MessageSquare, Linkedin, Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
    identity: DashboardData['identity'];
    onSendInvite: () => void;
    onAddNote: () => void;
    onCreateTask: () => void;
}

export function ProfileHeader({ identity, onSendInvite, onAddNote, onCreateTask }: ProfileHeaderProps) {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-6 z-50 mb-8 bg-white/50 backdrop-blur-xl rounded-[24px] border border-white/40 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4"
        >
            {/* Identity */}
            <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-100 to-white border border-white/60 flex items-center justify-center shadow-inner">
                    <span className="text-xl font-bold text-indigo-700">
                        {identity.name.charAt(0)}
                    </span>
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-slate-900">{identity.name}</h1>
                        <Badge variant="outline" className="bg-white/50 border-slate-200 text-slate-600 font-medium">
                            {identity.role}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                        <span className="font-medium text-slate-700">{identity.company}</span>
                        {identity.website && (
                            <a href={identity.website} target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                                <Globe className="h-3 w-3 inline mr-1" />
                                Website
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <div className="flex items-center mr-2 md:mr-6 gap-1">
                    {identity.email && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-white/50 rounded-full" onClick={() => window.open(`mailto:${identity.email}`)}>
                            <Mail className="h-4 w-4" />
                        </Button>
                    )}
                    {identity.linkedin && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#0077b5] hover:bg-white/50 rounded-full" onClick={() => window.open(identity.linkedin, '_blank')}>
                            <Linkedin className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block" />

                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-xl text-slate-600 hover:bg-white/60 hover:text-indigo-700 font-medium"
                        onClick={onSendInvite}
                    >
                        <Calendar className="h-4 w-4 mr-2" />
                        Invite
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-xl text-slate-600 hover:bg-white/60 hover:text-indigo-700 font-medium"
                        onClick={onAddNote}
                    >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Note
                    </Button>
                    <Button
                        size="sm"
                        className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all"
                        onClick={onCreateTask}
                    >
                        <CheckSquare className="h-4 w-4 mr-2" />
                        Task
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
