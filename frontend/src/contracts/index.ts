import type { ResponseMeta, IdentityContract, OrganizationContract } from './base';
import type { ProfileContract } from './profile';
import type { PainContract } from './pain';
import type { PowerContract } from './power';
import type { PathContract } from './path';

// ─── Re-exports ──────────────────────────────────────────────────────────────

export type { ResponseMeta, IdentityContract, OrganizationContract } from './base';
export type {
    ConfidenceLevel,
    TrendDirection,
    HiringTrend,
    GrowthStage,
    RevenueRange,
    SeniorityLevel,
    DecisionAuthority,
    MentionType,
} from './base';

export type {
    ProfileContract,
    ProfileCardContract,
    IcpScoreContract,
    OrgFootprintContract,
    CompanyHealthContract,
    KpiContract,
    ProfessionalJourneyContract,
    BusinessContextContract,
} from './profile';

export type { PainContract } from './pain';
export type { PowerContract } from './power';
export type { PathContract } from './path';

// ─── Master Contract ─────────────────────────────────────────────────────────

/**
 * The Master Data Contract combining all modular intelligence pieces.
 * This represents the Single Source of Truth (SSoT) state shape.
 *
 * `_meta` is required at the API response level but optional in client state
 * (it's stripped after logging in the fetch layer).
 */
export interface ProspectIntelligence {
    /** Production debugging metadata. Present on every API response. */
    _meta?: ResponseMeta;

    /** Core identity of the prospect contact (the person). */
    identity: IdentityContract | null;

    /** Company-level scale metrics (the organization). */
    organization: OrganizationContract | null;

    /** Tab-specific insight payloads, lazy-loaded per tab. */
    insights: {
        profile?: ProfileContract;
        pain?: PainContract;
        power?: PowerContract;
        path?: PathContract;
    } | null;
}
