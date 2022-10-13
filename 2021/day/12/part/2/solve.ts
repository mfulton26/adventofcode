export default function solve(input: string) {
  const connections = parseConnections(input);
  const paths = new Set<string>();
  const stack = [
    {
      path: "start",
      current: "start",
      visited: <ReadonlySet<string>> new Set(),
      smallCaveVisitedTwice: false,
    },
  ];
  while (stack.length) {
    const { path, current, visited, smallCaveVisitedTwice } = stack.pop()!;
    if (current === "end") {
      paths.add(path);
      continue;
    }
    const isVisitedSmallCave = visited.has(current) && /[a-z]/.test(current);
    if (isVisitedSmallCave && smallCaveVisitedTwice) continue;
    const destinations = connections.get(current) ?? [];
    for (const destination of destinations) {
      stack.push({
        path: `${path},${destination}`,
        current: destination,
        visited: new Set(visited).add(current),
        smallCaveVisitedTwice: smallCaveVisitedTwice || isVisitedSmallCave,
      });
    }
  }
  return paths.size;
}

function parseConnections(text: string) {
  const result = new Map<string, string[]>();
  const add = (a: string, b: string) => {
    if (a === "end" || b === "start") return;
    result.get(a)?.push(b) ?? result.set(a, [b]);
  };
  for (const line of text.trim().split("\n")) {
    const [a, b] = line.split("-");
    add(a, b);
    add(b, a);
  }
  return <ReadonlyMap<string, readonly string[]>> result;
}
