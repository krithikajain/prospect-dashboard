import { useState, type ReactNode } from 'react';

// Configuration
import { NAV_CONFIG } from '@/config/navigation';

// Mock Data & Normalizer (Removed unused)

// Providers & Components
import { DashboardContainer } from '@/context/ProspectingContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PlaceholderView } from '@/features/shared';
// Features
import {
    Stage0Home,
    Stage1Profile,
    Stage2Stakeholder,
    Stage4Need,
    Stage5Path,
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
function DashboardContent() {
    // Application core state for navigation
    const [activeSection, setActiveSection] = useState<string>('home');
    const [activeTab, setActiveTab] = useState<string>('profile');

    // Dynamic data fetching controller (LLM/API)
    const { handleTabChange: fetchDynamicTabData, isLoading } = usePromptController();

    // SSoT State Controller
    const { prospectingData: data, setProspectingData } = useProspecting();

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
    const handleExplore = async (prospect: { firstName: string, lastName: string, email: string }, seller: any) => {

        // 1. Await verification FIRST
        let data: any = null;
        try {
            const res = await fetch('http://localhost:8000/api/prospect/verify-enrich', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prospect)
            });

            if (!res.ok) {
                alert("Could not verify email. Please try another.");
                return;
            }

            data = await res.json();

            if (!data.is_valid) {
                alert("The email provided was not valid or could not be found. Please try another.");
                return;
            }
        } catch (e) {
            console.error("Enrichment API failed:", e);
            alert("Error verifying email. Please check your connection or try again.");
            return;
        }

        // 2. Email is valid, we can navigate now
        // Extract deterministic data fallbacks
        const domain = prospect.email.split('@')[1]?.split('.')[0] || 'Company';
        const defaultCompany = domain.replace(/^./, c => c.toUpperCase());

        const deterministicIdentity: any = {
            fullName: `${prospect.firstName} ${prospect.lastName}`,
            currentRole: 'Executive',
            companyName: defaultCompany,
            email: prospect.email,
            website: `https://www.${domain}.com`,
            linkedInUrl: '',
            companySize: '',
            avatarUrl: '', // Explicit base field
            targetCustomers: [],
            employmentHistory: [],
            education: [],
            bio: ''
        };

        // If the API immediately returned enriched data (cache hit), use it right away
        if (data && data.enriched_profile) {
            const p = data.enriched_profile;
            deterministicIdentity.fullName = p.fullName || deterministicIdentity.fullName;
            deterministicIdentity.currentRole = p.currentRole || deterministicIdentity.currentRole;
            deterministicIdentity.companyName = p.companyName || p.companyDomain || deterministicIdentity.companyName;
            deterministicIdentity.linkedInUrl = p.linkedInUrl || '';
            deterministicIdentity.avatarUrl = p.profileImageUrl || '';
            deterministicIdentity.bio = p.bio || '';
            deterministicIdentity.employmentHistory = p.employmentHistory || [];
            deterministicIdentity.education = p.education || [];
        }

        // 3. Set state and navigate
        setProspectingData({
            identity: deterministicIdentity,
            organization: null,
            seller: seller,
            insights: null
        });

        setActiveSection('prospect');
        setActiveTab('profile');

        // 4. Trigger Dynamic Prompt fetching (Generative part) with fresh context due to React stale closure
        fetchDynamicTabData('profile', {
            identity: deterministicIdentity,
            organization: null,
            seller: seller
        });
    };

    /**
     * Registry-based rendering logic for dynamic stage views.
     */
    const renderStageView = () => {
        // 1. We no longer block the entire view on isEnriching or isLoading
        // so that individual stages can render their own skeletons.
        // if (isEnriching || isLoading(activeTab)) {
        //     return <SkeletonCard />;
        // }

        // 2. Section: Home
        if (activeSection === 'home') return <Stage0Home onExplore={handleExplore} />;

        // 3. Section: Prospect (Sales Insights)
        if (activeSection === 'prospect') {
            const PROSPECT_TABS: Record<string, ReactNode> = {
                profile: <Stage1Profile data={data as any} />,
                power: <Stage2Stakeholder data={data as any} />,
                pain: <Stage4Need data={data as any} />,
                path: <Stage5Path data={data as any} />,
            };
            return PROSPECT_TABS[activeTab] || null;
        }

        // 4. Section: Qualification (Deep Dives)
        if (activeSection === 'qualification') {
            const QUAL_TABS: Record<string, ReactNode> = {
                budget: <BudgetAssessment />,
                authority: <AuthorityDeepDive />,
                bant_need: <NeedDeepDive data={data as any} />,
                bant_timeline: <TimelineDeepDive data={data as any} />,
            };
            return QUAL_TABS[activeTab] || null;
        }

        // 5. Section: Solutions (Placeholder)
        if (activeSection === 'solutions') {
            return <PlaceholderView title="Solutions" icon="lightbulb" />;
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

