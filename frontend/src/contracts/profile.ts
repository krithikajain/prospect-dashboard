/**
 * ══════════════════════════════════════════════════════════════════════════════
 *  PROFILE CONTRACT — Data Contract for the Profile (Stage 1) Tab
 * ══════════════════════════════════════════════════════════════════════════════
 *
 *  Grouped 1:1 by UI Card so React components can spread props directly.
 *  Each interface maps to exactly one visual widget on the Profile tab.
 *
 *  DATA SOURCE KEY:
 *    🔵 Deterministic  — Hard facts from APIs / SQL / CRM
 *    🟣 Generative     — Synthesized by Vector DB + LLM pipeline
 *
 *  NULLABILITY RULES:
 *    - `T | null`  = "data may be absent; show fallback UI"
 *    - Never use `""` or `"N/A"` — those pollute charts and conditionals
 *    - Arrays use `[]` when empty (never null), so `.map()` is always safe
 *
 *  FORMATTING RULES:
 *    - Numbers are RAW (e.g. `125000000`). React formats via `Intl.NumberFormat`.
 *    - Dates are ISO-8601 strings. React formats via `Intl.DateTimeFormat`.
 *    - Percentages are decimal numbers (e.g. `0.25` = 25%). React formats.
 * ══════════════════════════════════════════════════════════════════════════════
 */

import type {
    ConfidenceLevel,
    TrendDirection,
    HiringTrend,
    RevenueRange,
    MentionType,
} from './base';


// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 1 — Profile Card (The "Identity" Flip Card)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Powers the front face (persona) and back face (connect/mentions) of the
 * flagship ProfileCard component.
 */
export interface ProfileCardContract {
    /** ── Front Face ── */
    persona: {
        /**
         * 🟣 Area of functional responsibility.
         * @example "Full GTM Function, RevOps, and Enablement"
         * @source LLM synthesis from LinkedIn + job description
         */
        functionalOwnership: string | null;

        /**
         * 🟣 LLM-generated personality/communication-style tags.
         * Free-form strings — the LLM is NOT constrained to a fixed set.
         * UI maps known values to colors; unknown values get a default badge.
         * @example ["Analytical", "Operator", "Data-Driven"]
         * @source LLM synthesis from writing style, interview transcripts
         */
        personalityTags: string[];
        /** Optional URL pointing to the prospect's profile picture */
        avatarUrl?: string | null;
    };

    /** ── Back Face (Connect Panel) ── */
    mentions: {
        /**
         * 🟣 One-sentence summary of recent online activity.
         * @example "Recently spoke on SaaS Masters podcast about scaling RevOps."
         * @source LLM summary of scraped digital presence
         */
        digitalFootprint: string | null;

        /**
         * 🟣 Curated list of recent public mentions / appearances.
         * Structured so the UI can render correct icons per type.
         * @source Vector DB retrieval + LLM ranking
         */
        latestMentions: Array<{
            /** Mention category — drives icon selection. */
            type: MentionType;
            /** Display title. */
            title: string;
            /** LLM-generated 1-2 sentence summary. */
            summary: string;
            /** Direct link to the source (nullable if behind paywall). */
            url: string | null;
        }>;

        /**
         * 🔵🟣 Recent company news relevant to THIS prospect's division.
         * @example "CloudScale announces Snowflake integration for analytics suite."
         * @source News API (deterministic) + LLM relevance filtering (generative)
         */
        recentNews: string | null;
    };
}


// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 2 — ICP Score Card
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Powers the ICP (Ideal Customer Profile) fit gauge and its factor breakdown.
 */
export interface IcpScoreContract {
    /**
     * 🟣 Composite ICP score, 0–100.
     * @source Scoring engine (profileScoring.ts) using deterministic inputs
     */
    score: number;

    /**
     * 🟣 Statistical confidence in the score based on data completeness.
     * @source Scoring engine
     */
    confidence: ConfidenceLevel;

    /**
     * 🟣 Ordered list of factors contributing to the score.
     * Sorted by descending `delta` for display priority.
     */
    breakdown: Array<{
        /** Human-readable factor name. @example "Company Size Fit" */
        label: string;
        /** Positive or negative contribution to the total. */
        delta: number;
    }>;
}


// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 3 — Organizational Footprint (The "Scale" Band)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Powers the 5-tile horizontal metric band showing company magnitude.
 * All numeric values are RAW — React formats them for display.
 */
export interface OrgFootprintContract {
    /** 🟣 Total funding raised formatted. @example "$120M" */
    fundingValue: string | null;

    /** 🟣 Estimated number of subsidiaries/branches. @example "1,500+" */
    organizations: string | null;

    /** 🟣 Estimated number of active users. @example "10 M+" */
    activeUsers: string | null;

    /** 🟣 Most recent exit / acquisition value. @example "$1.7 B" */
    recentExit: string | null;

    /**
     * 🔵/🟣 Current growth/funding stage.
     * @source Crunchbase / PitchBook / LLM Search
     */
    growthStage: string | null;
}


// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 4 — Company Health (Firmographic Vitals)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Powers the 6-cell data grid showing industry, financials, and workforce signals.
 */
