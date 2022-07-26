export default function solve(input: string) {
  const connections = parseConnections(input);
  const paths = new Set<string>();
  const stack = [
    {
      path: "start",
      current: "start",
      visited: <ReadonlySet<string>> new Set(),
    },
  ];
  while (stack.length) {
    const { path, current, visited } = stack.pop()!;
    if (current === "end") {
      paths.add(path);
      continue;
    }
    if (visited.has(current) && /[a-z]/.test(current)) continue;
    for (const destination of connections.get(current) ?? []) {
      stack.push({
        path: `${path},${destination}`,
        current: destination,
        visited: new Set(visited).add(current),
      });
    }
  }
  return paths.size;
}

function parseConnections(text: string) {
  const result = new Map<string, string[]>();
  const add = (a: string, b: string) => {
    result.get(a)?.push(b) ?? result.set(a, [b]);
  };
  for (const line of text.trim().split("\n")) {
    const [a, b] = line.split("-");
    add(a, b);
    add(b, a);
  }
  return <ReadonlyMap<string, readonly string[]>> result;
}
