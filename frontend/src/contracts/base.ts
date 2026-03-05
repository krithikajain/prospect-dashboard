/**
 * ══════════════════════════════════════════════════════════════════════════════
 *  BASE CONTRACTS — Global Shared Types (Single Source of Truth)
 * ══════════════════════════════════════════════════════════════════════════════
 *
 *  These types are GLOBAL. They are referenced by multiple tabs/features.
 *  Any type that is only used by the Profile tab belongs in `profile.ts`.
 *
 *  RULES:
 *  1. Every optional field is `T | null` (never `T | undefined`, never `""`).
 *     React components use `value ?? fallback` for display.
 *  2. Numbers are RAW (e.g. 125000000, not "$125M"). React formats via Intl.
 *  3. Enums use string unions. LLM-sourced free-text uses `string`.
 *  4. `@source` JSDoc tag marks where the data originates.
 * ══════════════════════════════════════════════════════════════════════════════
 */

// ─── Response Metadata (Root-Level) ──────────────────────────────────────────

/**
 * Attached to every API response for production debugging & cache invalidation.
 */
export interface ResponseMeta {
    /** ISO-8601 timestamp when the response payload was assembled. */
    generatedAt: string;
    /** Identifier of the LLM model used for generative fields (e.g., "gpt-4o-2025-08"). */
    modelVersion: string | null;
    /** Unique trace ID for correlating logs across services. */
    traceId: string;
    /** Cache status indicator. */
    cacheStatus: 'hit' | 'miss' | 'stale';
}

// ─── Global Enums (Shared Design Tokens) ─────────────────────────────────────

/** Confidence levels — used by ICP Score, Deal Strength, etc. */
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

/** Trend direction — used by KPIs, hiring signals, market indicators. */
export type TrendDirection = 'Up' | 'Down' | 'Stable';

/** Hiring trend — drives badge color in CompanyHealth & OrgFootprint cards. */
export type HiringTrend = 'Aggressive' | 'Steady' | 'Flat' | 'Freezing';

/** Growth stage — drives OrgFootprint "Growth Stage" tile. */
export type GrowthStage =
    | 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Series C'
    | 'Series D+' | 'Pre-IPO' | 'Public' | 'Bootstrapped';

/** Revenue range bands — deterministic enum, not free-text. */
export type RevenueRange =
    | '<$1M' | '$1M-$10M' | '$10M-$50M' | '$50M-$100M'
    | '$100M-$500M' | '$500M-$1B' | '$1B+';

/** Seniority level — used by ICP scoring and authority mapping. */
export type SeniorityLevel = 'IC' | 'Manager' | 'Director' | 'VP' | 'C-Level';

/** Decision authority — used by ICP scoring. */
export type DecisionAuthority = 'None' | 'Influencer' | 'Partial' | 'Final';

/** Mention types — drives icon selection on ProfileCard back face. */
export type MentionType = 'podcast' | 'article' | 'video' | 'webinar' | 'social';


// ─── Identity Contract (The Person) ──────────────────────────────────────────

/**
 * Core identity of the prospect contact.
 * This is the ONLY place `companyName` lives — no duplication in Organization.
 *
 * @source Deterministic: Apollo, Clearbit, LinkedIn API
 */
export interface IdentityContract {
    /** Full display name. */
    fullName: string;
    /** Current job title. @source Apollo/LinkedIn */
    currentRole: string;
    /** Company the contact currently works at. */
    companyName: string;
    /** Contact email. @source Apollo */
    email: string | null;
    /** Company or personal website URL. @source Clearbit */
    website: string | null;
    /** LinkedIn profile URL. @source Apollo */
    linkedInUrl: string | null;
    /** Avatar/headshot URL. @source Clearbit/Gravatar */
    avatarUrl: string | null;
    /** Company size as a display string (e.g. "200-500"). @source Apollo */
    companySize: string | null;
    /** Short bio or headline. @source LinkedIn */
    bio: string | null;
    /** Target customer segments. @source Internal CRM */
    targetCustomers: string | null;
}


// ─── Organization Contract (The Company) ──────────────────────────────────────

/**
 * Company-level firmographics & scale metrics.
 * NOTE: `companyName` is NOT duplicated here. Components that need the company
 * name reference `identity.companyName`.
 *
 * @source Deterministic: Crunchbase, ZoomInfo, PitchBook
 */
export interface OrganizationContract {
    /** Number of active platform users/customers. @source Internal/Public */
    activeUsers: string | null;
    /** Number of subsidiary orgs or business units. @source Crunchbase */
    organizations: string | null;
    /** Total capital raised — raw number in cents. @source Crunchbase */
    totalFunding: number | null;
    /** Currency code for funding amounts. @source Crunchbase */
    fundingCurrency: string;
    /** YoY revenue growth rate as a decimal (e.g. 0.25 = 25%). @source Internal */
    revenueGrowthRate: number | null;
    /** Most recent M&A exit value — raw number. @source Crunchbase */
    recentExitValue: number | null;
}
