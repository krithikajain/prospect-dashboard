import type { DashboardData } from '@/types/dashboard';
import { calculateScores } from './profile/profileScoring';
import { ProfileCard } from './profile/ProfileCard';
import { IcpScoreCard } from './profile/IcpScoreCard';
import { OrganizationalFootprint } from './profile/OrganizationalFootprint';
import { CompanyHealth } from './profile/CompanyHealth';
import { BusinessContext } from './profile/BusinessContext';
import { ProfessionalJourney } from './profile/ProfessionalJourney';

/**
 * Stage 1 — Profile Fit.
 * This is a pure layout orchestrator: all logic lives in sub-components.
 */
export function Stage1Profile({ data }: { data: DashboardData }) {
    const pf = data.profile_fit;
    const name = data.identity?.name || 'Elena Vance';
    const company = data.identity?.company || 'Acme Corp';
    const scores = calculateScores(data);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 auto-rows-min gap-4">

            {/* LEFT COLUMN: Profile + Score (3 cols) */}
            <div className="col-span-1 xl:col-span-3 flex flex-col gap-4 h-full">
                <ProfileCard
                    name={name}
                    company={company}
                    role={pf?.contact?.role || 'Founder & CEO'}
                    functionalOwnership={pf?.contact?.functional_ownership}
                    personalityTags={data.identity?.personality_tags || ['Pragmatic', 'Data-Driven', 'Visionary']}
                    email={data.identity?.email}
                    website={data.identity?.website}
                    digitalFootprint={pf?.contact?.digital_footprint}
                    recentNews={pf?.business?.recent_news}
                />
                <div className="h-6" />
                <IcpScoreCard score={scores.icp} />
            </div>

            {/* RIGHT COLUMN: Scale, Health, Context, Journey (9 cols) */}
            <div className="col-span-1 xl:col-span-9 flex flex-col gap-4">
                <OrganizationalFootprint />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <CompanyHealth data={data} />
                    <BusinessContext
                        recentNews={pf?.business?.recent_news}
                        marketPressures={pf?.business?.market_pressures}
                        digitalMaturity={pf?.business?.digital_maturity}
                    />
                </div>
                <ProfessionalJourney />
            </div>

        </div>
    );
}
