import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

/* ----------------------------------
   Market type
----------------------------------- */
interface Market {
  market: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  distance_km: number;
}

/* ----------------------------------
   HTML ICON FACTORY (emoji inside pin)
----------------------------------- */
const createPinIcon = (
  emoji: string,
  bgColor: string,
  size = 36
) =>
  L.divIcon({
    html: `
      <div style="
        position: relative;
        width:${size}px;
        height:${size}px;
        background:${bgColor};
        border-radius:50% 50% 50% 50%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:${size * 0.55}px;
        color:white;
        box-shadow:0 2px 6px rgba(0,0,0,0.35);
        border:2px solid white;
      ">
        ${emoji}
        <div style="
          position:absolute;
          bottom:-10px;
          left:50%;
          transform:translateX(-50%);
          width:0;
          height:0;
          border-left:8px solid transparent;
          border-right:8px solid transparent;
          border-top:10px solid ${bgColor};
        "></div>
      </div>
    `,
    className: "",
    iconSize: [size, size + 12],
    iconAnchor: [size / 2, size + 10],
    popupAnchor: [0, -(size / 2)],
  });

/* ----------------------------------
   Icons
----------------------------------- */
const userIcon = createPinIcon("👤", "#2563EB");        // Blue
const marketIcon = createPinIcon("🛒", "#F97316");     // Orange
const bestMarketIcon = createPinIcon("🏆", "#16A34A", 42); // Green & bigger

/* ----------------------------------
   Props
----------------------------------- */
type Props = {
  markets: Market[];
  userLat: number;
  userLng: number;
  bestMarketName: string;
};

/* ----------------------------------
   Market Map Component
----------------------------------- */
const MarketMap = ({
  markets,
  userLat,
  userLng,
  bestMarketName,
}: Props) => {
  return (
    <MapContainer
      {...({
        center: [userLat, userLng],
        zoom: 11,
        className: "h-72 w-full rounded-xl",
      } as any)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 👤 USER LOCATION */}
      <Marker
        {...({
          position: [userLat, userLng],
          icon: userIcon,
        } as any)}
      >
        <Popup>You are here</Popup>
      </Marker>

      {/* 🛒 MARKET MARKERS */}
      {markets.map((m, i) => {
        const isBest = m.market === bestMarketName;

        return (
          <Marker
            key={i}
            {...({
              position: [m.lat, m.lng],
              icon: isBest ? bestMarketIcon : marketIcon,
            } as any)}
          >
            <Popup>
              <b>{m.market}</b>
              <br />
              ⭐ {m.rating} rating
              <br />
              {m.reviews} reviews
              <br />
              {m.distance_km} km away
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MarketMap;
