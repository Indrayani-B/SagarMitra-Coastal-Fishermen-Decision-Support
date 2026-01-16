from fastapi import APIRouter, Depends, HTTPException
from app.services.market_recommendation_service import get_market_recommendations
from app.services.price_prediction_service import PriceService

router = APIRouter()

# Dependency
# -------------------------------
def get_price_service():
    return PriceService()


@router.get("/market/recommend")
def recommend_market(
    fish: str,
    lat: float,
    lng: float
):
    recommendations = get_market_recommendations(fish, lat, lng)

    return {
        "fish": fish,
        "best_market": recommendations[0] if recommendations else None,
        "nearby_markets": recommendations
    }

# NEW ENDPOINT (PRICE PREDICTION)
# -------------------------------
@router.get("/market/predict-price")
def predict_market_price(
    fish: str,
    price_service: PriceService = Depends(get_price_service)
):
    """
    Predict ideal selling price using ML (LSTM + live market data)
    """
    try:
        return price_service.get_price_prediction(fish)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Price prediction engine error"
        )