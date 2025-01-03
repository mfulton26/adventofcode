import permute from "@lib/permute.ts";

export default function solve(input: string) {
  const graph = parsePotentialHappinessGraph(input);
  for (const person of graph.nodes()) {
    graph.set(person, "me", 0);
    graph.set("me", person, 0);
  }
  let maxTotalHappiness = -Infinity;
  for (const permutation of permute(graph.nodes())) {
    let totalHappiness = 0;
    for (let i = 0; i < permutation.length; i++) {
      const person = permutation[i];
      const neighbor = permutation[(i + 1) % permutation.length];
      totalHappiness += graph.get(person, neighbor)!;
      totalHappiness += graph.get(neighbor, person)!;
    }
    if (totalHappiness > maxTotalHappiness) {
      maxTotalHappiness = totalHappiness;
    }
  }
  return maxTotalHappiness;
}

function parsePotentialHappinessGraph(text: string) {
  const edgeValues = new Map<string, number>();
  const nodes = new Set<string>();
  const graph = {
    get: (u: string, v: string) => edgeValues.get(JSON.stringify([u, v])),
    set: (u: string, v: string, value: number) => {
      edgeValues.set(JSON.stringify([u, v]), value);
      nodes.add(u).add(v);
    },
    nodes: () => nodes.values(),
  };
  for (const { groups } of text.matchAll(parsePotentialHappinessGraph.regExp)) {
    const { person, verb, amount, neighbor } = groups!;
    const value = verb === "lose" ? -Number(amount) : Number(amount);
    graph.set(person, neighbor, value);
  }
  return graph;
}
parsePotentialHappinessGraph.regExp =
  /(?<person>.*) would (?<verb>.*) (?<amount>\d+) happiness units by sitting next to (?<neighbor>.*)\./g;
