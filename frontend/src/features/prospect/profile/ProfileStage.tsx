import { useProspecting } from '@/context/ProspectingContext';
import { SkeletonCard } from '@/shared/components';
import { ProfileCard } from './components/ProfileCard';
import { IcpScoreCard } from './components/IcpScoreCard';
import { OrganizationalFootprint } from './components/OrganizationalFootprint';
import { CompanyHealth } from './components/CompanyHealth';
import { ProfessionalJourney } from './components/ProfessionalJourney';
import { KPIs } from './components/KPIs';

/**
 * Stage 1 — Profile Fit.
 *
 * Fully SSoT-driven: all data is read from the LLM response stored in
 * ProspectingContext (prospectingData.insights.profile). The legacy `data`
 * prop is no longer required — no crash if it's undefined.
 */
export function Stage1Profile({ data }: { data?: any }) {
    const { prospectingData } = useProspecting();
    const llm = prospectingData.insights?.profile;

    // ── Identity (from the context set when the user searched) ──────────────
    const identity = prospectingData.identity as any;
    const name: string = identity?.fullName || identity?.name || data?.identity?.name || 'Unknown';
    const company: string = identity?.companyName || identity?.company || data?.identity?.company || '';
    const email: string | null = identity?.email || data?.identity?.email || null;
    const website: string | null = identity?.website || data?.identity?.website || null;
    const linkedInUrl: string | null = identity?.linkedInUrl || data?.identity?.linkedInUrl || null;

    // ── LLM-generated profile card fields ────────────────────────────────────
    const functionalOwnership = llm?.profileCard?.persona?.functionalOwnership
        ?? data?.profile_fit?.contact?.functional_ownership
        ?? null;

    const avatarUrl = identity?.avatarUrl
        ?? llm?.profileCard?.persona?.avatarUrl
        ?? data?.profile_fit?.contact?.avatar_url
        ?? undefined;

    const personalityTags: string[] = llm?.profileCard?.persona?.personalityTags
        ?? data?.identity?.personality_tags
        ?? [];

    const digitalFootprint = llm?.profileCard?.mentions?.digitalFootprint
        ?? data?.profile_fit?.contact?.digital_footprint
        ?? null;

    const recentNews = llm?.profileCard?.mentions?.recentNews
        ?? data?.profile_fit?.business?.recent_news
        ?? null;

    const latestMentions = llm?.profileCard?.mentions?.latestMentions ?? null;

    // ── ICP Score ─────────────────────────────────────────────────────────────
    const icpScore = llm?.icpScore?.score ?? 0;
    const icpBreakdown = llm?.icpScore?.breakdown ?? [];
    const icpConfidence = llm?.icpScore?.confidence ?? 'Low';

    // ── KPIs (from LLM) ───────────────────────────────────────────────────────
    // Map LLM KPI shape → legacy KPI shape expected by <KPIs> component
    const kpisData = llm?.kpis?.revenueHistory
        ? {
            revenue_history: llm.kpis.revenueHistory.map((r: any) => ({
                year: String(r.year),
                revenue_growth: r.revenueGrowth ?? r.revenue_growth ?? 0,
                net_profit_margin: r.netProfitMargin ?? r.net_profit_margin ?? 0,
            })),
            market_share: llm?.companyHealth?.marketShare != null
                ? `${(llm.companyHealth.marketShare * 100).toFixed(0)}%`
                : null,
            employees: llm?.companyHealth?.employees != null
                ? String(llm.companyHealth.employees)
                : null,
            hiring_velocity: llm?.companyHealth?.hiringVelocity ?? null,
        }
        : data?.profile_fit?.business?.kpis ?? null;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 auto-rows-min gap-4">

            {/* LEFT COLUMN: Profile Card + ICP Score (3 cols) */}
            <div className="col-span-1 xl:col-span-3 flex flex-col gap-4 h-full">
                {/* Profile Card ALWAYS renders with deterministic info */}
                <ProfileCard
                    name={name}
                    company={company}
                    role={identity?.currentRole ?? data?.profile_fit?.contact?.role ?? ''}
                    imageUrl={avatarUrl}
                    functionalOwnership={functionalOwnership}
                    personalityTags={personalityTags}
                    email={email}
                    website={website}
                    linkedInUrl={linkedInUrl}
                    digitalFootprint={digitalFootprint}
                    recentNews={recentNews}
                    latestMentions={latestMentions}
                />

                {/* ICP Score is AI generated */}
                {!llm ? (
                    <SkeletonCard padding="none" className="h-48" />
                ) : (
                    <IcpScoreCard
                        score={icpScore}
                        breakdown={icpBreakdown}
                        confidence={icpConfidence}
                    />
                )}
            </div>

            {/* RIGHT COLUMN: Scale, Health, KPIs, Journey (9 cols) */}
            <div className="col-span-1 xl:col-span-9 flex flex-col gap-4">

                {!llm ? <SkeletonCard className="h-40" /> : <OrganizationalFootprint />}

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-5">
                        {!llm ? <SkeletonCard className="h-64" /> : <CompanyHealth />}
                    </div>
                    <div className="col-span-12 xl:col-span-7">
                        {!llm ? (
                            <SkeletonCard className="h-64" />
                        ) : (
                            <KPIs
                                kpis={kpisData}
                                dataDisclaimer={llm?.kpis?.dataDisclaimer ?? null}
                            />
                        )}
                    </div>
                </div>

                <div className="flex-1">
                    {!llm ? <SkeletonCard className="min-h-[300px]" /> : <ProfessionalJourney />}
                </div>
            </div>

        </div>
    );
}
