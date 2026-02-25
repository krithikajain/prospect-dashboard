/**
 * Structured mock data for the Budget Assessment module (BANT — B).
 * Prospect: Class (Michael Chasen) | Customer: Malvern Panalytical
 * All fields tagged with isMock to indicate data provenance.
 */

export interface BudgetDirectSignals {
    allocationStatus: { value: 'Allocated' | 'Pending Approval' | 'Exploratory' | 'Unknown'; isMock: boolean };
    budgetAmount: { value: string; isMock: boolean };
    fiscalYearContext: { value: 'Current FY' | 'Next FY' | 'Multi-year' | 'Unknown'; isMock: boolean };
    financeInvolvement: { value: 'Yes' | 'No' | 'Unknown'; isMock: boolean };
    evidenceBullets: { value: string; isMock: boolean }[];
    confidenceLevel: { value: 'Confirmed' | 'Verbal' | 'Inferred' | 'Unknown'; isMock: boolean };
}

export interface BudgetSpendCapacity {
    revenueTier: { value: 'Enterprise' | 'Mid-market' | 'Growth' | 'Early-stage'; isMock: boolean };
    fundingStage: { value: string; isMock: boolean };
    profitabilitySignal: { value: 'Positive' | 'Unclear' | 'Negative'; isMock: boolean };
    departmentScale: { value: string; isMock: boolean };
    spendCapacityTier: { value: 'High' | 'Moderate' | 'Constrained'; isMock: boolean };
    evidence: { value: string; isMock: boolean }[];
}

export interface BudgetTrends {
    recentTrend: { value: 'Increasing' | 'Stable' | 'Decreasing' | 'Unknown'; isMock: boolean };
    strategicSignals: { value: string; isMock: boolean }[];
    riskIndicators: { value: string; isMock: boolean }[];
}

export interface BudgetFundingSources {
    primarySourceType: { value: string; isMock: boolean };
    flexibilityLevel: { value: 'High' | 'Moderate' | 'Low'; isMock: boolean };
    alternativePaths: { value: string; isMock: boolean }[];
}

export interface BudgetProcurement {
    priorVendorPresence: { value: 'Yes' | 'No' | 'Unknown'; isMock: boolean };
    estimatedContractTier: { value: 'Small' | 'Mid' | 'Enterprise' | 'Unknown'; isMock: boolean };
    procurementMaturity: { value: 'High' | 'Moderate' | 'Low'; isMock: boolean };
    renewalWindow: { value: string; isMock: boolean };
    vendorStickinessRisk: { value: 'Low' | 'Moderate' | 'High'; isMock: boolean };
}

export interface BudgetBehavioralSignals {
    commercialEngagement: { value: 'Low' | 'Moderate' | 'High'; isMock: boolean };
    pricingSensitivity: { value: string; isMock: boolean }[];
    evidenceBullets: { value: string; isMock: boolean }[];
    inferredAppetite: { value: 'Strong' | 'Moderate' | 'Weak' | 'Unknown'; isMock: boolean };
}

export interface BudgetSynthesisData {
    readinessState: { value: 'Confirmed & Allocated' | 'Likely but Unconfirmed' | 'Exploratory' | 'High Risk / No Budget Evidence'; isMock: boolean };
    spendCapacityTier: { value: 'High' | 'Moderate' | 'Constrained'; isMock: boolean };
    procurementMaturity: { value: 'High' | 'Moderate' | 'Low'; isMock: boolean };
    commercialAppetite: { value: 'High' | 'Moderate' | 'Low'; isMock: boolean };
    keyStrengths: { value: string; isMock: boolean }[];
    keyRisks: { value: string; isMock: boolean }[];
    dataGaps: string[];
}

export interface BudgetAssessmentData {
    directSignals: BudgetDirectSignals;
    spendCapacity: BudgetSpendCapacity;
    trends: BudgetTrends;
    fundingSources: BudgetFundingSources;
    procurement: BudgetProcurement;
    behavioralSignals: BudgetBehavioralSignals;
    synthesis: BudgetSynthesisData;
}

// ── Mock Data ──────────────────────────────────────────────

