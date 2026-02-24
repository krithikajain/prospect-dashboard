import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const careerData = [
    { year: '2013', role: 'SDR', company: 'Oracle', level: 30 },
    { year: '2014', role: 'Account Exec', company: 'Okta', level: 15 },
    { year: '2015', role: 'Mid-Market AE', company: 'Okta', level: 45 },
    { year: '2016', role: 'Director of Sales', company: 'Salesforce', level: 25 },
    { year: '2017', role: 'VP of Sales', company: 'Salesforce', level: 55 },
    { year: '2019', role: 'CRO', company: 'Tech Inc', level: 85 },
    { year: '2020', role: 'Founder & CEO', company: 'Acme Corp', level: 50 },
];

const CareerTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
        const d = payload[0].payload;
        return (
            <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-xl flex flex-col min-w-[140px] border border-[#D0D6F0] relative z-50 transform -translate-y-4">
                <p className="text-[10px] font-bold text-[#6B6DCD]/80 tracking-widest uppercase mb-1">{d.company}</p>
                <p className="text-sm font-extrabold text-[#5356A4] tracking-tight">{d.role}</p>
                <p className="text-[11px] font-medium text-[#6B6DCD]/90 mt-1">{d.year}</p>
            </div>
        );
    }
    return null;
};

/**
 * Professional Journey card with Workspace (career chart) and Education tabs.
 */
export function ProfessionalJourney() {
    const [tab, setTab] = useState<'Workspace' | 'Education'>('Workspace');

    return (
        <Card className="flex flex-col h-full overflow-hidden">
            {/* Header + Tab Toggle */}
            <div className="flex justify-between items-start mb-2 z-10 w-full">
                <div>
                    <h3 className="text-slate-900 font-bold text-lg tracking-tight">Professional Journey</h3>
                    <p className="text-gray-400 text-[11px] mt-0.5 font-medium uppercase tracking-wider">Background & Trajectory</p>
                </div>
                <div className="flex bg-gray-50 border border-gray-100 rounded-full p-1 items-center shadow-inner relative z-20">
                    {(['Workspace', 'Education'] as const).map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 ${tab === t ? 'bg-white text-slate-800 shadow-sm border border-gray-100/50' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-[200px] flex flex-col justify-end relative">
                {tab === 'Workspace' ? <WorkspaceTab /> : <EducationTab />}
            </div>
        </Card>
    );
}

/* ────────── Workspace Tab ────────── */

function WorkspaceTab() {
    return (
        <div className="w-full -ml-3 mt-4 relative z-10 min-h-[170px] h-[200px] animate-in fade-in slide-in-from-bottom-2 duration-500">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={careerData} margin={{ top: 25, right: 10, left: 10, bottom: 0 }}>
                    <defs>
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#94a3b8" floodOpacity="0.15" />
                        </filter>
                    </defs>
                    <CartesianGrid vertical={true} horizontal={false} stroke="#f1f5f9" strokeWidth={1.5} />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }} tickMargin={12} />
                    <YAxis hide={true} domain={[0, 100]} />
                    <RechartsTooltip content={<CareerTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1.5, strokeDasharray: '4 4', opacity: 0.5 }} />
                    <Line
                        type="monotone"
                        dataKey="level"
                        stroke="#334155"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#334155', stroke: '#ffffff', strokeWidth: 2 }}
                        activeDot={{ r: 7, fill: '#0f172a', stroke: '#FFF', strokeWidth: 3 }}
                        filter="url(#shadow)"
                        animationDuration={1000}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

/* ────────── Education Tab ────────── */

function EducationTab() {
    return (
        <div className="w-full mt-2 flex flex-col gap-0 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <EducationEntry degree="Master of Business Administration (MBA)" school="Stanford University Graduate School of Business" year="Class of 2010" icon="account_balance" />
            <EducationEntry degree="B.S. in Computer Science" school="University of California, Berkeley" year="Class of 2005" icon="school" borderTop />
        </div>
    );
}

function EducationEntry({ degree, school, year, icon, borderTop }: {
    degree: string; school: string; year: string; icon: string; borderTop?: boolean;
}) {
    return (
        <div className={`flex justify-between items-start gap-2 py-4 ${borderTop ? 'border-t border-gray-50' : ''}`}>
            <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-slate-800">{degree}</h4>
                    <p className="text-[12px] text-gray-500 mt-0.5">{school}</p>
                </div>
            </div>
            <div className="shrink-0 mt-0.5">
                <span className="text-[10px] font-semibold text-gray-400 bg-gray-50/80 border border-gray-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider">{year}</span>
            </div>
        </div>
    );
}
