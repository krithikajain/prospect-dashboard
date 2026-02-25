import { useState } from 'react';
import { normalizeProspectData } from '@/lib/normalizer';
import rawData from '@/data/studio_results_20260212_1512.json';
import { Navbar, PageHeader, ProfileDropdown } from '@/components/layout';
import type { NavSection } from '@/components/layout/Navbar';
import { Stage0Home, Stage1Profile, Stage2Stakeholder, Stage4Need, Stage5Path, Stage6Timeline, BudgetAssessment, AuthorityDeepDive, NeedDeepDive, TimelineDeepDive } from '@/components/stages';

const NAV_CONFIG: readonly NavSection[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    {
        id: 'prospect',
        label: 'Prospect',
        icon: 'person_search',
        tabs: [
            { id: 'profile', label: 'Profile', icon: 'person' },
            { id: 'power', label: 'Power', icon: 'groups' },
            { id: 'pain', label: 'Pain', icon: 'target' },
            { id: 'path', label: 'Path', icon: 'moving' }
        ]
    },
    {
        id: 'qualification',
        label: 'Qualification',
        icon: 'fact_check',
        tabs: [
            { id: 'budget', label: 'Budget', icon: 'payments' },
            { id: 'authority', label: 'Authority', icon: 'shield_person' },
            { id: 'bant_need', label: 'Need', icon: 'psychology' },
            { id: 'bant_timeline', label: 'Timeline', icon: 'schedule' },
        ]
    },
    { id: 'need', label: 'Need', icon: 'psychology' },
    {
        id: 'proposition',
        label: 'Proposition',
        icon: 'lightbulb',
        tabs: [
            { id: 'timeline', label: 'Timeline', icon: 'timeline' }
        ]
    },
] as const;

export default function App() {
    const data = normalizeProspectData(rawData[0]);
    // Default to Home
    const [activeSection, setActiveSection] = useState<string>('home');
    const [activeTab, setActiveTab] = useState<string>('profile'); // Default Prospect tab

    const handleSectionChange = (sectionId: string) => {
        setActiveSection(sectionId);
        // If the section has tabs, optionally reset to the first tab
        // Or leave it alone to remember the last visited tab (keeping it simple here)
        const section = NAV_CONFIG.find(s => s.id === sectionId);
        if (section?.tabs && section.tabs.length > 0) {
            setActiveTab(section.tabs[0].id);
        }
    };

    const StageView = () => {
        if (activeSection === 'home') return <Stage0Home />;

        if (activeSection === 'prospect') {
            switch (activeTab) {
                case 'profile': return <Stage1Profile data={data} />;
                case 'power': return <Stage2Stakeholder data={data} />;
                case 'pain': return <Stage4Need data={data} />; // The existing Pain tab components actually map to Stage4Need internally
                case 'path': return <Stage5Path data={data} />;
                default: return null;
            }
        }

        if (activeSection === 'proposition') {
            if (activeTab === 'timeline') return <Stage6Timeline data={data} />;
            return <PlaceholderView title="Value Proposition" icon="lightbulb" />;
        }

        // Qualification — BANT tabs
        if (activeSection === 'qualification') {
            switch (activeTab) {
                case 'budget': return <BudgetAssessment />;
                case 'authority': return <AuthorityDeepDive />;
                case 'bant_need': return <NeedDeepDive data={data} />;
                case 'bant_timeline': return <TimelineDeepDive data={data} />;
                default: return <BudgetAssessment />;
            }
        }
        if (activeSection === 'need') return <PlaceholderView title="Need Analysis" icon="psychology" />;

        return null;
    };

    const currentSectionConfig = NAV_CONFIG.find(s => s.id === activeSection);
    const currentTabConfig = currentSectionConfig?.tabs?.find(t => t.id === activeTab);

    // PageHeader label logic: Section Name (if no tabs) OR Tab Name (if tabs exist)
    const headerLabel = currentTabConfig ? currentTabConfig.label : currentSectionConfig?.label || '';

    return (
        <div className="h-screen w-full flex flex-col bg-slate-100 text-[#000000] font-sans overflow-hidden" >
            <Navbar
                config={NAV_CONFIG}
                activeSectionId={activeSection}
                onSectionChange={handleSectionChange}
            />
            <ProfileDropdown />

            <main className="flex-1 flex flex-col pt-32 px-12 pb-12 overflow-y-auto">
                <div className="max-w-[1400px] mx-auto w-full flex flex-col">

                    {/* Folder Tabs - Show when the active section has a tabs array defined */}
                    {currentSectionConfig?.tabs && currentSectionConfig.tabs.length > 0 && (
                        <div className="flex px-12 relative z-10 -mb-[1px]">
                            {currentSectionConfig.tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`folder-tab ${activeTab === tab.id ? 'folder-tab-active' : ''}`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Content Container */}
                    {activeSection === 'home' ? (
                        <StageView />
                    ) : (
                        <div className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-200/80 p-10 flex-1 min-h-[500px] relative z-20 rounded-[32px]">
                            <PageHeader
                                label={headerLabel}
                                breadcrumb={activeSection === 'qualification' ? 'Workspace / BANT Analysis' : 'Workspace / Hunt Pipeline'}
                            />
                            <StageView />
                        </div>
                    )}
                </div>
            </main>
        </div >
    );
}

function PlaceholderView({ title, icon }: { title: string; icon: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-24 text-center glass-card mt-8">
            <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6 border-2 border-slate-200">
                <span className="material-symbols-outlined text-[40px]">{icon}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{title} Module</h2>
            <p className="text-slate-500 max-w-md">
                This section is currently under development. Detailed analysis and tools for {title.toLowerCase()} will be available here.
            </p>
        </div>
    );
}