export const BUDGET_DATA: BudgetAssessmentData = {
    directSignals: {
        allocationStatus: { value: 'Exploratory', isMock: false },
        budgetAmount: { value: 'Not disclosed', isMock: false },
        fiscalYearContext: { value: 'Current FY', isMock: true },
        financeInvolvement: { value: 'Unknown', isMock: false },
        evidenceBullets: [
            { value: 'ROI-driven justification discussed — reduction in R&D rework by up to 20%', isMock: false },
            { value: 'Quantifiable benefit framing suggests mid-to-late budget cycle positioning', isMock: true },
            { value: 'No explicit CFO or Finance mention in meeting transcripts', isMock: false },
        ],
        confidenceLevel: { value: 'Inferred', isMock: false },
    },
    spendCapacity: {
        revenueTier: { value: 'Growth', isMock: false },
        fundingStage: { value: 'Series C ($120M raised)', isMock: false },
        profitabilitySignal: { value: 'Unclear', isMock: true },
        departmentScale: { value: '500–1,000 employees', isMock: false },
        spendCapacityTier: { value: 'Moderate', isMock: false },
        evidence: [
            { value: '$120M Series C indicates strong investor confidence', isMock: false },
            { value: 'Revenue $50M–$100M range — mid-market with growth trajectory', isMock: false },
            { value: 'Expanding hiring (+15% YoY) signals discretionary spending', isMock: false },
        ],
    },
    trends: {
        recentTrend: { value: 'Increasing', isMock: true },
        strategicSignals: [
            { value: 'Recent $120M Series C to accelerate AI capabilities', isMock: false },
            { value: 'Actively adopting AI tools, moving away from legacy stacks', isMock: false },
            { value: 'New EdTech initiatives aligned to virtual learning innovation', isMock: true },
        ],
        riskIndicators: [
            { value: 'Competitive pressure from legacy CRM providers consolidating tech', isMock: false },
        ],
    },
    fundingSources: {
        primarySourceType: { value: 'Venture Capital (Series C)', isMock: false },
        flexibilityLevel: { value: 'Moderate', isMock: true },
        alternativePaths: [
            { value: 'ROI-backed justification — 20% R&D rework reduction', isMock: false },
            { value: 'Phased rollout to reduce initial commitment', isMock: true },
            { value: 'Co-funded pilot with EdTech innovation budget', isMock: true },
        ],
    },
    procurement: {
        priorVendorPresence: { value: 'Yes', isMock: true },
        estimatedContractTier: { value: 'Mid', isMock: true },
        procurementMaturity: { value: 'Moderate', isMock: true },
        renewalWindow: { value: 'Q3 FY25 (estimated)', isMock: true },
        vendorStickinessRisk: { value: 'Moderate', isMock: true },
    },
    behavioralSignals: {
        commercialEngagement: { value: 'Moderate', isMock: true },
        pricingSensitivity: [
            { value: 'ROI model requested — value-driven buyer', isMock: false },
            { value: 'No discount negotiations initiated', isMock: true },
        ],
        evidenceBullets: [
            { value: 'Engaged with quantifiable benefit framing in discovery', isMock: false },
            { value: 'Requested case studies with measurable outcomes', isMock: true },
            { value: 'Multi-year pricing not yet explored', isMock: true },
        ],
        inferredAppetite: { value: 'Moderate', isMock: false },
    },
    synthesis: {
        readinessState: { value: 'Likely but Unconfirmed', isMock: false },
        spendCapacityTier: { value: 'Moderate', isMock: false },
        procurementMaturity: { value: 'Moderate', isMock: true },
        commercialAppetite: { value: 'Moderate', isMock: false },
        keyStrengths: [
            { value: '$120M Series C demonstrates strong investment capacity', isMock: false },
            { value: 'ROI framing already resonates — 20% R&D rework reduction', isMock: false },
            { value: 'Active technology modernization away from legacy stacks', isMock: false },
            { value: 'Expanding headcount signals growth-phase discretionary spend', isMock: false },
            { value: 'Strategic AI investment aligns with solution positioning', isMock: false },
        ],
        keyRisks: [
            { value: 'No explicit budget line item or allocation confirmed', isMock: false },
            { value: 'Finance / CFO involvement not yet detected', isMock: false },
            { value: 'Profitability signal unclear — burn rate unknown', isMock: true },
            { value: 'Competitive vendor lock-in risk from existing tools', isMock: true },
            { value: 'Procurement stringency may extend cycle by 3–4 weeks', isMock: false },
        ],
        dataGaps: [
            'Exact budget amount or range',
            'CFO / Finance team engagement status',
            'Current vendor contract expiration dates',
            'CapEx vs OpEx classification preference',
            'Multi-year commitment willingness',
        ],
    },
};
