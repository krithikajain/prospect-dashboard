import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Plus, StickyNote } from "lucide-react";
import { motion } from "framer-motion";

interface StickyNotesCardProps {
    onAddNote: () => void;
    className?: string;
}

// Mock notes data for visualization since data model didn't explicitly have a store for arbitrary notes yet
const MOCK_NOTES = [
    { id: 1, content: "Mentioned he's an avid golfer. Use that for intro.", tag: "Personal", color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-200" },
    { id: 2, content: "Concerned about integration timeline. Need to prep engineering docs.", tag: "Blocker", color: "bg-rose-500/10 border-rose-500/20 text-rose-200" },
    { id: 3, content: "Follow up with legal on Tuesday.", tag: "Next Step", color: "bg-blue-500/10 border-blue-500/20 text-blue-200" },
];

export function StickyNotesCard({ onAddNote, className }: StickyNotesCardProps) {
    return (
        <GlassCard className={`p-6 ${className}`} hoverEffect>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-400">
                    <StickyNote className="h-5 w-5" />
                    <h3 className="text-sm font-bold uppercase tracking-wide">My Notes</h3>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/10" onClick={onAddNote}>
                    <Plus className="h-4 w-4 text-slate-400" />
                </Button>
            </div>

            <div className="columns-2 gap-3 space-y-3">
                {MOCK_NOTES.map((note) => (
                    <motion.div
                        key={note.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ rotate: 1, scale: 1.02 }}
                        className={`p-3 rounded-xl border text-xs font-medium leading-relaxed break-inside-avoid shadow-sm cursor-pointer ${note.color} transition-all duration-200`}
                    >
                        <div className="opacity-80 mb-2 font-bold tracking-tight uppercase text-[10px]">{note.tag}</div>
                        {note.content}
                    </motion.div>
                ))}
            </div>
        </GlassCard>
    );
}
