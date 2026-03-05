import { useState, type ReactNode } from 'react';

// Configuration
import { NAV_CONFIG } from '@/config/navigation';

// Mock Data & Normalizer
import rawData from '@/data/studio_results_20260212_1512.json';
import { normalizeProspectData } from '@/lib/normalizer';

// Providers & Components
import { DashboardContainer } from '@/context/ProspectingContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PlaceholderView } from '@/features/shared/components/PlaceholderView';
import { SkeletonCard } from '@/shared/components';

// Features
import {
    Stage0Home,
    Stage1Profile,
    Stage2Stakeholder,
    Stage4Need,
    Stage5Path,
    Stage6Timeline,
    BudgetAssessment,
    AuthorityDeepDive,
    NeedDeepDive,
    TimelineDeepDive
} from '@/features';

// Hooks
import { usePromptController } from '@/hooks/usePromptController';

/**
 * Main Entry Point
 * 
 * Orchestrates the application state, data normalization,
 * and passes controls to the DashboardLayout shell.
 */
export default function App() {
    // Normalization should happen at the top level to pass to standard SSoT (Single Source of Truth)
    const initialNormalizedData = normalizeProspectData(rawData[0]);

    return (
        <DashboardContainer initialData={{
            identity: initialNormalizedData.identity,
            organization: initialNormalizedData.profile_fit?.company
        }}>
            <DashboardContent data={initialNormalizedData} />
        </DashboardContainer>
    );
}

/**
 * Logic-heavy component separated from providers for clarity.
 */
function DashboardContent({ data }: { data: any }) {
    // Application core state for navigation
    const [activeSection, setActiveSection] = useState<string>('home');
    const [activeTab, setActiveTab] = useState<string>('profile');

    // Dynamic data fetching controller (LLM/API)
    const { handleTabChange: fetchDynamicTabData, isLoading } = usePromptController();

    /**
     * Handles top-level sidebar navigation changes.
     * Automatically sets the first tab if the section contains tabs.
     */
    const handleSectionChange = (sectionId: string) => {
        setActiveSection(sectionId);
        const section = NAV_CONFIG.find(s => s.id === sectionId);
        if (section?.tabs && section.tabs.length > 0) {
            handleTabChange(section.tabs[0].id);
        }
    };

    /**
     * Handles tab switching and triggers lazy-loading of data if necessary.
     */
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // Potential fetch via Prompt Controller logic
        fetchDynamicTabData(tabId);
    };

    /**
     * Registry-based rendering logic for dynamic stage views.
     */
    const renderStageView = () => {
        // 1. Loading State Check
        if (isLoading(activeTab)) {
            return <SkeletonCard />;
        }

        // 2. Section: Home
        if (activeSection === 'home') return <Stage0Home />;

        // 3. Section: Prospect (Sales Insights)
        if (activeSection === 'prospect') {
            const PROSPECT_TABS: Record<string, ReactNode> = {
                profile: <Stage1Profile data={data} />,
                power: <Stage2Stakeholder data={data} />,
                pain: <Stage4Need data={data} />,
                path: <Stage5Path data={data} />,
            };
            return PROSPECT_TABS[activeTab] || null;
        }

        // 4. Section: Qualification (Deep Dives)
        if (activeSection === 'qualification') {
            const QUAL_TABS: Record<string, ReactNode> = {
                budget: <BudgetAssessment />,
                authority: <AuthorityDeepDive />,
                bant_need: <NeedDeepDive data={data} />,
                bant_timeline: <TimelineDeepDive data={data} />,
            };
            return QUAL_TABS[activeTab] || null;
        }

        // 5. Section: Proposition (Timeline)
        if (activeSection === 'proposition') {
            if (activeTab === 'timeline') return <Stage6Timeline data={data} />;
            return <PlaceholderView title="Value Proposition" icon="lightbulb" />;
        }

        // 6. Section: Direct Placeholder (Future expansion)
        if (activeSection === 'need') {
            return <PlaceholderView title="Need Analysis" icon="psychology" />;
        }

        return null;
    };

    return (
        <DashboardLayout
            activeSection={activeSection}
            activeTab={activeTab}
            onSectionChange={handleSectionChange}
            onTabChange={handleTabChange}
            isLoading={(tabId) => isLoading(tabId)}
        >
            {renderStageView()}
        </DashboardLayout>
    );
}

