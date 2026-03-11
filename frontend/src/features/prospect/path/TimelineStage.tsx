import type { DashboardData } from '@/types/dashboard';

export function Stage6Timeline({ data }: { data: DashboardData }) {
    const steps = data.buying_process?.steps || [];
    const drivers = data.buying_process?.key_drivers || [];

    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 glass-card p-10">
                <div className="flex items-center gap-3 mb-8">
                    <span className="material-symbols-outlined text-secondary-text">route</span>
                    <p className="text-xs font-medium text-secondary-text tracking-[0.2em] uppercase">Procurement Flow</p>
                </div>
                <div className="relative pl-6 space-y-10 border-l border-border-light ml-4">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative">
                            <div className="absolute -left-[30px] top-1 w-3 h-3 bg-black rounded-full ring-4 ring-white" />
                            <h4 className="text-xl font-light mb-2">{step.name}</h4>
                            <p className="text-sm text-secondary-text">{step.status || "Expected Step"}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-span-4 glass-card p-10 bg-black text-white">
                <div className="flex items-center gap-3 mb-8 text-gray-400">
                    <span className="material-symbols-outlined">flag</span>
                    <p className="text-xs font-medium tracking-[0.2em] uppercase">Key Drivers</p>
                </div>
                <div className="flex flex-col gap-4">
                    {drivers.map((d, i) => (
                        <div key={i} className="py-4 border-b border-white/10 last:border-0">
                            <h4 className="text-xl font-light mb-1">{d}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
