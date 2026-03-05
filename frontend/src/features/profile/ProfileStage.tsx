import type { DashboardData } from '@/types/dashboard';
import { calculateScores } from './components/profileScoring';
import { ProfileCard } from './components/ProfileCard';
import { IcpScoreCard } from './components/IcpScoreCard';
import { OrganizationalFootprint } from './components/OrganizationalFootprint';
import { CompanyHealth } from './components/CompanyHealth';
import { ProfessionalJourney } from './components/ProfessionalJourney';
import { KPIs } from './components/KPIs';

/**
 * Stage 1 — Profile Fit.
 * This is a pure layout orchestrator: all logic lives in sub-components.
 */
export function Stage1Profile({ data }: { data: DashboardData }) {
    const pf = data.profile_fit;
    const name = data.identity?.name;
    const company = data.identity?.company;
    const scores = calculateScores(data);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 auto-rows-min gap-4">

            {/* LEFT COLUMN: Profile + Score (3 cols) */}
            <div className="col-span-1 xl:col-span-3 flex flex-col gap-4 h-full">
                <ProfileCard
                    name={name}
                    company={company}
                    role={pf?.contact?.role}
                    functionalOwnership={pf?.contact?.functional_ownership}
                    personalityTags={data.identity?.personality_tags || ['Pragmatic', 'Data-Driven', 'Visionary']}
                    email={data.identity?.email}
                    website={data.identity?.website}
                    digitalFootprint={pf?.contact?.digital_footprint}
                    recentNews={pf?.business?.recent_news}
                />
                <IcpScoreCard
                    score={scores.icp}
                    breakdown={scores.icpBreakdown}
                    confidence={scores.icpConfidence}
                />
            </div>

            {/* RIGHT COLUMN: Scale, Health, Context, Journey (9 cols) */}
            <div className="col-span-1 xl:col-span-9 flex flex-col gap-4">
                <OrganizationalFootprint data={data} />

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-5">
                        <CompanyHealth data={data} />
                    </div>
                    <div className="col-span-12 xl:col-span-7">
                        <KPIs kpis={pf?.business?.kpis} />
                    </div>
                </div>

                <div className="flex-1">
                    <ProfessionalJourney />
                </div>
            </div>

        </div>
    );
}
