export interface DataEntry<T> {
    value: T;
    isMock: boolean;
}

export interface BudgetBehavioralSignals {
    commercialEngagement: DataEntry<string>;
    inferredAppetite: DataEntry<string>;
    pricingSensitivity: Array<DataEntry<string>>;
    evidenceBullets: Array<DataEntry<string>>;
}

export interface BudgetSynthesisData {
    readinessState: DataEntry<string>;
    spendCapacityTier: DataEntry<string>;
    procurementMaturity: DataEntry<string>;
    commercialAppetite: DataEntry<string>;
    keyStrengths: Array<DataEntry<string>>;
    keyRisks: Array<DataEntry<string>>;
    dataGaps: string[];
}

export interface BudgetTrends {
    recentTrend: DataEntry<string>;
    strategicSignals: Array<DataEntry<string>>;
    riskIndicators: Array<DataEntry<string>>;
}

export interface BudgetDirectSignals {
    hasStatedBudget: DataEntry<boolean>;
    statedAmount: DataEntry<string>;
    budgetAmount: DataEntry<string>;
    allocationStatus: DataEntry<string>;
    confidenceLevel: DataEntry<string>;
    budgetContext: DataEntry<string>;
    fiscalYearContext: DataEntry<string>;
    financeInvolvement: DataEntry<string>;
    evidenceBullets: Array<DataEntry<string>>;
}

export interface BudgetFundingSources {
    primarySource: DataEntry<string>;
    primarySourceType: DataEntry<string>;
    fundingStage: DataEntry<string>;
    recentFundingAmount: DataEntry<string>;
    flexibilityLevel: DataEntry<string>;
    alternativePaths: Array<DataEntry<string>>;
}

export interface BudgetProcurement {
    maturityLevel: DataEntry<string>;
    complexityRating: DataEntry<string>;
    typicalCycle: DataEntry<string>;
    priorVendorPresence: DataEntry<string>;
    estimatedContractTier: DataEntry<string>;
    procurementMaturity: DataEntry<string>;
    renewalWindow: DataEntry<string>;
    vendorStickinessRisk: DataEntry<string>;
    recentHistory: Array<DataEntry<string>>;
}

export interface BudgetSpendCapacity {
    spendCapacityTier: DataEntry<string>;
    revenueTier: DataEntry<string>;
    fundingStage: DataEntry<string>;
    profitabilitySignal: DataEntry<string>;
    departmentScale: DataEntry<string>;
    evidence: Array<DataEntry<string>>;
}
