import { Card, CardHeader } from '@/components/ui/Card';

/**
 * Internal Friction card — implementation blockers with severity tags.
 */
export function InternalFriction() {
    return (
        <Card className="p-6 group hover:shadow-md transition-all duration-300 bg-white border border-gray-100 h-full">
            <CardHeader icon="front_hand" title="4. Internal Friction" />
            <p className="text-[11px] font-medium text-gray-400 mb-4 px-1">Implementation Blockers</p>

            <div className="space-y-4">
                <FrictionRow label="IT Capacity" severity="Overloaded" variant="red" />
                <FrictionRow label="Change Resistance" severity="Medium" variant="amber" />
                <FrictionRow label="Vendor Fatigue" severity="Low" variant="emerald" />
            </div>
        </Card>
    );
}

function FrictionRow({ label, severity, variant }: { label: string; severity: string; variant: 'red' | 'amber' | 'emerald' }) {
    const styles: Record<string, string> = {
        red: 'text-red-600 bg-red-50 border-red-100',
        amber: 'text-amber-600 bg-amber-50 border-amber-100',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    };

    return (
        <div className="flex justify-between items-center bg-gray-50 border border-gray-100 p-2.5 rounded-lg">
            <span className="text-xs font-semibold text-slate-700">{label}</span>
            <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full uppercase tracking-wider ${styles[variant]}`}>
                {severity}
            </span>
        </div>
    );
}
