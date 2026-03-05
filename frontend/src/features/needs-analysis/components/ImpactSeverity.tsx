import { Card, CardHeader } from '@/shared/components/Card';

/**
 * Impact Severity card — revenue leakage, operational delay, and KPI alignment.
 */
export function ImpactSeverity() {
    return (
        <Card className="p-6 group hover:shadow-md transition-all duration-300 bg-white border border-gray-100 flex flex-col h-full">
            <CardHeader icon="monitoring" title="2. Impact Severity" />

            {/* Impact metrics */}
            <div className="grid grid-cols-2 gap-4 mt-2 mb-6">
                <ImpactMetric icon="trending_down" label="Revenue Leakage" value="$1.2M" subtitle="Per Year" color="red" />
                <ImpactMetric icon="timer" label="Operational Delay" value="40" valueSuffix="hrs" subtitle="Per Week Wasted" color="orange" />
            </div>

            {/* KPI alignment */}
            <div className="space-y-3 mt-auto">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">KPI Alignment</p>
                <KpiRow question="Does leadership care about this?" answer="Yes, Top 3 OKR" variant="emerald" />
                <KpiRow question="Does it slow growth?" answer="Yes, blocks scale" variant="red" />
                <KpiRow question="Compliance risk" answer="None identified" variant="gray" last />
            </div>
        </Card>
    );
}

function ImpactMetric({ icon, label, value, valueSuffix, subtitle, color }: {
    icon: string; label: string; value: string; valueSuffix?: string; subtitle: string; color: 'red' | 'orange';
}) {
    const bg = color === 'red' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100';
    const textColor = color === 'red' ? 'text-red-600' : 'text-orange-600';
    const valueColor = color === 'red' ? 'text-red-700' : 'text-orange-700';
    const subtitleColor = color === 'red' ? 'text-red-500' : 'text-orange-500';
    const iconBg = color === 'red' ? 'text-red-100' : 'text-orange-100';

    return (
        <div className={`flex flex-col items-center justify-center p-4 ${bg} border rounded-xl relative overflow-hidden`}>
            <span className={`material-symbols-outlined absolute -right-2 -bottom-2 text-[64px] ${iconBg} opacity-50`}>{icon}</span>
            <p className={`text-[10px] font-bold uppercase tracking-wider ${textColor} mb-1 relative z-10`}>{label}</p>
            <p className={`text-3xl font-light ${valueColor} relative z-10`}>
                {value}{valueSuffix && <span className="text-lg">{valueSuffix}</span>}
            </p>
            <p className={`text-[10px] font-medium ${subtitleColor} mt-1 relative z-10`}>{subtitle}</p>
        </div>
    );
}

function KpiRow({ question, answer, variant, last }: {
    question: string; answer: string; variant: 'emerald' | 'red' | 'gray'; last?: boolean;
}) {
    const answerStyles: Record<string, string> = {
        emerald: 'px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider',
        red: 'px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-[10px] font-bold uppercase tracking-wider',
        gray: 'text-[10px] font-bold uppercase tracking-wider',
    };

    return (
        <div className={`flex items-center justify-between py-2 ${!last ? 'border-b border-gray-50' : ''} ${variant === 'gray' ? 'text-gray-400' : ''}`}>
            <span className={`text-sm font-medium ${variant === 'gray' ? '' : 'text-slate-700'}`}>{question}</span>
            <span className={answerStyles[variant]}>{answer}</span>
        </div>
    );
}
