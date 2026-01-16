from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from pydantic import BaseModel
from app.services.fish_service import FishService

router = APIRouter()

# -----------------------------------
# Response Models
# -----------------------------------

class PriceRange(BaseModel):
    min: float
    max: float


class PriceInfo(BaseModel):
    recommended_price: float
    price_range: PriceRange
    currency: str
    market: str


class FishResult(BaseModel):
    fish_name: str
    local_names: list[str]
    season_status: str
    price: PriceInfo
    market_demand: str
    selling_advice: str


# -----------------------------------
# Dependency Injection
# -----------------------------------

def get_fish_service():
    from app.main import fish_service
    return fish_service


# -----------------------------------
# API Endpoint
# -----------------------------------

@router.post("/fish/predict", response_model=FishResult)
async def predict_fish(
    file: UploadFile = File(...),
    fish_service: FishService = Depends(get_fish_service)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File must be an image"
        )

    try:
        image_bytes = await file.read()
        return fish_service.identify_fish(image_bytes)

    except ValueError as e:
        # Business / validation errors
        raise HTTPException(status_code=422, detail=str(e))

    except Exception:
        # Fallback safety (should rarely happen)
        raise HTTPException(
            status_code=500,
            detail="Internal server error during fish prediction"
        )
