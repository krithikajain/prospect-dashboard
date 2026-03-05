import React, { createContext, useContext, useState, type ReactNode } from 'react';

// The Master State structure (SalesIntelligenceContract)
export interface SalesIntelligenceContract {
    identity: any | null;
    organization: any | null;
    insights: {
        profile?: any;
        power?: any;
        pain?: any;
        path?: any;
    } | null;
}

// Context shape
interface ProspectingContextType {
    prospectingData: SalesIntelligenceContract;
    setProspectingData: React.Dispatch<React.SetStateAction<SalesIntelligenceContract>>;
    updateInsightData: (tabName: keyof SalesIntelligenceContract['insights'], data: any) => void;
}

// Create the Context with a default empty state
const ProspectingContext = createContext<ProspectingContextType | undefined>(undefined);

// Props for the Provider component
interface DashboardContainerProps {
    children: ReactNode;
    initialData?: Partial<SalesIntelligenceContract>;
}

/**
 * The DashboardContainer acts as the Provider for the Master State (SSoT).
 * It wraps the application or section that needs access to the prospecting data.
 */
export const DashboardContainer: React.FC<DashboardContainerProps> = ({ children, initialData }) => {
    // Initialize the master state
    const [prospectingData, setProspectingData] = useState<SalesIntelligenceContract>({
        identity: initialData?.identity || null,
        organization: initialData?.organization || null,
        insights: initialData?.insights || null,
    });

    /**
     * Helper to update specific insight data (e.g., when a tab lazy-loads its content)
     */
    const updateInsightData = (tabName: keyof NonNullable<SalesIntelligenceContract['insights']>, data: any) => {
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
