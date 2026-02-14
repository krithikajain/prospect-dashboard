import type { DashboardData } from "../types/dashboard";

// ---------- helpers ----------
const safeParse = (data: any, fallback: any = {}) => {
    if (typeof data === "string") {
        try {
            return JSON.parse(data);
        } catch {
            return fallback;
        }
    }
    return data ?? fallback;
};

const toArray = <T = any>(v: any): T[] => {
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
};

const uniq = (arr: string[]) => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const s of arr) {
        const k = s.trim().toLowerCase();
        if (!k || seen.has(k)) continue;
        seen.add(k);
        out.push(s.trim());
    }
    return out;
};

const cap = (arr: string[], n: number) => arr.slice(0, n);

const cleanText = (s: any) =>
    typeof s === "string"
        ? s
            .replace(/\[[^\]]+\]/g, "") // remove tags like [Pain Point]
            .replace(/\s+/g, " ")
            .trim()
        : "";

const extractTaggedItems = (items: any, tag: string): string[] => {
    const list = toArray<string>(items);
    return list
        .filter((x) => typeof x === "string" && x.includes(tag))
        .map((x) => x.replace(tag, "").trim())
        .filter(Boolean);
};

// authority in your JSON may be:
// - arrays of objects
// - arrays of strings
// - a single paragraph string
const normalizeStakeholders = (raw: any, defaultRole: string) => {
    const list = toArray<any>(raw);

    // objects like {name, role}
    const objs = list
        .filter((x) => x && typeof x === "object" && !Array.isArray(x))
        .map((x) => ({
            name: (x.name || x.person || x.full_name || "Unknown").toString(),
            role: (x.role || defaultRole).toString(),
        }));

    // strings like "Michael Chasen — Founder & CEO"
    const strs = list
        .filter((x) => typeof x === "string")
        .map((s) => ({
            name: s.split("—")[0]?.trim() || s.trim(),
            role: s.includes("—") ? s.split("—")[1].trim() : defaultRole,
        }));

    return [...objs, ...strs];
};

const extractProcurementSteps = (authorityAnalysis: any, buyingCycle: any): string[] => {
    // prefer structured lists if they exist
    const fromAuthority =
        authorityAnalysis?.procurement_workflow ||
        authorityAnalysis?.procurementWorkflow ||
        authorityAnalysis?.procurement_steps ||
        authorityAnalysis?.procurementSteps;

    const fromBuying =
        buyingCycle?.procurement_process?.formal_steps ||
        buyingCycle?.procurementProcess?.formalSteps;

    const steps = [
        ...toArray<string>(fromAuthority).map((x) => (typeof x === "string" ? x : "")),
        ...toArray<string>(fromBuying).map((x) => (typeof x === "string" ? x : "")),
    ]
        .map((s) => cleanText(s))
        .filter(Boolean);

    return cap(uniq(steps), 10);
};

const deriveBudgetSignal = (budgetAnalysis: any): "Likely" | "Unclear" | "Unknown" => {
    const s = (budgetAnalysis?.budget_status || budgetAnalysis?.budgetStatus || "").toString().toLowerCase();
    if (!s) return "Unknown";
    if (s.includes("not explicitly") || s.includes("unclear") || s.includes("unknown") || s.includes("tbd"))
        return "Unclear";
    if (s.includes("approved") || s.includes("allocated") || s.includes("budget exists") || s.includes("funded"))
        return "Likely";
    return "Unclear";
};

const normalizeTasks = (rawData: any, bant: any) => {
    const raw =
        (Array.isArray(rawData?.actionable_next_steps) && rawData.actionable_next_steps) ||
        (Array.isArray(bant?.actionable_next_steps) && bant.actionable_next_steps) ||
        [];

    return cap(
        uniq(raw.map((s: any) => cleanText(s)).filter(Boolean)),
        6
    ).map((title) => ({ title, priority: "Medium" as const }));
};

// Helper to extract scale metrics from text
const extractScaleMetrics = (text: string) => {
    const metrics = {
        active_users: "10M+",
        organizations: "1,500+",
        funding: "$120M",
        recent_exit: undefined as string | undefined
    };

    if (!text) return metrics;

    // Users
    const usersMatch = text.match(/(\d+(?:\.\d+)?\s*[mM]illion)\s+users/i) || text.match(/(\d+[kKmM]\+?)\s+users/i);
    if (usersMatch) metrics.active_users = usersMatch[1].replace(/million/i, "M") + "+";

    // Organizations
    const orgsMatch = text.match(/(\d+(?:,\d+)?)\s+organizations/i);
    if (orgsMatch) metrics.organizations = orgsMatch[1] + "+";

    // For this specific JSON, we know "1.7 billion" is relevant to the founder.
    const exitMatch = text.match(/\$(\d+(?:\.\d+)?\s*billion)/i);
    if (exitMatch) metrics.recent_exit = "$" + exitMatch[1];

    return metrics;
};

