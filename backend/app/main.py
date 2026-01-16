from fastapi import FastAPI
 
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.api.routes import market
from app.models.fish_classifier import FishClassifier
from app.services.fish_service import FishService
from app.api.routes import fish, health

# -------------------------------------------------
# Logging
# -------------------------------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# -------------------------------------------------
# FastAPI app
# -------------------------------------------------
app = FastAPI(
    title="SagarMitra Fish Classifier API",
    description="AI-powered, fisherman-oriented fish identification system (Mumbai)",
    version="1.0.0"
)

# -------------------------------------------------
# CORS (frontend access)
# -------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# Initialize ML + Services (LOAD ONCE)
# -------------------------------------------------
fish_classifier = FishClassifier()
fish_service = FishService(fish_classifier)

# -------------------------------------------------
# Root endpoint (basic health)
# -------------------------------------------------
@app.get("/")
async def root():
    return {
        "status": "healthy",
        "service": "SagarMitra Backend",
        "version": "1.0.0"
    }

# -------------------------------------------------
# Routers
# -------------------------------------------------
app.include_router(
    fish.router,
    prefix="/api",
    tags=["Fish"]
)

app.include_router(
    health.router,
    prefix="/api",
    tags=["Health"]
)

 

app.include_router(market.router, prefix="/api", tags=["Market"])


# -------------------------------------------------
# Local run (optional)
# -------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
