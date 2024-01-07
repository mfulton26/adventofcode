import { mincut } from "npm:@graph-algorithm/minimum-cut@^2.0.0";

export default function solve(input: string) {
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
    for (const [u, v] of mincut(edges)) connections.get(u)?.delete(v);
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
