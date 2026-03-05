from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
import uuid

# Import our new scalable prompt modules
from features.shared.contracts import PromptContext, ResponseMeta
from features.prospect.profile import (
    PROFILE_SYSTEM_PROMPT,
    build_profile_prompt,
    ProfilePromptResponse
)

app = FastAPI(title="Prospect Intelligence Orchestrator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Orchestrator is running"}

@app.post("/api/prospect/profile")
def generate_profile(req: PromptContext):
    """
    Handles the Profile Tab generation. Uses the deterministic Identity and 
    Organization data from the frontend to synthesize generative insights.
    """
    
    # 1. Build the prompt using the context we received from the frontend
    user_prompt = build_profile_prompt(req)
    system_prompt = PROFILE_SYSTEM_PROMPT
    
    # 2. Call the LLM (Mocked for now)
    # TODO: Replace with openai.chat.completions.create(model="gpt-4o", messages=[...])
    
    mock_llm_json = {
        "profileCard": {
            "persona": {
                "functionalOwnership": "Direct Sales, RevOps, and Partner Channels",
                "personalityTags": ["Process-Oriented", "Direct", "Scaling-Expert"]
            },
            "mentions": {
                "digitalFootprint": "Recently spoke on the 'SaaS Masters' podcast about scaling.",
                "latestMentions": [
                    {
                        "type": "podcast",
                        "title": "SaaS Masters Interview",
                        "summary": "Discussed transition from founder-led sales to predictable revenue engines.",
                        "url": "https://example.com/podcast"
                    }
                ],
                "recentNews": "CloudScale Analytics expands EMEA presence with new London office."
            }
        },
        "icpScore": {
            "score": 92,
            "confidence": "High",
            "breakdown": [
                {"label": "Company Size & Stage", "delta": 30},
                {"label": "Buyer Persona", "delta": 25}
            ],
            "timingSignal": 85
        },
        "orgFootprint": {
            "growthStage": "Series C"
        },
        "companyHealth": {
            "industry": "SaaS / AI",
            "revenueRange": "$50M-$100M",
            "geography": "San Francisco, CA",
            "employees": 450,
            "hiringVelocity": "Aggressive",
            "marketShare": 0.12,
            "fundingStatus": "Series C",
            "industryContext": "High-growth sector facing legacy enterprise competition."
        },
        "kpis": {
            "revenueHistory": [
                {"year": 2023, "revenueGrowth": 45.2, "netProfitMargin": -12.0, "trend": "Up"},
                {"year": 2024, "revenueGrowth": 56.5, "netProfitMargin": -8.5, "trend": "Up"}
            ],
            "overallTrend": "Up",
            "productLaunches": "2 major launches in Q3"
        },
        "professionalJourney": {
            "career": [
                {
                    "period": "2020 - Present",
                    "role": "VP of Global Sales",
                    "company": "CloudScale Analytics",
                    "isCurrent": True
                }
            ],
            "education": [
                {
                    "degree": "MBA",
                    "school": "Stanford",
                    "year": "Class of 2010"
                }
            ],
            "careerNarrative": "Sarah has a proven track record of being brought into Series B/C data infrastructure companies to build out scalable enterprise motions."
        },
        "businessContext": {
            "marketPressures": "Increased competition from legacy enterprise vendors.",
            "digitalMaturity": "High - Fully integrated modern revops stack."
        }
    }
    
    # 3. Validate the LLM output using Pydantic
    try:
        # This is where the magic happens: validating the mock matches our contract exactly.
        validated_response = ProfilePromptResponse.model_validate(mock_llm_json)
    except Exception as e:
        # If the LLM hallucinates wrong keys or enums, we catch it before sending to React.
        raise HTTPException(status_code=500, detail=f"LLM Response failed validation: {str(e)}")

    # 4. Attach Production Meta
    meta = ResponseMeta(
        generatedAt=datetime.now(timezone.utc).isoformat(),
        modelVersion="mock-gpt-4o",
        traceId=str(uuid.uuid4()),
        cacheStatus="miss"
    )

    # 5. Return the payload matching the root ProspectIntelligence interface
    # React expects the root insights block to just have the tab name + _meta
    return {
        "_meta": meta.model_dump(),
        "profile": validated_response.model_dump()
    }
