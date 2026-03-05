from typing import List, Optional
from pydantic import BaseModel, Field
from features.shared.contracts import (
    ConfidenceLevel,
    TrendDirection,
    HiringTrend,
    GrowthStage,
    RevenueRange,
    MentionType,
    PromptContext
)

# ═══════════════════════════════════════════════════════════════════════════════
#  SYSTEM PROMPT (The "Instruction Manual" for the LLM)
# ═══════════════════════════════════════════════════════════════════════════════

PROFILE_SYSTEM_PROMPT = """You are an expert Sales Intelligence AI.
Your objective is to analyze the provided context regarding a prospect (their identity, organization, and internet research) and generate a comprehensive 'Profile' overview designed for Enterprise B2B Sales Reps.

CRITICAL REQUIREMENT:
You must return your response ONLY as a valid JSON object. Do not include any markdown formatting (like ```json), commentary, or extra text.
The JSON must strictly conform to the schema provided. 

RULES FOR GENERATION:
1. Nullability: If any data point is missing from the context and cannot be reasonably inferred or synthesized, use `null` as the value. NEVER use empty strings "" or "N/A".
2. Strict Enums: You must strictly adhere to the allowed String values for enum fields (like HiringTrend, RevenueRange, etc.).
3. Numbers are RAW: Do not format numbers with commas or dollar signs (e.g., use 125000000, not "$125M").
4. Career Narrative: Do not just list their jobs. Synthesize *why* their career path matters for a sales conversation. What is their operational playbook?

Generate deep, insightful, business-focused data.
"""

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
    timingSignal: int = Field(..., ge=0, le=100, description="Timing signal score measuring urgency")


# ─── Card 3: Organizational Footprint ───

class OrgFootprintOut(BaseModel):
    growthStage: Optional[GrowthStage] = None


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
    productLaunches: Optional[str] = None


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
#  PROMPT BUILDER (Injects dynamic context into the LLM prompt)
# ═══════════════════════════════════════════════════════════════════════════════

def build_profile_prompt(ctx: PromptContext) -> str:
    """
    Constructs the exact string to be sent to the LLM (as the 'user' message),
    injecting the deterministic context we already know about the prospect.
    """
    
    # Safely extract context dicts
    identity = ctx.identity.model_dump() if ctx.identity else {}
    org = ctx.organization.model_dump() if ctx.organization else {}
    
    # Format the prompt
    return f"""Analyze the following prospect context and generate a complete Prospect Profile.

[IDENTITY CONTEXT]
Name: {identity.get('fullName', 'Unknown')}
Role: {identity.get('currentRole', 'Unknown')}
Company: {identity.get('companyName', 'Unknown')}
Company Size: {identity.get('companySize', 'Unknown')}
Bio/Headline: {identity.get('bio', 'None provided')}

[ORGANIZATIONAL CONTEXT]
Funding: {org.get('totalFunding', 'Unknown amount')} {org.get('fundingCurrency', 'USD')}
Active Users: {org.get('activeUsers', 'Unknown')}
Revenue Growth: {org.get('revenueGrowthRate', 'Unknown')}

Your output must be a single, valid JSON object matching the requested schema exactly.
"""
