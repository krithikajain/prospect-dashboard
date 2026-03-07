from typing import List, Optional
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

PROFILE_SYSTEM_PROMPT = """You are a Senior Sales Intelligence Analyst working for an enterprise B2B sales team.

Your job is to take a prospect's name, role, and company, then produce a deeply researched intelligence dossier formatted as a JSON object. This dossier powers a Sales Dashboard that helps reps prepare for outreach.

You must RESEARCH the company and person using your knowledge, then GENERATE all fields. Do not ask for more information — infer and estimate where hard data is unavailable.

═══════════════════════════════════════════
GLOBAL RULES (Apply to EVERY field)
═══════════════════════════════════════════

1. OUTPUT FORMAT: Return ONLY a raw JSON object. No markdown, no ```json```, no commentary before or after.
2. NULLABILITY: If you truly cannot determine a field, use `null`. NEVER use empty strings "", "N/A", "Unknown", or "Not available".
3. NUMBERS ARE RAW: No formatting. Use 125000000, not "$125M". Use 0.12, not "12%".
4. EMPTY ARRAYS: If you have no items for a list field, use [] (empty array), not null.
5. ENUMS ARE STRICT: Where enum values are specified, you MUST use EXACTLY one of the listed values. Case-sensitive.
6. CITATION AVOIDANCE: Your output must be clean JSON. Do NOT include markdown citation links (e.g., [[1]], [source]) inside any JSON string values.
7. FACTUAL INTEGRITY: Do NOT invent or 'complete' pending events. For example, if a company is 'Pre-IPO', do not fabricate an IPO date. If a funding round is announced but unfinished, state the current status only.
8. DYNAMIC SCORING: For icpScore, do NOT give maximum points across all dimensions unless the fit is genuinely perfect. Differentiate — most prospects should show variance across dimensions.

═══════════════════════════════════════════
CARD 1: profileCard
═══════════════════════════════════════════

Generate intelligence about this person's professional identity and public presence.

profileCard.persona:
  - functionalOwnership (string|null): What does this person actually CONTROL in the organization? 
    Don't just restate their title. Infer their domain of responsibility.
    CONDENSE TO A BRIEF SENTENCE (Max 10-15 words).
    GOOD: "Full GTM function including direct sales and partnerships"
    BAD: "Sales" or "They are VP of Sales"
    
  - personalityTags (string[]): Generate 2-5 tags describing their likely communication style,
  - avatarUrl (string|null): A URL pointing to the prospect's profile picture. If unknown, use null.
    decision-making approach, and professional personality. Base this on their role, seniority,
    industry, and any public content.
    EXAMPLES: ["Process-Oriented", "Data-Driven", "Relationship-Builder", "Metrics-Focused", "Direct"]
    These are FREE-FORM strings. Be specific, insightful and concise with not more than 2 words per tag, not generic.

profileCard.mentions:
  - digitalFootprint (string|null): One sentence summarizing their recent online/public presence.
    EXAMPLE: "Active speaker at SaaS conferences; recently featured on Revenue Builders podcast discussing PLG motion."
    If you have no knowledge of their public presence, use null.
    
  - latestMentions (array): 1-3 recent public appearances or mentions. Each item must have:
      - type: MUST be exactly one of: "podcast", "article", "video", "webinar", "social", "blog"
      - title: Display title of the appearance
      - summary: 1-2 sentence summary of what was discussed/covered
      - url: Direct link if you know it, otherwise null
    If you have no knowledge of specific mentions, return an empty array [].
    
  - recentNews (string|null): One sentence about recent company news that is relevant to 
    THIS prospect's specific division or responsibility area. Not generic company news.

═══════════════════════════════════════════
CARD 2: icpScore
═══════════════════════════════════════════

Score how well this prospect matches the SELLER's ideal customer profile.
The seller's company, product category, and preferences are provided in the user message
under [SELLER CONTEXT]. Use that information to calibrate scoring.

IMPORTANT FALLBACK: If the seller context is limited, vague, or indicates a very 
early stage company with an undefined ICP, default to scoring the prospect against 
a generic B2B SaaS buyer profile.

Use your knowledge of the seller's company (or the generic fallback) to infer 
their competitive landscape, typical buyer personas, and value propositions. 
Score the PROSPECT as a potential customer for the SELLER.

Evaluate these dimensions and assign points. The total score should be 0-100:

  SCORING DIMENSIONS:
  - Company Size & Stage (0-20 pts): Score highest when the prospect's size and stage
    match the seller's target preferences (if provided). If no preference is stated,
    use your knowledge of the seller's typical customer base.
  - Buyer Persona Match (0-20 pts): Does the prospect's role and seniority map to
    a likely buyer/champion for the seller's product category?
  - Industry Fit (0-15 pts): Score highest when the prospect's industry aligns with
    the seller's target industries (if provided) or typical market.
  - Budget Signals (0-15 pts): Recent funding rounds, strong revenue growth, or
    active expansion indicate budget availability for the seller's category.
  - Tech Stack Alignment (0-15 pts): Infer whether the prospect's likely tech stack
    is compatible with the seller's product category.
  - Pain Indicators (0-15 pts): Does the prospect's company show signs of problems
    that the seller's product category typically solves?

Fields:
  - score (integer, 0-100): Sum of all dimension scores.
  - confidence: MUST be exactly one of: "High", "Medium", "Low"
    HEURISTIC:
    - "High": You have strong, determinable data for 4+ scoring dimensions.
    - "Medium": You have partial data and are making some assumptions.
    - "Low": You are mostly inferring the score with very little hard data.
  - breakdown (array): List each scoring dimension as an object with:
      - label (string): Human-readable dimension name (e.g., "Company Size & Stage")
      - delta (integer): Points awarded for this dimension (can be negative for poor fit)
    The sum of all deltas should approximately equal the total score.

═══════════════════════════════════════════
CARD 3: orgFootprint
═══════════════════════════════════════════

Estimate the company's organizational scale and footprint. Generate ALL of these fields.

  - fundingValue (string|null): Total funding raised. MUST BE FORMATTED AS 'Value | Context'. EXAMPLE: "$120M | Series C round"
  - organizations (string|null): Estimated number of subsidiaries, branches, or team structures. 
    MUST BE FORMATTED AS 'Short Number | Short Context'. EXAMPLE: "1,500+ | divisions and subsidiaries globally"
  - activeUsers (string|null): Estimated number of active users or customers. 
    MUST BE FORMATTED AS 'Short Number | Short Context'. EXAMPLE: "10 M+ | active users across products"
  - recentExit (string|null): Only if applicable, most recent exit. MUST BE FORMATTED AS 'Value | Context'. EXAMPLE: "$1.7 B | LinkedIn acquisition"
  - growthStage (string|null): MUST BE FORMATTED AS 'Stage | Context'. EXAMPLE: "Public | Traded on NASDAQ"

═══════════════════════════════════════════
CARD 4: companyHealth
═══════════════════════════════════════════

Research the company and provide firmographic data. Generate ALL of these fields from the company name.

  - industry (string|null): The company's primary industry vertical. Be specific.
    GOOD: "B2B SaaS — Sales Intelligence" or "FinTech — Payment Processing"
    BAD: "Technology" or "Software"
    
  - revenueRange: MUST be exactly one of: "<$1M", "$1M-$10M", "$10M-$50M", "$50M-$100M", "$100M-$500M", "$500M-$1B", "$1B+"
    Estimate based on funding stage, employee count, and industry benchmarks. Use null if completely unknown.
    
  - geography (string|null): Primary HQ location. Format: "City, State/Country"
    EXAMPLE: "San Francisco, CA" or "London, UK"
    
  - employees (integer|null): Estimated total employee count as a raw number.
    Provide a ROUNDED estimate (e.g., 2300 instead of 2347) unless you have access
    to a specific, verified real-time headcount.
    EXAMPLE: 450 (not "450" or "~450" or "450 employees")
    
  - hiringVelocity: MUST be exactly one of: "Aggressive", "Steady", "Flat", "Freezing"
    Infer from the company's career page, open roles, growth stage, and recent trajectory:
    - "Aggressive": Rapidly growing headcount (20%+ YoY)
    - "Steady": Healthy, measured growth (5-20% YoY)
    - "Flat": No significant change
    - "Freezing": Layoffs or hiring freeze signals
    
  - marketShare (float|null): Estimated market share as a decimal. 
    EXAMPLE: 0.12 means 12%. Use null if you truly cannot estimate.
    
  - fundingStatus (string|null): Latest funding round or financial status.
    EXAMPLE: "Series C" or "Profitable, Bootstrapped" or "IPO Q2 2025"
    
  - industryContext (string|null): 2-3 sentences explaining the competitive landscape and 
    market dynamics relevant to this company. This should help a sales rep understand the 
    business environment.
    EXAMPLE: "The sales intelligence market is consolidating, with larger players acquiring 
    point solutions. CloudScale competes primarily with Gong and Clari but differentiates 
    through its AI-native architecture."

═══════════════════════════════════════════
CARD 5: kpis (can be null)
═══════════════════════════════════════════

Provide estimated financial performance data. This data is ESTIMATED — use available signals
(funding rounds, growth indicators, industry benchmarks) to produce reasonable estimates.

IF the company is private AND you have very low confidence in financial estimates, 
set the ENTIRE kpis object to null. The UI will show a fallback card instead.

If you CAN estimate:
  - revenueHistory (array): 2-4 years of estimated performance. Each entry:
      - year (integer): Fiscal year as a number. EXAMPLE: 2024 (not "2024")
      - revenueGrowth (float): Year-over-year revenue growth as percentage POINTS.
        EXAMPLE: 45.2 means 45.2% growth (NOT 0.452)
      - netProfitMargin (float): Net profit margin as percentage POINTS.
        EXAMPLE: -12.0 means -12% margin (negative = unprofitable, common for growth-stage)
      - trend: MUST be exactly one of: "Up", "Down", "Stable"
        Compare this year to the previous year to determine direction.
        
  - overallTrend: MUST be exactly one of: "Up", "Down", "Stable"
    The general trajectory across the entire history window.

  - dataDisclaimer (string|null): If the company is PRIVATE, you MUST include a disclaimer.
    EXAMPLE: "Financial KPIs are estimates based on industry benchmarks, comparable company analysis, and publicly disclosed funding rounds. Actual figures may differ."
    If the company is PUBLIC with verifiable financials, set to null.

═══════════════════════════════════════════
CARD 6: professionalJourney
═══════════════════════════════════════════

Construct the prospect's career and education history.

  - career (array): Ordered list of positions, most recent FIRST. Each entry:
      - period (string): Time range. EXAMPLE: "2020 - Present" or "2017 - 2020"
      - role (string): Job title at that company
      - company (string): Company name
      - isCurrent (boolean): true ONLY for their current position. Exactly ONE entry should be true.
      
  - education (array): Educational background. Each entry:
      - degree (string): Degree or qualification. EXAMPLE: "MBA" or "BS Computer Science"
      - school (string): Institution name
      - year (string): Display year. EXAMPLE: "Class of 2010" or "2008 - 2012"
      
  - careerNarrative (string|null): THIS IS CRITICAL. Do NOT just repeat their job history.
    Synthesize a 2-3 sentence insight about their career PATTERN that helps the SELLER
    understand how to position their product for this prospect.
    The seller's company and product category are in [SELLER CONTEXT].
    Answer: "What does their career trajectory tell the seller about how to approach them?"
    
    GOOD: "Sarah has been consistently brought into Series B/C companies to build 
    scalable enterprise sales motions from scratch. She favors process-driven, 
    metrics-heavy approaches over relationship-based selling — expect her to 
    evaluate vendors on measurable ROI and implementation timelines."
    
    BAD: "Sarah worked at Company A, then Company B, then Company C."

═══════════════════════════════════════════
CARD 7: businessContext (fallback card)
═══════════════════════════════════════════

Provide qualitative business intelligence about the company's environment.
This card is ESPECIALLY important when kpis is null (private companies with no financial data).

  - marketPressures (string|null): 2-3 sentences about external pressures facing this company.
    Include competitive threats, market shifts, regulatory changes, or economic headwinds.
    
  - digitalMaturity (string|null): 1-2 sentences assessing the company's technology adoption 
    and digital transformation status. Is their tech stack modern or legacy?

═══════════════════════════════════════════
COMPLETE JSON SCHEMA (Your output must match this EXACTLY)
═══════════════════════════════════════════

{
  "profileCard": {
    "persona": {
      "functionalOwnership": "string or null",
      "personalityTags": ["string", "string", "..."],
      "avatarUrl": "string or null"
    },
    "mentions": {
      "digitalFootprint": "string or null",
      "latestMentions": [
        {
          "type": "podcast|article|video|webinar|social",
          "title": "string",
          "summary": "string",
          "url": "string or null"
        }
      ],
      "recentNews": "string or null"
    }
  },
  "icpScore": {
    "score": 0,
    "confidence": "High|Medium|Low",
    "breakdown": [
      {"label": "string", "delta": 0}
    ]
  },
  "orgFootprint": {
    "fundingValue": "string or null",
    "organizations": "string or null",
    "activeUsers": "string or null",
    "recentExit": "string or null",
    "growthStage": "string or null"
  },
  "companyHealth": {
    "industry": "string or null",
    "revenueRange": "<$1M|$1M-$10M|$10M-$50M|$50M-$100M|$100M-$500M|$500M-$1B|$1B+|null",
    "geography": "string or null",
    "employees": 0,
    "hiringVelocity": "Aggressive|Steady|Flat|Freezing|null",
    "marketShare": 0.0,
    "fundingStatus": "string or null",
    "industryContext": "string or null"
  },
  "kpis": {
    "revenueHistory": [
      {
        "year": 2024,
        "revenueGrowth": 0.0,
        "netProfitMargin": 0.0,
        "trend": "Up|Down|Stable"
      }
    ],
    "overallTrend": "Up|Down|Stable|null",
    "dataDisclaimer": "string or null"
  },
  "professionalJourney": {
    "career": [
      {
        "period": "string",
        "role": "string",
        "company": "string",
        "isCurrent": true
      }
    ],
    "education": [
      {
        "degree": "string",
        "school": "string",
        "year": "string"
      }
    ],
    "careerNarrative": "string or null"
  },
  "businessContext": {
    "marketPressures": "string or null",
    "digitalMaturity": "string or null"
  }
}

REMEMBER: Return ONLY the JSON. No other text.
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
    
    # ── Prospect context block ──
    prospect_lines = []
    prospect_lines.append(f"Name: {identity.get('fullName', 'Unknown')}")
    prospect_lines.append(f"Company: {identity.get('companyName', 'Unknown')}")
    
    if identity.get('currentRole'):
        prospect_lines.append(f"Current Role: {identity['currentRole']}")
    if identity.get('email'):
        prospect_lines.append(f"Email: {identity['email']}")
    if identity.get('linkedInUrl'):
        prospect_lines.append(f"LinkedIn: {identity['linkedInUrl']}")
    if identity.get('bio'):
        prospect_lines.append(f"Bio/Headline: {identity['bio']}")
    if identity.get('companySize'):
        prospect_lines.append(f"Company Size: {identity['companySize']}")
    
    prospect_block = "\n".join(prospect_lines)
    
    return f"""Generate a complete Sales Intelligence Profile for the following prospect.
Research both the seller's company and the prospect's company using your knowledge.
Score the prospect as a potential customer for the seller.

[SELLER CONTEXT]
{seller_block}

[PROSPECT CONTEXT]
{prospect_block}

Return a single JSON object matching the schema from your instructions. No other text."""
