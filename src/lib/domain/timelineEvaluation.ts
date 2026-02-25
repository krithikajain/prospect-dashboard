import type { DashboardData } from '@/types/dashboard';

/**
 * Domain Logic: Timeline Assessment
 * Maps the 4 core BANT Timeline categories:
 * 1. Compelling Events ("The Clock")
 * 2. Buying Phase & Velocity ("The Pulse")
 * 3. Implementation Readiness ("The Capacity")
 * 4. Procurement Architecture ("The Friction")
 */

export interface TimelineEvaluation {
    compellingEvents: {
        events: Array<{
            label: string;
            date: string | null;
            countdown_days: number | null;
            type: 'regulatory' | 'fiscal' | 'competitive' | 'market';
            pressure: 'High' | 'Medium' | 'Low';
        }>;
        count: number;
    };
    buyingPhase: {
        currentStage: string;
        allStages: string[];
        currentIndex: number;
        daysInPhase: number;
    };
    velocity: {
        pattern: 'Accelerating' | 'Stable' | 'Slowing' | 'Stalled';
        cadence: string;
        avgDays: number;
    };
    implementationReadiness: {
        level: 'High' | 'Medium' | 'Low' | 'Unknown';
        notes: string[];
    };
    procurementArchitecture: {
        steps: string[];
        bottlenecks: string[];
    };
}

export function evaluateTimeline(data: DashboardData): TimelineEvaluation {
    const tl = data.bant_timeline;

    if (!tl) {
        return {
            compellingEvents: { events: [], count: 0 },
            buyingPhase: {
                currentStage: 'Unknown',
                allStages: ['Awareness', 'Evaluation', 'Decision', 'Procurement', 'Implementation'],
                currentIndex: -1,
                daysInPhase: 0,
            },
            velocity: {
                pattern: 'Stable',
                cadence: 'Unknown',
                avgDays: 0,
            },
            implementationReadiness: { level: 'Unknown', notes: ['No readiness data available.'] },
            procurementArchitecture: { steps: [], bottlenecks: [] },
        };
    }

    // Normalize current stage index
    const stageLower = tl.buying_stage.toLowerCase();
    const currentIndex = tl.all_stages.findIndex(s => s.toLowerCase() === stageLower);

    return {
        compellingEvents: {
            events: tl.compelling_events,
            count: tl.compelling_events.length,
        },
        buyingPhase: {
            currentStage: tl.buying_stage,
            allStages: tl.all_stages,
            currentIndex: currentIndex === -1 ? 1 : currentIndex, // default to Evaluation
            daysInPhase: tl.days_in_phase,
        },
        velocity: {
            pattern: tl.velocity_pattern,
            cadence: tl.velocity_cadence,
            avgDays: tl.velocity_avg_days,
        },
        implementationReadiness: {
            level: tl.implementation_readiness,
            notes: tl.implementation_notes,
        },
        procurementArchitecture: {
            steps: tl.procurement_steps,
            bottlenecks: tl.procurement_bottlenecks,
        },
    };
}
