from typing import List, Optional, Any
from pydantic import BaseModel, Field
from features.shared.contracts import (
    ConfidenceLevel,
    TrendDirection,
    HiringTrend,
    GrowthStage,
    RevenueRange,
    MentionType,
    PromptContext,
    SellerContext
)
from features.shared.llm_client import load_prompt

# ═══════════════════════════════════════════════════════════════════════════════
#  SYSTEM PROMPT — The Complete Instruction Set for Profile Tab Generation
# ═══════════════════════════════════════════════════════════════════════════════
#
#  Architecture Notes (for developers, NOT sent to the LLM):
#  - This is ONE prompt producing ONE JSON response covering ALL 7 cards.
#  - The LLM receives only: fullName, currentRole, companyName, email (maybe).
#  - The LLM must RESEARCH and GENERATE everything else from company name.
#  - Enum constraints are embedded directly in the prompt so the LLM follows them.
#  - The JSON schema at the bottom is the contract the frontend expects.
# ═══════════════════════════════════════════════════════════════════════════════

# LOAD SYSTEM PROMPT FROM ROOT /prompts/profile.txt
PROFILE_SYSTEM_PROMPT = load_prompt("profile")


# ═══════════════════════════════════════════════════════════════════════════════
#  PYDANTIC SCHEMAS (Validation matching frontend contracts)
# ═══════════════════════════════════════════════════════════════════════════════

# ─── Card 1: Profile Card ───

class MentionLinkOut(BaseModel):
    type: MentionType = Field(description="Drive icon selection")
    title: str = Field(description="Display title of the mention")
    summary: str = Field(description="LLM-generated 1-2 sentence summary")
    url: Optional[str] = Field(None, description="Direct link if available")

class ProfileCardMentionsOut(BaseModel):
    digitalFootprint: Optional[str] = Field(None, description="One-sentence summary of recent online activity")
    latestMentions: List[MentionLinkOut] = Field(default_factory=list, description="Curated list of recent public mentions")
    recentNews: Optional[str] = Field(None, description="Recent company news relevant to THIS prospect's division")

class ProfileCardPersonaOut(BaseModel):
    functionalOwnership: Optional[str] = Field(None, description="Area of functional responsibility")
    personalityTags: List[str] = Field(default_factory=list, description="Descriptive personality/communication-style tags")
    avatarUrl: Optional[str] = Field(None, description="Profile image URL")

class ProfileCardOut(BaseModel):
    persona: ProfileCardPersonaOut
    mentions: ProfileCardMentionsOut


# ─── Card 2: ICP Score ───

class IcpScoreFactorOut(BaseModel):
    label: str = Field(description="Human-readable factor name, e.g. 'Company Size Fit'")
    delta: int = Field(description="Positive or negative contribution to total score")

class IcpScoreOut(BaseModel):
    score: int = Field(..., ge=0, le=100)
    confidence: ConfidenceLevel
    breakdown: List[IcpScoreFactorOut] = Field(default_factory=list)


# ─── Card 3: Organizational Footprint ───

class OrgFootprintOut(BaseModel):
    fundingValue: Optional[str] = Field(None, description="e.g. '$120M'")
    organizations: Optional[str] = Field(None, description="e.g. '1,500+'")
    activeUsers: Optional[str] = Field(None, description="e.g. '10 M+'")
    recentExit: Optional[str] = Field(None, description="e.g. '$1.7 B'")
    growthStage: Optional[str] = None


# ─── Card 4: Company Health ───

class CompanyHealthOut(BaseModel):
    industry: Optional[str] = None
    revenueRange: Optional[RevenueRange] = None
    geography: Optional[str] = None
    employees: Optional[int] = None
    hiringVelocity: Optional[HiringTrend] = None
    marketShare: Optional[float] = Field(None, description="Market share as decimal (e.g. 0.12 = 12%)")
    fundingStatus: Optional[str] = None
    industryContext: Optional[str] = Field(None, description="Qualitative industry context summary")


# ─── Card 5: KPIs ───

class KpiHistoryOut(BaseModel):
    year: int
    revenueGrowth: float = Field(description="YoY revenue growth as percentage points")
    netProfitMargin: float = Field(description="Net profit margin as percentage points")
    trend: TrendDirection

class KpiOut(BaseModel):
    revenueHistory: List[KpiHistoryOut] = Field(default_factory=list)
    overallTrend: Optional[TrendDirection] = None
    dataDisclaimer: Optional[str] = Field(None, description="Disclaimer for private company estimated financials")


# ─── Card 6: Professional Journey ───

class CareerEntryOut(BaseModel):
    period: str
    role: str
    company: str
    isCurrent: bool

