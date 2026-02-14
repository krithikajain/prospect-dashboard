
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
    qualification_framework: {
        name: string;
        criteria: Array<{
            name: string;
            status: 'Met' | 'Partial' | 'Missing';
            notes: string;
        }>;
    };
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
    };
}

export interface Note {
    id: string;
    content: string;
    timestamp: string;
    author: string;
    tags: string[];
}

export interface Task {
    id: string;
    title: string;
    status: 'Todo' | 'In Progress' | 'Done';
    assignee?: string;
    dueDate?: string;
}
