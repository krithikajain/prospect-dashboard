import { useState } from 'react';
import { useProspecting, type SalesIntelligenceContract } from '@/context/ProspectingContext';

/**
 * Custom hook to manage lazy-loading of tab data.
 * Checks the SSoT (ProspectingContext) before making a fetch request.
 */
export function usePromptController() {
    const { prospectingData, updateInsightData } = useProspecting();
    const [loadingTabs, setLoadingTabs] = useState<Record<string, boolean>>({});

    /**
     * Handles switching tabs. If the required data is missing in the SSoT,
     * it triggers a mock 'Prompt' fetch using the existing identity/organization context.
     * 
     * @param tabName - The ID of the tab (e.g., 'power', 'pain', 'path')
     */
    const handleTabChange = async (tabName: string) => {
        // We only care about dynamically fetching specific functional "insight" tabs
        const insightKeys = ['profile', 'power', 'pain', 'path'] as const;
        type InsightKey = typeof insightKeys[number];

        const isInsightKey = (key: string): key is InsightKey => {
            return insightKeys.includes(key as InsightKey);
        };

        if (!isInsightKey(tabName)) return; // Not a dynamic insight tab (like Home)

        const validTab = tabName;

        // Check if data ALREADY exists in our Master State SSoT
        if (prospectingData.insights?.[validTab]) {
            console.log(`[SSoT Cache Hit] Data for '${validTab}' already exists. Skipping fetch.`);
            return;
        }

        console.log(`[SSoT Cache Miss] Missing data for '${validTab}'. Triggering Prompt Controller...`);

        // Data is missing: Trigger Loading State
        setLoadingTabs(prev => ({ ...prev, [validTab]: true }));

        try {
            // Mocking an LLM/API fetch call that passes the current context
            const newData = await fetchTabData(validTab, {
                identity: prospectingData.identity,
                organization: prospectingData.organization
            });

            // Update Master State SSoT
            updateInsightData(validTab, newData);
        } catch (error) {
            console.error(`Error fetching data for ${validTab}:`, error);
        } finally {
            // Remove Loading State
            setLoadingTabs(prev => ({ ...prev, [validTab]: false }));
        }
    };

    /**
     * Helper to check if a specific tab is currently loading
     */
    const isLoading = (tabName: string) => !!loadingTabs[tabName];

    return {
        handleTabChange,
        isLoading
    };
}

/**
 * Mock function representing an LLM or API call that fetches specific tab data.
 * In a real scenario, this would send the prompt along with the existing context.
 */
async function fetchTabData(
    tabName: 'profile' | 'power' | 'pain' | 'path',
    context: { identity: any, organization: any }
) {
    console.log(`[Prompt Execution] Context passed for '${tabName}':`, context);

    // Simulate network delay (1.5 seconds)
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`[Prompt Execution] Successfully generated data for '${tabName}'.`);
            resolve({
                _loaded_at: new Date().toISOString(),
                _source: 'Mock LLM Response',
                note: `This is dummy lazy-loaded data for the ${tabName} tab.`
            });
        }, 1500);
    });
}
