import { Card, CardHeader } from '@/shared/components/Card';
import { iconVariants, type StatusVariant } from '@/lib/theme';

/**
 * Emotional & Political Weight card — who suffers, career upside, risk of failure.
 */
export function PoliticalWeight() {
    return (
        <Card className="p-6 group hover:shadow-md transition-all duration-300 bg-white border border-gray-100 h-full">
            <CardHeader icon="psychology" title="5. Political Weight" />
            <p className="text-[11px] font-medium text-gray-400 mb-4 px-1">Personal Stakes</p>

            <div className="flex flex-col gap-4">
                <StakeRow icon="person_alert" iconTheme="blue" label="Who Suffers?" value="VP of Sales & RevOps (Missed quotas)" />
                <StakeRow icon="moving" iconTheme="emerald" label="Career Upside" value="Direct path to promotion for the internal champion." />
                <StakeRow icon="warning" iconTheme="red" label="Risk of Failure" value="Loss of board confidence if Q4 targets are missed." />
            </div>
        </Card>
    );
}

function StakeRow({ icon, iconTheme, label, value }: { icon: string; iconTheme: StatusVariant; label: string; value: string }) {
    const iconColor = iconVariants[iconTheme] || iconVariants.slate;
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
