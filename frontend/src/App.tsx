import { useState, type ReactNode } from 'react';

// Configuration
import { NAV_CONFIG } from '@/config/navigation';

// Mock Data & Normalizer (Removed unused)

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
import { useProspecting } from '@/context/ProspectingContext';

/**
 * Main Entry Point
 * 
 * Orchestrates the application state, data normalization,
 * and passes controls to the DashboardLayout shell.
 */
export default function App() {
    // Start with empty state or null to represent "no prospect selected yet"
    return (
        <DashboardContainer>
            <DashboardContent />
        </DashboardContainer>
    );
}

/**
 * Logic-heavy component separated from providers for clarity.
 */
function DashboardContent({ data }: { data?: any }) {
    // Application core state for navigation
    const [activeSection, setActiveSection] = useState<string>('home');
    const [activeTab, setActiveTab] = useState<string>('profile');

    // Dynamic data fetching controller (LLM/API)
    const { handleTabChange: fetchDynamicTabData, isLoading } = usePromptController();

    // SSoT State Controller
    const { setProspectingData } = useProspecting();

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
     * Simulate searching for a prospect and pushing context to SSoT.
     * Passes the fresh identity directly to the tab fetcher to avoid
     * the React stale-closure race between setState and navigation.
     */
    const handleExplore = (email: string) => {
        const prefix = email.split('@')[0];
        const domain = email.split('@')[1]?.split('.')[0] || 'Company';
        const defaultName = prefix.replace('.', ' ').replace(/^./, c => c.toUpperCase());
        const defaultCompany = domain.replace(/^./, c => c.toUpperCase());

        let freshIdentity = {
            fullName: defaultName,
            currentRole: 'Executive',
            companyName: defaultCompany,
            email: email
        };

        if (email.toLowerCase().includes('satya')) {
            freshIdentity = { fullName: 'Satya Nadella', currentRole: 'CEO', companyName: 'Microsoft', email };
        } else if (email.toLowerCase().includes('kholmes')) {
            freshIdentity = { fullName: 'Kevin Holmes', currentRole: 'VP of Product Strategy', companyName: 'Salesforce', email };
        } else if (email.toLowerCase().includes('benioff')) {
            freshIdentity = { fullName: 'Marc Benioff', currentRole: 'CEO', companyName: 'Salesforce', email };
        }

        // 1. Wipe previous insights and update identity in SSoT
        setProspectingData({
            identity: freshIdentity as any,
            organization: null,
            insights: null
        });

        // 2. Navigate to Prospect section + trigger the fetch immediately
        //    with fresh context (bypassing the stale SSoT state)
        setActiveSection('prospect');
        setActiveTab('profile');

        // 3. Fire the LLM fetch directly with fresh context (no stale closure)
        fetchDynamicTabData('profile', {
            identity: freshIdentity,
            organization: null
        });
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
        if (activeSection === 'home') return <Stage0Home onExplore={handleExplore} />;

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

