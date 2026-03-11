from features.shared.llm_client import load_prompt
from features.shared.contracts import PromptContext

# Load from prompts/power.txt
POWER_SYSTEM_PROMPT = load_prompt("power")

def build_power_prompt(ctx: PromptContext) -> str:
    # Logic to build user prompt for POWER tab
    return "Evaluate power for " + (ctx.identity.fullName if ctx.identity else "Unknown")
