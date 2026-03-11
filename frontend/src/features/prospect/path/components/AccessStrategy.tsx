import { Card } from '@/shared/components/Card';
import type { DashboardData } from '@/types/dashboard';

interface AccessStrategyProps {
    data: NonNullable<DashboardData['velocity_path']>['access_strategy'];
}

export function AccessStrategy({ data }: AccessStrategyProps) {
    const cp = data.contact_profile;
    const totalSignals = data.pedigree.length + data.partner_overlap.length + (cp.founder_exits.length > 0 ? 1 : 0);

    return (
        <Card className="p-6 h-full flex flex-col pt-5 group/main transition-all duration-300 hover:shadow-lg">
            <div className="flex justify-between items-start mb-6">
                <div className="group/header cursor-default flex-1">
                    <h2 className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-slate-400">share</span>
                        {/* Swaps text on hover */}
                        <span className="block group-hover/header:hidden">4.2 Access Strategy</span>
                        <span className="hidden group-hover/header:block text-blue-600">Warm Intros</span>
                    </h2>
                </div>
                <div className="bg-slate-100/80 backdrop-blur-sm text-slate-700 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border border-slate-200 flex items-center gap-1.5 shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[12px] text-blue-500">radar</span>
                    {totalSignals} SIGNALS
                </div>
            </div>

            <div className="flex-1 flex flex-col group/stack relative pb-6 min-h-[350px]">
                {/* ── 1. Experience & Companies ── */}
                <DeckCard
                    index={0}
                    icon="business_center"
                    subtitle="Interactive Layer"
                    title="Experience & Companies"
                >
                    <div className="flex flex-wrap gap-3 mb-6">
                        {cp.founder_exits.length > 0 ? (
                            cp.founder_exits.map((ex, i) => (
                                <div key={i} className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2">
                                    <span className="font-semibold text-slate-700 text-xs">{ex.company}</span>
                                    {ex.period.includes('Present') && (
                                        <span className="bg-slate-900 text-[9px] text-white px-1.5 py-0.5 rounded font-black tracking-tighter">NOW</span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <span className="text-xs text-slate-500 italic">No companies listed</span>
                        )}
                    </div>
                    {cp.skills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                            {cp.skills.slice(0, 4).map((s, i) => (
                                <span key={i} className="flex items-center gap-3">
                                    <span>{s}</span>
                                    {i < Math.min(cp.skills.length, 4) - 1 && <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>}
                                </span>
                            ))}
                        </div>
                    )}
                </DeckCard>

                {/* ── 2. Educational Network ── */}
                <DeckCard
                    index={1}
                    icon="school"
                    subtitle="Alumni Background"
                    title="Educational Network"
                >
                    <div className="space-y-4">
                        {data.pedigree.length > 0 ? (
                            data.pedigree.map((p, i) => (
                                <div key={i} className={`flex justify-between items-start pb-4 ${i !== data.pedigree.length - 1 ? 'border-b border-slate-100' : ''}`}>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-sm">{p.school}</h3>
                                        <p className="text-slate-500 text-xs font-medium mt-0.5">{p.degree}</p>
                                    </div>
                                    {p.year && <span className="font-bold text-slate-400 text-xs">{p.year}</span>}
                                </div>
                            ))
                        ) : (
                            <span className="text-xs text-slate-500 italic">No education listed</span>
                        )}
                    </div>
                </DeckCard>

                {/* ── 3. Platform Overlap ── */}
                <DeckCard
                    index={2}
                    icon="handshake"
                    subtitle="Technology Stack"
                    title="Platform Overlap"
                >
                    <div className="flex flex-wrap gap-6 mt-2">
                        {data.partner_overlap.length > 0 ? (
                            data.partner_overlap.map((p, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                                        <span className="material-symbols-outlined text-lg">{p.partner.toLowerCase().includes('zoom') ? 'videocam' : 'groups'}</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 text-sm leading-none mb-1">{p.partner}</p>
                                        <p className="text-xs font-semibold text-slate-500">{p.type}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className="text-xs text-slate-500 italic">No partner overlap found</span>
                        )}
                    </div>
                </DeckCard>
            </div>
        </Card>
    );
}

function DeckCard({
    index,
    icon,
    subtitle,
    title,
    children
}: {
    index: number;
    icon: string;
    subtitle: string;
    title: string;
    children: React.ReactNode;
}) {
    // We use a smaller negative margin so that the header of every card stays fully visible.
    // -mt-6 (-24px) allows the icon and text of the covered card to still show clearly.
    // Upon group-hover (hovering over the stack container), it spreads out to mt-4 (16px).
    const spacingClasses = index !== 0
        ? "-mt-4 group-hover/stack:mt-4"
        : "mt-0 z-10";

    return (
        <div
            className={`
                group/card relative cursor-pointer bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm 
                transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                hover:shadow-xl hover:-translate-y-2 hover:z-50
                ${spacingClasses}
            `}
        >
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-slate-900 rounded-[14px] flex items-center justify-center text-white shadow-md">
                    <span className="material-symbols-outlined text-[26px]">{icon}</span>
                </div>
                <div>
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-0.5">{subtitle}</span>
                    <h2 className="text-[15px] font-bold text-slate-800">{title}</h2>
                </div>
                <span className="material-symbols-outlined ml-auto text-slate-300 group-hover/card:text-blue-500 transition-colors shrink-0">
                    expand_more
                </span>
            </div>

            {/* Expander content - uses Grid rows transition */}
            <div
                className={`
                    grid grid-rows-[0fr] opacity-0 transition-all duration-400 ease-out
                    group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100 group-hover/card:mt-6
                `}
            >
                <div className="overflow-hidden min-h-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
