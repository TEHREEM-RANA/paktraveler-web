// ============================================================
// Road network layer built on top of the generic Graph.
// Represents cities as nodes and roads as weighted edges, with
// live road conditions (traffic levels / closures) attached to
// each edge. Dijkstra runs over condition-aware weights so the
// planner can detect problems on a route and compute a detour.
// ============================================================
import { Graph, haversineKm } from "./graph";

export type RoadCondition = "clear" | "moderate" | "heavy" | "blocked";

export type RoadEdge = {
  a: string;
  b: string;
  distanceKm: number;
  condition: RoadCondition;
};

export type RouteLeg = {
  from: string;
  to: string;
  distanceKm: number;
  condition: RoadCondition;
};

export type RouteResult = {
  names: string[];
  legs: RouteLeg[];
  distanceKm: number;
  durationHours: number;
  costPkr: number;
};

export type CityPoint = { name: string; coords: [number, number] };

const edgeKey = (a: string, b: string) =>
  a < b ? `${a}|${b}` : `${b}|${a}`;

// Average speed (km/h) on a leg, degraded by its condition.
const speedFor = (condition: RoadCondition): number => {
  switch (condition) {
    case "clear":
      return 75;
    case "moderate":
      return 55;
    case "heavy":
      return 35;
    case "blocked":
      return 1;
  }
};

// Fuel-based running cost estimate: PKR per km driven, worse in
// congestion (idling / stop-and-go burns more fuel).
const costPerKm = (condition: RoadCondition): number => {
  switch (condition) {
    case "clear":
      return 24;
    case "moderate":
      return 28;
    case "heavy":
      return 34;
    case "blocked":
      return 34;
  }
};

// Deterministic-per-session pseudo random so conditions stay stable
// while the user interacts, but vary between visits like live data.
const sessionSeed = Math.floor(Math.random() * 1_000_000);

function seededRandom(key: string): number {
  let h = sessionSeed;
  for (let i = 0; i < key.length; i++) {
    h = (Math.imul(h ^ key.charCodeAt(i), 2654435761) >>> 0) as number;
  }
  return ((h >>> 8) % 10_000) / 10_000;
}

// Build the road network: k-nearest neighbour edges with a live
// condition sampled per edge (mostly clear, some congestion, and
// the occasional closed road).
export function buildRoadNetwork(
  cities: CityPoint[],
  k = 4
): RoadEdge[] {
  const seen = new Set<string>();
  const edges: RoadEdge[] = [];

  for (const a of cities) {
    const ranked = cities
      .filter((b) => b.name !== a.name)
      .map((b) => ({ city: b, d: haversineKm(a.coords, b.coords) }))
      .sort((x, y) => x.d - y.d)
      .slice(0, k);

    for (const r of ranked) {
      const key = edgeKey(a.name, r.city.name);
      if (seen.has(key)) continue;
      seen.add(key);

      const roll = seededRandom(key);
      let condition: RoadCondition = "clear";
      if (roll > 0.93) condition = "blocked";
      else if (roll > 0.8) condition = "heavy";
      else if (roll > 0.6) condition = "moderate";

      edges.push({
        a: a.name,
        b: r.city.name,
        distanceKm: Math.round(r.d),
        condition,
      });
    }
  }
  return edges;
}

function edgeMap(edges: RoadEdge[]): Map<string, RoadEdge> {
  const m = new Map<string, RoadEdge>();
  edges.forEach((e) => m.set(edgeKey(e.a, e.b), e));
  return m;
}

// Dijkstra over the network with an optimize mode and an optional
// set of edges to avoid (used for detours around problem roads).
export function findRoute(
  edges: RoadEdge[],
  from: string,
  to: string,
  optimize: "distance" | "time" | "cost",
  avoid: Set<string> = new Set(),
  ignoreConditions = false
): RouteResult | null {
  const g = new Graph<string>(false);
  const lookup = edgeMap(edges);

  for (const e of edges) {
    const key = edgeKey(e.a, e.b);
    if (avoid.has(key)) continue;
    // Closed roads are never drivable unless we are computing the
    // "ideal" route used purely for problem detection.
    if (!ignoreConditions && e.condition === "blocked") continue;

    let weight = e.distanceKm;
    if (!ignoreConditions) {
      if (optimize === "time") weight = e.distanceKm / speedFor(e.condition);
      if (optimize === "cost") weight = e.distanceKm * costPerKm(e.condition);
    }
    g.addEdge(e.a, e.b, weight);
  }

  const { distance, path } = g.dijkstra(from, to);
  if (!Number.isFinite(distance) || path.length < 2) return null;

  const legs: RouteLeg[] = [];
  let distanceKm = 0;
  let durationHours = 0;
  let costPkr = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const e = lookup.get(edgeKey(path[i], path[i + 1]))!;
    legs.push({
      from: path[i],
      to: path[i + 1],
      distanceKm: e.distanceKm,
      condition: e.condition,
    });
    distanceKm += e.distanceKm;
    durationHours += e.distanceKm / speedFor(e.condition);
    costPkr += e.distanceKm * costPerKm(e.condition);
  }

  return {
    names: path,
    legs,
    distanceKm: Math.round(distanceKm),
    durationHours: +durationHours.toFixed(1),
    costPkr: Math.round(costPkr),
  };
}

export { edgeKey };
