import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ProspectIntelligence } from '../contracts';

// Context shape
interface ProspectingContextType {
    prospectingData: ProspectIntelligence;
    setProspectingData: React.Dispatch<React.SetStateAction<ProspectIntelligence>>;
    updateInsightData: (tabName: keyof NonNullable<ProspectIntelligence['insights']>, data: any) => void;
}

// Create the Context with a default empty state
const ProspectingContext = createContext<ProspectingContextType | undefined>(undefined);

// Props for the Provider component
interface DashboardContainerProps {
    children: ReactNode;
    initialData?: Partial<ProspectIntelligence>;
}

/**
 * The DashboardContainer acts as the Provider for the Master State (SSoT).
 * It wraps the application or section that needs access to the prospecting data.
 */
export const DashboardContainer: React.FC<DashboardContainerProps> = ({ children, initialData }) => {
    // Initialize the master state
    const [prospectingData, setProspectingData] = useState<ProspectIntelligence>({
        identity: initialData?.identity || null,
        organization: initialData?.organization || null,
        seller: initialData?.seller || null,
        insights: initialData?.insights || null,
    });

    /**
     * Helper to update specific insight data (e.g., when a tab lazy-loads its content)
     */
    const updateInsightData = (tabName: keyof NonNullable<ProspectIntelligence['insights']>, data: any) => {
        setProspectingData((prev) => ({
            ...prev,
            insights: {
                ...(prev.insights || {}),
                [tabName]: data,
            },
        }));
    };

    return (
        <ProspectingContext.Provider value={{ prospectingData, setProspectingData, updateInsightData }}>
            {children}
        </ProspectingContext.Provider>
    );
};

/**
 * Hook to access the Prospecting Master State.
 * Must be used within a DashboardContainer.
 */
export const useProspecting = (): ProspectingContextType => {
    const context = useContext(ProspectingContext);
    if (!context) {
        throw new Error('useProspecting must be used within a DashboardContainer');
    }
    return context;
};
