from app.models.Market_price_pred.predict_price import predict_price
from app.utils.fish_name_mapper import model_to_csv_fish_name


class PriceService:
    """
    Service layer for fish price prediction
    Loads ML once and exposes clean method to API / other services
    """

    def __init__(self):
        # Model & artifacts are loaded inside predict_price module (once)
        pass
    
    def get_price_prediction(self, fish_name: str) -> dict:
       # 🔁 Convert model output → CSV species name
        csv_fish_name = model_to_csv_fish_name(fish_name)

        if csv_fish_name is None:
            raise ValueError(
                f"Price prediction not supported for fish species: {fish_name}"
            )

       
        try:
            return predict_price(csv_fish_name)
        except ValueError as e:
            raise ValueError(str(e))
        except Exception:
            raise RuntimeError("Price prediction service failed") from e
