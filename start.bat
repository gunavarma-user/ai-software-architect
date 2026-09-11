@echo off
echo Starting AI Software Architect...

echo.
echo Starting Backend (FastAPI)...
start cmd /k "cd backend && python -m venv venv && call venv\Scripts\activate && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000"

echo.
echo Starting Frontend (React/Vite)...
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo Setup complete! Both servers are starting in new windows.
echo Frontend will be available at http://localhost:3000
echo Backend API will be available at http://localhost:8000
