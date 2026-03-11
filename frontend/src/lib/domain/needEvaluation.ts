

/**
 * Domain Logic: Need Assessment
 * Evaluates the five strict categories for BANT Need qualification.
 */

interface NeedEvaluation {
    corePain: {
        impact: string;
        metrics: string[];
    };
    strategicMandates: {
        urgencyLevel: 'High' | 'Medium' | 'Low';
        drivers: string[];
    };
    competitivePressures: {
        marketPressures: string;
        industryGrowth?: string;
    };
    workflowGaps: {
        painPoints: string[];
        infrastructure: string;
    };
    executiveVisibility: {
        visibility: string;
    };
}

export function evaluateNeed(data: any): NeedEvaluation {
    return {
        corePain: {
            impact: data?.pain_urgency?.business_impact || "Business impact undefined. Complete Need Analysis.",
            metrics: data?.pain_urgency?.impact_metrics || ["TBD"],
        },
        strategicMandates: {
            urgencyLevel: data?.pain_urgency?.urgency_level || 'Medium',
            drivers: data?.pain_urgency?.decision_drivers || ["TBD"],
        },
        competitivePressures: {
            marketPressures: data?.profile_fit?.business?.market_pressures || "Unknown pressure.",
            industryGrowth: data?.industry_trends?.growth_rate || "Unknown",
        },
        workflowGaps: {
            painPoints: data?.pain_urgency?.pain_points || ["TBD"],
            infrastructure: data?.velocity_path?.ecosystem_fit?.infrastructure?.value || 'Unknown',
        },
        executiveVisibility: {
            visibility: data?.pain_urgency?.executive_visibility || 'Unknown',
        }
    };
}
