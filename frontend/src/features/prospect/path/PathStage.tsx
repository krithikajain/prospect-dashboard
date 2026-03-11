import type { DashboardData } from '@/types/dashboard';
import { calculateVelocityScores } from './components/velocityScoring';
import { VelocityMetrics } from './components/VelocityMetrics';
import { EcosystemFit } from './components/EcosystemFit';
import { AccessStrategy } from './components/AccessStrategy';
import { IntentSignals } from './components/IntentSignals';
import { CompetitiveFriction } from './components/CompetitiveFriction';

/**
 * Stage 4 — Velocity & Path (Stage5Path for backwards compatibility with router).
 * Pure layout orchestrator.
 */
export function Stage5Path({ data }: { data: DashboardData }) {
    const scores = calculateVelocityScores();
    const vp = data.velocity_path;

    return (
        <div className="flex flex-col gap-6">
            <VelocityMetrics scores={scores} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {vp && <EcosystemFit data={vp.ecosystem_fit} />}
                {vp && <AccessStrategy data={vp.access_strategy} />}
                <IntentSignals />
                <CompetitiveFriction />
            </div>
        </div>
    );
}
