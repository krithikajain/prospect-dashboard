import type { DashboardData } from '@/types/dashboard';

export function Stage5Engagement({ data }: { data: DashboardData }) {
    const tasks = data.action_engine?.tasks || [
        { title: "Send post-funding email addressing specific scaling pains for Acme Corp.", priority: "High" },
        { title: "Connect with CEO on LinkedIn.", priority: "Medium" }
    ];

    return (
        <div className="grid grid-cols-12 gap-8">
            {/* Strategy */}
            <div className="col-span-12 glass-card p-8 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <div>
                        <p className="text-[10px] text-secondary-text font-bold uppercase tracking-[0.3em] mb-1">Strategy</p>
                        <h3 className="text-2xl font-light">Post-Funding Optimization</h3>
                    </div>
                    <div className="h-10 w-[1px] bg-border-light"></div>
                    <div className="flex gap-6">
                        <div>
                            <p className="text-[10px] text-secondary-text font-bold uppercase tracking-widest mb-1">Angle</p>
                            <p className="text-sm font-medium">Series C Scaling Pains</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-secondary-text font-bold uppercase tracking-widest mb-1">Persona</p>
                            <p className="text-sm font-medium">Economic Buyer</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="px-8 py-3 rounded-full border border-border-light text-sm font-medium hover:bg-neutral-50 transition-colors">
                        Copy Opener
                    </button>
                    <button className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                        Export Full Report
                        <span className="material-symbols-outlined text-[16px]">download</span>
                    </button>
                </div>
            </div>

            <div className="col-span-12 glass-card p-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary-text">bolt</span>
                        <p className="text-xs font-medium text-secondary-text tracking-[0.2em] uppercase">Recommended Plays</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {tasks.map((t, i) => (
                        <div key={i} className="flex gap-4 p-5 rounded-2xl border border-border-light hover:border-black/10 transition-colors cursor-pointer group">
                            <div className="mt-1">
                                <div className="w-5 h-5 rounded border-2 border-slate-300 group-hover:border-black transition-colors" />
                            </div>
                            <div>
                                <p className="text-base text-black mb-1">{t.title}</p>
                                <p className="text-xs font-semibold uppercase tracking-widest text-secondary-text">{t.priority} Priority</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
