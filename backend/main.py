from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # <--- NEW IMPORT
from sqlmodel import SQLModel
from database import engine
from routers import auth, posts 

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Startup: Checking database connection...")
    SQLModel.metadata.create_all(engine)
    yield
    print("Shutdown: Cleaning up...")

app = FastAPI(
    title="DevJournal API",
    description="A full-stack blog platform backend",
    version="1.0.0",
    lifespan=lifespan
)

# --- SECURITY BRIDGE (CORS) ---
# This tells the backend: "Allow requests from these origins"
origins = [
    "http://localhost:5173",
    "https://localhost:5173",
    "http://127.0.0.1:5173",
    # In Codespaces, the frontend URL is dynamic, so we allow all ("*") for development.
    # In a real job, you would put the specific domain here.
    "*" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow GET, POST, PUT, DELETE
    allow_headers=["*"],
)

# --- ROUTERS ---
app.include_router(auth.router)
app.include_router(posts.router, tags=["Posts"])

@app.get("/")
def read_root():
    return {"message": "Welcome to DevJournal API", "status": "active"}