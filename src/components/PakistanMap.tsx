import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RoutePlanner, { ComputedRoute } from "./RoutePlanner";
import { speak, stopSpeaking } from "@/lib/voice";

// Fix default marker icons (Leaflet + bundlers)
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const pins: { name: string; coords: [number, number]; note: string }[] = [
  { name: "Hunza Valley", coords: [36.3167, 74.65], note: "Karakoram peaks & cherry blossoms" },
  { name: "Skardu", coords: [35.2971, 75.6333], note: "Gateway to K2 & Shangrila Lake" },
  { name: "Naran Kaghan", coords: [34.9086, 73.6517], note: "Saif-ul-Malook alpine lake" },
  { name: "Swat Valley", coords: [35.2227, 72.4258], note: "Switzerland of the East" },
  { name: "Islamabad", coords: [33.6844, 73.0479], note: "Margalla Hills & Faisal Mosque" },
  { name: "Lahore", coords: [31.5497, 74.3436], note: "Heritage, food & Walled City" },
  { name: "Karachi", coords: [24.8607, 67.0011], note: "Arabian Sea & city by the coast" },
  { name: "Peshawar", coords: [34.0151, 71.5249], note: "Ancient bazaars & Khyber Pass" },
  { name: "Quetta", coords: [30.1798, 66.975], note: "Apple orchards & rugged Balochistan" },
  { name: "Multan", coords: [30.1575, 71.5249], note: "City of Saints & shrines" },
  { name: "Hyderabad", coords: [25.396, 68.3578], note: "Sindh's old colonial heart" },
  { name: "Faisalabad", coords: [31.4504, 73.135], note: "Textile capital of Pakistan" },
  { name: "Rawalpindi", coords: [33.5651, 73.0169], note: "Twin city to Islamabad" },
  { name: "Gilgit", coords: [35.9208, 74.3144], note: "Crossroads of the Karakoram" },
];

const coordsOf = (name: string): [number, number] =>
  pins.find((p) => p.name === name)!.coords;

const toLatLngs = (names: string[]): [number, number][] =>
  names.map((n) => coordsOf(n));

// Fit the map view to the active route whenever it changes.
const FitRoute = ({ positions }: { positions: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(L.latLngBounds(positions), { padding: [40, 40] });
    }
  }, [map, positions]);
  return null;
};

const formatHours = (h: number) => {
  const hours = Math.floor(h);
  const mins = Math.round((h - hours) * 60);
  return `${hours}h ${mins}m`;
};

const conditionLabel: Record<string, string> = {
  blocked: "Road closed",
  heavy: "Heavy traffic",
  moderate: "Moderate traffic",
  clear: "Clear",
};

