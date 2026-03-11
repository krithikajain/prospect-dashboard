import { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { useProspecting } from '@/context/ProspectingContext';

/** 
 * Mock static career history data used for the horizontal timeline visualization. 
 * @private
 */
const careerData = [
    { period: '2020 - Present', role: 'CEO', company: 'Acme Corp', isCurrent: true },
    { period: '2019 - 2020', role: 'CRO', company: 'Tech Inc' },
    { period: '2017 - 2019', role: 'VP Sales', company: 'Salesforce' },
    { period: '2016 - 2017', role: 'Director', company: 'Salesforce' },
    { period: '2015 - 2016', role: 'Mid-Market AE', company: 'Okta' },
    { period: '2014 - 2015', role: 'Account Exec', company: 'Okta' },
    { period: '2013 - 2014', role: 'SDR', company: 'Oracle' },
];

/**
 * A tabbed card component that visualizes a prospect's career trajectory and educational background.
 * Features a horizontal interactive timeline for professional history (Workspace)
 * and a detailed list for academic achievements (Education).
 * 
 * @returns {JSX.Element} The rendered ProfessionalJourney component.
 */
export function ProfessionalJourney() {
    const [tab, setTab] = useState<'Workspace' | 'Education'>('Workspace');
    const { prospectingData } = useProspecting();
    const journey = prospectingData.insights?.profile?.professionalJourney;
    const identity = prospectingData.identity as any;

    const formatPeriod = (c: any) => {
        if (c.period) return c.period;
        if (!c.start && !c.end) return 'Unknown Period';
        if (c.start && !c.end) return `${c.start} - Present`;
        return `${c.start || ''} - ${c.end}`.replace(/^ - |- $/g, '');
    };

    // Use SSoT data, or fallback to mock data if not available (for skeleton/dev states)
    const careerList = (identity?.employmentHistory?.length ? identity.employmentHistory : (journey?.career?.length ? journey.career : careerData)).slice(0, 5).map((c: any, index: number) => ({
        period: formatPeriod(c),
        role: c.role || c.title || 'Unknown Role',
        company: c.company || 'Unknown Company',
        isCurrent: c.isCurrent !== undefined ? c.isCurrent : (index === 0 && (!c.end || c.end.toLowerCase() === 'present' || c.end === '')),
    }));

    const educationList = (identity?.education?.length ? identity.education : (journey?.education?.length ? journey.education : [])).map((e: any) => ({
        degree: e.degree || 'Degree',
        school: e.school || 'Educational Institution',
        year: e.year || ''
    }));

    return (
        <Card padding="sm" className="flex flex-col h-full overflow-hidden">
            {/* Header + Tab Toggle */}
            <div className="flex justify-between items-start mb-1 z-10 w-full">
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
                {tab === 'Workspace' ? <WorkspaceTab careerList={careerList} /> : <EducationTab educationList={educationList} />}
            </div>
        </Card>
    );
}

/* ────────── Workspace Tab ────────── */

/**
 * Internal component for the 'Workspace' tab content.
 * Renders a horizontal timeline visualizing career progression from entry-level to current role.
 * 
 * @returns {JSX.Element} The rendered WorkspaceTab component.
 */
function WorkspaceTab({ careerList }: { careerList: any[] }) {
    return (
        <div className="w-full flex-1 relative z-10 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-2 duration-500 px-2 mt-4 pb-2 overflow-x-auto scroolbar-hide">
            <div className="relative flex justify-between items-center w-full min-w-max md:min-w-full">
                {/* Connecting Horizontal Line */}
                <div className="absolute left-[5%] right-[5%] top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 z-0"></div>

                {careerList.map((item, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center group flex-1 cursor-pointer">

                        {/* Hover Year Tooltip */}
                        <div className="absolute bottom-full mb-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none z-50">
                            <div className="bg-slate-800 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-lg whitespace-nowrap flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px] text-blue-400">history</span>
                                {item.period || item.year}
                            </div>
                            <div className="w-2 h-2 bg-slate-800 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                        </div>

                        {/* Top: Role */}
                        <div className="absolute bottom-full mb-3 text-center w-full px-0.5">
                            <h4 className={`text-[10px] font-bold leading-tight transition-colors ${item.isCurrent ? 'text-blue-600' : 'text-slate-700 group-hover:text-blue-600'}`}>
                                {item.role}
                            </h4>
                        </div>

                        {/* Timeline Node */}
                        <div className={`w-3.5 h-3.5 mt-2 rounded-full border-2 transition-all duration-300 relative z-10 ${item.isCurrent ? 'bg-blue-500 border-blue-200 shadow-md scale-110' : 'bg-slate-200 border-white shadow-sm group-hover:bg-blue-400 group-hover:scale-125'}`}>
                            {item.isCurrent && (
                                <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-20"></div>
                            )}
                        </div>

                        {/* Bottom: Company */}
                        <div className="absolute top-full mt-3 text-center w-full px-0.5">
                            <p className={`text-[10px] transition-colors ${item.isCurrent ? 'font-bold text-slate-800' : 'font-medium text-gray-500 group-hover:text-slate-800'}`}>
                                {item.company}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ────────── Education Tab ────────── */

/**
 * Internal component for the 'Education' tab content.
 * Renders a list of educational milestones (Degrees, Schools, Dates).
 * 
 * @returns {JSX.Element} The rendered EducationTab component.
 */
function EducationTab({ educationList }: { educationList: any[] }) {
    if (!educationList.length) {
        return (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic py-10">
                Education information not available
            </div>
        );
    }

    return (
        <div className="w-full mt-2 flex flex-col gap-0 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {educationList.map((edu, idx) => (
                <EducationEntry
                    key={idx}
                    degree={edu.degree}
                    school={edu.school}
                    year={edu.year}
                    icon={idx === 0 ? "account_balance" : "school"}
                    borderTop={idx > 0}
                />
            ))}
        </div>
    );
}

/**
 * Props for the EducationEntry auxiliary component.
 */
interface EducationEntryProps {
    /** The degree or qualification obtained. */
    degree: string;
    /** The school or university name. */
    school: string;
    /** The graduating class or year range. */
    year: string;
    /** Google Material Symbols icon name. */
    icon: string;
    /** Whether to display a divider border at the top. */
    borderTop?: boolean;
}

/**
 * Renders a single entry in the Education list.
 * 
 * @param {EducationEntryProps} props - The component props.
 * @returns {JSX.Element} The rendered EducationEntry component.
 */
function EducationEntry({ degree, school, year, icon, borderTop }: EducationEntryProps) {
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
