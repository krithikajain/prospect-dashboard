import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { DashboardData } from "@/types/dashboard";
import { Plus, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ActionEngineCardProps {
    tasks: DashboardData['action_engine']['tasks'];
    className?: string;
    onCreateTask: () => void;
}

export function ActionEngineCard({ tasks, className, onCreateTask }: ActionEngineCardProps) {
    const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
    const [showAll, setShowAll] = useState(false);

    const toggleCheck = (idx: number) => {
        const next = new Set(checkedItems);
        if (next.has(idx)) next.delete(idx);
        else next.add(idx);
        setCheckedItems(next);
    };

    const doneCount = checkedItems.size;
    const totalCount = tasks.length;
    const fraction = totalCount > 0 ? doneCount / totalCount : 0;

    // Filter logic
    const displayedTasks = showAll ? tasks : tasks.slice(0, 3);
    const hiddenCount = tasks.length - displayedTasks.length;

    return (
        <GlassCard className={`p-6 flex flex-col h-full ${className}`} hoverEffect>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Action Engine</h3>
                        <p className="text-sm font-medium text-slate-200">Recommended next steps</p>
                    </div>
                </div>
                <Button size="sm" variant="outline" className="h-8 rounded-full border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 bg-transparent" onClick={onCreateTask}>
                    <Plus className="h-3 w-3 mr-1.5" />
                    Add
                </Button>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-6">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fraction * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-indigo-500 rounded-full"
                />
            </div>

            <div className="flex-grow space-y-2">
                <AnimatePresence>
                    {tasks.length === 0 ? (
                        <div className="text-center py-8 text-slate-500 italic text-sm">
                            No active tasks. Good job!
                        </div>
                    ) : (
                        displayedTasks.map((task, idx) => {
                            const isChecked = checkedItems.has(idx);
                            return (
                                <motion.div
                                    key={idx}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: isChecked ? 0.5 : 1, y: 0 }}
                                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 group ${isChecked ? 'bg-white/5 border-transparent' : 'bg-white/5 border-white/10 hover:border-indigo-500/30 hover:bg-white/10'
                                        }`}
                                >
                                    <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={() => toggleCheck(idx)}
                                        className={`rounded-md border-slate-500 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500`}
                                    />
                                    <span className={`text-sm font-medium flex-grow truncate transition-colors ${isChecked ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                        {task.title}
                                    </span>
                                    {task.priority && !isChecked && (
                                        <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-5 font-normal ${task.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-700 text-slate-400'
                                            }`}>
                                            {task.priority}
                                        </Badge>
                                    )}
                                </motion.div>
                            );
                        })
                    )}
                </AnimatePresence>
            </div>

            {tasks.length > 3 && (
                <div className="mt-4 text-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-slate-400 hover:text-indigo-300 h-8 hover:bg-white/5"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : `View All (${hiddenCount} more)`}
                    </Button>
                </div>
            )}
        </GlassCard>
    );
}
