
export interface DashboardData {
    identity: {
        name: string;
        role: string;
        company: string;
        linkedin?: string;
        website?: string;
        company_size?: string;
        target_customers?: string;
        email?: string;
        bio?: string;
        personality_tags?: string[];
    };
    company_scale?: {
        active_users?: string;
        organizations?: string;
        funding?: string;
        revenue_growth?: string;
        recent_exit?: string;
    };
    stakeholders: Array<{
        name: string;
        role: string;
        title: string;
        avatar?: string;
        influence: 'High' | 'Medium' | 'Low';
    }>;

    buying_process: {
        steps: Array<{
            name: string;
            status: 'Completed' | 'In Progress' | 'Pending' | 'Unknown';
            date?: string | null;
        }>;
        key_drivers: string[];
    };
    risk_analysis: {
        risks: Array<{
            description: string;
            severity: 'Low' | 'Medium' | 'High';
        }>;
    };
    // Kept for backward compatibility if needed, but likely deprecated
    budget: {
        status: string;
        justification: string | null;
    };
    pain_urgency: {
        pain_points: string[];
        timing_insights: string[];
        decision_drivers: string[];
        urgency_level: 'High' | 'Medium' | 'Low';
        business_impact: string;
        impact_metrics: string[];
        executive_visibility: string;
    };
    deal_strength: {
        score: number;
        signal: string;
        rating: string;
        risks: string[]; // For backward compatibility if needed
    };
    action_engine: {
        tasks: Array<{
            title: string;
            priority?: 'High' | 'Medium' | 'Low';
        }>;
    };
    industry_trends: {
        industry: string;
        growth_rate?: string;
        market_cap?: string;
    };
    profile_fit: {
        contact: {
            role: string;
            seniority: string;
            functional_ownership: string;
            tenure: string;
            career_trajectory: string;
            digital_footprint: string;
            past_pedigree: string;
        };
        company: {
            revenue_range: string;
            geography: string;
            growth_stage: string;
            funding_status: string;
            hiring_trend: string;
            industry_context: string;
        };
        business: {
            recent_news: string;
            market_pressures: string;
            digital_maturity: string;
        };
        output: {
            icp_score: number;
            timing_signal: string;
        };
    };
}


