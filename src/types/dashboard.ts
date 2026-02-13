
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
            status: 'Completed' | 'In Progress' | 'Pending';
            date?: string;
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
        justification: string;
    };
    pain_urgency: {
        pain_points: string[];
        timing_insights: string[];
        decision_drivers: string[];
    };
    deal_strength: {
        rating: string;
        risks: string[];
    };
    action_engine: {
        tasks: Array<{
            title: string;
            priority?: 'High' | 'Medium' | 'Low';
        }>;
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
