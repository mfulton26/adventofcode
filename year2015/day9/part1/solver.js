import { permute } from "../../../arrays/permuter.js";

export function solve(input) {
  const distances = parseDistances(input);
  let shortestDistance = Infinity;
  for (const route of permute(Array.from(distances.keys()))) {
    let routeDistance = 0;
    for (let i = 0, j = 1; j < route.length; i++, j++) {
      const origin = route[i];
      const destination = route[j];
      const distance = distances.get(origin).get(destination);
      routeDistance += distance;
    }
    if (routeDistance < shortestDistance) {
      shortestDistance = routeDistance;
    }
  }
  return shortestDistance;
}

function parseDistances(text) {
  const result = new Map();
  function set(origin, destination, distance) {
    if (!result.has(origin)) {
      result.set(origin, new Map());
    }
    result.get(origin).set(destination, distance);
  }
  for (const line of text.split("\n")) {
    const [lhs, rhs] = line.split(" = ");
    const [origin, destination] = lhs.split(" to ");
    const distance = Number(rhs);
    set(origin, destination, distance);
    set(destination, origin, distance);
  }
  return result;
}
