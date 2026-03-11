import type { DashboardData } from '@/types/dashboard';
import { PowerMetrics } from './components/PowerMetrics';
import { AuthorityPath } from './components/AuthorityPath';
import { BudgetLogic } from './components/BudgetLogic';
import { StakeholdersInvolved } from './components/StakeholdersInvolved';
import { BuyingHistory } from './components/BuyingHistory';

/**
 * Stage 2 — Power / Stakeholder Analysis.
 * Pure layout orchestrator.
 */
export function Stage2Stakeholder({ data }: { data: DashboardData }) {
    const influenceScore = 95;
    const accessLevel = 'Direct / Executive';
    const championProbability: string = '88%';
    const hasPowerPath = influenceScore > 50 && championProbability !== 'Low';
    const contactName = data.identity?.name || 'The Contact';

    return (
        <div className="flex flex-col gap-6">
            {/* Risk alert */}
            {!hasPowerPath && (
                <div className="flex items-center justify-end">
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full">
                        <span className="material-symbols-outlined text-red-500 text-[16px]">warning</span>
                        <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">High Deal Risk: No Valid Power Path</span>
                    </div>
                </div>
            )}

            <PowerMetrics
                influenceScore={influenceScore}
                accessLevel={accessLevel}
                championProbability={championProbability}
            />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-5 flex flex-col gap-6">
                    <AuthorityPath contactName={contactName} />
                    <StakeholdersInvolved />
                </div>
                <div className="xl:col-span-7 flex flex-col gap-6">
                    <BudgetLogic />
                    <BuyingHistory />
                </div>
            </div>
        </div>
    );
}
