import { Card, CardHeader } from '@/components/ui/Card';

/**
 * Emotional & Political Weight card — who suffers, career upside, risk of failure.
 */
export function PoliticalWeight() {
    return (
        <Card className="p-6 group hover:shadow-md transition-all duration-300 bg-white border border-gray-100 h-full">
            <CardHeader icon="psychology" title="5. Political Weight" />
            <p className="text-[11px] font-medium text-gray-400 mb-4 px-1">Personal Stakes</p>

            <div className="flex flex-col gap-4">
                <StakeRow icon="person_alert" iconColor="bg-blue-50 text-blue-500 border-blue-100/50" label="Who Suffers?" value="VP of Sales & RevOps (Missed quotas)" />
                <StakeRow icon="moving" iconColor="bg-emerald-50 text-emerald-500 border-emerald-100/50" label="Career Upside" value="Direct path to promotion for the internal champion." />
                <StakeRow icon="warning" iconColor="bg-red-50 text-red-500 border-red-100/50" label="Risk of Failure" value="Loss of board confidence if Q4 targets are missed." />
            </div>
        </Card>
    );
}

function StakeRow({ icon, iconColor, label, value }: { icon: string; iconColor: string; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${iconColor}`}>
                <span className="material-symbols-outlined text-[16px]">{icon}</span>
            </div>
            <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{label}</p>
                <p className="text-xs font-semibold text-slate-800 leading-snug">{value}</p>
            </div>
        </div>
    );
}