class EducationEntryOut(BaseModel):
    degree: str
    school: str
    year: str

class ProfessionalJourneyOut(BaseModel):
    career: List[CareerEntryOut] = Field(default_factory=list)
    education: List[EducationEntryOut] = Field(default_factory=list)
    careerNarrative: Optional[str] = Field(None, description="LLM-synthesized narrative explaining trajectory patterns")


# ─── Card 7: Business Context ───

class BusinessContextOut(BaseModel):
    marketPressures: Optional[str] = None
    digitalMaturity: Optional[str] = None


# ─── MASTER RESPONSE MODEL ───

class ProfilePromptResponse(BaseModel):
    """
    The definitive validation schema for the Profile Tab LLM response.
    This exactly mirrors the `ProfileContract` in `frontend/src/contracts/profile.ts`.
    """
    profileCard: ProfileCardOut
    icpScore: IcpScoreOut
    orgFootprint: OrgFootprintOut
    companyHealth: CompanyHealthOut
    kpis: Optional[KpiOut] = None
    professionalJourney: ProfessionalJourneyOut
    businessContext: Optional[BusinessContextOut] = None


# ═══════════════════════════════════════════════════════════════════════════════
#  PROMPT BUILDER (Constructs the user message with injected context)
# ═══════════════════════════════════════════════════════════════════════════════

def build_profile_prompt(ctx: PromptContext) -> str:
    """
    Constructs the 'user' message sent to the LLM.
    
    Injects two context blocks:
    - [SELLER CONTEXT]: Who is using the app (their company, product, preferences)
    - [PROSPECT CONTEXT]: The person being researched
    
    The LLM uses both to produce a dossier that scores the prospect as a
    potential customer for the SELLER — not against a generic B2B profile.
    """
    
    identity = ctx.identity.model_dump() if ctx.identity else {}
    seller = ctx.seller
    
    # ── Seller context block ──
    seller_lines = []
    if seller:
        seller_lines.append(f"Company: {seller.companyName}")
        seller_lines.append(f"Product Category: {seller.productCategory}")
        if seller.targetCompanySize:
            seller_lines.append(f"Target Company Sizes: {', '.join(seller.targetCompanySize)}")
        if seller.targetIndustries:
            seller_lines.append(f"Target Industries: {', '.join(seller.targetIndustries)}")
    else:
        seller_lines.append("No seller context provided. Use a generic B2B SaaS profile.")
    
    seller_block = "\n".join(seller_lines)
    
    prospect_lines = []
    prospect_lines.append(f"Name: {identity.get('fullName', 'Unknown')}")
    prospect_lines.append(f"Company: {identity.get('companyName', 'Unknown')}")
    
    if identity.get('currentRole'):
        # Instruct the LLM to shorten the role if we provide a very long one
        prospect_lines.append(f"Current Role (Summarize this to a brief title like 'Executive VP' or 'Chief Experience Officer' if it is too long): {identity['currentRole']}")
    if identity.get('email'):
        prospect_lines.append(f"Email: {identity['email']}")
    if identity.get('linkedInUrl'):
        prospect_lines.append(f"LinkedIn: {identity['linkedInUrl']}")
    if identity.get('location'):
        prospect_lines.append(f"Location: {identity['location']}")
    if identity.get('bio'):
        prospect_lines.append(f"Bio/Headline: {identity['bio']}")
    if identity.get('companySize'):
        prospect_lines.append(f"Company Size: {identity['companySize']}")
        
    history = identity.get('employmentHistory')
    if isinstance(history, list) and history:
        prospect_lines.append("Recent Employment History:")
        for h in history[:3]:
            if isinstance(h, dict):
                t = h.get('title', 'Unknown')
                c = h.get('company', 'Unknown')
                s = h.get('start', 'N/A')
                e = h.get('end', 'N/A')
                prospect_lines.append(f"- {t} at {c} ({s} - {e})")

    edu = identity.get('education')
    if isinstance(edu, list) and edu:
        prospect_lines.append("Education:")
        for e in edu[:2]:
            if isinstance(e, dict):
                d = e.get('degree', 'Degree')
                s = e.get('school', 'School')
                y = e.get('year', 'N/A')
                prospect_lines.append(f"- {d} at {s} ({y})")
    
    prospect_block = "\n".join(prospect_lines)
    
    return f"""Generate a complete Sales Intelligence Profile for the following prospect.
Research both the seller's company and the prospect's company using your knowledge.
Score the prospect as a potential customer for the seller.

[SELLER CONTEXT]
{seller_block}

[VERIFIED PROSPECT FACTS] (Do not hallucinate facts that contradict these)
{prospect_block}

Return a single JSON object matching the schema from your instructions. No other text."""
