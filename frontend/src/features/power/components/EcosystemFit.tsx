import { Card, CardHeader } from '@/shared/components/Card';
import { StatusTag } from '@/shared/components/StatusTag';
import type { DashboardData } from '@/types/dashboard';

interface EcosystemFitProps {
    data: NonNullable<DashboardData['velocity_path']>['ecosystem_fit'];
}

export function EcosystemFit({ data }: EcosystemFitProps) {
    const infraVariant = data.infrastructure.value === 'None' ? 'gray' : 'emerald';
    const complianceVariant = data.compliance.value === 'None' ? 'gray' : (data.compliance.value.toLowerCase().includes('required') ? 'amber' : 'emerald');
    const complexityVariant = data.implementation_complexity.level === 'High' ? 'red' : data.implementation_complexity.level === 'Medium' ? 'amber' : data.implementation_complexity.level === 'Unknown' ? 'gray' : 'emerald';

    // Derive overall friction level
    const frictionLevel = data.implementation_complexity.level === 'High' ? 'High' : (data.compliance.value.toLowerCase().includes('required') ? 'Medium' : 'Low');

    return (
        <Card className="p-6 h-full flex flex-col group hover:shadow-lg transition-all duration-300">
            <CardHeader icon="integration_instructions" title="4.1 Compatibility & Ecosystem" />

            <p className="text-[12px] text-gray-500 font-medium mb-4 pr-4 leading-relaxed">
                Is this plug-and-play or an integration nightmare?
            </p>

            <div className="space-y-3 mb-6">
                <FitRow
                    label="Infrastructure Match"
                    status={data.infrastructure.value}
                    icon="dns"
                    variant={infraVariant}
                />
                <FitRow
                    label="Compliance Floor"
                    status={data.compliance.value}
                    icon="verified_user"
                    variant={complianceVariant}
                />
                <FitRow
                    label="Implementation Complexity"
                    status={data.implementation_complexity.level === 'Unknown' ? 'None' : `${data.implementation_complexity.level} — ${data.implementation_complexity.value}`}
                    icon="build"
                    variant={complexityVariant}
                />
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Integration Friction</span>
                    <span className={`text-sm font-semibold ${frictionLevel === 'High' ? 'text-red-600' : frictionLevel === 'Medium' ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {data.implementation_complexity.level === 'Unknown' && data.compliance.value === 'None' ? 'Unknown' : frictionLevel}
                    </span>
                </div>
                <div className="flex gap-2">
                    {data.compliance.value !== 'None' && (
                        <StatusTag label={data.compliance.value.split('(')[0].trim()} variant="amber" />
                    )}
                </div>
            </div>
        </Card>
    );
}

function FitRow({ label, status, icon, variant }: { label: string; status: string; icon: string; variant: 'emerald' | 'amber' | 'red' | 'blue' | 'gray' }) {
    const textColors = {
        emerald: 'text-emerald-700',
        amber: 'text-amber-700',
        red: 'text-red-700',
        blue: 'text-blue-700',
        gray: 'text-gray-500'
    };

    // Truncate long status text
    const displayStatus = status.length > 60 ? status.substring(0, 57) + '...' : status;

    return (
        <div className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-gray-400">{icon}</span>
                <span className="text-[13px] font-semibold text-slate-700">{label}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <span className={`text-[11px] font-bold tracking-wide ${textColors[variant]} max-w-[180px] truncate text-right`}>{displayStatus}</span>
            </div>
        </div>
    );
}
