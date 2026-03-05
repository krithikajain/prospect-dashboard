from typing import Optional, Literal
from pydantic import BaseModel, Field

# ─── Global Enums (Shared Design Tokens) ─────────────────────────────────────

ConfidenceLevel = Literal["High", "Medium", "Low"]
TrendDirection = Literal["Up", "Down", "Stable"]
HiringTrend = Literal["Aggressive", "Steady", "Flat", "Freezing"]
GrowthStage = Literal[
    "Pre-Seed", "Seed", "Series A", "Series B", "Series C", 
    "Series D+", "Pre-IPO", "Public", "Bootstrapped"
]
RevenueRange = Literal[
    "<$1M", "$1M-$10M", "$10M-$50M", "$50M-$100M",
    "$100M-$500M", "$500M-$1B", "$1B+"
]
MentionType = Literal["podcast", "article", "video", "webinar", "social"]

# ─── Response Metadata ────────────────────────────────────────────────────────

class ResponseMeta(BaseModel):
    """Attached to every API response for production debugging & cache invalidation."""
    generatedAt: str = Field(description="ISO-8601 timestamp when the response was generated")
    modelVersion: Optional[str] = Field(None, description="Identifier of the LLM model used")
    traceId: str = Field(description="Unique trace ID for correlating logs")
    cacheStatus: Literal["hit", "miss", "stale"] = Field(description="Cache status indicator")

# ─── Core Identity (For Backend Construction) ─────────────────────────────────

# These classes represent the incoming contextual deterministic data 
# the frontend provides to the prompt engine to build the LLM instructions.

class IdentityContext(BaseModel):
    fullName: str
    currentRole: str
    companyName: str
    email: Optional[str] = None
    website: Optional[str] = None
    linkedInUrl: Optional[str] = None
    companySize: Optional[str] = None
    bio: Optional[str] = None

class OrganizationContext(BaseModel):
    activeUsers: Optional[str] = None
    organizations: Optional[str] = None
    totalFunding: Optional[int] = None
    fundingCurrency: str = "USD"
    revenueGrowthRate: Optional[float] = None
    recentExitValue: Optional[int] = None

class PromptContext(BaseModel):
    """The normalized data payload passed to prompt builders."""
    identity: Optional[IdentityContext] = None
    organization: Optional[OrganizationContext] = None
