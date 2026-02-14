import type { DashboardData } from "@/types/dashboard";

export type ReadinessLevel = "High" | "Warm" | "Early" | "Cold";

export type ReadinessFactor = {
    key: "authority" | "pain" | "process" | "next_steps" | "risk" | "budget";
    label: string;
    score: number; // 0-100 visual scale for the bar
    weightPoints: number; // how many points it contributed (+) or penalty (-)
    tone: "mint" | "lavender" | "sky" | "amber" | "neutral";
};

export function computeReadiness(data: DashboardData) {
    const stakeholders = data.stakeholders ?? [];
    const painPoints = data.pain_urgency?.pain_points ?? [];
    const steps = data.buying_process?.steps ?? [];
    const tasks = data.action_engine?.tasks ?? [];
    const risks = data.risk_analysis?.risks ?? [];
    const budgetStatus = data.budget?.status ?? "Unknown";

    // --- Authority (0–30)
    const highInfluenceCount = stakeholders.filter(s => s.influence === "High").length;
    let authorityPts = 0;
    if (highInfluenceCount >= 1) authorityPts = 30;
    else if (stakeholders.length >= 1) authorityPts = 20;
    else authorityPts = 0;

    // visual bar 0–100
    const authorityBar = authorityPts === 30 ? 90 : authorityPts === 20 ? 65 : 20;

    // --- Pain (0–25)
    let painPts = 0;
    if (painPoints.length >= 2) painPts = 25;
    else if (painPoints.length === 1) painPts = 15;
    else painPts = 0;

    const painBar = painPts === 25 ? 90 : painPts === 15 ? 60 : 20;

    // --- Process (0–20)
    let processPts = 0;
    if (steps.length >= 3) processPts = 20;
    else if (steps.length >= 1) processPts = 12;
    else processPts = 0;

    const processBar = processPts === 20 ? 85 : processPts === 12 ? 55 : 20;

    // --- Next steps (0–15)
    let nextPts = 0;
    if (tasks.length >= 3) nextPts = 15;
    else if (tasks.length >= 1) nextPts = 8;
    else nextPts = 0;

    const nextBar = nextPts === 15 ? 85 : nextPts === 8 ? 55 : 20;

    // --- Risks penalty (0–15)
    const riskPenalty = Math.min(15, risks.length * 5); // 0,5,10,15...
    const riskBar = risks.length === 0 ? 90 : risks.length <= 2 ? 55 : 30; // bar shows "health", not penalty

    // --- Budget penalty (0–10)
    // Normalize simple statuses; you can refine if you get richer values later.
    const budgetLower = String(budgetStatus).toLowerCase();
    let budgetPenalty = 0;
    if (budgetLower.includes("unknown") || budgetLower.includes("unconfirmed")) budgetPenalty = 10;
    else if (budgetLower.includes("unclear") || budgetLower.includes("partial")) budgetPenalty = 5;
    else budgetPenalty = 0;

    const budgetBar = budgetPenalty === 0 ? 85 : budgetPenalty === 5 ? 55 : 30;

    // Total score
    let score = authorityPts + painPts + processPts + nextPts - riskPenalty - budgetPenalty;
    score = Math.max(0, Math.min(100, score));

    const level: ReadinessLevel =
        score >= 80 ? "High" :
            score >= 60 ? "Warm" :
                score >= 40 ? "Early" : "Cold";

    const factors: ReadinessFactor[] = [
        { key: "authority", label: "Authority", score: authorityBar, weightPoints: authorityPts, tone: "mint" },
        { key: "pain", label: "Pain", score: painBar, weightPoints: painPts, tone: "lavender" },
        { key: "process", label: "Process", score: processBar, weightPoints: processPts, tone: "sky" },
        { key: "next_steps", label: "Next Steps", score: nextBar, weightPoints: nextPts, tone: "sky" },
        { key: "risk", label: "Risk", score: riskBar, weightPoints: -riskPenalty, tone: "amber" },
        { key: "budget", label: "Budget", score: budgetBar, weightPoints: -budgetPenalty, tone: "neutral" },
    ];

    return {
        score,
        level,
        counts: {
            stakeholders: stakeholders.length,
            highInfluence: highInfluenceCount,
            painPoints: painPoints.length,
            steps: steps.length,
            tasks: tasks.length,
            risks: risks.length,
        },
        factors,
    };
}
