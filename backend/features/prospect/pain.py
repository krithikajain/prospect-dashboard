from features.shared.llm_client import load_prompt
from features.shared.contracts import PromptContext

# Load from prompts/pain.txt
PAIN_SYSTEM_PROMPT = load_prompt("pain")

def build_pain_prompt(ctx: PromptContext) -> str:
    # Logic to build user prompt for PAIN tab
    return "Evaluate pain for " + (ctx.identity.fullName if ctx.identity else "Unknown")
