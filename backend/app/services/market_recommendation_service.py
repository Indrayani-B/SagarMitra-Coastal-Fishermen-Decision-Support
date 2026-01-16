import json
import math
from typing import List

# -------------------------------
# Load market data once
# -------------------------------
with open("../backend/app/data/markets_mumbai_data.json", "r") as f:
    MARKET_DATA = json.load(f)["markets"]

MAX_REVIEWS = max(m["google_reviews"] for m in MARKET_DATA)

# -------------------------------
# Utils
# -------------------------------
def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def normalize_distance(dist, max_dist):
    return min(dist / max_dist, 1.0)


def compute_score(market, distance_km, max_distance):
    """
    Advanced weighted ranking (from your JSON spec)
    """
    rating_score = market["google_rating"] / 5
    distance_score = 1 - normalize_distance(distance_km, max_distance)
    review_score = math.log(1 + market["google_reviews"]) / math.log(1 + MAX_REVIEWS)

    final_score = (
        0.55 * rating_score
        + 0.25 * distance_score
        + 0.20 * review_score
    )

    return round(final_score, 4)



def get_market_recommendations(
    fish: str,
    user_lat: float,
    user_lng: float
) -> List[dict]:

    enriched = []

    # -------------------------------
    # Stage 1: distance calculation
    # -------------------------------
    for market in MARKET_DATA:
        dist = haversine(
            user_lat,
            user_lng,
            market["latitude"],
            market["longitude"]
        )

        enriched.append({
            **market,
            "distance_km": round(dist, 2)
        })

    # -------------------------------
    # Stage 2: nearest 5 markets
    # -------------------------------
    nearest = sorted(enriched, key=lambda x: x["distance_km"])[:5]

    max_distance = max(m["distance_km"] for m in nearest) or 1

    # -------------------------------
    # Stage 3: weighted ranking
    # -------------------------------
    ranked = []
    for m in nearest:
        score = compute_score(m, m["distance_km"], max_distance)

        ranked.append({
            "market": m["name"],
            "city": m["city"],
            "area": m["area"],
            "distance_km": m["distance_km"],
            "rating": m["google_rating"],
            "reviews": m["google_reviews"],
            "type": m["type"],
            "opening_hours": m["opening_hours"],
            "lat": m["latitude"],
            "lng": m["longitude"],
            "score": score
        })

    ranked.sort(key=lambda x: x["score"], reverse=True)

    return ranked
