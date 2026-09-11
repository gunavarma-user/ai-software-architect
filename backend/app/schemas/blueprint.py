from pydantic import BaseModel, Field
from typing import List, Optional


class ProjectInfo(BaseModel):
    name: str = ""
    type: str = ""
    complexity: str = ""
    target_users: List[str] = []
    description: str = ""


class Requirements(BaseModel):
    functional: List[dict] = []
    non_functional: List[dict] = []
    clarifications: List[dict] = []


class ArchitectureComponent(BaseModel):
    name: str = ""
    type: str = ""
    description: str = ""
    technologies: List[str] = []


class Architecture(BaseModel):
    pattern: str = ""
    reason: str = ""
    advantages: List[str] = []
    disadvantages: List[str] = []
    components: List[ArchitectureComponent] = []
    data_flow: List[str] = []
    mermaid_diagram: str = ""


class TechCategory(BaseModel):
    name: str = ""
    reason: str = ""


class TechStack(BaseModel):
    frontend: List[TechCategory] = []
    backend: List[TechCategory] = []
    database: List[TechCategory] = []
    authentication: List[TechCategory] = []
    deployment: List[TechCategory] = []
    other: List[TechCategory] = []


class EntityField(BaseModel):
    name: str = ""
    type: str = ""
    constraints: List[str] = []


class DatabaseEntity(BaseModel):
    name: str = ""
    description: str = ""
    fields: List[EntityField] = []


class DatabaseRelationship(BaseModel):
    from_entity: str = ""
    to_entity: str = ""
    type: str = ""
    description: str = ""


class Database(BaseModel):
    entities: List[DatabaseEntity] = []
    relationships: List[DatabaseRelationship] = []
    mermaid_diagram: str = ""


class ApiEndpoint(BaseModel):
    method: str = ""
    endpoint: str = ""
    purpose: str = ""
    auth_required: bool = True
    module: str = ""
    request_body: Optional[str] = None
    response: Optional[str] = None


class Module(BaseModel):
    name: str = ""
    purpose: str = ""
    responsibilities: List[str] = []
    related_apis: List[str] = []
    dependencies: List[str] = []


class SecurityItem(BaseModel):
    concern: str = ""
    recommendation: str = ""
    priority: str = ""
    category: str = ""


class PerformanceItem(BaseModel):
    area: str = ""
    recommendation: str = ""
    impact: str = ""
    complexity: str = ""


class ScalabilityLevel(BaseModel):
    scale: str = ""
    architecture: str = ""
    components: List[str] = []
    considerations: List[str] = []


class Scalability(BaseModel):
    current_scale: str = ""
    recommendations: List[ScalabilityLevel] = []


class QualityScore(BaseModel):
    scalability: int = 0
    security: int = 0
    maintainability: int = 0
    performance: int = 0
    overall: int = 0
    explanation: str = ""
    improvements: List[str] = []


class RoadmapTask(BaseModel):
    task: str = ""
    duration: str = ""


class RoadmapPhase(BaseModel):
    phase: str = ""
    title: str = ""
    duration: str = ""
    tasks: List[RoadmapTask] = []


class ArchitectureComparison(BaseModel):
    monolithic: dict = {}
    microservices: dict = {}
    recommended: str = ""
    reason: str = ""


class Blueprint(BaseModel):
    project: ProjectInfo = ProjectInfo()
    requirements: Requirements = Requirements()
    architecture: Architecture = Architecture()
    tech_stack: TechStack = TechStack()
    database: Database = Database()
    apis: List[ApiEndpoint] = []
    modules: List[Module] = []
    security: List[SecurityItem] = []
    performance: List[PerformanceItem] = []
    scalability: Scalability = Scalability()
    quality_score: QualityScore = QualityScore()
    roadmap: List[RoadmapPhase] = []
    architecture_comparison: ArchitectureComparison = ArchitectureComparison()


class GenerateRequest(BaseModel):
    idea: str


class GenerateResponse(BaseModel):
    blueprint: Blueprint
    mode: str


class ProjectRecord(BaseModel):
    id: int
    title: str
    idea: str
    blueprint: dict
    mode: str
    created_at: str