const PakistanMap = () => {
  const [route, setRoute] = useState<ComputedRoute | null>(null);

  // ===== Voice guidance / trip simulation state =====
  const [guiding, setGuiding] = useState(false);
  const [vehiclePos, setVehiclePos] = useState<[number, number] | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const guideTimer = useRef<number | null>(null);

  const activeLatLngs = useMemo(
    () => (route ? toLatLngs(route.active.names) : []),
    [route]
  );
  const originalLatLngs = useMemo(
    () => (route ? toLatLngs(route.original.names) : []),
    [route]
  );

  const stopGuidance = (announce = false) => {
    if (guideTimer.current) {
      window.clearInterval(guideTimer.current);
      guideTimer.current = null;
    }
    setGuiding(false);
    setVehiclePos(null);
    if (announce) {
      stopSpeaking();
      setCaption(null);
    }
  };

  // Clean up on unmount / new route
  useEffect(() => {
    return () => stopGuidance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stopGuidance();
    setCaption(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const startGuidance = () => {
    if (!route || activeLatLngs.length < 2) return;
    stopGuidance();

    // Interpolate smooth points between each pair of cities.
    const STEPS = 40;
    const points: [number, number][] = [];
    for (let i = 0; i < activeLatLngs.length - 1; i++) {
      const [aLat, aLng] = activeLatLngs[i];
      const [bLat, bLng] = activeLatLngs[i + 1];
      for (let j = 0; j < STEPS; j++) {
        points.push([
          aLat + ((bLat - aLat) * j) / STEPS,
          aLng + ((bLng - aLng) * j) / STEPS,
        ]);
      }
    }
    points.push(activeLatLngs[activeLatLngs.length - 1]);

    const names = route.active.names;
    setGuiding(true);
    setVehiclePos(points[0]);
    setCaption(`Starting navigation from ${names[0]} to ${names[names.length - 1]}`);
    speak(`Starting navigation from ${names[0]} to ${names[names.length - 1]}.`);

    let step = 0;
    guideTimer.current = window.setInterval(() => {
      if (step >= points.length) {
        const dest = names[names.length - 1];
        setCaption(`You have arrived in ${dest}`);
        speak(`You have reached your destination. Welcome to ${dest}.`);
        stopGuidance();
        return;
      }
      setVehiclePos(points[step]);
      if (step % STEPS === 0) {
        const cityIdx = step / STEPS;
        if (cityIdx > 0 && cityIdx < names.length) {
          setCaption(`Now entering ${names[cityIdx]}`);
          speak(`Now entering ${names[cityIdx]}.`);
        }
      }
      step++;
    }, 100);
  };

  return (
    <section id="map" className="container py-24 md:py-32">
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-[0.25em] text-terracotta">Explore the map</span>
        <h2 className="font-display mt-3 text-4xl font-semibold text-emerald-deep md:text-6xl">
          Pakistan, pin by <em className="text-terracotta">pin</em>.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Tap any marker to peek at what makes each region unforgettable — then start building your route.
        </p>
      </div>

      {/* Route planner panel */}
      <RoutePlanner
        cities={pins.map((p) => ({ name: p.name, coords: p.coords }))}
        onRouteCompute={setRoute}
      />

      {/* Road condition alert + detour notice */}
      {route?.alert && (
        <div className="mt-6 rounded-2xl border border-terracotta/30 bg-cream p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">
            Route advisory
          </p>
          <p className="font-display mt-1 text-lg text-emerald-deep">
            {conditionLabel[route.alert.condition]} detected between{" "}
            {route.alert.from} and {route.alert.to}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {route.alternate
              ? `Rerouted via ${route.alternate.names.slice(1, -1).join(" → ") || "an alternate road"}. The original route is shown dashed on the map.`
              : "No faster detour is available right now — proceed with caution on this segment."}
          </p>
        </div>
      )}

      {/* Route summary readout */}
      {route && (
        <div className="mt-6 grid gap-4 rounded-2xl border border-emerald-deep/10 bg-cream p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">Route</p>
            <p className="font-display mt-1 text-lg text-emerald-deep">
              {route.active.names.join(" → ")}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">Distance</p>
            <p className="font-display mt-1 text-lg text-emerald-deep">
              {route.active.distanceKm} km
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">Travel time</p>
            <p className="font-display mt-1 text-lg text-emerald-deep">
              {formatHours(route.active.durationHours)}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">Est. fuel cost</p>
            <p className="font-display mt-1 text-lg text-emerald-deep">
              PKR {route.active.costPkr.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Voice guidance controls */}
      {route && (
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => (guiding ? stopGuidance(true) : startGuidance())}
            className="rounded-full bg-emerald-deep px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-transform hover:scale-[1.02]"
          >
            {guiding ? "Stop guidance" : "Start voice guidance"}
          </button>
          {caption && (
            <p className="text-sm font-medium text-emerald-deep">{caption}</p>
          )}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-3xl border border-emerald-deep/10 shadow-elegant">
        <MapContainer
          center={[30.3753, 69.3451]}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: "560px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pins.map((p) => (
            <Marker key={p.name} position={p.coords} icon={icon}>
              <Popup>
                <strong>{p.name}</strong>
                <br />
                {p.note}
              </Popup>
            </Marker>
          ))}

          {/* Original route (dashed) — shown when a detour was taken */}
          {route && route.alternate && (
            <Polyline
              positions={originalLatLngs}
              pathOptions={{
                color: "hsl(14, 70%, 48%)",
                weight: 3,
                opacity: 0.5,
                dashArray: "8 8",
              }}
            />
          )}

          {/* Active route */}
          {route && (
            <Polyline
              positions={activeLatLngs}
              pathOptions={{
                color: "hsl(158, 70%, 24%)",
                weight: 5,
                opacity: 0.95,
              }}
            />
          )}

          {/* Intermediate stops along the active route */}
          {route &&
            activeLatLngs.slice(1, -1).map((c, i) => (
              <CircleMarker
                key={`stop-${i}`}
                center={c}
                radius={6}
                pathOptions={{
                  color: "hsl(14, 70%, 48%)",
                  fillColor: "hsl(43, 74%, 56%)",
                  fillOpacity: 1,
                  weight: 2,
                }}
              />
            ))}

          {/* Vehicle position during guidance */}
          {vehiclePos && (
            <CircleMarker
              center={vehiclePos}
              radius={9}
              pathOptions={{
                color: "hsl(38, 60%, 95%)",
                fillColor: "hsl(14, 70%, 48%)",
                fillOpacity: 1,
                weight: 3,
              }}
            />
          )}

          {route && <FitRoute positions={activeLatLngs} />}
        </MapContainer>
      </div>
    </section>
  );
};

export default PakistanMap;
