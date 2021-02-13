import { permute } from "../../../iterables/permuter.mjs";

export function solve(input) {
  const distances = parseDistances(input);
  let shortestDistance = Infinity;
  for (const route of permute(Array.from(distances.nodes()))) {
    let routeDistance = 0;
    for (let i = 0, j = 1; j < route.length; i++, j++) {
      const distance = distances.edgeValue(route[i], route[j]);
      routeDistance += distance;
    }
    if (routeDistance < shortestDistance) {
      shortestDistance = routeDistance;
    }
  }
  return shortestDistance;
}

function parseDistances(text) {
  const edgeValues = new Map();
  const nodes = new Set();
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
    edgeValue: (u, v) => edgeValues.get(JSON.stringify([u, v])),
    nodes: () => nodes.values(),
  };
}
