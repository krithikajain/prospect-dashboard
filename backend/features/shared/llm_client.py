"""
Reusable LLM client for the Prospect Intelligence backend.

Wraps the Google Gemini API (google-genai SDK) and returns parsed JSON.
All prompt modules call `generate_json()` — they never import the SDK directly.

Replace this file to swap providers (OpenAI, Anthropic, etc.) without
touching any prompt or endpoint code.
"""

import os
import json
import logging
from typing import Optional
from pathlib import Path
from dotenv import load_dotenv
from google import genai

# ─── Bootstrap ────────────────────────────────────────────────────────────────

load_dotenv()  # reads .env at backend root

logger = logging.getLogger("llm_client")

# ─── Client Singleton ────────────────────────────────────────────────────────

_client: Optional[genai.Client] = None

def _get_client() -> genai.Client:
    """Lazy-initialises the Gemini client on first call."""
    global _client
    if _client is None:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key or api_key == "your-api-key-here":
            raise RuntimeError(
                "GEMINI_API_KEY is not set. "
                "Add it to backend/.env or export it as an environment variable."
            )
        _client = genai.Client(api_key=api_key)
        logger.info("Gemini client initialised.")
    return _client

# ─── Public API ───────────────────────────────────────────────────────────────

DEFAULT_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
FALLBACK_MODELS = ["gemini-2.0-flash"]

def load_prompt(prompt_name: str) -> str:
    """
    Loads a prompt file from the root /prompts directory.
    prompt_name: Name of the file with or without .txt extension.
    """
    if not prompt_name.endswith(".txt"):
        prompt_name += ".txt"
        
    # backend/features/shared/llm_client.py -> backend root -> project root -> prompts/
    base_dir = Path(__file__).resolve().parent.parent.parent.parent
    prompt_path = base_dir / "prompts" / prompt_name
    
    if not prompt_path.exists():
        logger.error(f"Prompt file not found: {prompt_path}")
        raise FileNotFoundError(f"Missing prompt file: {prompt_name}")
        
    return prompt_path.read_text(encoding="utf-8")

def generate_json(
    system_prompt: str,
    user_prompt: str,
    *,
    model: str = DEFAULT_MODEL,
    temperature: float = 0.4,
) -> dict:
    """
    Send a system + user prompt to Gemini and return the response as a dict.

    • Uses `response_mime_type="application/json"` so the model returns
      clean JSON without markdown fences.
    • Temperature defaults to 0.4 for a balance of creativity and consistency.
    • Automatic fallback: if the primary model hits a 429 rate limit,
      retries with the fallback model (separate quota pool).
    """
    client = _get_client()

    models_to_try = [model] + [m for m in FALLBACK_MODELS if m != model]

    last_error = None
    for current_model in models_to_try:
        try:
            logger.info(f"[Gemini] Calling model={current_model}")
            response = client.models.generate_content(
                model=current_model,
                contents=user_prompt,
                config=genai.types.GenerateContentConfig(
                    system_instruction=system_prompt,
                    temperature=temperature,
                    response_mime_type="application/json",
                ),
            )

            raw_text = response.text

            # Log token usage for cost tracking
            if response.usage_metadata:
                usage = response.usage_metadata
                logger.info(
                    f"[Gemini] model={current_model}  "
                    f"tokens in={usage.prompt_token_count}  "
                    f"out={usage.candidates_token_count}  "
                    f"total={usage.total_token_count}"
                )

            # Log the first 500 chars of the raw response for debugging
            logger.info(f"[Gemini] Raw response preview: {raw_text[:500]}")

            # Parse the JSON text into a dict
            try:
                parsed = json.loads(raw_text)
                # Warn if ALL top-level values appear to be null/empty (silent failure)
                non_null_values = [v for v in parsed.values() if v is not None and v != [] and v != {}]
                if not non_null_values:
                    logger.warning(f"[Gemini] WARNING: All response fields are null/empty. Model may have failed silently.")
                return parsed
            except json.JSONDecodeError as e:
                logger.error(f"Gemini returned invalid JSON: {raw_text[:500]}")
                raise ValueError(f"LLM returned invalid JSON: {e}") from e

        except Exception as e:
            error_str = str(e)
            last_error = e
            if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                logger.warning(
                    f"[Gemini] Rate limited on {current_model}, "
                    f"{'trying fallback...' if current_model != models_to_try[-1] else 'no more fallbacks.'}"
                )
                continue
            else:
                raise

    # All models exhausted
    raise last_error  # type: ignore

