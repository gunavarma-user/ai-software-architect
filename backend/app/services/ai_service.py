import os
import json
import httpx
from app.ai.prompt import SYSTEM_PROMPT, build_user_prompt


async def generate_with_ai(idea: str) -> dict | None:
    """Call the LLM API to generate a blueprint. Returns None on failure."""
    api_key = os.getenv("LLM_API_KEY", "").strip()
    base_url = os.getenv("LLM_BASE_URL", "https://api.openai.com/v1").strip().rstrip("/")
    model = os.getenv("LLM_MODEL", "gpt-4o-mini").strip()

    if not api_key:
        return None

    try:
        async with httpx.AsyncClient(timeout=90.0) as client:
            response = await client.post(
                f"{base_url}/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": model,
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": build_user_prompt(idea)},
                    ],
                    "temperature": 0.7,
                    "max_tokens": 8000,
                },
            )
            response.raise_for_status()
            data = response.json()
            content = data["choices"][0]["message"]["content"]

            # Strip markdown code fences if present
            content = content.strip()
            if content.startswith("```"):
                lines = content.split("\n")
                lines = lines[1:]  # Remove first line with ```json
                if lines and lines[-1].strip() == "```":
                    lines = lines[:-1]
                content = "\n".join(lines)

            blueprint = json.loads(content)
            return blueprint

    except Exception as e:
        print(f"AI generation failed: {e}")
        return None
