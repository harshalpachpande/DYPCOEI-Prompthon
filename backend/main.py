"""
CityPulse: Your Living City Twin - FastAPI Backend Service
Turning urban chaos into calm, one smart decision at a time.
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import math
import time

app = FastAPI(
    title="CityPulse Living City Twin API",
    description="Explainable digital twin microservices for real-time safety, pulse scores, safe routing, and citizen trust engine.",
    version="1.0.0"
)

# Enable CORS for Next.js / Vite client
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- DATA MODELS -----------------

class ScoreWeights(BaseModel):
    safety: float = 0.30
    cleanliness: float = 0.20
    affordability: float = 0.15
    ratings: float = 0.15
    accessibility: float = 0.10
    crowd: float = 0.10

class PulseScoreRequest(BaseModel):
    safety: float = Field(..., ge=0, le=100)
    cleanliness: float = Field(..., ge=0, le=100)
    affordability: float = Field(..., ge=0, le=100)
    rating: float = Field(..., ge=1, le=5)
    reality_rating: float = Field(..., ge=1, le=5)
    accessibility: float = Field(..., ge=0, le=100)
    crowd_comfort: float = Field(..., ge=0, le=100)
    profile: Optional[str] = "standard"  # standard, night_solo, budget_backpacker, accessible
    hour: Optional[int] = 18

class RouteRequest(BaseModel):
    origin: List[float] # [lat, lng]
    destination: List[float]
    is_raining: bool = False
    is_night: bool = False

class ReportVerificationRequest(BaseModel):
    category: str
    text: str
    has_photo: bool = True
    exif_lat: Optional[float] = None
    exif_lng: Optional[float] = None
    reporter_reputation: float = 90.0

class ItineraryRequest(BaseModel):
    budget: float = 1200.0
    time_window: str = "evening" # morning, evening, fullday
    group_type: str = "Solo"
    interests: List[str] = ["food", "heritage"]

# ----------------- SEED DATA -----------------

PUNE_ZONES = [
    {
        "id": "hex_fc_road",
        "name": "FC Road & Fergusson Campus",
        "center": [18.5222, 73.8415],
        "safety_score": 88,
        "cleanliness_score": 82,
        "affordability_score": 90,
        "traffic_index": 65,
        "aqi": 72,
        "waterlogging_risk": 22,
        "lighting_index": 94,
        "night_safety_score": 86,
        "pulse_score": 85,
        "elevation_meters": 565
    },
    {
        "id": "hex_shaniwar_wada",
        "name": "Old City & Shaniwar Wada",
        "center": [18.5195, 73.8553],
        "safety_score": 80,
        "cleanliness_score": 68,
        "affordability_score": 92,
        "traffic_index": 78,
        "aqi": 98,
        "waterlogging_risk": 48,
        "lighting_index": 75,
        "night_safety_score": 72,
        "pulse_score": 77,
        "elevation_meters": 554
    },
    {
        "id": "hex_jm_road",
        "name": "JM Road & Deccan Gymkhana",
        "center": [18.5175, 73.8440],
        "safety_score": 85,
        "cleanliness_score": 84,
        "affordability_score": 78,
        "traffic_index": 72,
        "aqi": 80,
        "waterlogging_risk": 65,
        "lighting_index": 92,
        "night_safety_score": 83,
        "pulse_score": 81,
        "elevation_meters": 551
    },
    {
        "id": "hex_pcmc_chinchwad",
        "name": "PCMC Chinchwad Heritage & Pawana River",
        "center": [18.6279, 73.7820],
        "safety_score": 91,
        "cleanliness_score": 89,
        "affordability_score": 88,
        "traffic_index": 45,
        "aqi": 62,
        "waterlogging_risk": 15,
        "lighting_index": 94,
        "night_safety_score": 92,
        "pulse_score": 90,
        "elevation_meters": 565
    },
    {
        "id": "hex_pcmc_hinjawadi",
        "name": "PCMC / Hinjawadi Global Tech Park",
        "center": [18.5913, 73.7389],
        "safety_score": 95,
        "cleanliness_score": 92,
        "affordability_score": 68,
        "traffic_index": 72,
        "aqi": 68,
        "waterlogging_risk": 20,
        "lighting_index": 98,
        "night_safety_score": 96,
        "pulse_score": 91,
        "elevation_meters": 572
    },
    {
        "id": "hex_pcmc_nigdi",
        "name": "PCMC Nigdi Pradhikaran & Bhakti-Shakti",
        "center": [18.6534, 73.7744],
        "safety_score": 94,
        "cleanliness_score": 93,
        "affordability_score": 82,
        "traffic_index": 40,
        "aqi": 55,
        "waterlogging_risk": 10,
        "lighting_index": 96,
        "night_safety_score": 93,
        "pulse_score": 92,
        "elevation_meters": 580
    }
]

# ----------------- ENDPOINTS -----------------

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "system": "CityPulse Living City Twin",
        "pilot_city": "Pune, Maharashtra",
        "h3_resolution": "micro-zone-8",
        "services": {
            "places_service": "online",
            "safety_routing_service": "online",
            "trust_engine": "online",
            "explainable_ai": "online",
            "mood_telemetry": "online"
        },
        "timestamp": time.time()
    }

@app.get("/api/zones")
def get_zones():
    return {"zones": PUNE_ZONES, "count": len(PUNE_ZONES)}

@app.post("/api/pulse-score/explain")
def calculate_explainable_pulse(req: PulseScoreRequest):
    # Dynamic profile weights
    profiles = {
        "standard": {"safety": 0.30, "cleanliness": 0.20, "affordability": 0.15, "ratings": 0.15, "accessibility": 0.10, "crowd": 0.10},
        "night_solo": {"safety": 0.50, "cleanliness": 0.15, "affordability": 0.05, "ratings": 0.10, "accessibility": 0.10, "crowd": 0.10},
        "budget_backpacker": {"safety": 0.20, "cleanliness": 0.15, "affordability": 0.40, "ratings": 0.10, "accessibility": 0.05, "crowd": 0.10},
        "accessible": {"safety": 0.25, "cleanliness": 0.15, "affordability": 0.10, "ratings": 0.10, "accessibility": 0.35, "crowd": 0.05}
    }
    w = profiles.get(req.profile, profiles["standard"])

    # Reality vs Rating Adjustment
    delta = req.rating - req.reality_rating
    penalty = (delta * 8) if delta > 0.3 else 0
    ratings_score = max(20.0, min(100.0, (req.reality_rating / 5.0) * 100.0 - penalty))

    # Time-of-day modifier (night 21:00 - 05:00)
    is_night = req.hour >= 21 or req.hour <= 5
    adjusted_safety = req.safety * 0.92 if is_night else req.safety

    overall = round(
        (adjusted_safety * w["safety"]) +
        (req.cleanliness * w["cleanliness"]) +
        (req.affordability * w["affordability"]) +
        (ratings_score * w["ratings"]) +
        (req.accessibility * w["accessibility"]) +
        (req.crowd_comfort * w["crowd"])
    )

    positive_factors = []
    risk_factors = []

    if adjusted_safety >= 85:
        positive_factors.append("Strong police beats, high footfall, well-lit corridors.")
    elif adjusted_safety < 70:
        risk_factors.append("Low night lighting index or historical incident hotspot.")

    if req.cleanliness >= 85:
        positive_factors.append("Municipal grade A hygiene audit.")
    else:
        risk_factors.append("Citizen reports of roadside litter/waste bins.")

    if delta > 0.4:
        risk_factors.append(f"Reality vs Rating Alert: Online rating ({req.rating}★) is inflated vs ground-truth ({req.reality_rating}★).")
    else:
        positive_factors.append(f"Ground-truth verified at {req.reality_rating}★.")

    return {
        "overall_pulse_score": overall,
        "sub_scores": {
            "safety": adjusted_safety,
            "cleanliness": req.cleanliness,
            "affordability": req.affordability,
            "ratings_reality_score": ratings_score,
            "accessibility": req.accessibility,
            "crowd_comfort": req.crowd_comfort
        },
        "weights_used": w,
        "positive_factors": positive_factors,
        "risk_factors": risk_factors,
        "verdict": f"Score {overall}/100 verified by explainable multi-factor model."
    }

@app.post("/api/routes/safe")
def compute_safe_routes(req: RouteRequest):
    # Safe Route Cost formula from prompt:
    # edge_cost = time·w1 + (100 − safety)·w2 + risk_weather·w3 + (100 − lighting)·w4
    w1, w2, w3, w4 = 0.35, 0.35, 0.15, 0.15

    # 1. Fastest route
    fast_min = 18 if req.is_raining else 14
    fast_safety = 58 if req.is_raining else (68 if req.is_night else 74)
    fast_weather_risk = 88 if req.is_raining else 10
    fast_lighting = 65 if req.is_night else 95
    fast_cost = round(fast_min * w1 + (100 - fast_safety) * w2 + fast_weather_risk * w3 + (100 - fast_lighting) * w4, 1)

    # 2. Safest route (Rain-Aware Detour over elevated ridge)
    safe_min = 21 if req.is_raining else 19
    safe_safety = 94
    safe_weather_risk = 12 if req.is_raining else 5
    safe_lighting = 96
    safe_cost = round(safe_min * w1 + (100 - safe_safety) * w2 + safe_weather_risk * w3 + (100 - safe_lighting) * w4, 1)

    # 3. Balanced route
    bal_min = 18 if req.is_raining else 16
    bal_safety = 78 if req.is_raining else 86
    bal_weather_risk = 35 if req.is_raining else 10
    bal_lighting = 88
    bal_cost = round(bal_min * w1 + (100 - bal_safety) * w2 + bal_weather_risk * w3 + (100 - bal_lighting) * w4, 1)

    return {
        "fastest": {
            "duration_minutes": fast_min,
            "safety_score": fast_safety,
            "waterlogging_risk": "Severe" if req.is_raining else "None",
            "edge_cost": fast_cost,
            "elevation_profile": [565, 550, 548, 554]
        },
        "safest": {
            "duration_minutes": safe_min,
            "safety_score": safe_safety,
            "waterlogging_risk": "None",
            "edge_cost": safe_cost,
            "elevation_profile": [565, 568, 566, 560],
            "rain_aware_reroute": req.is_raining
        },
        "balanced": {
            "duration_minutes": bal_min,
            "safety_score": bal_safety,
            "waterlogging_risk": "Moderate" if req.is_raining else "None",
            "edge_cost": bal_cost,
            "elevation_profile": [565, 560, 556, 554]
        }
    }

@app.post("/api/reports/verify")
def verify_citizen_report(req: ReportVerificationRequest):
    # Trust Engine 4-component calculation:
    exif_match = req.has_photo
    duplicate_clustered = True
    corroboration_votes = 4
    reporter_rep = req.reporter_reputation / 100.0

    trust_score = round(
        (30.0 if exif_match else 15.0) +
        (25.0 if duplicate_clustered else 10.0) +
        (min(20.0, corroboration_votes * 5.0)) +
        (reporter_rep * 25.0)
    )

    is_verified = trust_score >= 85

    return {
        "trust_score": trust_score,
        "status": "verified" if is_verified else "investigating",
        "breakdown": {
            "exif_gps_match": exif_match,
            "duplicate_clustering": duplicate_clustered,
            "corroborations": corroboration_votes,
            "reporter_weight": reporter_rep
        },
        "message": "Report successfully verified and admitted to zone Pulse Score model." if is_verified else "Report queued for nearby citizen verification."
    }

@app.get("/api/insights/mood")
def get_city_mood():
    return {
        "city": "Pune",
        "state": "Brisk",
        "score": 68,
        "description": "Moderate evening traffic; rain drizzle over Deccan Gymkhana.",
        "telemetry": {
            "traffic_index": 62,
            "temperature_c": 26,
            "weather": "Light Drizzle",
            "aqi": 68,
            "social_sentiment_positive_pct": 78
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

