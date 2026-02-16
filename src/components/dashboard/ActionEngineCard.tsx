import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { DashboardData } from "@/types/dashboard";
import { Plus, Zap, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface ActionEngineCardProps {
    tasks: DashboardData['action_engine']['tasks'];
    className?: string;
    onAddTask: (title: string) => void;
}

const truncateWords = (str: string, num: number) => {
    const words = str.split(/\s+/);
    if (words.length <= num) return str;
    return words.slice(0, num).join(' ') + '...';
};

// Simulated enrichment to get bullets from text
const enrichTask = (task: { title: string; priority?: string }) => {
    // Extract real bullets from text by splitting sentences
    const rawBullets = task.title.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    const bullets = rawBullets.length > 0 ? rawBullets : [task.title];

    return {
        ...task,
        bullets
    };
};

export function ActionEngineCard({ tasks, className, onAddTask }: ActionEngineCardProps) {
    const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    // Add Mode State
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isAdding && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAdding]);

    const toggleCheck = (idx: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const next = new Set(checkedItems);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        setCheckedItems(next);
    };

    const toggleExpand = (idx: number) => {
        setExpandedItem(expandedItem === idx ? null : idx);
    };

    const handleCopy = (e: React.MouseEvent, idx: number) => {
        e.stopPropagation();
        setCopiedId(idx);
        setTimeout(() => setCopiedId(null), 2000);
        // In real app: navigator.clipboard.writeText(...)
    };

    const handleSubmitTask = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (newTaskTitle.trim()) {
            onAddTask(newTaskTitle);
            setNewTaskTitle("");
            setIsAdding(false);
        }
    };

    // Filter logic
    const displayedTasks = showAll ? tasks : tasks.slice(0, 3);
    const hiddenCount = tasks.length - displayedTasks.length;

    return (
        <GlassCard className={`p-4 flex flex-col h-full ${className}`} hoverEffect>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <Zap className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide text-glow">
                            Recommended Plays
                        </h3>
                    </div>
                </div>
                <Button
                    size="sm"
                    variant="ghost"
                    className={`h-6 w-6 p-0 rounded-full hover:bg-white/10 ${isAdding ? 'text-white bg-white/10' : 'text-slate-300'}`}
                    onClick={() => setIsAdding(!isAdding)}
                >
                    <Plus className={`h-4 w-4 transition-transform duration-200 ${isAdding ? 'rotate-45' : ''}`} />
                </Button>
            </div>

            <div className="flex-grow space-y-2">
                {/* Add Task Input Row */}
                <AnimatePresence>
                    {isAdding && (
                        <motion.form
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: "auto", marginBottom: 8 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            onSubmit={handleSubmitTask}
                            className="overflow-hidden"
                        >
                            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-emerald-500/30">
                                <Input
                                    ref={inputRef}
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    placeholder="Enter new play..."
                                    className="h-8 border-none bg-transparent focus-visible:ring-0 text-sm text-white placeholder:text-slate-500"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') setIsAdding(false);
                                    }}
                                />
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="h-7 px-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg"
                                >
                                    Add
                                </Button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                    {displayedTasks.map((rawTask, idx) => {
                        const task = enrichTask(rawTask);
                        const isChecked = checkedItems.has(idx);
                        const isExpanded = expandedItem === idx;

                        return (
                            <motion.div
                                key={idx} // Note: Using index as key is not ideal for dynamic lists, but keeping for simplicity with current data structure
                                layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: isChecked ? 0.5 : 1, y: 0 }}
                                className={`rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer group
                                    ${isChecked ? 'bg-white/5 border-transparent' : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.05]'}
                                `}
                                onClick={() => toggleExpand(idx)}
                            >
                                {/* Compact Row */}
                                <div className="flex items-center gap-3 p-3">
                                    <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={() => { }}
                                        onClick={(e) => toggleCheck(idx, e)}
                                        className="rounded-md border-slate-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className={`text-sm font-semibold truncate transition-colors ${isChecked ? 'text-slate-400 line-through' : 'text-white'}`}>
                                                {isExpanded ? task.title : truncateWords(task.title, 4)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-slate-500 shrink-0">
                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </div>
                                </div>

                                {/* Expanded Detail View */}
                                <AnimatePresence>
                                    {isExpanded && !isChecked && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-3 pb-3 pt-0 pl-10"
                                        >
                                            <div className="pt-2 border-t border-white/5 flex items-start justify-between gap-4">
                                                <div className="space-y-1">
                                                    {task.bullets.map((bullet, i) => (
                                                        <p key={i} className="text-xs text-slate-300 font-medium leading-relaxed">
                                                            • {bullet}
                                                        </p>
                                                    ))}
                                                </div>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-7 w-7 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 shrink-0"
                                                    onClick={(e) => handleCopy(e, idx)}
                                                >
                                                    {copiedId === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {hiddenCount > 0 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="w-full py-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1"
                    >
                        {showAll ? (
                            <>Show Less <ChevronUp className="w-3 h-3" /></>
                        ) : (
                            <>+{hiddenCount} More Recommended Plays <ChevronDown className="w-3 h-3" /></>
                        )}
                    </button>
                )}
            </div>
        </GlassCard>
    );
}
