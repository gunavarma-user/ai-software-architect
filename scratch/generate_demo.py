import os
import re

content = '''"""
Demo Mode Blueprint Generator
Generates realistic, project-specific blueprints using dynamic keyword analysis.
This ensures the app works beautifully without an LLM API key.
"""

import re
from collections import Counter
from app.utils.helpers import extract_project_name

IGNORE_WORDS = {
    'the', 'they', 'their', 'them', 'there', 'these', 'those', 'this', 'that', 'with', 'from', 'what', 'when', 'where', 'who', 'how', 'why', 'which', 'whether', 'while', 'would', 'could', 'should', 'will', 'can', 'may', 'might', 'must', 'shall', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'done', 'doing', 'make', 'made', 'making', 'take', 'took', 'taking', 'get', 'got', 'getting', 'give', 'gave', 'giving', 'keep', 'kept', 'keeping', 'let', 'letting', 'seem', 'seemed', 'seeming', 'use', 'used', 'using', 'need', 'needed', 'needing', 'want', 'wanted', 'wanting', 'help', 'helped', 'helping', 'helps',
    'web', 'app', 'application', 'system', 'platform', 'software', 'website', 'project', 'idea', 'tool', 'page', 'site', 'database', 'frontend', 'backend', 'api', 'server', 'client', 'mobile', 'desktop', 'online', 'offline', 'cloud', 'local', 'global',
    'user', 'users', 'customer', 'customers', 'client', 'clients', 'admin', 'admins', 'administrator', 'administrators', 'people', 'person', 'management', 'plan', 'planned', 'planning', 'track', 'tracked', 'tracking', 'monitor', 'monitored', 'monitoring', 'analyze', 'analyzed', 'analyzing', 'report', 'reported', 'reporting', 'suggest', 'suggested', 'suggesting', 'recommend', 'recommended', 'recommending', 'predict', 'predicted', 'predicting', 'generate', 'generated', 'generating', 'automate', 'automated', 'automating', 'optimize', 'optimized', 'optimizing', 'improve', 'improved', 'improving', 'increase', 'increased', 'increasing', 'decrease', 'decreased', 'decreasing', 'reduce', 'reduced', 'reducing', 'save', 'saved', 'saving', 'cost', 'time', 'fast', 'slow', 'easy', 'hard', 'simple', 'complex', 'secure', 'safe', 'reliable', 'scalable', 'available', 'good', 'bad', 'new', 'old', 'best', 'better', 'worse', 'high', 'low', 'large', 'small', 'big', 'little', 'based', 'also', 'able', 'each', 'through', 'allow', 'into', 'between', 'about', 'some', 'many', 'such', 'very', 'much', 'home', 'nearby', 'base', 'provide', 'support', 'integrate', 'own', 'add', 'added', 'adding', 'data', 'item', 'items', 'content', 'create', 'created', 'creating', 'build', 'built', 'building', 'develop', 'developed', 'developing', 'design', 'designed', 'designing', 'implement', 'implemented', 'implementing', 'deploy', 'deployed', 'deploying', 'test', 'tested', 'testing', 'run', 'ran', 'running', 'set', 'setting', 'update', 'updated', 'updating', 'delete', 'deleted', 'deleting', 'remove', 'removed', 'removing', 'edit', 'edited', 'editing', 'view', 'viewed', 'viewing', 'show', 'showed', 'showing', 'list', 'listed', 'listing', 'search', 'searched', 'searching', 'find', 'found', 'finding', 'buy', 'bought', 'buying', 'sell', 'sold', 'selling', 'pay', 'paid', 'paying', 'order', 'ordered', 'ordering', 'book', 'booked', 'booking', 'send', 'sent', 'sending', 'receive', 'received', 'receiving', 'read', 'reading', 'write', 'wrote', 'written', 'writing', 'upload', 'uploaded', 'uploading', 'download', 'downloaded', 'downloading', 'share', 'shared', 'sharing', 'connect', 'connected', 'connecting', 'discover', 'discovered', 'discovering', 'browse', 'browsed', 'browsing', 'filter', 'filtered', 'filtering', 'sort', 'sorted', 'sorting',
    'thing', 'things', 'something', 'anything', 'nothing', 'everything', 'part', 'parts', 'type', 'types', 'kind', 'kinds', 'sort', 'sorts', 'way', 'ways', 'method', 'methods', 'process', 'processes', 'step', 'steps', 'stage', 'stages', 'level', 'levels', 'category', 'categories', 'group', 'groups', 'class', 'classes', 'set', 'sets', 'collection', 'collections', 'list', 'lists', 'array', 'arrays', 'matrix', 'matrices', 'table', 'tables', 'record', 'records', 'row', 'rows', 'column', 'columns', 'field', 'fields', 'value', 'values', 'key', 'keys', 'index', 'indexes', 'number', 'numbers', 'string', 'strings', 'text', 'texts', 'image', 'images', 'video', 'videos', 'audio', 'audios', 'file', 'files', 'document', 'documents', 'folder', 'folders', 'directory', 'directories', 'path', 'paths', 'link', 'links', 'url', 'urls', 'domain', 'domains', 'address', 'addresses', 'location', 'locations', 'place', 'places', 'point', 'points', 'line', 'lines', 'area', 'areas', 'volume', 'volumes', 'size', 'sizes', 'weight', 'weights', 'length', 'lengths', 'width', 'widths', 'height', 'heights', 'depth', 'depths', 'speed', 'speeds', 'rate', 'rates', 'ratio', 'ratios', 'percentage', 'percentages', 'fraction', 'fractions', 'decimal', 'decimals', 'integer', 'integers', 'float', 'floats', 'boolean', 'booleans', 'true', 'false', 'yes', 'no', 'on', 'off', 'up', 'down', 'left', 'right', 'top', 'bottom', 'front', 'back', 'start', 'end', 'begin', 'finish', 'first', 'last', 'next', 'previous', 'before', 'after', 'then', 'now', 'soon', 'later', 'always', 'never', 'sometimes', 'often', 'rarely', 'usually', 'commonly', 'normally', 'typically', 'generally', 'frequently', 'infrequently', 'occasionally', 'regularly', 'irregularly', 'constantly', 'continuously', 'intermittently', 'periodically', 'sporadically', 'randomly', 'mostly', 'mainly', 'largely', 'primarily', 'principally', 'chiefly', 'especially', 'particularly', 'specifically', 'notably', 'significantly', 'importantly', 'crucially', 'essentially', 'fundamentally', 'basically', 'ultimately', 'finally', 'lastly', 'consequently', 'therefore', 'thus', 'hence', 'accordingly', 'anyway', 'anyhow', 'besides', 'furthermore', 'moreover', 'additionally', 'also', 'too', 'well', 'instead', 'otherwise', 'else', 'however', 'nevertheless', 'nonetheless', 'yet', 'still', 'though', 'although', 'even', 'only', 'just', 'quite', 'rather', 'somewhat', 'very', 'much', 'many', 'more', 'most', 'less', 'least', 'few', 'fewer', 'fewest', 'little', 'less', 'least', 'enough', 'sufficient', 'adequate', 'plenty', 'abundant', 'copious', 'ample', 'profuse', 'prolific', 'numerous', 'multiple', 'several', 'various', 'diverse', 'different', 'distinct', 'separate', 'individual', 'unique', 'single', 'sole', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'experience', 'features', 'feature', 'options', 'option', 'settings', 'setting', 'preferences', 'preference', 'information', 'info', 'detail', 'details', 'description', 'descriptions', 'title', 'titles', 'name', 'names', 'id', 'ids', 'status', 'statuses', 'state', 'states', 'condition', 'conditions', 'action', 'actions', 'event', 'events', 'activity', 'activities', 'task', 'tasks', 'job', 'jobs', 'work', 'works', 'role', 'roles', 'permission', 'permissions', 'access', 'accesses', 'right', 'rights', 'rule', 'rules', 'policy', 'policies', 'procedure', 'procedures', 'guideline', 'guidelines', 'standard', 'standards', 'requirement', 'requirements', 'specification', 'specifications', 'constraint', 'constraints', 'restriction', 'restrictions', 'limitation', 'limitations', 'boundary', 'boundaries', 'limit', 'limits', 'capacity', 'capacities', 'capability', 'capabilities', 'ability', 'abilities', 'skill', 'skills', 'talent', 'talents', 'knowledge', 'knowledges', 'understanding', 'understandings', 'awareness', 'awarenesses', 'insight', 'insights', 'concept', 'concepts', 'notion', 'notions', 'thought', 'thoughts', 'belief', 'beliefs', 'opinion', 'opinions', 'view', 'views', 'perspective', 'perspectives', 'approach', 'approaches', 'methodology', 'methodologies', 'technique', 'techniques', 'strategy', 'strategies', 'tactic', 'tactics', 'framework', 'frameworks', 'model', 'models', 'pattern', 'patterns', 'architecture', 'architectures', 'structure', 'structures', 'layout', 'layouts', 'format', 'formats', 'style', 'styles', 'theme', 'themes', 'template', 'templates', 'scheme', 'schemes', 'program', 'script', 'code', 'interface', 'ui', 'ux', 'dashboard', 'panel', 'portal', 'account', 'profile', 'login', 'logout', 'register', 'signup', 'signin', 'signout', 'password', 'email', 'username', 'functionality', 'logic'
}

def clean_word(w):
    if w.endswith('ies'): return w[:-3] + 'y'
    if w.endswith('s') and not w.endswith('ss'): return w[:-1]
    return w

def extract_domain_concepts(idea: str) -> list:
    """Extract domain-specific nouns from the idea text."""
    words = re.findall(r'\\\\b[a-zA-Z]{3,}\\\\b', idea.lower())
    
    candidates = []
    for w in words:
        cw = clean_word(w)
        if cw not in IGNORE_WORDS and w not in IGNORE_WORDS:
            candidates.append(cw)
            
    counts = Counter(candidates)
    unique_concepts = [c for c, _ in counts.most_common()]
    
    if not unique_concepts:
        unique_concepts = ["resource", "record"]
        
    # Return top 5 primary concepts
    return unique_concepts[:5]

def get_module_name_for_concept(concept: str) -> str:
    """Return a contextual module name for a given concept."""
    if concept in ["schedule", "appointment", "booking", "calendar", "itinerary"]: 
        return f"{concept.capitalize()}s & Planning"
    elif concept in ["progress", "growth", "stat", "analytic", "metric", "score"]: 
        return f"{concept.capitalize()} Tracking"
    elif concept in ["image", "file", "photo", "document", "video", "media"]: 
        return "Media & File Handling"
    elif concept in ["payment", "transaction", "invoice", "budget"]: 
        return "Financial Management"
    elif concept in ["cart", "order", "checkout"]: 
        return "Order Processing"
    elif concept in ["message", "chat", "inbox"]: 
        return "Messaging & Communication"
    return f"{concept.capitalize()} Management"

def generate_demo_blueprint(idea: str) -> dict:
    """Generate a completely dynamic blueprint based on the user's idea."""
    name = extract_project_name(idea)
    idea_lower = idea.lower()
    
    # Calculate complexity
    word_count = len(idea.split())
    complexity = "High" if word_count > 60 else "Medium" if word_count > 20 else "Low"
    
    primary_concepts = extract_domain_concepts(idea)
    
    modules = [
        {"name": "Authentication & Profiles", "purpose": "Secure user access and profile management", "responsibilities": ["User registration and login", "Role-based access control", "Profile management"], "related_apis": ["POST /api/auth/register", "POST /api/auth/login"], "dependencies": []}
    ]
    
    entities = [
        {"name": "Users", "description": "Platform users", "fields": [
            {"name": "id", "type": "INTEGER", "constraints": ["PRIMARY KEY", "AUTOINCREMENT"]},
            {"name": "email", "type": "VARCHAR(255)", "constraints": ["UNIQUE", "NOT NULL"]},
            {"name": "password_hash", "type": "VARCHAR(255)", "constraints": ["NOT NULL"]},
            {"name": "full_name", "type": "VARCHAR(100)", "constraints": ["NOT NULL"]},
            {"name": "created_at", "type": "TIMESTAMP", "constraints": ["NOT NULL"]},
        ]},
    ]
    
    apis = [
        {"method": "POST", "endpoint": "/api/auth/register", "purpose": "Register new user", "auth_required": False, "module": "Authentication & Profiles"},
        {"method": "POST", "endpoint": "/api/auth/login", "purpose": "Login and get token", "auth_required": False, "module": "Authentication & Profiles"},
        {"method": "GET", "endpoint": "/api/users/me", "purpose": "Get current user profile", "auth_required": True, "module": "Authentication & Profiles"},
        {"method": "PUT", "endpoint": "/api/users/me", "purpose": "Update user profile", "auth_required": True, "module": "Authentication & Profiles"},
    ]
    
    relationships = []
    functional = [
        {"id": "FR1", "title": "User Account Management", "description": "Users can securely register, login, and manage their profiles.", "priority": "High"},
    ]

    # Feature Detection
    if any(k in idea_lower for k in ["ai", "recommend", "suggest", "smart", "predict"]):
        modules.append({"name": "AI Engine & Recommendations", "purpose": "Intelligent suggestions", "responsibilities": ["Process data for AI models", "Generate personalized recommendations"], "related_apis": ["GET /api/ai/recommendations"], "dependencies": ["Authentication & Profiles"]})
        entities.append({"name": "Recommendations", "description": "AI generated suggestions", "fields": [
            {"name": "id", "type": "INTEGER", "constraints": ["PRIMARY KEY", "AUTOINCREMENT"]},
            {"name": "user_id", "type": "INTEGER", "constraints": ["FOREIGN KEY", "NOT NULL"]},
            {"name": "content", "type": "TEXT", "constraints": ["NOT NULL"]},
            {"name": "created_at", "type": "TIMESTAMP", "constraints": ["NOT NULL"]},
        ]})
        apis.append({"method": "GET", "endpoint": "/api/ai/recommendations", "purpose": "Get AI suggestions", "auth_required": True, "module": "AI Engine & Recommendations"})
        relationships.append({"from_entity": "Users", "to_entity": "Recommendations", "type": "one-to-many", "description": "User receives recommendations"})
        functional.append({"id": f"FR{len(functional)+1}", "title": "AI Capabilities", "description": "System provides intelligent suggestions based on user context.", "priority": "Medium"})

    if any(k in idea_lower for k in ["pay", "buy", "sell", "checkout", "transaction", "subscription"]):
        modules.append({"name": "Payment Processing", "purpose": "Financial transactions", "responsibilities": ["Process secure payments", "Manage subscriptions", "Invoicing"], "related_apis": ["POST /api/payments"], "dependencies": ["Authentication & Profiles"]})
        entities.append({"name": "Payments", "description": "Financial transactions", "fields": [
            {"name": "id", "type": "INTEGER", "constraints": ["PRIMARY KEY", "AUTOINCREMENT"]},
            {"name": "user_id", "type": "INTEGER", "constraints": ["FOREIGN KEY", "NOT NULL"]},
            {"name": "amount", "type": "DECIMAL(10,2)", "constraints": ["NOT NULL"]},
            {"name": "status", "type": "VARCHAR(20)", "constraints": ["NOT NULL"]}
        ]})
        apis.append({"method": "POST", "endpoint": "/api/payments", "purpose": "Process a payment", "auth_required": True, "module": "Payment Processing"})
        relationships.append({"from_entity": "Users", "to_entity": "Payments", "type": "one-to-many", "description": "User makes payments"})
        functional.append({"id": f"FR{len(functional)+1}", "title": "Payment Processing", "description": "Users can complete secure financial transactions.", "priority": "High"})

    if any(k in idea_lower for k in ["notify", "alert", "reminder", "push", "email"]):
        modules.append({"name": "Notifications & Alerts", "purpose": "User communication", "responsibilities": ["Send alerts and reminders", "Manage notification preferences"], "related_apis": ["GET /api/notifications"], "dependencies": ["Authentication & Profiles"]})
        entities.append({"name": "Notifications", "description": "User alerts", "fields": [
            {"name": "id", "type": "INTEGER", "constraints": ["PRIMARY KEY", "AUTOINCREMENT"]},
            {"name": "user_id", "type": "INTEGER", "constraints": ["FOREIGN KEY", "NOT NULL"]},
            {"name": "message", "type": "TEXT", "constraints": ["NOT NULL"]},
            {"name": "is_read", "type": "BOOLEAN", "constraints": ["DEFAULT false"]}
        ]})
        apis.append({"method": "GET", "endpoint": "/api/notifications", "purpose": "Get user notifications", "auth_required": True, "module": "Notifications & Alerts"})
        relationships.append({"from_entity": "Users", "to_entity": "Notifications", "type": "one-to-many", "description": "User has notifications"})
        functional.append({"id": f"FR{len(functional)+1}", "title": "Notifications", "description": "Users receive timely alerts and reminders.", "priority": "Medium"})

    if any(k in idea_lower for k in ["location", "map", "gps", "nearby", "distance", "track"]):
        modules.append({"name": "Location & Tracking", "purpose": "Geospatial data", "responsibilities": ["Manage location data", "Calculate distances", "Map visualization"], "related_apis": ["PUT /api/location"], "dependencies": []})
        apis.append({"method": "PUT", "endpoint": "/api/location", "purpose": "Update location data", "auth_required": True, "module": "Location & Tracking"})

    # Dynamic Entities and Modules based on Concepts
    prev_entity = "Users"
    for i, concept in enumerate(primary_concepts):
        EntityName = concept.capitalize() + "s"
        ModuleName = get_module_name_for_concept(concept)
        
        # Avoid duplicating feature modules
        if any(m["name"] == ModuleName for m in modules):
            continue
            
        modules.append({
            "name": ModuleName,
            "purpose": f"Core operations for {concept}s",
            "responsibilities": [f"Create and manage {concept}s", f"List and filter {concept}s", f"Update {concept} details"],
            "related_apis": [f"GET /api/{concept}s", f"POST /api/{concept}s"],
            "dependencies": ["Authentication & Profiles"]
        })
        
        entities.append({"name": EntityName, "description": f"Domain entity for {concept}", "fields": [
            {"name": "id", "type": "INTEGER", "constraints": ["PRIMARY KEY", "AUTOINCREMENT"]},
            {"name": "name", "type": "VARCHAR(200)", "constraints": ["NOT NULL"]},
            {"name": "description", "type": "TEXT", "constraints": []},
            {"name": "created_at", "type": "TIMESTAMP", "constraints": ["NOT NULL"]},
        ]})
        
        # Relationship chaining for a realistic ER diagram
        relationships.append({"from_entity": prev_entity, "to_entity": EntityName, "type": "one-to-many", "description": f"{prev_entity} relates to {EntityName}"})
        prev_entity = EntityName
        
        apis.extend([
            {"method": "GET", "endpoint": f"/api/{concept}s", "purpose": f"List {concept}s", "auth_required": True, "module": ModuleName},
            {"method": "POST", "endpoint": f"/api/{concept}s", "purpose": f"Create a new {concept}", "auth_required": True, "module": ModuleName},
            {"method": "GET", "endpoint": f"/api/{concept}s/{{id}}", "purpose": f"Get {concept} details", "auth_required": True, "module": ModuleName},
            {"method": "PUT", "endpoint": f"/api/{concept}s/{{id}}", "purpose": f"Update {concept}", "auth_required": True, "module": ModuleName},
            {"method": "DELETE", "endpoint": f"/api/{concept}s/{{id}}", "purpose": f"Delete {concept}", "auth_required": True, "module": ModuleName},
        ])
        
        functional.append({
            "id": f"FR{len(functional)+1}",
            "title": f"{concept.capitalize()} Management",
            "description": f"Users can create, view, update, and organize their {concept}s.",
            "priority": "High" if i < 2 else "Medium"
        })

    clarifications = [
        {"question": "What are the primary user roles and their permissions?", "context": "Different roles may need different access levels", "impact": "Affects authorization and UI design"},
    ]
    if any(m["name"] == "Payment Processing" for m in modules):
        clarifications.append({"question": "Which payment gateways should be supported?", "context": "Stripe, PayPal, etc.", "impact": "Affects payment integration"})
    if any(m["name"] == "AI Engine & Recommendations" for m in modules):
        clarifications.append({"question": "What specific data points should drive the AI recommendations?", "context": "Needed to select the right AI model", "impact": "Affects data pipeline"})
        
    if len(clarifications) < 3 and len(primary_concepts) > 0:
        clarifications.append({"question": f"Should multiple users be able to collaborate on the same {primary_concepts[0]}?", "context": "Collaborative features require specific database and permission models", "impact": "Increases relationship complexity"})

    non_functional = [
        {"id": "NFR1", "category": "Security", "description": "All sensitive data must be encrypted in transit and at rest", "priority": "High"},
        {"id": "NFR2", "category": "Performance", "description": "API response time should be under 500ms for 95th percentile", "priority": "High"},
        {"id": "NFR3", "category": "Scalability", "description": f"System should support up to {'10,000' if complexity == 'Medium' else '1,000' if complexity == 'Low' else '100,000'} concurrent users", "priority": "Medium"},
        {"id": "NFR4", "category": "Reliability", "description": "System uptime should be 99.9% with graceful degradation", "priority": "High"},
        {"id": "NFR5", "category": "Maintainability", "description": "Code should follow clean architecture principles with 80%+ test coverage", "priority": "Medium"},
    ]

    pattern = "Monolithic" if complexity == "Low" else "Modular Monolith" if complexity == "Medium" else "Microservices"
    arch_reason = {
        "Monolithic": f"A monolithic architecture is ideal for {name} as an MVP. It simplifies development with a single codebase.",
        "Modular Monolith": f"A modular monolith provides a good balance for {name}, offering clean module separation.",
        "Microservices": f"Given {name}'s complexity, microservices allow independent scaling and deployment of each service.",
    }[pattern]

    arch_advantages = {
        "Monolithic": ["Simple development and deployment", "Easy to debug and test", "Lower infrastructure costs", "Single codebase management"],
        "Modular Monolith": ["Clean module separation", "Simpler than microservices", "Easy to refactor into microservices later", "Shared database reduces consistency issues"],
        "Microservices": ["Independent scaling per service", "Technology diversity", "Fault isolation", "Independent deployment"],
    }[pattern]

    arch_disadvantages = {
        "Monolithic": ["Harder to scale individual components", "Single point of failure", "Can become complex as it grows"],
        "Modular Monolith": ["Still a single deployment unit", "Module boundaries can blur over time", "Database can become a bottleneck"],
        "Microservices": ["Complex infrastructure", "Network latency", "Data consistency challenges", "Higher operational overhead"],
    }[pattern]

    components = [
        {"name": "Client Application", "type": "Frontend", "description": "User-facing web application", "technologies": ["React", "Vite", "CSS Modules"]},
        {"name": "API Server", "type": "Backend", "description": "Core business logic and API layer", "technologies": ["FastAPI", "Python", "Pydantic"]},
        {"name": "Database", "type": "Data Store", "description": "Primary data storage", "technologies": ["PostgreSQL" if complexity != "Low" else "SQLite"]},
    ]
    if complexity != "Low":
        components.append({"name": "Cache", "type": "Data Store", "description": "High-speed caching layer", "technologies": ["Redis"]})

    return {
        "project": {
            "name": name,
            "type": "Web Application",
            "complexity": complexity,
            "target_users": ["End Users", "Administrators"],
            "description": f"A platform that {idea[:200].lower().strip('.')}.",
        },
        "requirements": {
            "functional": functional,
            "non_functional": non_functional,
            "clarifications": clarifications,
        },
        "architecture": {
            "pattern": pattern,
            "reason": arch_reason,
            "advantages": arch_advantages,
            "disadvantages": arch_disadvantages,
            "components": components,
            "data_flow": [
                "1. User interacts with the React Frontend",
                "2. Frontend sends REST API requests to FastAPI Backend",
                "3. Backend authenticates request via JWT token",
                "4. Backend queries the Database and Cache",
                "5. Data is returned and UI is updated"
            ],
            "mermaid_diagram": _build_mermaid_arch(modules, name, complexity)
        },
        "tech_stack": _get_tech_stack(complexity),
        "database": {
            "entities": entities,
            "relationships": relationships,
            "mermaid_diagram": _build_mermaid_er(entities, relationships)
        },
        "apis": apis,
        "modules": modules,
        "security": _get_security(complexity),
        "performance": _get_performance(complexity),
        "scalability": _get_scalability(complexity),
        "quality_score": _get_quality_score(complexity, len(modules)),
        "roadmap": _get_dynamic_roadmap(modules, complexity),
        "architecture_comparison": _get_comparison(complexity)
    }

def _build_mermaid_arch(modules: list, name: str, complexity: str) -> str:
    lines = ["graph TD"]
    lines.append(f'    User["\\\\U0001F464 User / Client"]')
    lines.append(f'    Frontend["\\\\U0001F310 React Frontend"]')
    lines.append(f'    API["\\\\u26A1 API Gateway"]')
    lines.append('    User --> Frontend')
    lines.append('    Frontend --> API')

    for mod in modules[:6]:
        safe = re.sub(r'[^a-zA-Z0-9]', '', mod["name"])
        lines.append(f'    {safe}["{mod["name"]}"]')
        lines.append(f'    API --> {safe}')

    lines.append('    DB[("\\\\U0001F5C4 Database")]')
    for mod in modules[:6]:
        safe = re.sub(r'[^a-zA-Z0-9]', '', mod["name"])
        lines.append(f'    {safe} --> DB')

    if complexity in ("Medium", "High"):
        lines.append('    Cache[("\\\\U0001F4E6 Cache")]')
        lines.append('    API --> Cache')

    return "\\n".join(lines)

def _build_mermaid_er(entities: list, relationships: list) -> str:
    lines = ["erDiagram"]
    for entity in entities:
        lines.append(f"    {entity['name'].upper().replace(' ', '_')} {{")
        for field in entity["fields"][:6]:
            type_str = field["type"].split("(")[0].lower()
            pk = "PK" if "PRIMARY KEY" in field.get("constraints", []) else ""
            fk = "FK" if "FOREIGN KEY" in field.get("constraints", []) else ""
            marker = pk or fk
            marker_str = f' {marker}' if marker else ''
            lines.append(f'        {type_str} {field["name"]}{marker_str}')
        lines.append("    }")

    rel_map = {"one-to-one": "||--||", "one-to-many": "||--o{", "many-to-many": "}o--o{"}
    for rel in relationships:
        from_e = rel["from_entity"].upper().replace(" ", "_")
        to_e = rel["to_entity"].upper().replace(" ", "_")
        rel_sym = rel_map.get(rel["type"], "||--o{")
        desc = rel.get("description", "relates to")
        lines.append(f'    {from_e} {rel_sym} {to_e} : "{desc}"')

    return "\\n".join(lines)

def _get_tech_stack(complexity: str) -> dict:
    stacks = {
        "Low": {
            "frontend": [{"name": "HTML/CSS/JavaScript", "reason": "Simple, no framework overhead"}, {"name": "Bootstrap 5", "reason": "Quick UI"}],
            "backend": [{"name": "Flask", "reason": "Lightweight Python framework"}, {"name": "Flask-RESTful", "reason": "Easy REST APIs"}],
            "database": [{"name": "SQLite", "reason": "Zero-configuration database"}],
            "authentication": [{"name": "Flask-Login", "reason": "Session-based auth"}, {"name": "bcrypt", "reason": "Secure password hashing"}],
            "deployment": [{"name": "Heroku", "reason": "Simple deployment"}, {"name": "GitHub Pages", "reason": "Static hosting"}],
            "other": [{"name": "Git", "reason": "Version control"}],
        },
        "Medium": {
            "frontend": [{"name": "React", "reason": "Component-based UI"}, {"name": "Vite", "reason": "Fast build tool"}, {"name": "CSS Modules", "reason": "Scoped styling"}],
            "backend": [{"name": "FastAPI", "reason": "Modern async framework"}, {"name": "Pydantic", "reason": "Data validation"}],
            "database": [{"name": "PostgreSQL", "reason": "Robust relational database"}, {"name": "SQLAlchemy", "reason": "Powerful ORM"}],
            "authentication": [{"name": "JWT (PyJWT)", "reason": "Stateless token auth"}, {"name": "bcrypt", "reason": "Password hashing"}],
            "deployment": [{"name": "Docker", "reason": "Containerization"}, {"name": "AWS EC2 / DigitalOcean", "reason": "VPS hosting"}],
            "other": [{"name": "GitHub Actions", "reason": "CI/CD"}, {"name": "pytest", "reason": "Testing framework"}],
        },
        "High": {
            "frontend": [{"name": "React + TypeScript", "reason": "Type-safe frontend"}, {"name": "Next.js", "reason": "SSR & optimized framework"}, {"name": "Tailwind CSS", "reason": "Utility CSS"}],
            "backend": [{"name": "FastAPI", "reason": "High-performance async API"}, {"name": "Celery", "reason": "Background task queue"}],
            "database": [{"name": "PostgreSQL", "reason": "Primary database"}, {"name": "Redis", "reason": "Caching layer"}],
            "authentication": [{"name": "OAuth 2.0", "reason": "Industry standard auth"}, {"name": "JWT", "reason": "Stateless API auth"}],
            "deployment": [{"name": "Kubernetes", "reason": "Container orchestration"}, {"name": "AWS", "reason": "Cloud infrastructure"}],
            "other": [{"name": "RabbitMQ", "reason": "Message broker"}, {"name": "Prometheus + Grafana", "reason": "Monitoring"}],
        },
    }
    return stacks.get(complexity, stacks["Medium"])

def _get_security(complexity: str) -> list:
    items = [
        {"concern": "Password Storage", "recommendation": "Hash passwords using bcrypt", "priority": "High", "category": "Authentication"},
        {"concern": "Authentication Tokens", "recommendation": "Use JWT with short expiration", "priority": "High", "category": "Authentication"},
        {"concern": "Input Validation", "recommendation": "Validate and sanitize all inputs", "priority": "High", "category": "Data Protection"},
        {"concern": "SQL Injection", "recommendation": "Use parameterized queries or ORM", "priority": "High", "category": "Data Protection"},
        {"concern": "XSS Prevention", "recommendation": "Escape user-generated content", "priority": "High", "category": "Data Protection"},
    ]
    return items

def _get_performance(complexity: str) -> list:
    return [
        {"area": "Database Indexing", "recommendation": "Create indexes on frequent columns", "impact": "High", "complexity": "Easy"},
        {"area": "API Pagination", "recommendation": "Implement pagination for lists", "impact": "High", "complexity": "Easy"},
        {"area": "Response Compression", "recommendation": "Enable gzip/brotli", "impact": "Medium", "complexity": "Easy"},
    ]

def _get_scalability(complexity: str) -> dict:
    return {
        "current_scale": "< 1,000 users" if complexity == "Low" else "1,000 - 10,000 users",
        "recommendations": [
            {"scale": "< 1,000 users", "architecture": "Single server deployment", "components": ["React Frontend", "FastAPI Backend", "PostgreSQL"], "considerations": ["Simple deployment"]},
            {"scale": "10,000 users", "architecture": "Load balanced", "components": ["Load Balancer", "Multiple API Servers", "Redis"], "considerations": ["Caching", "Read replicas"]},
        ],
    }

def _get_quality_score(complexity: str, num_modules: int) -> dict:
    base = {"Low": 75, "Medium": 68, "High": 62}.get(complexity, 68)
    return {
        "scalability": min(85, base - 5 + num_modules),
        "security": base + 2,
        "maintainability": min(82, base + 8),
        "performance": base + 1,
        "overall": base + 2,
        "explanation": "Score generated based on architectural patterns and domain modules.",
        "improvements": ["Add automated testing", "Implement logging"],
    }

def _get_dynamic_roadmap(modules: list, complexity: str) -> list:
    phases = [
        {"phase": "Phase 1", "title": "Project Foundation & Auth", "duration": "1-2 weeks", "tasks": [
            {"task": "Initialize repositories and environment", "duration": "2 days"},
            {"task": "Database schema and ORM setup", "duration": "2 days"},
            {"task": "Implement Authentication & User Profiles", "duration": "3 days"},
        ]}
    ]
    
    core_modules = [m for m in modules if "Management" in m["name"] or "Planning" in m["name"] or "Tracking" in m["name"]]
    other_modules = [m for m in modules if m not in core_modules and "Auth" not in m["name"]]
    
    if core_modules:
        core_tasks = []
        for mod in core_modules[:3]:
            core_tasks.append({"task": f"Develop {mod['name']} APIs", "duration": "3 days"})
            core_tasks.append({"task": f"Build {mod['name']} UI components", "duration": "2 days"})
        phases.append({"phase": "Phase 2", "title": "Core Domain Features", "duration": "3-4 weeks", "tasks": core_tasks})
        
    if len(core_modules) > 3 or other_modules:
        adv_tasks = []
        for mod in core_modules[3:]:
            adv_tasks.append({"task": f"Develop {mod['name']}", "duration": "3 days"})
        for mod in other_modules[:3]:
            adv_tasks.append({"task": f"Integrate {mod['name']}", "duration": "3 days"})
        phases.append({"phase": "Phase 3", "title": "Advanced Features & Integrations", "duration": "2-3 weeks", "tasks": adv_tasks})
        
    phases.append({"phase": f"Phase {len(phases)+1}", "title": "Testing & Deployment", "duration": "1-2 weeks", "tasks": [
        {"task": "End-to-end testing and QA", "duration": "3 days"},
        {"task": "Production deployment", "duration": "1 day"},
    ]})
    
    return phases

def _get_comparison(complexity: str) -> dict:
    return {
        "monolithic": {
            "advantages": ["Simple to develop", "Easy debugging"],
            "disadvantages": ["Single point of failure"],
            "best_for": "MVPs",
            "complexity": "Low",
        },
        "microservices": {
            "advantages": ["Independent scaling"],
            "disadvantages": ["Complex infrastructure"],
            "best_for": "Large scale apps",
            "complexity": "High",
        },
        "recommended": "Monolithic" if complexity in ("Low", "Medium") else "Microservices",
        "reason": "Architectural recommendation based on estimated complexity.",
    }
'''

with open(r'c:\Users\TempAdmin\OneDrive\Desktop\Expo\ai-software-architect\backend\app\services\demo_generator.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("demo_generator.py updated successfully.")
