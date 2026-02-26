import { Card, CardHeader } from '@/components/ui/Card';

export function ImplementationReadiness({
    level,
    notes,
}: {
    level: 'High' | 'Medium' | 'Low' | 'Unknown';
    notes: string[];
}) {
    const levelConfig = {
        High: { color: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500', width: 'w-[80%]', icon: 'check_circle' },
        Medium: { color: 'bg-amber-100 text-amber-700', bar: 'bg-amber-400', width: 'w-[50%]', icon: 'warning' },
        Low: { color: 'bg-red-100 text-red-700', bar: 'bg-red-400', width: 'w-[20%]', icon: 'cancel' },
        Unknown: { color: 'bg-slate-100 text-slate-600', bar: 'bg-slate-300', width: 'w-[10%]', icon: 'help' },
    };
    const cfg = levelConfig[level];

    return (
        <Card className="p-6 bg-white border border-gray-100 flex flex-col gap-4">
            <CardHeader icon="engineering" title="3. Implementation Readiness" />
            <p className="text-[12px] text-gray-500 font-medium mb-1 leading-relaxed italic">
                "The Capacity" — can they receive what you're selling?
            </p>

            {/* Readiness gauge */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Readiness Level</span>
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>
                        <span className="material-symbols-outlined text-[12px]">{cfg.icon}</span>
                        {level}
                    </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${cfg.bar} ${cfg.width}`} />
                </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2 mt-auto">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Readiness Signals</p>
                {notes.map((note, i) => (
                    <div key={i} className="flex items-start gap-2 py-1.5 border-b border-slate-50 last:border-0">
                        <span className="material-symbols-outlined text-[14px] text-slate-400 shrink-0 mt-0.5">info</span>
                        <p className="text-[11px] text-slate-600 font-medium leading-snug">{note}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}
