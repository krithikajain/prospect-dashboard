import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Plus, StickyNote, X, Check, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface StickyNotesCardProps {
    onAddNote?: () => void;
    className?: string;
}

const TAG_OPTIONS = [
    { label: "Personal", color: "bg-slate-500/10 border-slate-500/20 text-slate-300" },
    { label: "Blocker", color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300" },
    { label: "Next Step", color: "bg-violet-500/10 border-violet-500/20 text-violet-300" },
];

// Mock notes data for visualization since data model didn't explicitly have a store for arbitrary notes yet
const MOCK_NOTES = [
    { id: 1, content: "Mentioned he's an avid golfer. Use that for intro.", tag: "Personal", color: "bg-slate-500/10 border-slate-500/20 text-slate-300" },
    { id: 3, content: "Follow up with legal on Tuesday.", tag: "Next Step", color: "bg-violet-500/10 border-violet-500/20 text-violet-300" },
];

export function StickyNotesCard({ className }: StickyNotesCardProps) {
    const [notes, setNotes] = useState(MOCK_NOTES);
    const [isAdding, setIsAdding] = useState(false);
    const [newNoteContent, setNewNoteContent] = useState("");
    const [selectedTag, setSelectedTag] = useState(TAG_OPTIONS[0]);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isAdding && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAdding]);

    const handleSaveNote = () => {
        if (!newNoteContent.trim()) {
            setIsAdding(false);
            return;
        }

        const newNote = {
            id: Date.now(),
            content: newNoteContent,
            tag: selectedTag.label,
            color: selectedTag.color
        };

        setNotes([newNote, ...notes]);
        setNewNoteContent("");
        setIsAdding(false);
    };

    const handleDeleteNote = (id: number) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    return (
        <GlassCard className={`p-4 ${className}`} hoverEffect>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-indigo-200">
                    <StickyNote className="h-4 w-4" />
                    <h3 className="text-xs font-extra-bold uppercase tracking-wide text-white">My Notes</h3>
                </div>
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 rounded-full hover:bg-white/10 -mr-1"
                    onClick={() => setIsAdding(true)}
                >
                    <Plus className="h-3 w-3 text-slate-300" />
                </Button>
            </div>

            <div className="flex flex-col gap-2">
                <AnimatePresence initial={false}>
                    {isAdding && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: "auto", scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                            className="p-3 rounded-lg border border-indigo-500/30 bg-indigo-500/5 mb-1 overflow-hidden"
                        >
                            <div className="flex gap-2 mb-2 overflow-x-auto pb-1 no-scrollbar">
                                {TAG_OPTIONS.map(tag => (
                                    <button
                                        key={tag.label}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`text-[9px] uppercase font-bold px-2 py-1 rounded-md border transition-all whitespace-nowrap ${selectedTag.label === tag.label
                                            ? tag.color + " opacity-100 ring-1 ring-white/10"
                                            : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                            }`}
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>

                            <textarea
                                ref={inputRef}
                                className="w-full bg-transparent border-none text-xs text-slate-200 placeholder:text-slate-600 resize-none focus:outline-none font-medium leading-relaxed"
                                placeholder={`Add a ${selectedTag.label.toLowerCase()} note...`}
                                value={newNoteContent}
                                onChange={(e) => setNewNoteContent(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSaveNote();
                                    }
                                    if (e.key === 'Escape') setIsAdding(false);
                                }}
                                rows={2}
                            />
                            <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-indigo-500/20">
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="p-1 rounded-md hover:bg-slate-500/20 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                                <button
                                    onClick={handleSaveNote}
                                    className="p-1 rounded-md hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    <Check className="h-3 w-3" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {notes.map((note) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
                            layout
                            className={`group relative p-3 rounded-lg border text-xs font-medium leading-relaxed shadow-sm cursor-pointer ${note.color} transition-all duration-200 hover:border-opacity-50 pr-6`}
                        >
                            <div className="flex justify-between items-start mb-1.5">
                                <div className="opacity-60 font-bold tracking-wider uppercase text-[9px]">{note.tag}</div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteNote(note.id);
                                    }}
                                    title="Delete Note"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                            <div className="text-white font-medium">{note.content}</div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </GlassCard>
    );
}
