from typing import List, Optional, Literal
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
MentionType = Literal["podcast", "article", "video", "webinar", "social", "blog"]

# ─── Seller Onboarding Enums ──────────────────────────────────────────────────
# These map 1:1 to the pre-specified dropdown / chip options in the onboarding UI.

ProductCategory = Literal[
    "AI/ML", "Sales", "CRM", "Marketing Automation",
    "DevTools", "FinTech", "Security", "Data/Analytics", "HR Tech", "Other"
]

CompanySizeRange = Literal[
    "Startup (1-50)", "SMB (51-200)", "Mid-Market (201-1000)",
    "Enterprise (1001-5000)", "Large Enterprise (5000+)"
]

IndustryVertical = Literal[
    "SaaS", "FinTech", "E-commerce", "Healthcare", "Manufacturing",
    "Professional Services", "Media", "Education", "Government"
]

# ─── Response Metadata ────────────────────────────────────────────────────────

class ResponseMeta(BaseModel):
    """Attached to every API response for production debugging & cache invalidation."""
    generatedAt: str = Field(description="ISO-8601 timestamp when the response was generated")
    modelVersion: Optional[str] = Field(None, description="Identifier of the LLM model used")
    traceId: str = Field(description="Unique trace ID for correlating logs")
    cacheStatus: Literal["hit", "miss", "stale"] = Field(description="Cache status indicator")

# ─── Seller Context (The User / Sales Rep) ────────────────────────────────────
# Collected at onboarding. In demo mode, loaded from config/demo_seller.py.
# In production, loaded from DB after authentication.

class SellerContext(BaseModel):
    """Who is using the app — the sales rep and their company."""
    sellerName: str = Field(description="The sales rep's display name")
    sellerEmail: str = Field(description="The sales rep's email (account identity)")
    companyName: str = Field(description="The seller's company name")
    productCategory: str = Field(description="What category of product they sell")
    # Optional — seller can skip these during onboarding
    targetCompanySize: List[str] = Field(
        default_factory=list,
        description="Preferred target company sizes (empty = no preference)"
    )
    targetIndustries: List[str] = Field(
        default_factory=list,
        description="Preferred target industries (empty = no preference)"
    )

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
    location: Optional[str] = None
    employmentHistory: List[dict] = Field(default_factory=list)
    education: List[dict] = Field(default_factory=list)

class OrganizationContext(BaseModel):
    activeUsers: Optional[str] = None
    organizations: Optional[str] = None
    totalFunding: Optional[int] = None
    fundingCurrency: str = "USD"
    revenueGrowthRate: Optional[float] = None
    recentExitValue: Optional[int] = None

class EnrichedPerson(BaseModel):
    """Normalized output from ContactOut enrichment."""
    fullName: str
    currentRole: Optional[str] = None
    companyName: Optional[str] = None
    email: Optional[str] = None
    personalEmails: List[str] = Field(default_factory=list)
    workEmails: List[str] = Field(default_factory=list)
    phones: List[str] = Field(default_factory=list)
    linkedInUrl: Optional[str] = None
    profileImageUrl: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    employmentHistory: List[dict] = Field(default_factory=list)  # [{title, company, start, end}]
    education: List[dict] = Field(default_factory=list)          # [{degree, school, year}]
    companyDomain: Optional[str] = None

class ValidateEmailResponse(BaseModel):
    """Normalized output from validation pipeline."""
    is_valid: bool
    validation_reason: Optional[str] = None
    enriched_profile: Optional[EnrichedPerson] = None

class PromptContext(BaseModel):
    """The normalized data payload passed to prompt builders."""
    identity: Optional[IdentityContext] = None
    organization: Optional[OrganizationContext] = None
    seller: Optional[SellerContext] = None
