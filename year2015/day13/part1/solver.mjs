import { permute } from "../../../iterables/permuter.mjs";

export function solve(input) {
  const graph = parsePotentialHappinessGraph(input);
  let maxTotalHappiness = -Infinity;
  for (const permutation of permute(graph.nodes())) {
    let totalHappiness = 0;
    for (let i = 0; i < permutation.length; i++) {
      const person = permutation[i];
      const neighbor = permutation[(i + 1) % permutation.length];
      totalHappiness += graph.get(person, neighbor);
      totalHappiness += graph.get(neighbor, person);
    }
    if (totalHappiness > maxTotalHappiness) {
      maxTotalHappiness = totalHappiness;
    }
  }
  return maxTotalHappiness;
}

function parsePotentialHappinessGraph(text) {
  const edgeValues = new Map();
  const nodes = new Set();
  const graph = {
    get: (u, v) => edgeValues.get(JSON.stringify([u, v])),
    set: (u, v, value) => {
      edgeValues.set(JSON.stringify([u, v]), value);
      nodes.add(u).add(v);
    },
    nodes: () => nodes.values(),
  };
  for (const line of text.split("\n")) {
    let [person, , verb, amount, , , , , , , neighbor] = line.split(" ");
    amount = verb === "lose" ? -Number(amount) : Number(amount);
    neighbor = neighbor.slice(0, -1);
    graph.set(person, neighbor, amount);
  }
  return graph;
}
