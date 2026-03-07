import type { DashboardData } from '@/types/dashboard';

/**
 * Data inputs required to calculate an ICP (Ideal Customer Profile) Fit Score.
 */
export interface IcpInputs {
    /** High-level metrics about the company's scale and operational status. */
    company: {
        /** Numerical employee count or range midpoint. */
        employeeCount: number | null;
        /** Financial bracket of annual revenue. */
        revenueRange: string | null;
        /** Physical or legal geographic presence. */
        geography: string | null;
        /** Current development stage (e.g., 'Scale-up'). */
        growthStage: string | null;
        /** Whether funding was recently secured. */
        recentFunding: boolean | null;
    };
    /** Key attributes of the specific human contact/buyer being analyzed. */
    buyer: {
        /** Professional seniority level within their organization. */
        seniorityLevel: "IC" | "Manager" | "Director" | "VP" | "C-Level" | null;
        /** Degree of formal authority in the purchasing decision. */
        decisionAuthority: "None" | "Influencer" | "Partial" | "Final" | null;
    };
}

/**
 * Calculates a weighted ICP Fit Score (0-100) based on company and buyer inputs.
 * The score is split 50/50 between organizational fit and individual contact authority.
 * 
 * @param {IcpInputs} inputs - The raw data points for the contact and company.
 * @returns {Object} Result containing total score, factor breakdown, and confidence level.
 */
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

/**
 * Parses a string representation of company size into a numeric value (midpoint).
 * 
 * @param {string} sizeStr - Raw size string (e.g., '200-500').
 * @returns {number} Midpoint of the range or first integer found.
 * @private
 */
function parseSizeToTotal(sizeStr: string): number {
    const match = sizeStr.match(/(\d+)/);
    if (match) {
        const nums = sizeStr.match(/(\d+)/g);
        if (nums && nums.length > 1) {
            return (parseInt(nums[0], 10) + parseInt(nums[1], 10)) / 2;
        }
        return parseInt(match[1], 10);
    }
    return 0;
}

/**
 * Maps a professional role string to a standardized seniority level.
 * 
 * @param {string} roleStr - Job title string.
 * @returns {string} One of C-Level, VP, Director, Manager, IC.
 * @private
 */
function parseRoleToSeniority(roleStr: string): IcpInputs["buyer"]["seniorityLevel"] {
    const r = roleStr.toLowerCase();
    if (r.includes("chief") || r.includes("ceo") || r.includes("cro") || r.includes("cfo") || r.includes("founder")) return "C-Level";
    if (r.includes("vp") || r.includes("vice")) return "VP";
    if (r.includes("director") || r.includes("head")) return "Director";
    if (r.includes("manager") || r.includes("lead")) return "Manager";
    return "IC";
}

/**
 * Maps a qualitative influence string to a decision authority level.
 * 
 * @param {string} [influence] - Qualitative influence score (High/Medium/Low).
 * @returns {string} One of Final, Partial, Influencer, None.
 * @private
 */
function parseInfluenceToAuthority(influence?: string): IcpInputs["buyer"]["decisionAuthority"] {
    if (influence === "High") return "Final";
    if (influence === "Medium") return "Partial";
    if (influence === "Low") return "Influencer";
    return "None";
}

/**
 * High-level orchestration function that computes all profile scoring metrics.
 * Extracts relevant signals from raw dashboard data and pipes them into the specific scoring engines.
 * 
 * @param {DashboardData} data - The normalized dashboard data object.
 * @returns {Object} Composite score object including ICP fit and strategic timing signals.
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

    return {
        icp: icpResult.score,
        icpBreakdown: icpResult.breakdown,
        icpConfidence: icpResult.confidence,
    };
}
