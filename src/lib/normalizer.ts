import type { DashboardData } from '../types/dashboard';

// Helper to safely parse JSON strings or return the object if already parsed
const safeParse = (data: any, fallback: any = {}) => {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error('Failed to parse JSON field:', e);
            return fallback;
        }
    }
    return data || fallback;
};

// Helper to extract tagged items from a list of strings
const extractTaggedItems = (items: string[], tag: string): string[] => {
    if (!Array.isArray(items)) return [];
    return items
        .filter(item => item.includes(tag))
        .map(item => item.replace(tag, '').trim());
};

export const normalizeProspectData = (rawData: any): DashboardData => {
    // 1. Data Parsing
    const prospectPOC = safeParse(rawData.prospect_poc);
    const companyOverview = safeParse(rawData.prospect_company_overview);
    const bant = safeParse(rawData.bant_assessment);
    const industryTrends = safeParse(rawData.industry_trends);
    const buyingCycle = safeParse(rawData.buying_cycle);
    // const actionEngine = safeParse(rawData.actionable_next_steps, []); 
    const companyDetails = safeParse(rawData.prospect_company_overview)?.company_details || {};

    // 2. Identity
    // Extract Contact Info
    const contactInfo = prospectPOC.contact_information || {};

    // 3. Authority
    const authorityAnalysis = bant.authority_analysis || {};

    // 4. Budget
    const budgetAnalysis = bant.budget_analysis || {};

    // 5. Pain & Urgency
    const topTrends = industryTrends.top_trends || [];
    const painPoints = extractTaggedItems(topTrends, '[Pain Point]');
    const timingInsights = extractTaggedItems(topTrends, '[Timing Insight]');
    const decisionDrivers = extractTaggedItems(topTrends, '[Decision Driver]');
    // Also grab explicit pain points if available in bant
    const bantPainPoints = bant.need_analysis?.pain_points || [];

    // 6. Buying Process
    // const procurementProcess = buyingCycle.procurement_process || {};

    // 7. Deal Strength
    const dealRisks = bant.potential_deal_risks || [];

    // 8. Action Engine
    // Handle various structures of actionable_next_steps if it varies
    let tasks: any[] = [];
    if (Array.isArray(rawData.actionable_next_steps)) {
        tasks = rawData.actionable_next_steps.map((step: string) => ({ title: step, priority: 'Medium' }));
    } else if (bant.actionable_next_steps) {
        tasks = bant.actionable_next_steps.map((step: string) => ({ title: step, priority: 'Medium' }));
    }

    return {
        identity: {
            name: `${rawData.prospect_first_name} ${rawData.prospect_last_name}`,
            role: prospectPOC.current_job_title || rawData.title,
            company: rawData.prospect_company,
            email: rawData.prospect_email,
            linkedin: contactInfo.linkedin,
            website: companyDetails.website,
            company_size: companyOverview.company_size, // Might be undefined in raw, handled by optional
            target_customers: companyOverview.target_customers,
        },
        stakeholders: [
            // Map decision makers
            ...(authorityAnalysis.decision_makers || []).map((dm: any) => ({
                name: dm.name || 'Unknown',
                role: dm.role || 'Decision Maker',
                title: 'Unknown Title',
                influence: 'High' as const,
                avatar: ''
            })),
            // Map influencers
            ...(authorityAnalysis.influencers_and_approvers || []).map((inf: any) => ({
                name: inf.name || 'Unknown',
                role: inf.role || 'Champion',
                title: 'Unknown Title',
                influence: 'Medium' as const,
                avatar: ''
            }))
        ],
        qualification_framework: {
            name: 'MEDDIC', // Default to MEDDIC for now
            criteria: [
                { name: 'Metrics', status: 'Partial', notes: 'ROI defined but not verified' },
                { name: 'Economic Buyer', status: (authorityAnalysis.decision_makers || []).length > 0 ? 'Met' : 'Missing', notes: 'Identified decision makers' },
                { name: 'Decision Criteria', status: 'Met', notes: 'Clear technical requirements' },
                { name: 'Decision Process', status: 'Partial', notes: 'Procurement steps outlined' },
                { name: 'Implicate Pain', status: 'Met', notes: 'Pain points clearly mapped' },
                { name: 'Champion', status: (authorityAnalysis.influencers_and_approvers || []).length > 0 ? 'Met' : 'Missing', notes: 'Internal advocates identified' }
            ]
        },
        buying_process: {
            steps: (buyingCycle.buying_cycle_stages?.stages || []).map((step: string, index: number) => ({
                name: step,
                status: index < 2 ? 'Completed' : index === 2 ? 'In Progress' : 'Pending',
                date: new Date().toLocaleDateString()
            })),
            key_drivers: decisionDrivers
        },
        risk_analysis: {
            risks: dealRisks.map((risk: string) => ({
                description: risk,
                severity: 'Medium'
            }))
        },
        budget: {
            status: budgetAnalysis.budget_status || 'Unknown',
            justification: budgetAnalysis.financial_justification || 'No justification provided.'
        },
        pain_urgency: {
            pain_points: [...painPoints, ...bantPainPoints], // Combine tagged and explicit
            timing_insights: timingInsights,
            decision_drivers: decisionDrivers
        },
        deal_strength: {
            rating: bant.deal_strength_rating || 'Unknown',
            risks: dealRisks
        },
        action_engine: {
            tasks: tasks
        }
    };
};
