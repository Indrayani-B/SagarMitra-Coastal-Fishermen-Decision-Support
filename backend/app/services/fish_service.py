from app.models.fish_classifier import FishClassifier
from datetime import datetime
import json
from pathlib import Path
from app.services.price_prediction_service import PriceService

class FishService:
    def __init__(self, classifier: FishClassifier):
        self.classifier = classifier
        self.fish_info = self._load_fish_info()
        self.price_service = PriceService()

    def _load_fish_info(self) -> dict:
        """Load fish information database"""
        with open("app/data/fish_info.json", 'r') as f:
            return json.load(f)
    
    def identify_fish(self, image_bytes: bytes) -> dict:
        """
        Complete fish identification with all insights
        """
        # Get prediction
        prediction = self.classifier.predict(image_bytes)

        # Confidence threshold
        if prediction["confidence"] < 0.60:
            raise ValueError("Image unclear. Please retake the photo.")

        species = prediction["species"]
        info = self.fish_info.get(species, {})

        season_status = self._get_seasonality_status(species)
        price_data = self.price_service.get_price_prediction(species)

        # 🔹 Recommended price (decision price)
        recommended_price = round(price_data["ideal_selling_price"], 2)

        # 🔹 Fair price range (protection band)
        min_price = round(recommended_price * 0.90, 2)
        max_price = round(recommended_price * 1.10, 2)

        return {
            "fish_name": species.title(),
            "local_names": info.get("local_names", []),
            "season_status": season_status,

            # ✅ PRICE OBJECT (clear & realistic)
            "price": {
                "recommended_price": recommended_price,
                "price_range": {
                    "min": min_price,
                    "max": max_price
                },
                "currency": "INR",
                "market": price_data["market"],  #The geographic market region for which price is predicted
                },

            "market_demand": price_data["demand"],  #Market demand level for this fish at the current time
            "selling_advice": self._selling_advice(season_status)
        }

        
         
    
    def _get_seasonality_status(self, species: str) -> str:
        """Determine if current month is peak season"""
        current_month = datetime.now().strftime('%B')
        info = self.fish_info.get(species, {})
        peak_season = info.get('peak_season', [])
        
        if current_month in peak_season:
            return "Peak Season - High Availability"
        return "Off Season - Limited Availability"
    
    def _estimate_price(self, species: str) -> dict:
        """Estimate current price based on seasonality"""
        info = self.fish_info.get(species, {})
        base_price = info.get('avg_price_per_kg', 200)
        
        # Adjust for seasonality
        current_month = datetime.now().strftime('%B')
        peak_season = info.get('peak_season', [])
        
        if current_month in peak_season:
            wholesale = base_price * 0.8
            retail = base_price
        else:
            wholesale = base_price * 1.2
            retail = base_price * 1.3
        
        return {
            'wholesale_min': round(wholesale * 0.9, 2),
            'wholesale_max': round(wholesale * 1.1, 2),
            'retail_min': round(retail * 0.9, 2),
            'retail_max': round(retail * 1.1, 2),
            'currency': 'INR'
        }
    
    def _selling_advice(self, season_status: str) -> str:
        if "Peak" in season_status:
            return "Good time to sell at nearby wholesale markets"
        return "Limited availability – consider retail selling"

    
    def get_all_species(self) -> list:
        """Get list of all species"""
        return [
            {
                'name': species.title(),
                'scientific_name': info.get('scientific_name', 'N/A'),
                'local_names': info.get('local_names', [])
            }
            for species, info in self.fish_info.items()
        ]
    
    def get_species_info(self, species_name: str) -> dict:
        """Get detailed info about specific species"""
        species = species_name.lower()
        if species not in self.fish_info:
            raise ValueError("Species not found")
        
        info = self.fish_info[species]
        info['species'] = species.title()
        return info