export default function solve(input: string) {
  const connections = input.split("\n").map((line) => line.split("-"));
  const edges = new Map<string, Set<string>>();
  for (const [u, v] of connections) {
    edges.getOrInsertComputed(u, () => new Set()).add(v);
    edges.getOrInsertComputed(v, () => new Set()).add(u);
  }
  const interconnections = new Set<string>();
  for (const [u, uNeighbors] of edges) {
    for (const v of uNeighbors) {
      const vNeighbors = edges.get(v);
      if (!vNeighbors?.has(u)) continue;
      for (const w of vNeighbors) {
        const wNeighbors = edges.get(w);
        if (!wNeighbors?.has(u)) continue;
        interconnections.add([u, v, w].sort().join(","));
      }
    }
  }
  let count = 0;
  for (const interconnection of interconnections) {
    if (interconnection.split(",").some((n) => n.startsWith("t"))) count++;
  }
  return count;
}
