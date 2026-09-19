type PositionHash = `${number},${number}`;

function* parseNodes(input: string) {
  const regExp =
    /^\/dev\/grid\/node-x(?<x>\d+)-y(?<y>\d+)\s+(?<size>\d+)T\s+(?<used>\d+)T\s+(?<available>\d+)T\s+(?<percent>\d+)%$/;
  for (const line of input.split("\n")) {
    if (!line.startsWith("/dev/grid/node")) continue;
    const { groups: { x, y, used, available } = {} } = regExp.exec(line)!;
    yield { x: +x, y: +y, used: +used, available: +available };
  }
}

export default function solve(input: string) {
  const nodes = parseNodes(input).toArray();
  const [maxX, maxY] = nodes.reduce(
    ([x, y], node) => [Math.max(node.x, x), Math.max(node.y, y)],
    [-1, -1],
  );
  const emptyNode = nodes.find((node) => node.used === 0);
  if (!emptyNode) throw new Error("Could not find the initial empty node.");
  const walls = nodes.filter(({ used }) => used > emptyNode.available)
    .reduce((set, { x, y }) => set.add(`${x},${y}`), new Set<PositionHash>());
  const queue = [[emptyNode.x, emptyNode.y, 0]];
  const visited = new Set<PositionHash>([`${emptyNode.x},${emptyNode.y}`]);
  while (queue.length) {
    const [x, y, steps] = queue.shift()!;
    if (y === 0 && x === maxX - 1) return steps + 1 + 5 * (maxX - 1);
    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx > maxX || ny > maxY) continue;
      const hash = `${nx},${ny}` as const;
      if (walls.has(hash) || visited.has(hash)) continue;
      visited.add(hash);
      queue.push([nx, ny, steps + 1]);
    }
  }
}
