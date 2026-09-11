import aiosqlite
import os
import json

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "architect.db")


async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                idea TEXT NOT NULL,
                blueprint_json TEXT NOT NULL,
                mode TEXT NOT NULL DEFAULT 'demo',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.commit()


async def save_project(title: str, idea: str, blueprint_json: str, mode: str) -> int:
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "INSERT INTO projects (title, idea, blueprint_json, mode) VALUES (?, ?, ?, ?)",
            (title, idea, blueprint_json, mode),
        )
        await db.commit()
        return cursor.lastrowid


async def get_projects():
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT id, title, idea, mode, created_at FROM projects ORDER BY created_at DESC"
        )
        rows = await cursor.fetchall()
        return [dict(row) for row in rows]


async def get_project(project_id: int):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            "SELECT id, title, idea, blueprint_json, mode, created_at FROM projects WHERE id = ?",
            (project_id,),
        )
        row = await cursor.fetchone()
        if row:
            data = dict(row)
            data["blueprint"] = json.loads(data.pop("blueprint_json"))
            return data
        return None


async def delete_project(project_id: int) -> bool:
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("DELETE FROM projects WHERE id = ?", (project_id,))
        await db.commit()
        return cursor.rowcount > 0
