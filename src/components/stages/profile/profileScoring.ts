import type { DashboardData } from '@/types/dashboard';

export interface IcpInputs {
    company: {
        employeeCount: number | null;
        revenueRange: string | null;
        geography: string | null;
        growthStage: string | null;
        recentFunding: boolean | null;
    };
    buyer: {
        seniorityLevel: "IC" | "Manager" | "Director" | "VP" | "C-Level" | null;
        decisionAuthority: "None" | "Influencer" | "Partial" | "Final" | null;
    };
}

export function calculateIcpScore(inputs: IcpInputs) {
    let score = 0;
    const breakdown: { label: string; delta: number }[] = [];

    // ---- Company Fit (50 total) ----

    // Size
    if (inputs.company.employeeCount) {
        if (inputs.company.employeeCount >= 200 && inputs.company.employeeCount <= 2000) {
            score += 12.5;
            breakdown.push({ label: "Company Size Fit", delta: 12.5 });
        } else {
            score += 6;
            breakdown.push({ label: "Company Size Partial", delta: 6 });
        }
    }

    // Revenue
    if (inputs.company.revenueRange) {
        score += 12.5;
        breakdown.push({ label: "Revenue Known", delta: 12.5 });
    }

    // Geography
    if (inputs.company.geography) {
        score += 12.5;
        breakdown.push({ label: "Geography Identified", delta: 12.5 });
    }

    // Growth / Funding
    if (inputs.company.growthStage || inputs.company.recentFunding) {
        score += 12.5;
        breakdown.push({ label: "Growth / Funding Signal", delta: 12.5 });
    }

    // ---- Buyer Fit (50 total) ----

    // Seniority
    switch (inputs.buyer.seniorityLevel) {
        case "C-Level":
            score += 25;
            breakdown.push({ label: "C-Level Buyer", delta: 25 });
            break;
        case "VP":
            score += 22;
            breakdown.push({ label: "VP-Level Buyer", delta: 22 });
            break;
        case "Director":
            score += 18;
            breakdown.push({ label: "Director-Level Buyer", delta: 18 });
            break;
        case "Manager":
            score += 10;
            breakdown.push({ label: "Manager-Level Buyer", delta: 10 });
            break;
        default:
            break;
    }

    // Decision Authority
    switch (inputs.buyer.decisionAuthority) {
        case "Final":
            score += 25;
            breakdown.push({ label: "Final Decision Authority", delta: 25 });
            break;
        case "Partial":
            score += 15;
            breakdown.push({ label: "Partial Authority", delta: 15 });
            break;
        case "Influencer":
            score += 10;
            breakdown.push({ label: "Influencer Role", delta: 10 });
            break;
        default:
            break;
    }

    // Clamp score
    score = Math.min(100, Math.round(score));

    const confidence: "High" | "Medium" | "Low" =
        Object.values(inputs.company).filter(Boolean).length +
            Object.values(inputs.buyer).filter(Boolean).length >= 4
            ? "High"
            : "Medium";

    return { score, breakdown, confidence };
}

// Helpers for mapped extraction
function parseSizeToTotal(sizeStr: string): number {
    const match = sizeStr.match(/(\d+)/);
    if (match) {
        // "500-1000" matches "500", consider mid-point or max for simplicity
        const nums = sizeStr.match(/(\d+)/g);
        if (nums && nums.length > 1) {
            return (parseInt(nums[0], 10) + parseInt(nums[1], 10)) / 2;
        }
        return parseInt(match[1], 10);
    }
    return 0;
}

function parseRoleToSeniority(roleStr: string): IcpInputs["buyer"]["seniorityLevel"] {
    const r = roleStr.toLowerCase();
    if (r.includes("chief") || r.includes("ceo") || r.includes("cro") || r.includes("cfo") || r.includes("founder")) return "C-Level";
    if (r.includes("vp") || r.includes("vice")) return "VP";
    if (r.includes("director") || r.includes("head")) return "Director";
    if (r.includes("manager") || r.includes("lead")) return "Manager";
    return "IC"; // individual contributor
}

function parseInfluenceToAuthority(influence?: string): IcpInputs["buyer"]["decisionAuthority"] {
    if (influence === "High") return "Final";
    if (influence === "Medium") return "Partial";
    if (influence === "Low") return "Influencer";
    return "None";
}

/**
 * Computes ICP and timing signal scores from dashboard data.
 */
export function calculateScores(data: DashboardData) {
    const authorityProfile = data.stakeholders?.find(s => s.name === data.identity?.name);

    const inputs: IcpInputs = {
        company: {
            employeeCount: parseSizeToTotal(data.identity?.company_size || ""),
            revenueRange: data.profile_fit?.company?.revenue_range || null,
            geography: data.profile_fit?.company?.geography || null,
            growthStage: data.profile_fit?.company?.growth_stage || null,
            recentFunding: data.profile_fit?.company?.funding_status ? data.profile_fit.company.funding_status.length > 0 : null,
        },
        buyer: {
            seniorityLevel: parseRoleToSeniority(data.profile_fit?.contact?.role || data.identity?.role || ""),
            decisionAuthority: parseInfluenceToAuthority(authorityProfile?.influence || "High"), // Default to high for main contact
        }
    };

    const icpResult = calculateIcpScore(inputs);

    // --- Strategic Timing Signal Logic ---
    let timingSignal = 50;
    const hiring = (data.profile_fit?.company?.hiring_trend || '').toLowerCase();
    if (hiring.includes('hiring') || hiring.includes('growth') || hiring.includes('expanding')) timingSignal += 20;

    const funding = (data.profile_fit?.company?.funding_status || '').toLowerCase();
    if (funding.includes('raised') || funding.includes('series') || funding.includes('backed')) timingSignal += 15;

    const news = data.profile_fit?.business?.recent_news || '';
    if (news.length > 20) timingSignal += 10;

    return {
        icp: icpResult.score,
        icpBreakdown: icpResult.breakdown,
        icpConfidence: icpResult.confidence,
        timingSignal: Math.min(timingSignal, 95),
    };
}
