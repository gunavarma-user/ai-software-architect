import re


def validate_idea(idea: str) -> tuple:
    """Validate the user's software idea input."""
    if not idea or not idea.strip():
        return False, "Please enter a software idea."
    cleaned = idea.strip()
    if len(cleaned) < 10:
        return False, "Please provide a more detailed description (at least 10 characters)."
    if len(cleaned) > 5000:
        return False, "Please keep your idea under 5000 characters."
    return True, cleaned


def extract_project_name(idea: str) -> str:
    """Extract a short project name from the idea text."""
    idea_lower = idea.lower()
    keywords = {
        "food delivery": "FoodDash",
        "restaurant": "FoodConnect",
        "delivery app": "QuickDeliver",
        "study partner": "StudyBuddy",
        "study group": "StudyConnect",
        "textbook": "BookSwap",
        "book exchange": "BookExchange",
        "event management": "EventHub",
        "event platform": "EventConnect",
        "health": "HealthCare",
        "medical": "MedConnect",
        "e-commerce": "ShopEase",
        "shopping": "MarketPlace",
        "social": "SocialHub",
        "task manage": "TaskFlow",
        "project manage": "ProjectPilot",
        "chat": "ChatConnect",
        "messaging": "MessageHub",
        "finance": "FinTrack",
        "budget": "BudgetWise",
        "fitness": "FitTrack",
        "travel": "TravelEase",
        "music": "MusicStream",
        "job": "JobConnect",
        "recruit": "HireHub",
    }
    for keyword, name in keywords.items():
        if keyword in idea_lower:
            return name
    words = re.findall(r'\b[a-zA-Z]{3,}\b', idea)
    important = [w for w in words if w.lower() not in {
        "the", "and", "for", "that", "this", "with", "can", "where",
        "create", "build", "make", "want", "should", "platform", "application",
        "app", "system", "like", "based", "using", "from", "have", "other",
        "also", "able", "could", "would", "will", "need", "use", "each",
    }]
    if important:
        return important[0].capitalize() + "Hub"
    return "SmartApp"


def sanitize_mermaid(mermaid_str: str) -> str:
    """Clean up mermaid diagram strings for safe rendering."""
    if not mermaid_str:
        return ""
    cleaned = mermaid_str.strip()
    cleaned = cleaned.replace("```mermaid", "").replace("```", "").strip()
    return cleaned
