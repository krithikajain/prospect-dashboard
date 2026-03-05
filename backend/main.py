from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI(title="Prospect Intelligence Orchestrator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProfileRequest(BaseModel):
    identity: dict | None = None
    organization: dict | None = None

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Orchestrator is running"}

@app.post("/api/generate/profile")
def generate_profile(req: ProfileRequest):
    # Fetch the system prompt from the repository
    prompt_path = os.path.join(os.path.dirname(__file__), "..", "prompts", "profile.txt")
    
    if not os.path.exists(prompt_path):
        raise HTTPException(status_code=500, detail="Profile prompt repository file not found.")
        
    system_prompt: str = ""
    with open(prompt_path, "r", encoding="utf-8") as f:
        system_prompt = f.read()
        
    # TODO: Pass `req.identity`, `req.organization`, and `system_prompt` to actual LLM (OpenAI/Anthropic)
    
    # Mock Response modeling the exact Typescript Data Contract for the time being.
    mock_llm_response = {
        "businessContext": {
            "marketPosition": "Emerging Leader in AI Sales",
            "competitiveAdvantage": "Proprietary Data Processing Engine",
            "recentNews": "Announced Series B of $15M last month"
        },
        "companyHealth": {
            "financialStatus": "Strong",
            "burnRateEstimation": "$250k/mo",
            "employeeTurnover": "Low"
        },
        "kpis": {
            "revenueGrowth": 125,
            "netProfitMargin": -10,
            "marketShare": 5
        },
        "organizationalFootprint": {
            "totalEmployees": 150,
            "regionsActive": 3,
            "growthStage": "Growth Phase"
        }
    }
    
    return {
        "status": "success",
        "data": mock_llm_response,
        "metadata": {
            "system_prompt_used": system_prompt[0:150] + "..."
        }
    }
