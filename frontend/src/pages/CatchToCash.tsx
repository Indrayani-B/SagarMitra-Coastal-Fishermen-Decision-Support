import { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Upload,
  Fish,
  IndianRupee,
  Calendar,
  MapPin,
  Star,
  Clock,
  Navigation,
  TrendingUp,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MarketMap from "@/components/MarketMap";

const API_URL   = "http://127.0.0.1:8000/api/fish/predict";
const MARKET_API = "http://127.0.0.1:8000/api/market/recommend";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FishResult = {
  fish_name: string;
  local_names: string[];
  season_status: string;
  price: {
    recommended_price: number;
    price_range: { min: number; max: number };
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

// ---------------------------------------------------------------------------
// Helper — star rating display
// ---------------------------------------------------------------------------

const StarRating = ({ rating }: { rating: number }) => {
  const full    = Math.floor(rating);
  const partial = rating % 1;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fill =
          i < full ? "#f59e0b" : i === full && partial >= 0.5 ? "#f59e0b" : "#d1d5db";
        return (
          <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill={fill}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </span>
  );
};

// ---------------------------------------------------------------------------
// MarketCard — used for both best and suggested markets
// ---------------------------------------------------------------------------

interface MarketCardProps {
  market: Market;
  rank: number;
  isBest: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const MarketCard = ({ market, rank, isBest, isSelected, onClick }: MarketCardProps) => (
  <button
    onClick={onClick}
    className={`w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
      ${isBest
        ? "border-amber-400 bg-amber-50 shadow-md"
        : isSelected
        ? "border-blue-400 bg-blue-50 shadow-md"
        : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
      }`}
  >
    {/* Header row */}
    <div className="flex items-start justify-between gap-2 mb-2">
      <div className="flex items-center gap-2">
        {isBest && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-400 text-amber-900 text-xs font-black rounded-full">
            <Award size={10} /> BEST
          </span>
        )}
        {!isBest && (
          <span className="inline-flex items-center justify-center w-5 h-5 bg-slate-200 text-slate-600 text-xs font-bold rounded-full">
            {rank}
          </span>
        )}
        <p className="font-bold text-slate-900 text-sm leading-tight">{market.market}</p>
      </div>
      <span className="text-xs font-semibold text-blue-600 whitespace-nowrap">
        {market.distance_km} km
      </span>
    </div>

    {/* Area + type */}
    <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
      <MapPin size={11} className="text-slate-400 flex-shrink-0" />
      {market.area}, {market.city} · {market.type}
    </p>

    {/* Rating + hours row */}
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <StarRating rating={market.rating} />
        <span className="text-xs text-slate-500">
          {market.rating} ({market.reviews.toLocaleString()} reviews)
        </span>
      </div>
      <span className="text-xs text-slate-500 flex items-center gap-1">
        <Clock size={11} className="text-slate-400" />
        {market.opening_hours}
      </span>
    </div>

    {/* Navigate button — only on best card */}
    {isBest && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${market.lat},${market.lng}`,
            "_blank"
          );
        }}
        className="mt-3 w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
      >
        <Navigation size={14} /> Navigate to Market
      </button>
    )}
  </button>
);

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

const CatchToCash: React.FC = () => {
  const navigate = useNavigate();

  const [markets,   setMarkets]   = useState<Market[]>([]);
  const [location,  setLocation]  = useState<{ lat: number; lng: number } | null>(null);
  const [file,      setFile]      = useState<File | null>(null);
  const [preview,   setPreview]   = useState<string | null>(null);
  const [result,    setResult]    = useState<FishResult | null>(null);
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);
  // Track which market is highlighted on the map (click a card → pin pulses)
  const [selectedMarket, setSelectedMarket] = useState<string>("");

  // Get user location once on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      ()    => setLocation({ lat: 19.076, lng: 72.8777 }) // Mumbai fallback
    );
  }, []);

  // Auto-select best market when markets load
  useEffect(() => {
    if (markets.length > 0) setSelectedMarket(markets[0].market);
  }, [markets]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setMarkets([]);
    setError("");
    setSelectedMarket("");
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
      const res = await fetch(API_URL, { method: "POST", body: form });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Prediction failed");
      }
      const data: FishResult = await res.json();
      setResult(data);

      if (location) {
        const marketRes = await fetch(
          `${MARKET_API}?fish=${data.fish_name}&lat=${location.lat}&lng=${location.lng}`
        );
        const marketData = await marketRes.json();
        setMarkets(marketData.nearby_markets || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const hasResults = result !== null;
  const hasMarkets = markets.length > 0 && location !== null;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
          <div className="h-5 w-px bg-slate-200" />
          <div>
            <h1 className="text-xl font-black text-slate-900">Catch to Cash</h1>
            <p className="text-xs text-slate-500">Upload a photo · Get instant selling advice</p>
          </div>
        </div>
      </div>

      {/* ── Main layout — split when markets available ───────────────────── */}
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className={`flex gap-8 items-start ${hasMarkets ? "flex-col lg:flex-row" : ""}`}>

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div className={hasMarkets ? "w-full lg:w-[52%] space-y-6" : "max-w-2xl mx-auto w-full space-y-6"}>

            {/* Upload box */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2">
                <Upload size={16} className="text-blue-500" /> Upload Fish Photo
              </h2>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors">
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileChange}
                />
                <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-3">
                  {preview ? (
                    <img src={preview} alt="Preview" className="max-h-52 rounded-xl object-contain" />
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <Upload className="h-7 w-7 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-slate-700 font-semibold">Click to upload fish image</p>
                        <p className="text-slate-400 text-sm mt-0.5">JPG, PNG supported</p>
                      </div>
                    </>
                  )}
                </label>
                {preview && (
                  <label htmlFor="fileInput"
                    className="mt-3 inline-block text-xs text-blue-500 hover:underline cursor-pointer">
                    Change photo
                  </label>
                )}
              </div>

              {file && (
                <button
                  className={`mt-4 w-full py-3 rounded-xl text-white font-bold text-base transition-all
                    ${loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"}`}
                  onClick={onUpload}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Analyzing Catch…
                    </span>
                  ) : "Identify & Get Selling Advice"}
                </button>
              )}

              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                  {error}
                </div>
              )}
            </div>

            {/* Fish result card */}
            {result && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
                {/* Fish name header */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Fish className="text-blue-600" size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">{result.fish_name}</h2>
                    <p className="text-sm text-slate-500">
                      Local: {result.local_names.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                  {/* Season */}
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <Calendar className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs font-black text-green-800 uppercase tracking-wide mb-1">Season Status</p>
                      <p className="text-sm text-green-700 font-semibold">{result.season_status}</p>
                    </div>
                  </div>

                  {/* Market demand */}
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <TrendingUp className="text-purple-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs font-black text-purple-800 uppercase tracking-wide mb-1">Market Demand</p>
                      <p className="text-sm text-purple-700 font-semibold">{result.market_demand}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100 sm:col-span-2">
                    <IndianRupee className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                    <div className="flex-1">
                      <p className="text-xs font-black text-amber-800 uppercase tracking-wide mb-1">Recommended Selling Price</p>
                      <div className="flex items-baseline gap-3">
                        <p className="text-2xl font-black text-amber-900">
                          ₹{result.price.recommended_price}<span className="text-sm font-semibold"> /kg</span>
                        </p>
                        <p className="text-sm text-amber-700">
                          Range: ₹{result.price.price_range.min} – ₹{result.price.price_range.max}
                        </p>
                      </div>
                      <p className="text-xs text-amber-600 mt-1">Based on: {result.price.market}</p>
                    </div>
                  </div>

                  {/* Selling advice */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 sm:col-span-2">
                    <MapPin className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs font-black text-blue-800 uppercase tracking-wide mb-1">Selling Advice</p>
                      <p className="text-sm text-blue-800">{result.selling_advice}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Markets list */}
            {hasMarkets && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" />
                  Nearby Markets
                  <span className="ml-auto text-xs font-normal text-slate-400">
                    Click a card to highlight on map
                  </span>
                </h3>

                <div className="space-y-3">
                  {markets.map((market, i) => (
                    <MarketCard
                      key={market.market}
                      market={market}
                      rank={i + 1}
                      isBest={i === 0}
                      isSelected={selectedMarket === market.market && i !== 0}
                      onClick={() => setSelectedMarket(market.market)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN — sticky map ────────────────────────────────── */}
          {hasMarkets && location && (
            <div className="w-full lg:w-[48%] lg:sticky lg:top-24 self-start">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-slate-800 text-sm">Market Map</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {markets.length} markets found near you
                    </p>
                  </div>
                  {/* Navigate CTA for selected market */}
                  {selectedMarket && (() => {
                    const m = markets.find(mk => mk.market === selectedMarket);
                    return m ? (
                      <button
                        onClick={() => window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`,
                          "_blank"
                        )}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        <Navigation size={12} /> Navigate
                      </button>
                    ) : null;
                  })()}
                </div>

                {/* Map component — full height */}
                <div className="h-[500px] lg:h-[calc(100vh-180px)]">
                  <MarketMap
                    markets={markets}
                    userLat={location.lat}
                    userLng={location.lng}
                    bestMarketName={markets[0].market}
                    selectedMarketName={selectedMarket}
                  />
                </div>

                {/* Legend */}
                <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Other markets
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />  you
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Best market
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CatchToCash;