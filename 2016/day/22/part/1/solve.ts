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
  let viablePairsCount = 0;
  for (const a of nodes) {
    if (!a.used) continue;
    for (const b of nodes) {
      if (a === b || a.used > b.available) continue;
      viablePairsCount++;
    }
  }
  return viablePairsCount;
}
