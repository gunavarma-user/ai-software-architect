# AI Software Architect

> Turn your software idea into a technical blueprint.

AI Software Architect is an AI-powered software planning platform that converts a natural language software idea into a structured technical blueprint, including requirements, architecture, database design, API endpoints, and a development roadmap.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)

## Features

- **Requirement Analysis** - Extracts functional and non-functional requirements
- **Architecture Design** - Generates system architecture with visual Mermaid.js diagrams
- **Tech Stack Recommendation** - Suggests technologies based on project complexity
- **Database Designer** - Auto-generates entities, schemas, and ER diagrams
- **API Generator** - Creates REST API endpoints grouped by modules
- **Module Breakdown** - Organizes the project into manageable modules
- **Security Analysis** - Provides security recommendations with priorities
- **Performance Analysis** - Suggests performance optimizations
- **Scalability Analysis** - Shows how architecture evolves at different user scales
- **Architecture Quality Score** - Rates the architecture on multiple dimensions
- **Architecture Comparison** - Compares Monolithic vs Microservices approaches
- **Development Roadmap** - Generates a phased implementation plan
- **Export** - Export blueprints as JSON or Markdown
- **Project History** - Save and revisit previously generated blueprints

## Architecture

```
Frontend (React + Vite)
      ↓
  API Proxy (/api)
      ↓
Backend (FastAPI + Python)
      ↓
   ┌──────────┐
   │ AI Mode  │  ←→  OpenAI-compatible LLM API
   │ Demo Mode│  ←→  Local keyword-based generator
   └──────────┘
      ↓
  SQLite Database
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Lucide React, Mermaid.js |
| Backend | Python, FastAPI, Pydantic, Uvicorn |
| Database | SQLite (via aiosqlite) |
| AI | OpenAI-compatible API (configurable) |
| Diagrams | Mermaid.js |

## Folder Structure

```
ai-software-architect/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Reusable components
│   │   │   ├── dashboard/       # Dashboard section components
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── context/             # React context (state management)
│   │   ├── pages/               # Page components
│   │   ├── services/            # API service layer
│   │   ├── styles/              # CSS styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   ├── ai/                  # LLM prompt templates
│   │   ├── database/            # SQLite database layer
│   │   ├── schemas/             # Pydantic models
│   │   ├── services/            # Business logic (AI + Demo)
│   │   ├── utils/               # Helpers
│   │   └── main.py              # FastAPI entry point
│   └── requirements.txt
├── .env                         # Environment variables (local)
├── .env.example                 # Environment variable template
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites

- **Python 3.10+** (with pip)
- **Node.js 18+** (with npm)

### 1. Clone / Download the Project

Navigate to the project directory:
```bash
cd ai-software-architect
```

### 2. Backend Setup

```bash
# Create a virtual environment (recommended)
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Environment Variables

Edit the `.env` file in the project root:

```env
# Leave empty for Demo Mode, or set for AI Mode:
LLM_API_KEY=your-api-key-here
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
```

## Running the Project

### Start Backend (Terminal 1)

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Open **http://localhost:3000** in your browser.

## Demo Mode

When no `LLM_API_KEY` is configured (or the API request fails), the application automatically switches to **Demo Mode**:

- The user can still enter any software idea
- A local keyword-based generator analyzes the idea and produces a complete blueprint
- The generator detects categories like food delivery, education, e-commerce, healthcare, etc.
- The output includes all sections: requirements, architecture, tech stack, database, APIs, etc.
- A "Demo Mode" badge is clearly shown in the dashboard header

Demo Mode ensures the application **always works**, even without internet or API access.

## AI Mode

When a valid `LLM_API_KEY` is configured:

- The backend sends the idea to an OpenAI-compatible LLM
- The LLM is instructed to return structured JSON matching the blueprint schema
- The response is validated and displayed in the dashboard
- An "AI Mode" badge is shown in the header
- If the AI call fails for any reason, it automatically falls back to Demo Mode

### Supported Providers

Any OpenAI-compatible API works:
- **OpenAI** - `https://api.openai.com/v1`
- **Azure OpenAI** - Your Azure endpoint
- **Ollama** - `http://localhost:11434/v1`
- **Any OpenAI-compatible provider**

## API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/generate` | Generate blueprint from idea |
| `GET` | `/api/projects` | List saved projects |
| `GET` | `/api/projects/{id}` | Get specific project |
| `DELETE` | `/api/projects/{id}` | Delete a project |

### POST /api/generate

**Request:**
```json
{
  "idea": "Create a platform where college students can find study partners..."
}
```

**Response:**
```json
{
  "blueprint": { ... },
  "mode": "demo"
}
```

## Example Prompts

1. *"Create a platform where college students can find other students to study with based on subjects, interests and availability."*
2. *"Create an online food delivery application."*
3. *"Create a platform where students can exchange used textbooks."*
4. *"Create a college event management platform."*

## Future Scope

- PDF export with formatted layout
- Save/share blueprints via unique URLs
- Multiple LLM provider support with model selection UI
- Collaborative editing of blueprints
- Custom architecture templates
- Code scaffold generation from blueprints
- Integration with GitHub for project initialization
- Diagram editing with drag-and-drop
- Comparison of multiple generated blueprints