export interface CompanyHealthContract {
    /**
     * 🔵 Industry vertical.
     * @example "SaaS / AI"
     * @source Clearbit / ZoomInfo
     */
    industry: string | null;

    /**
     * 🔵 Annual revenue band — strict enum for consistent UI treatment.
     * @source ZoomInfo / Crunchbase
     */
    revenueRange: RevenueRange | null;

    /**
     * 🔵 Primary HQ location.
     * @example "San Francisco, CA"
     * @source Clearbit
     */
    geography: string | null;

    /**
     * 🔵 Total employee count — raw number.
     * React formats: `Intl.NumberFormat('en-US').format(employees)` → "1,250"
     * @source LinkedIn / ZoomInfo
     */
    employees: number | null;

    /**
     * 🔵 Hiring velocity — strict enum drives badge color.
     * @source LinkedIn Jobs API / hiring delta analysis
     */
    hiringVelocity: HiringTrend | null;

    /**
     * 🔵 Market share as raw decimal (e.g. 0.12 = 12%).
     * React formats: `(marketShare * 100).toFixed(1) + '%'`
     * @source Internal estimates / industry reports
     */
    marketShare: number | null;

    /**
     * 🔵 Funding round label.
     * @example "Series C"
     * @source Crunchbase
     */
    fundingStatus: string | null;

    /**
     * 🟣 Qualitative industry context summary.
     * @source LLM synthesis of market reports
     */
    industryContext: string | null;
}


// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 5 — KPIs (Performance Chart + Metrics)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Powers the Recharts line graph and supplementary performance metrics.
 */
export interface KpiContract {
    /**
     * 🔵 Time-series data for the revenue growth chart.
     * Each entry is one fiscal year.
     */
    revenueHistory: Array<{
        /** Fiscal year. @example 2024 */
        year: number;
        /** YoY revenue growth as percentage points (e.g. 25.5 = 25.5%). */
        revenueGrowth: number;
        /** Net profit margin as percentage points (e.g. 8.2 = 8.2%). */
        netProfitMargin: number;
        /**
         * 🟣 Per-year trend direction relative to prior year.
         * Enables the chart to annotate upward/downward inflection points.
         * @source LLM analysis of sequential growth rates
         */
        trend: TrendDirection;
    }>;

    /**
     * 🟣 Overall KPI trend across the full history window.
     * Drives a summary badge on the card header.
     * @source LLM analysis of the revenue trajectory
     */
    overallTrend: TrendDirection | null;

    /**
     * 🟣 Disclaimer for private company estimated financials.
     * When present, the UI shows an info tooltip making the card "audit-proof".
     * @example "Financial KPIs are estimates based on industry benchmarks..."
     * @source LLM — auto-generated for private companies, null for public ones.
     */
    dataDisclaimer: string | null;
}


// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 6 — Professional Journey (Career Timeline + Education)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Powers the tabbed timeline (Workspace) and education list.
 */
export interface ProfessionalJourneyContract {
    /** 🔵 Ordered career history, most recent first. @source LinkedIn/Apollo */
    career: Array<{
        /** Display period. @example "2020 - Present" */
        period: string;
        /** Job title. */
        role: string;
        /** Company name. */
        company: string;
        /** Whether this is the current active position. */
        isCurrent: boolean;
    }>;

    /** 🔵 Educational background. @source LinkedIn */
    education: Array<{
        /** Degree or qualification. @example "MBA" */
        degree: string;
        /** Institution name. */
        school: string;
        /** Display year. @example "Class of 2010" */
        year: string;
    }>;

    /**
     * 🟣 LLM-synthesized career narrative explaining trajectory patterns.
     * This is the "Narrative Summary" — it explains WHY their career path
     * matters for the sales conversation.
     * @example "Consistently brought into Series B/C companies to build
     *           scalable enterprise sales motions. Relies on process over
     *           opportunistic selling."
     * @source LLM analysis of career sequence + company stages at time of joining
     */
    careerNarrative: string | null;
}


// ═══════════════════════════════════════════════════════════════════════════════
//  CARD 7 — Business Context (Currently Disabled, Ready for Re-activation)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Qualitative business environment signals.
 * Currently commented out in the layout but contract is ready.
 */
export interface BusinessContextContract {
    /** 🟣 Market-level competitive and economic pressures. @source LLM */
    marketPressures: string | null;
    /** 🟣 Assessment of the company's digital transformation maturity. @source LLM */
    digitalMaturity: string | null;
}


// ═══════════════════════════════════════════════════════════════════════════════
//  COMPOSITE — The Full Profile Tab Contract
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * The complete data shape for the Profile (Stage 1) tab.
 * This is the single object the `Stage1Profile` layout component receives
 * as the `profile` slice of `ProspectIntelligence.insights.profile`.
 */
export interface ProfileContract {
    profileCard: ProfileCardContract;
    icpScore: IcpScoreContract;
    orgFootprint: OrgFootprintContract;
    companyHealth: CompanyHealthContract;
    kpis: KpiContract | null;
    professionalJourney: ProfessionalJourneyContract;
    businessContext: BusinessContextContract | null;
}
