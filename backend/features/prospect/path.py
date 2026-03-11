from features.shared.llm_client import load_prompt
from features.shared.contracts import PromptContext

# Load from prompts/path.txt
PATH_SYSTEM_PROMPT = load_prompt("path")

def build_path_prompt(ctx: PromptContext) -> str:
    # Logic to build user prompt for PATH tab
    return "Evaluate path for " + (ctx.identity.fullName if ctx.identity else "Unknown")
