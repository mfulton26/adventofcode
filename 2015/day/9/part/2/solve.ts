import permute from "helpers/permute.ts";

export default function solve(input: string) {
  const distances = parseDistances(input);
  let longestDistance = -Infinity;
  for (const route of permute(distances.nodes())) {
    let routeDistance = 0;
    for (let i = 0, j = 1; j < route.length; i++, j++) {
      const distance = distances.edgeValue(route[i], route[j])!;
      routeDistance += distance;
    }
    if (routeDistance > longestDistance) {
      longestDistance = routeDistance;
    }
  }
  return longestDistance;
}

function parseDistances(text: string) {
  const edgeValues = new Map<string, number>();
  const nodes = new Set<string>();
  for (const line of text.split("\n")) {
    const [lhs, rhs] = line.split(" = ");
    const [u, v] = lhs.split(" to ");
    const distance = Number(rhs);
    edgeValues.set(JSON.stringify([u, v]), distance);
    edgeValues.set(JSON.stringify([v, u]), distance);
    nodes.add(u);
    nodes.add(v);
  }
  return {
    edgeValue: (u: string, v: string) => edgeValues.get(JSON.stringify([u, v])),
    nodes: () => nodes.values(),
  };
}
