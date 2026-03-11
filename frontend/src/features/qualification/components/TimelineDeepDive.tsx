import { evaluateTimeline } from '@/lib/domain/timelineEvaluation';
import { CompellingEventsStrip } from '@/features/prospect/path/components/CompellingEventsStrip';
import { BuyingPhaseAndVelocity } from '@/features/prospect/path/components/BuyingPhaseAndVelocity';
import { ImplementationReadiness } from '@/features/prospect/path/components/ImplementationReadiness';
import { ProcurementArchitecture } from '@/features/prospect/path/components/ProcurementArchitecture';
/**
 * Timeline Deep Dive — BANT Qualification (T).
 * Executive Grade Refinement: 
 * - Elevated Compelling Events Strip
 * - Separated Buying Phase & Velocity
 * - Readiness Heat Grid
 */
export function TimelineDeepDive({ data }: { data: any }) {
    const evaluation = evaluateTimeline(data);

    return (
        <div className="flex flex-col gap-5">
            {/* Elevated Strip: Compelling Events */}
            <CompellingEventsStrip {...evaluation.compellingEvents} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Left Column: Phase & Velocity */}
                <BuyingPhaseAndVelocity phase={evaluation.buyingPhase} velocity={evaluation.velocity} />

                {/* Right Column: Implementation Readiness */}
                <ImplementationReadiness {...evaluation.implementationReadiness} />

                {/* Full Width or Bottom Right: Procurement */}
                <div className="lg:col-span-2">
                    <ProcurementArchitecture {...evaluation.procurementArchitecture} />
                </div>
            </div>
        </div>
    );
}

