// ============================================================
// RoutePlanner
// From / To / Optimize-by inputs and the "Find Optimal Route" CTA.
// Computes the shortest route with Dijkstra over the weighted road
// network, detects congestion or road closures on the way, and
// lifts the result (including any detour) up to the parent map.
// Styled to match existing emerald-deep + gold/terracotta palette.
// ============================================================
import { useMemo, useState } from "react";
import { Navigation, MapPin, Route as RouteIcon } from "lucide-react";
import {
  buildRoadNetwork,
  findRoute,
  edgeKey,
  RouteResult,
  RoadCondition,
} from "@/lib/roadNetwork";
import { speak } from "@/lib/voice";

export type CityCoord = { name: string; coords: [number, number] };

export type RouteAlert = {
  from: string;
  to: string;
  condition: RoadCondition;
};

export type ComputedRoute = {
  from: CityCoord;
  to: CityCoord;
  optimize: "distance" | "time" | "cost";
  original: RouteResult;
  alert: RouteAlert | null;
  alternate: RouteResult | null;
  active: RouteResult;
};

interface Props {
  cities: CityCoord[];
  onRouteCompute: (route: ComputedRoute | null) => void;
}

const OPTIMIZE_OPTIONS = ["distance", "time", "cost"] as const;

const RoutePlanner = ({ cities, onRouteCompute }: Props) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [optimize, setOptimize] =
    useState<(typeof OPTIMIZE_OPTIONS)[number]>("time");
  const [error, setError] = useState<string | null>(null);

  const cityIndex = useMemo(() => {
    const m = new Map<string, CityCoord>();
    cities.forEach((c) => m.set(c.name.toLowerCase(), c));
    return m;
  }, [cities]);

  // Weighted road network: cities are nodes, roads are edges with
  // live conditions (traffic / closures) attached.
  const network = useMemo(() => buildRoadNetwork(cities, 4), [cities]);

  const handleFind = () => {
    setError(null);
    const f = cityIndex.get(from.trim().toLowerCase());
    const t = cityIndex.get(to.trim().toLowerCase());
    if (!f || !t) {
      setError(
        `Try one of: ${cities.slice(0, 6).map((c) => c.name).join(", ")}…`
      );
      onRouteCompute(null);
      return;
    }
    if (f.name === t.name) {
      setError("From and To must be different.");
      onRouteCompute(null);
      return;
    }

    // 1) Ideal shortest route, ignoring live conditions — this is
    //    what we scan for problems (heavy traffic / closed roads).
    const ideal = findRoute(network, f.name, t.name, optimize, new Set(), true);
    if (!ideal) {
      setError("No drivable route found between these cities right now.");
      onRouteCompute(null);
      return;
    }

    // 2) Scan the ideal route for the first problem segment.
    const problemLeg = ideal.legs.find(
      (l) => l.condition === "blocked" || l.condition === "heavy"
    );

    let alert: RouteAlert | null = null;
    let alternate: RouteResult | null = null;

    if (problemLeg) {
      alert = {
        from: problemLeg.from,
        to: problemLeg.to,
        condition: problemLeg.condition,
      };
      // 3) Re-run Dijkstra avoiding the problem road (condition-aware
      //    weights) to get a detour.
      const detour = findRoute(
        network,
        f.name,
        t.name,
        optimize,
        new Set([edgeKey(problemLeg.from, problemLeg.to)])
      );
      if (detour && detour.names.join() !== ideal.names.join()) {
        alternate = detour;
      }
    }

    const active = alternate ?? findRoute(network, f.name, t.name, optimize) ?? ideal;

    onRouteCompute({
      from: f,
      to: t,
      optimize,
      original: ideal,
      alert,
      alternate,
      active,
    });

    if (alert && alternate) {
      speak(
        `${alert.condition === "blocked" ? "Road closure" : "Heavy traffic"} detected between ${alert.from} and ${alert.to}. Rerouting via ${alternate.names
          .slice(1, -1)
          .join(", ") || "an alternate road"}.`
      );
    } else if (alert) {
      speak(
        `${alert.condition === "blocked" ? "A road closure" : "Heavy traffic"} was detected between ${alert.from} and ${alert.to}, but no faster detour is available.`
      );
    } else {
      speak(
        `Route found from ${f.name} to ${t.name}. All roads are clear. Distance ${active.distanceKm} kilometers.`
      );
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-emerald-deep/15 bg-emerald-deep p-6 shadow-elegant md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        {/* FROM */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            From
          </label>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/[0.04] px-4 py-3">
            <Navigation className="h-4 w-4 text-terracotta" strokeWidth={2} />
            <input
              list="route-cities"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Hyderabad"
              className="w-full bg-transparent text-cream placeholder:text-cream/40 focus:outline-none"
            />
          </div>
        </div>

        {/* TO */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            To
          </label>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-cream/10 bg-cream/[0.04] px-4 py-3">
            <MapPin className="h-4 w-4 text-terracotta" strokeWidth={2} />
            <input
              list="route-cities"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Karachi"
              className="w-full bg-transparent text-cream placeholder:text-cream/40 focus:outline-none"
            />
          </div>
        </div>

        {/* OPTIMIZE BY */}
        <div className="md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Optimize by
          </label>
          <div className="mt-2 flex rounded-full border border-cream/20 p-1">
            {OPTIMIZE_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setOptimize(opt)}
                className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                  optimize === opt
                    ? "bg-gradient-to-r from-[hsl(var(--terracotta))] to-[hsl(var(--gold))] text-emerald-deep"
                    : "text-cream/50 hover:text-cream/80"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <datalist id="route-cities">
        {cities.map((c) => (
          <option key={c.name} value={c.name} />
        ))}
      </datalist>

      {error && (
        <p className="mt-4 text-sm text-terracotta">{error}</p>
      )}

      <button
        type="button"
        onClick={handleFind}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[hsl(var(--terracotta))] to-[hsl(var(--gold))] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-deep transition-transform hover:scale-[1.01]"
      >
        <RouteIcon className="h-4 w-4" />
        Find Optimal Route
      </button>
    </div>
  );
};

export default RoutePlanner;
