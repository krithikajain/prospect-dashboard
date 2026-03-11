import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
import uuid
from typing import Optional

# Import our new scalable prompt modules
from features.shared.contracts import PromptContext, ResponseMeta, ValidateEmailResponse
from features.shared.llm_client import generate_json
from features.shared.enrichment_service import enrichment_service
from features.prospect.profile import (
    PROFILE_SYSTEM_PROMPT,
    build_profile_prompt,
    ProfilePromptResponse
)
from pydantic import BaseModel

# Demo seller context — simulates a logged-in user
# When auth is added, replace with DB lookup after login
from config.demo_seller import DEMO_SELLER

logger = logging.getLogger("main")

app = FastAPI(title="Prospect Intelligence Orchestrator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "name": "Prospect Intelligence Orchestrator",
        "version": "1.0.0",
        "status": "online",
        "documentation": "/docs",
        "health": "/health"
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Orchestrator is running"}

class EnrichRequest(BaseModel):
    email: str
    firstName: Optional[str] = None
    lastName: Optional[str] = None

class UserOnboardRequest(BaseModel):
    sellerName: str
    sellerEmail: str
    companyName: str
    productCategory: str
    targetCompanySize: list[str]
    targetIndustries: list[str]

# Simple in-memory mock store for users during demo
mock_users_db = {}

@app.get("/api/user/{email}")
def get_user(email: str):
    user = mock_users_db.get(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/api/user/onboard")
def onboard_user(req: UserOnboardRequest):
    mock_users_db[req.sellerEmail] = req.model_dump()
    return {"status": "success"}

@app.post("/api/prospect/verify-enrich", response_model=ValidateEmailResponse)
async def verify_and_enrich_prospect(req: EnrichRequest):
    """
    Step 1 of the pipeline: Verify deliverability, check cache, fetch ContactOut.
    Called BEFORE any LLM tab fetch.
    """
    logger.info(f"[Enrichment] Received verification request for: {req.email}")
    response = await enrichment_service.validate_and_enrich(req.email, req.firstName, req.lastName)
    return response

@app.post("/api/prospect/profile")
def generate_profile(req: PromptContext):
    """
    Handles the Profile Tab generation. Uses the deterministic Identity and 
    Organization data from the frontend to synthesize generative insights.
    
    Flow:
      1. Inject seller context
      2. Build system + user prompts
      3. Call Gemini → get raw JSON
      4. Validate with Pydantic
      5. Return to frontend
    """
    
    # 0. Inject demo seller context if not provided by frontend (future: load from auth/DB)
    req.seller = req.seller or DEMO_SELLER
    
    # 1. Build the prompts
    user_prompt = build_profile_prompt(req)
    system_prompt = PROFILE_SYSTEM_PROMPT
    
    # 2. Call the LLM
    logger.info(f"[Profile] Sending prompt for: {req.identity.fullName if req.identity else 'Unknown'} at {req.identity.companyName if req.identity else 'Unknown'}")
    logger.info(f"[Profile] User prompt preview:\n{user_prompt[:600]}")
    try:
        raw_json = generate_json(system_prompt, user_prompt)
    except RuntimeError as e:
        # API key not configured
        raise HTTPException(status_code=503, detail=str(e))
    except ValueError as e:
        # LLM returned invalid JSON
        logger.error(f"LLM JSON parse error: {e}")
        raise HTTPException(status_code=502, detail=f"LLM returned invalid JSON: {e}")
    except Exception as e:
        logger.error(f"LLM call failed: {e}")
        raise HTTPException(status_code=502, detail=f"LLM call failed: {e}")

    # 3. Validate the LLM output using Pydantic
    try:
        validated_response = ProfilePromptResponse.model_validate(raw_json)
    except Exception as e:
        # LLM hallucinated wrong keys, enums, or structure
        logger.error(f"Pydantic validation failed: {e}")
        raise HTTPException(status_code=500, detail=f"LLM response failed schema validation: {e}")

    # 4. Attach Production Meta
    meta = ResponseMeta(
        generatedAt=datetime.now(timezone.utc).isoformat(),
        modelVersion="gemini-2.0-flash",
        traceId=str(uuid.uuid4()),
        cacheStatus="miss"
    )

    # 5. Return the payload matching the ProspectIntelligence interface
    return {
        "_meta": meta.model_dump(),
        "profile": validated_response.model_dump()
    }

@app.post("/api/prospect/power")
def generate_power(req: PromptContext):
    return { "_meta": { "modelVersion": "mock", "generatedAt": datetime.now(timezone.utc).isoformat() }, "power": {} }

@app.post("/api/prospect/pain")
def generate_pain(req: PromptContext):
    return { "_meta": { "modelVersion": "mock", "generatedAt": datetime.now(timezone.utc).isoformat() }, "pain": {} }

@app.post("/api/prospect/path")
def generate_path(req: PromptContext):
    # Velocity Path dummy so frontend Path logic doesn't crash on null
    vp = {
        "ecosystem_fit": {
            "infrastructure": { "value": "None" },
            "compliance": { "value": "None" },
            "implementation_complexity": { "level": "Unknown", "value": "TBD" }
        },
        "access_strategy": {
            "contact_profile": { "founder_exits": [], "skills": [] },
            "pedigree": [],
            "partner_overlap": []
        }
    }
    return { "_meta": { "modelVersion": "mock", "generatedAt": datetime.now(timezone.utc).isoformat() }, "path": vp, "velocity_path": vp }
