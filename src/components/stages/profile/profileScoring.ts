import type { DashboardData } from '@/types/dashboard';

/**
 * Pure logic for computing ICP and timing signal scores from dashboard data.
 * Separated from UI so it can be tested and reused independently.
 */
export function calculateScores(data: DashboardData) {
    let icp = 50;
    let timingSignal = 50;

    // --- ICP Fit Logic (Ideal Customer Profile) ---
    const industry = (data.industry_trends?.industry || '').toLowerCase();
    if (industry.includes('saas') || industry.includes('software') || industry.includes('tech')) icp += 15;

    const size = data.identity?.company_size || '';
    if (size.includes('500') || size.includes('1000')) icp += 15;

    const role = (data.profile_fit?.contact?.role || '').toLowerCase();
    if (role.includes('founder') || role.includes('ceo') || role.includes('vp') || role.includes('director')) icp += 20;

    // --- Strategic Timing Signal Logic ---
    const hiring = (data.profile_fit?.company?.hiring_trend || '').toLowerCase();
    if (hiring.includes('hiring') || hiring.includes('growth') || hiring.includes('expanding')) timingSignal += 20;

    const funding = (data.profile_fit?.company?.funding_status || '').toLowerCase();
    if (funding.includes('raised') || funding.includes('series') || funding.includes('backed')) timingSignal += 15;

    const news = data.profile_fit?.business?.recent_news || '';
    if (news.length > 20) timingSignal += 10;

    return {
        icp: Math.min(icp, 98),
        timingSignal: Math.min(timingSignal, 95),
    };
}
