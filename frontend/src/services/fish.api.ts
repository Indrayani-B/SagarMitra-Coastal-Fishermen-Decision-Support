const API_BASE = "http://127.0.0.1:8000/api";

export async function predictFish(image: File) {
  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(`${API_BASE}/fish/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Prediction failed");
  }

  return response.json();
}
