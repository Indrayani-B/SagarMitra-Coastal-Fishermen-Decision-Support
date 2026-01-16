import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Upload,
  Fish,
  IndianRupee,
  Calendar,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MarketMap from "@/components/MarketMap";

const API_URL = "http://127.0.0.1:8000/api/fish/predict";
const MARKET_API = "http://127.0.0.1:8000/api/market/recommend";

const CatchToCash: React.FC = () => {
  const navigate = useNavigate();

  type FishResult = {
  fish_name: string;
  local_names: string[];
  season_status: string;
  price: {
    recommended_price: number;
    price_range: {
      min: number;
      max: number;
    };
    currency: string;
    market: string;
  };
  market_demand: string;
  selling_advice: string;
  };

  type Market = {
  market: string;
  city: string;
  area: string;
  distance_km: number;
  rating: number;
  reviews: number;
  type: string;
  opening_hours: string;
  lat: number;
  lng: number;
  score: number;
  };

  // ✅ NEW: market + location state
  const [markets, setMarkets] = useState<Market[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  console.log("markets:", markets);
  console.log("location:", location);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<FishResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

   

  // ✅ NEW: get user location once
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        // Mumbai fallback
        setLocation({ lat: 19.076, lng: 72.8777 });
      }
    );
  }, []);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setMarkets([]);
    setError("");
  };

  const onUpload = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    setLoading(true);
    setError("");
    setResult(null);
    setMarkets([]);

    try {
      // 🔹 Fish prediction
      const res = await fetch(API_URL, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Prediction failed");
      }

      const data = await res.json();
      setResult(data);

      // ✅ NEW: fetch market data AFTER prediction
      if (location) {
        const marketRes = await fetch(
          `${MARKET_API}?fish=${data.fish_name}&lat=${location.lat}&lng=${location.lng}`
        );
        const marketData = await marketRes.json();
        setMarkets(marketData.nearby_markets || []);

        console.log("Market API response:", marketData);

      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">Catch to Cash</h1>
        <p className="text-gray-600 mb-6">
          Upload your fish photo to get selling advice instantly.
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center bg-white shadow-sm">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="h-10 w-10 text-gray-400" />
            <span className="text-gray-500">
              Click to upload fish image (JPG / PNG)
            </span>
          </label>

          {preview && (
            <div className="mt-4 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 rounded-lg shadow"
              />
            </div>
          )}
        </div>

        {/* Identify Button */}
        {file && (
          <Button
            className="mt-4 w-full text-lg"
            onClick={onUpload}
            disabled={loading}
          >
            {loading ? "Analyzing Catch..." : "Identify & Get Advice"}
          </Button>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 mt-4 text-center">{error}</p>
        )}

        {/* Result */}
        {result && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Fish className="text-blue-600" />
              {result.fish_name}
            </h2>

            <p className="text-gray-500">
              Local name: {result.local_names.join(", ")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <Calendar className="text-green-600" />
                <div>
                  <p className="font-semibold">Season Status</p>
                  <p className="text-sm text-gray-600">
                    {result.season_status}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <IndianRupee className="text-yellow-600" />
                <div>
                  <p className="font-semibold">Recommended Selling Price</p>

                  <p className="text-lg font-bold text-gray-800">
                    ₹{result.price.recommended_price} / kg
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Fair range: ₹{result.price.price_range.min} – ₹{result.price.price_range.max}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Market: {result.price.market}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl md:col-span-2">
                <MapPin className="text-blue-600" />
                <div>
                  <p className="font-semibold">Selling Advice</p>
                  <p className="text-sm text-gray-700">
                    {result.selling_advice}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Market demand: {result.market_demand}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ NEW: Best Market + Map */}
        {markets.length > 0 && location && (
          <div className="mt-8 space-y-4">
            <div className="p-4 rounded-xl bg-green-50 border border-green-300">
              <h3 className="text-lg font-bold">🏆 Best Market Today</h3>
              <p className="text-xl font-semibold">{markets[0].market}</p>
              <p className="text-gray-700">
                ⭐ {markets[0].rating} rating • {markets[0].reviews} reviews • {markets[0].distance_km} km away

              </p>

              <button
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${markets[0].lat},${markets[0].lng}`,
                    "_blank"
                  )
                }
              >
                Navigate to Market
              </button>
            </div>

            <MarketMap
              markets={markets}
              userLat={location.lat}
              userLng={location.lng}
              bestMarketName={markets[0].market}
            />

          </div>
        )}
      </div>
    </div>
  );
};

export default CatchToCash;
