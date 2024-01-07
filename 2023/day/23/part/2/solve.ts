const directionChars = {
  "^": { x: 0, y: 1 },
  ">": { x: 1, y: 0 },
  "v": { x: 0, y: -1 },
  "<": { x: -1, y: 0 },
};

const directions = Object.values(directionChars);

function parse(text: string) {
  const map = text.split("\n").map((line) => Array.from(line));
  const mapOptions = map.flatMap((row, y, { length: height }) =>
    row.map((char, x, { length: width }) =>
      char === "#"
        ? new Set<number>()
        : directions.map((d) => ({ x: x + d.x, y: y - d.y }))
          .filter(({ x, y }) =>
            x >= 0 && x < width && y >= 0 && y < height && map[y][x] !== "#"
          )
          .reduce((set, { x, y }) => set.add(y * height + x), new Set<number>())
    )
  );
  const nodes = new Set<number>();
  for (const [node, options] of mapOptions.entries()) {
    if (options.size === 0 || options.size === 2) continue;
    nodes.add(node);
  }
  const edges = new Map<number, Map<number, number>>();
  for (const node of nodes) {
    for (const option of mapOptions[node]) {
      let u = node, v = option;
      let steps = 1;
      while (!nodes.has(v)) {
        const options = mapOptions[v];
        options.delete(u);
        options.delete(v);
        if (options.size === 0) break;
        if (options.size !== 1) throw new Error();
        u = v, [v] = options;
        steps++;
      }
      if (!edges.has(node)) edges.set(node, new Map());
      edges.get(node)!.set(v, steps);
      if (!edges.has(v)) edges.set(v, new Map());
      edges.get(v)!.set(node, steps);
    }
  }
  return {
    *nodes() {
      yield* nodes;
    },
    *connections(node: number) {
      yield* edges.get(node)?.keys() ?? [];
    },
    edgeValue(u: number, v: number) {
      return edges.get(u)?.get(v);
    },
  };
}

export default function solve(input: string) {
  const graph = parse(input);
  let max = -Infinity;
  const stack = [{ u: 1, visited: new Set<number>(), steps: 0 }];
  const target = Math.max(...graph.nodes());
  while (stack.length) {
    const { u, visited: seen, steps } = stack.pop()!;
    if (u === target && steps > max) {
      max = steps;
      continue;
    }
    if (seen.has(u)) continue;
    const visited = new Set(seen).add(u);
    for (const v of graph.connections(u)) {
      stack.push({
        u: v,
        visited,
        steps: steps + graph.edgeValue(u, v)!,
      });
    }
  }
  return max;
}
