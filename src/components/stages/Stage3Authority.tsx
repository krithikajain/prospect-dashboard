import type { DashboardData } from '@/types/dashboard';
import { SignaturePath } from './pain/SignaturePath';
import { ShadowCommittee } from './pain/ShadowCommittee';
import { ProcurementHistory } from './pain/ProcurementHistory';
import { ForcingEvent } from './pain/ForcingEvent';
import { CapitalFlow } from './pain/CapitalFlow';
import { UrgencyDrivers } from './pain/UrgencyDrivers';

/**
 * Stage 3 — Authority / Pain Analysis.
 * Pure layout orchestrator.
 */
export function Stage3Authority({ data }: { data: DashboardData }) {
    const contactName = data.identity?.name || 'The Contact';
    const role = data.profile_fit?.contact?.role || 'VP of Operations';
    const companySizeStr = data.identity?.company_size || '1000';
    const requiresConsensus = parseInt(companySizeStr.replace(/\D/g, ''), 10) > 500;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 auto-rows-min gap-4">

            {/* LEFT COLUMN: Power Center Mapping */}
            <div className="col-span-1 xl:col-span-7 flex flex-col gap-4">
                <SignaturePath contactName={contactName} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ShadowCommittee role={role} />
                    <ProcurementHistory />
                </div>
            </div>

            {/* RIGHT COLUMN: Qualification Deep-Dive */}
            <div className="col-span-1 xl:col-span-5 flex flex-col gap-4">
                <ForcingEvent requiresConsensus={requiresConsensus} />
                <CapitalFlow />
                <UrgencyDrivers />
            </div>

        </div>
    );
}
