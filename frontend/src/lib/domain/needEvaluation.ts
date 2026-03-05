import type { DashboardData } from '@/types/dashboard';

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

export function evaluateNeed(data: DashboardData): NeedEvaluation {
    return {
        corePain: {
            impact: data.pain_urgency.business_impact,
            metrics: data.pain_urgency.impact_metrics,
        },
        strategicMandates: {
            urgencyLevel: data.pain_urgency.urgency_level,
            drivers: data.pain_urgency.decision_drivers,
        },
        competitivePressures: {
            marketPressures: data.profile_fit.business.market_pressures,
            industryGrowth: data.industry_trends.growth_rate,
        },
        workflowGaps: {
            painPoints: data.pain_urgency.pain_points,
            // Fallback since velocity_path is optional
            infrastructure: data.velocity_path?.ecosystem_fit.infrastructure.value || 'Unknown',
        },
        executiveVisibility: {
            visibility: data.pain_urgency.executive_visibility,
        }
    };
}
