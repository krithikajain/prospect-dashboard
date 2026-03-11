import { useState } from 'react';
import { useProspecting } from '@/context/ProspectingContext';

/**
 * Custom hook to manage lazy-loading of tab data.
 * Checks the SSoT (ProspectingContext) before making a fetch request.
 */
export function usePromptController() {
    const { prospectingData, updateInsightData } = useProspecting();
    const [loadingTabs, setLoadingTabs] = useState<Record<string, boolean>>({});

    /**
     * Handles switching tabs. If the required data is missing in the SSoT,
     * it triggers a fetch using the existing identity/organization context.
     * 
     * @param tabName - The ID of the tab (e.g., 'power', 'pain', 'path')
     * @param overrideContext - Fresh identity/org/seller data to use instead of the potentially-stale SSoT
     */
    const handleTabChange = async (tabName: string, overrideContext?: { identity: any; organization: any; seller?: any }) => {
        // We only care about dynamically fetching specific functional "insight" tabs
        const insightKeys = ['profile', 'power', 'pain', 'path'] as const;
        type InsightKey = typeof insightKeys[number];

        const isInsightKey = (key: string): key is InsightKey => {
            return insightKeys.includes(key as InsightKey);
        };

        if (!isInsightKey(tabName)) return; // Not a dynamic insight tab (like Home)

        const validTab = tabName;

        // If we have an override (fresh prospect search), skip cache and force a new fetch
        if (!overrideContext) {
            // Check if data ALREADY exists in our Master State SSoT
            if (prospectingData.insights?.[validTab]) {
                console.log(`[SSoT Cache Hit] Data for '${validTab}' already exists. Skipping fetch.`);
                return;
            }
        }

        console.log(`[SSoT Cache Miss] Missing data for '${validTab}'. Triggering Prompt Controller...`);

        // Data is missing: Trigger Loading State
        setLoadingTabs(prev => ({ ...prev, [validTab]: true }));

        try {
            // Use override context (fresh) or fall back to SSoT context
            const context = overrideContext ?? {
                identity: prospectingData.identity,
                organization: prospectingData.organization,
                seller: prospectingData.seller
            };

            // Fetch LLM data
            const newData = await fetchTabData(validTab, context);

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
 * Fetches tab-specific data from the backend LLM endpoint.
 * 
 * Maps the frontend SSoT identity shape (name, company, role)
 * to the backend PromptContext shape (fullName, companyName, currentRole)
 * so Pydantic validation passes on the server side.
 */
async function fetchTabData(
    tabName: 'profile' | 'power' | 'pain' | 'path',
    context: { identity: any, organization: any, seller?: any }
) {
    console.log(`[Prompt Execution] Fetching '${tabName}'...`);

    // Map frontend identity fields → backend PromptContext.identity fields
    const identity = context.identity ? {
        fullName: context.identity.name || context.identity.fullName || 'Unknown',
        currentRole: context.identity.role || context.identity.currentRole || 'Unknown',
        companyName: context.identity.company || context.identity.companyName || 'Unknown',
        email: context.identity.email || null,
        website: context.identity.website || null,
        linkedInUrl: context.identity.linkedin || context.identity.linkedInUrl || null,
        companySize: context.identity.company_size || context.identity.companySize || null,
        bio: context.identity.bio || null,
    } : null;

    const payload = {
        identity,
        organization: context.organization || null,
        seller: context.seller || null
    };

    try {
        const response = await fetch(`http://localhost:8000/api/prospect/${tabName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`[Backend Error] ${response.status}: ${errorBody}`);
            throw new Error(`Backend fetch failed with status ${response.status}`);
        }

        const data = await response.json();

        // Log the production generation metadata
        if (data._meta) {
            console.log(`[LLM Response Meta] Model: ${data._meta.modelVersion}, Generated: ${data._meta.generatedAt}`);
        }

        // DEBUG: log the full response shape so we can see what keys are returned
        console.log(`[LLM Full Response for '${tabName}']`, JSON.stringify(data, null, 2));

        // Return the specific tab's generated payload
        return data[tabName];

    } catch (e) {
        console.error(`[Prompt Execution] Failed to generate data for '${tabName}':`, e);
        // Fallback for development if backend isn't running
        return {
            _error: "Backend unavailable",
            note: "Start the python backend: `cd backend && ./venv/bin/uvicorn main:app --reload`"
        };
    }
}
