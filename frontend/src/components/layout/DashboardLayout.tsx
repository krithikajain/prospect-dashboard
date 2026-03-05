import type { ReactNode } from 'react';
import { Navbar, PageHeader, ProfileDropdown } from '@/shared/layout';
import { NAV_CONFIG } from '@/config/navigation';

interface DashboardLayoutProps {
    children: ReactNode;
    activeSection: string;
    activeTab: string;
    onSectionChange: (id: string) => void;
    onTabChange: (id: string) => void;
    isLoading: (tabId: string) => boolean;
}

/**
 * Main Layout Shell for the Prospecting Dashboard.
 * Orchestrates navigation, header, and the content container.
 */
export function DashboardLayout({
    children,
    activeSection,
    activeTab,
    onSectionChange,
    onTabChange,
    isLoading
}: DashboardLayoutProps) {
    const currentSectionConfig = NAV_CONFIG.find(s => s.id === activeSection);
    const currentTabConfig = currentSectionConfig?.tabs?.find(t => t.id === activeTab);

    // PageHeader label logic: Section Name (if no tabs) OR Tab Name (if tabs exist)
    const headerLabel = currentTabConfig ? currentTabConfig.label : currentSectionConfig?.label || '';
    const breadcrumb = activeSection === 'qualification' ? 'Workspace / BANT Analysis' : 'Workspace / Hunt Pipeline';

    return (
        <div className="h-screen w-full flex flex-col bg-slate-100 text-[#000000] font-sans overflow-hidden">
            {/* Global Navigation */}
            <Navbar
                config={NAV_CONFIG}
                activeSectionId={activeSection}
                onSectionChange={onSectionChange}
            />

            {/* User Profile / Meta - Top Floating */}
            <ProfileDropdown />

            <main className="flex-1 flex flex-col pt-32 px-12 pb-12 overflow-y-auto">
                <div className="max-w-[1400px] mx-auto w-full flex flex-col">

                    {/* Folder-Style Tab Bar - Visible when a section has nested tabs */}
                    {currentSectionConfig?.tabs && currentSectionConfig.tabs.length > 0 && (
                        <div className="flex px-12 relative z-10 -mb-[1px]">
                            {currentSectionConfig.tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    className={`folder-tab ${activeTab === tab.id ? 'folder-tab-active' : ''}`}
                                    disabled={isLoading(tab.id)}
                                >
                                    <span className="material-symbols-outlined text-[16px]">
                                        {isLoading(tab.id) ? 'hourglass_empty' : tab.icon}
                                    </span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Main Content Pane */}
                    {activeSection === 'home' ? (
                        children
                    ) : (
                        <div className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-200/80 p-10 flex-1 min-h-[500px] relative z-20 rounded-[32px]">
                            <PageHeader
                                label={headerLabel}
                                breadcrumb={breadcrumb}
                            />
                            {children}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
