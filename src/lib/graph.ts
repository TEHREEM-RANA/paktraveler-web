// Generic weighted graph with adjacency-list representation.
// Supports BFS, DFS and Dijkstra's shortest-path algorithm.
// Used internally by the route planner to compute optimal routes.

export type Edge<T> = { to: T; weight: number };

export class Graph<T> {
  private adj = new Map<T, Edge<T>[]>();
  private directed: boolean;

  constructor(directed = false) {
    this.directed = directed;
  }

  addNode(node: T): void {
    if (!this.adj.has(node)) this.adj.set(node, []);
  }

  addEdge(from: T, to: T, weight = 1): void {
    this.addNode(from);
    this.addNode(to);
    this.adj.get(from)!.push({ to, weight });
    if (!this.directed) {
      this.adj.get(to)!.push({ to: from, weight });
    }
  }

  neighbors(node: T): Edge<T>[] {
    return this.adj.get(node) ?? [];
  }

  nodes(): T[] {
    return Array.from(this.adj.keys());
  }

  // Breadth-First Search — returns visit order from `start`.
  bfs(start: T): T[] {
    const visited = new Set<T>();
    const order: T[] = [];
    const queue: T[] = [start];
    visited.add(start);
    while (queue.length) {
      const n = queue.shift()!;
      order.push(n);
      for (const { to } of this.neighbors(n)) {
        if (!visited.has(to)) {
          visited.add(to);
          queue.push(to);
        }
      }
    }
    return order;
  }

  // Depth-First Search (iterative) — returns visit order from `start`.
  dfs(start: T): T[] {
    const visited = new Set<T>();
    const order: T[] = [];
    const stack: T[] = [start];
    while (stack.length) {
      const n = stack.pop()!;
      if (visited.has(n)) continue;
      visited.add(n);
      order.push(n);
      for (const { to } of this.neighbors(n)) {
        if (!visited.has(to)) stack.push(to);
      }
    }
    return order;
  }

  // Dijkstra's shortest path between `start` and `end`.
  // Returns the total distance and the reconstructed path of nodes.
  dijkstra(start: T, end: T): { distance: number; path: T[] } {
    const dist = new Map<T, number>();
    const prev = new Map<T, T | null>();
    const visited = new Set<T>();

    for (const n of this.nodes()) {
      dist.set(n, Infinity);
      prev.set(n, null);
    }
    dist.set(start, 0);

    // Simple priority selection (linear scan) — fine for small graphs.
    const pickNext = (): T | null => {
      let best: T | null = null;
      let bestDist = Infinity;
      for (const [n, d] of dist) {
        if (!visited.has(n) && d < bestDist) {
          bestDist = d;
          best = n;
        }
      }
      return best;
    };

    while (true) {
      const u = pickNext();
      if (u === null) break;
      if (u === end) break;
      visited.add(u);
      for (const { to, weight } of this.neighbors(u)) {
        if (visited.has(to)) continue;
        const alt = (dist.get(u) ?? Infinity) + weight;
        if (alt < (dist.get(to) ?? Infinity)) {
          dist.set(to, alt);
          prev.set(to, u);
        }
      }
    }

    // Reconstruct path.
    const path: T[] = [];
    let cur: T | null = end;
    if ((dist.get(end) ?? Infinity) === Infinity) {
      return { distance: Infinity, path: [] };
    }
    while (cur !== null) {
      path.unshift(cur);
      cur = prev.get(cur) ?? null;
    }
    return { distance: dist.get(end) ?? Infinity, path };
  }
}

// Great-circle distance in km between two [lat, lng] points.
export function haversineKm(
  a: [number, number],
  b: [number, number]
): number {
  const R = 6371;
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Build an undirected weighted graph by connecting each node to its
// `k` nearest neighbours (using haversine distance as edge weight).
// This produces a connected travel network suitable for Dijkstra.
export function buildKNearestGraph(
  cities: { name: string; coords: [number, number] }[],
  k = 4
): Graph<string> {
  const g = new Graph<string>(false);
  cities.forEach((c) => g.addNode(c.name));

  for (const a of cities) {
    const ranked = cities
      .filter((b) => b.name !== a.name)
      .map((b) => ({ name: b.name, d: haversineKm(a.coords, b.coords) }))
      .sort((x, y) => x.d - y.d)
      .slice(0, k);
    for (const r of ranked) g.addEdge(a.name, r.name, r.d);
  }
  return g;
}