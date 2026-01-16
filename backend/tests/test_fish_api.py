from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_predict_no_file():
    response = client.post("/api/fish/predict")
    assert response.status_code == 422  # Validation error

def test_list_species():
    response = client.get("/api/fish/species")
    assert response.status_code == 200
    assert len(response.json()) > 0