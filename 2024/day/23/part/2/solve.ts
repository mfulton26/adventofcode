type Graph<N> = { nodes: ReadonlySet<N>; neighbors(n: N): ReadonlySet<N> };

function findLargestClique<N>(graph: Graph<N>) {
  let maxClique = new Set<N>();
  function bronKerbosch(R: ReadonlySet<N>, P: Set<N>, X: Set<N>) {
    if (P.size === 0 && X.size === 0) {
      if (R.size > maxClique.size) maxClique = new Set(R);
      return;
    }
    for (const v of P) {
      const vNeighbors = graph.neighbors(v);
      bronKerbosch(
        new Set(R).add(v),
        P.intersection(vNeighbors),
        X.intersection(vNeighbors),
      );
      P.delete(v);
      X.add(v);
    }
  }
  bronKerbosch(new Set<N>(), new Set(graph.nodes), new Set<N>());
  return maxClique;
}

export default function solve(input: string) {
  const connections = input.split("\n").map((line) => line.split("-"));
  const edges = new Map<string, Set<string>>();
  for (const [u, v] of connections) {
    edges.get(u)?.add(v) ?? edges.set(u, new Set([v]));
    edges.get(v)?.add(u) ?? edges.set(v, new Set([u]));
  }
  const graph: Graph<string> = {
    nodes: new Set(edges.keys()),
    neighbors: (n: string) => edges.get(n) ?? new Set(),
  };
  return findLargestClique(graph).values().toArray().sort().join(",");
}
