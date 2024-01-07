import { mincut } from "npm:@graph-algorithm/minimum-cut@^2.0.0";
import Graph from "../../../../../lib/Graph.ts";

function parse(text: string) {
  const result = new Graph<string>();
  for (const line of text.split("\n")) {
    const [x, text] = line.split(": ");
    for (const y of text.split(" ")) result.addEdge(x, y);
  }
  return result;
}

export default function solve(input: string) {
  const graph = parse(input);
  const contractedGraph = new Graph(graph);
  while (contractedGraph.order > 2) {
    const edges = Array.from(contractedGraph.edges());
    const randomEdge = edges[Math.floor(Math.random() * edges.length)];
    console.log({ randomEdge });
    const contractedNode = `(${randomEdge[0]}+${randomEdge[1]})`;
    const contractedEdges = randomEdge.flatMap((node) => {
      const result: [string, string][] = [];
      for (const adjacency of contractedGraph.adjacencies(node)) {
        if (randomEdge.includes(adjacency)) continue;
        result.push([adjacency, contractedNode]);
      }
      return result;
    });
    for (const node of randomEdge) contractedGraph.deleteNode(node);
    for (const [x, y] of contractedEdges) contractedGraph.addEdge(x, y);
    console.log(contractedGraph);
    if (contractedGraph.size > 100) throw new Error("?");
  }
  console.log(contractedGraph);
  const connections = input.split("\n").reduce((connections, line) => {
    const [u, rightText] = line.split(": ");
    for (const v of rightText.split(" ")) {
      if (!connections.has(u)) connections.set(u, new Set());
      connections.get(u)!.add(v);
      if (!connections.has(v)) connections.set(v, new Set());
      connections.get(v)!.add(u);
    }
    return connections;
  }, new Map<string, Set<string>>());
  {
    const edges = Array.from(connections)
      .flatMap(([u, nodes]) => Array.from(nodes).map((v) => [u, v] as const));
    for (const [u, v] of mincut(edges)) {
      console.log({ u, v });
      connections.get(u)?.delete(v);
    }
  }
  const group = new Set<string>();
  const [[someNode]] = connections;
  const stack = [someNode];
  while (stack.length) {
    const source = stack.pop()!;
    connections.get(source);
    if (group.has(source)) continue;
    group.add(source);
    stack.push(...connections.get(source) ?? []);
  }
  return group.size * (connections.size - group.size);
}