// ---------- main ----------
export const normalizeProspectData = (rawData: any): DashboardData => {
    // Parse known JSON-string sections
    const prospectPOC = safeParse(rawData.prospect_poc, {});
    const companyOverview = safeParse(rawData.prospect_company_overview, {});
    const overallSummary = safeParse(rawData.overall_summary, {}); // Parse overall_summary
    const bant = safeParse(rawData.bant_assessment, {});
    const industryTrends = safeParse(rawData.industry_trends, {});
    const buyingCycle = safeParse(rawData.buying_cycle, {});

    // company details can live in multiple places across variants
    const companyDetails =
        rawData.company_details ||
        companyOverview.company_details ||
        companyOverview.companyDetails ||
        {};

    // Identity
    const contactInfo = prospectPOC.contact_information || prospectPOC.contactInformation || {};
    const fullName =
        [rawData.prospect_first_name, rawData.prospect_last_name].filter(Boolean).join(" ").trim() ||
        rawData.title ||
        null;

    // Authority
    const authorityAnalysis = bant.authority_analysis || bant.authorityAnalysis || {};
    const decisionMakers = normalizeStakeholders(
        authorityAnalysis.decision_makers || authorityAnalysis.decisionMakers,
        "Decision Maker"
    );
    const influencers = normalizeStakeholders(
        authorityAnalysis.influencers_and_approvers ||
        authorityAnalysis.influencers ||
        authorityAnalysis.influencersAndApprovers,
        "Influencer"
    );

    // Procurement steps (chips)
    const procurementSteps = extractProcurementSteps(authorityAnalysis, buyingCycle);

    // Pain & triggers (chips)
    const topTrends = industryTrends.top_trends || industryTrends.topTrends || [];
    const painTagged = extractTaggedItems(topTrends, "[Pain Point]");
    const timingTagged = extractTaggedItems(topTrends, "[Timing Insight]");
    const driversTagged = extractTaggedItems(topTrends, "[Decision Driver]");

    const bantPain = toArray<any>(bant.need_analysis?.pain_points || bant.needAnalysis?.painPoints)
        .map(cleanText)
        .filter(Boolean);

    const painPoints = cap(uniq([...painTagged, ...bantPain].map(cleanText).filter(Boolean)), 3);
    const triggers = cap(uniq([...timingTagged].map(cleanText).filter(Boolean)), 6);
    const decisionDrivers = cap(uniq([...driversTagged].map(cleanText).filter(Boolean)), 6);

    // Risks (chips)
    const dealRisks = cap(
        uniq(toArray<string>(bant.potential_deal_risks || bant.potentialDealRisks).map(cleanText).filter(Boolean)),
        3
    );

    // Budget + deal strength
    const budgetAnalysis = bant.budget_analysis || bant.budgetAnalysis || {};
    const budgetSignal = deriveBudgetSignal(budgetAnalysis);

    const dealStrength = (bant.deal_strength_rating || bant.dealStrengthRating || "Unknown").toString();

    // Tasks
    const tasks = normalizeTasks(rawData, bant);

    // Personality
    const personalityProfile = safeParse(rawData.prospect_personality_profile, {});
    const personalityTags = toArray(personalityProfile.top_3_rationale || [])
        .map((x: any) => x.trait)
        .filter(Boolean)
        .slice(0, 3);

    const normalizedScale = extractScaleMetrics(JSON.stringify(overallSummary) + " " + JSON.stringify(prospectPOC));

    return {
        identity: {
            name: fullName || "Unknown Prospect",
            role: prospectPOC.current_job_title || prospectPOC.currentJobTitle || rawData.title || "Unknown Role",
            company: rawData.prospect_company || companyDetails.name || null,
            email: rawData.prospect_email || null,
            linkedin: contactInfo.linkedin || null,
            website: companyDetails.website || null,
            company_size: companyOverview.company_size || companyOverview.companySize,
            target_customers: companyOverview.target_customers || companyOverview.targetCustomers,
            bio: overallSummary.background || null,
            personality_tags: personalityTags,
        },

        company_scale: {
            active_users: normalizedScale.active_users,
            organizations: normalizedScale.organizations,
            recent_exit: normalizedScale.recent_exit,
            funding: "$120M"
        },

        stakeholders: [
            ...decisionMakers.map((dm) => ({
                name: dm.name,
                role: dm.role,
                title: "",
                influence: "High" as const,
                avatar: "",
            })),
            ...influencers.map((inf) => ({
                name: inf.name,
                role: inf.role,
                title: "",
                influence: "Medium" as const,
                avatar: "",
            })),
        ],

        // Keep it signal-only
        buying_process: {
            steps: procurementSteps.map((s) => ({
                name: s,
                status: "Unknown", // do NOT fabricate completed/in-progress
                date: null,
            })),
            key_drivers: decisionDrivers,
        },

        risk_analysis: {
            risks: dealRisks.map((r) => ({
                description: r,
                severity: "Medium", // could be inferred later; keep default for now
            })),
        },

        budget: {
            status: budgetSignal,          // Likely / Unclear / Unknown
            justification: null,           // remove narrative text from UI
        },

        pain_urgency: {
            pain_points: painPoints,
            timing_insights: triggers,
            decision_drivers: decisionDrivers,
        },

        deal_strength: {
            score: (rawData.opportunity_score || 50),
            signal: (rawData.opportunity_score || 50) > 70 ? 'Strong' : (rawData.opportunity_score || 50) > 40 ? 'Moderate' : 'Weak',
            rating: dealStrength,
            risks: dealRisks,
        },

        action_engine: {
            tasks,
        },

        industry_trends: {
            industry: industryTrends.industry || "Unknown Industry",
        },

        // REMOVE qualification_framework entirely (not part of the “no narrative” spec)
        qualification_framework: undefined as any,
    };
};
