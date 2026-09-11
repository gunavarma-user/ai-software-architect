import json
from fastapi import APIRouter, HTTPException
from app.schemas.blueprint import GenerateRequest, GenerateResponse, Blueprint
from app.services.ai_service import generate_with_ai
from app.services.demo_generator import generate_demo_blueprint
from app.database.db import save_project, get_projects, get_project, delete_project
from app.utils.helpers import validate_idea

router = APIRouter()


@router.post("/generate")
async def generate_architecture(request: GenerateRequest):
    """Generate a software architecture blueprint from a natural language idea."""
    valid, result = validate_idea(request.idea)
    if not valid:
        raise HTTPException(status_code=400, detail=result)

    idea = result  # cleaned idea text
    mode = "demo"
    blueprint_data = None

    # Try AI mode first
    ai_result = await generate_with_ai(idea)
    if ai_result:
        try:
            Blueprint(**ai_result)  # validate
            blueprint_data = ai_result
            mode = "ai"
        except Exception:
            blueprint_data = None

    # Fall back to demo mode
    if blueprint_data is None:
        blueprint_data = generate_demo_blueprint(idea)
        mode = "demo"

    # Save to database
    project_name = blueprint_data.get("project", {}).get("name", "Untitled Project")
    await save_project(
        title=project_name,
        idea=idea,
        blueprint_json=json.dumps(blueprint_data),
        mode=mode,
    )

    return {"blueprint": blueprint_data, "mode": mode}


@router.get("/projects")
async def list_projects():
    """List all previously generated projects."""
    projects = await get_projects()
    return {"projects": projects}


@router.get("/projects/{project_id}")
async def get_project_detail(project_id: int):
    """Get a specific project with full blueprint."""
    project = await get_project(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.delete("/projects/{project_id}")
async def remove_project(project_id: int):
    """Delete a project."""
    success = await delete_project(project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}
