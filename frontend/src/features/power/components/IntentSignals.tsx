import { Card, CardHeader } from '@/shared/components/Card';
import { StatusTag } from '@/shared/components/StatusTag';

export function IntentSignals() {
    return (
        <Card className="p-6 h-full flex flex-col group hover:shadow-lg transition-all duration-300">
            <CardHeader icon="radar" title="4.3 Intent & Search Signals" />

            <p className="text-[12px] text-gray-500 font-medium mb-4 pr-4 leading-relaxed">
                Are they actively in-market?
            </p>

            <div className="space-y-3 mb-6">
                <SignalRow
                    label="Topic Research Spikes"
                    desc="High volume searches for data consolidation"
                    level="High"
                    icon="trending_up"
                />
                <SignalRow
                    label="Hiring for Problem Roles"
                    desc="3 open reqs for 'Migration Architect'"
                    level="High"
                    icon="person_add"
                />
                <SignalRow
                    label="Event Attendance"
                    desc="Downloaded State of Integration 2026 report"
                    level="Med"
                    icon="event_note"
                />
                <SignalRow
                    label="Inbound Behaviors"
                    desc="No direct website visits in last 30d"
                    level="Low"
                    icon="ads_click"
                />
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Buyer Mode</span>
                    <span className="text-sm font-semibold text-emerald-600">Evaluating</span>
                </div>
                <StatusTag label="High Signal Density" variant="emerald" icon="cell_tower" />
            </div>
        </Card>
    );
}

function SignalRow({ label, desc, level, icon }: { label: string; desc: string; level: 'High' | 'Med' | 'Low'; icon: string }) {
    const levelColors = {
        High: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        Med: 'bg-amber-50 text-amber-600 border-amber-100',
        Low: 'bg-gray-50 text-gray-500 border-gray-200'
    };

    return (
        <div className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-white shadow-sm">
            <span className={`material-symbols-outlined mt-0.5 text-[18px] text-slate-400`}>{icon}</span>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-0.5">
                    <span className="text-[13px] font-bold text-slate-700">{label}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${levelColors[level]}`}>
                        {level}
                    </span>
                </div>
                <span className="text-[11px] text-slate-500 line-clamp-1">{desc}</span>
            </div>
        </div>
    );
}
