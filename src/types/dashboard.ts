
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
            kpis?: {
                revenue_history: Array<{
                    year: string;
                    revenue_growth: number;
                    net_profit_margin: number;
                }>;
                market_share: string;
                employees: string;
                hiring_velocity: string;
                product_launches: string;
            };
        };
        output: {
            icp_score: number;
            timing_signal: string;
        };
    };

    velocity_path?: {
        ecosystem_fit: {
            infrastructure: { value: string };
            compliance: { value: string };
            implementation_complexity: { value: string; level: 'Low' | 'Medium' | 'High' | 'Unknown' };
        };
        access_strategy: {
            // Single collapsed entry for the prospect contact
            contact_profile: {
                name: string;
                current_role: string;
                founder_exits: Array<{ company: string; period: string; note?: string }>;
                skills: string[];
            };
            pedigree: Array<{ school: string; degree: string; year: string }>;
            partner_overlap: Array<{ partner: string; type: string }>;
        };
    };

    bant_timeline?: {
        // Elevated Strip: Compelling Events over time
        compelling_events: Array<{
            label: string;
            date: string | null;
            countdown_days: number | null;
            type: 'regulatory' | 'fiscal' | 'competitive' | 'market';
            pressure: 'High' | 'Medium' | 'Low';
        }>;
        // Card Left: Buying Phase & Velocity
        buying_stage: string;
        days_in_phase: number;
        velocity_pattern: 'Accelerating' | 'Stable' | 'Slowing' | 'Stalled';
        velocity_cadence: string;
        velocity_avg_days: number;
        all_stages: string[];
        // Card Right: Implementation Readiness
        implementation_readiness: 'High' | 'Medium' | 'Low' | 'Unknown';
        implementation_notes: string[];
        // Card Bottom: Procurement Friction
        procurement_steps: string[];
        procurement_bottlenecks: string[];
    };
}


