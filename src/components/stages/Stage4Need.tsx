import type { DashboardData } from '@/types/dashboard';
import { ProblemClarity } from './need/ProblemClarity';
import { ImpactSeverity } from './need/ImpactSeverity';
import { NeedUrgencyDrivers } from './need/NeedUrgencyDrivers';
import { InternalFriction } from './need/InternalFriction';
import { PoliticalWeight } from './need/PoliticalWeight';

/**
 * Stage 4 — Need / Pain Analysis.
 * Pure layout orchestrator.
 */
export function Stage4Need({ data }: { data: DashboardData }) {
    const painPoints = data.pain_urgency?.pain_points || [];

    return (
        <div className="flex flex-col gap-6">

            {/* Row 1: Problem + Impact */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ProblemClarity firstPainPoint={painPoints[0]} />
                <ImpactSeverity />
            </div>

            {/* Row 2: Urgency + Friction + Political */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <NeedUrgencyDrivers />
                <InternalFriction />
                <PoliticalWeight />
            </div>

        </div>
    );
}
