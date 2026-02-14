import { FilePlus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
    onAddNote?: () => void;
    onSendInvite?: () => void;
    className?: string;
}

export function DashboardHeader({
    onAddNote = () => { },
    onSendInvite = () => { },
    className = ""
}: DashboardHeaderProps) {
    return (
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2 ${className}`}>
            {/* Left: Welcome Text */}
            <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Welcome
                </h1>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 flex-wrap">

                <Button
                    variant="outline"
                    onClick={onAddNote}
                    className="border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600"
                >
                    <FilePlus className="w-4 h-4 mr-2" />
                    Add Note
                </Button>

                <Button
                    variant="outline"
                    onClick={onSendInvite}
                    className="border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600"
                >
                    <Send className="w-4 h-4 mr-2" />
                    Send an Invite
                </Button>
            </div>
        </div>
    );
}
