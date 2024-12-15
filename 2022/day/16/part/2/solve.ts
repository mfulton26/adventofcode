import subsets from "@lib/subsets.ts";

type ValueGraph = ReturnType<typeof parseFlowRateGraph>;
type Distances = ReturnType<typeof computeDistances>;

const regExp =
  /^Valve (?<id>.+) has flow rate=(?<flowRateText>\d+); tunnels? leads? to valves? (?<destinationsText>.+?)$/gm;

function parseFlowRateGraph(text: string) {
  const flowRates = new Map<string, number>();
  const tunnels = new Map<string, string[]>();
  for (const { groups } of text.matchAll(regExp)) {
    const { id, flowRateText, destinationsText } = groups!;
    flowRates.set(id, +flowRateText);
    tunnels.set(id, destinationsText.split(", "));
  }
  const nodes = () => flowRates.keys();
  const value = (valve: string) => flowRates.get(valve);
  const connected = (valve: string) => tunnels.get(valve) ?? [];
  return { nodes, value, connected };
}

function computeDistances(graph: ValueGraph) {
  const result = new Map<string, Map<string, number>>();
  {
    for (const u of graph.nodes()) {
      const u2 = new Map<string, number>().set(u, 0);
      result.set(u, u2);
      for (const v of graph.connected(u)) u2.set(v, 1), u2.set(v, 1);
    }
    for (const m of graph.nodes()) {
      for (const u of graph.nodes()) {
        const u2 = result.get(u)!;
        const u2m = u2.get(m);
        if (u2m === undefined) continue;
        for (const v of graph.nodes()) {
          const m2v = result.get(m)?.get(v);
          if (m2v === undefined) continue;
          const u2m2v = u2m + m2v;
          const u2v = u2.get(v);
          if (u2v !== undefined && u2v < u2m2v) continue;
          u2.set(v, u2m2v);
        }
      }
    }
  }
  return result;
}

function findMaxPressure(
  graph: ValueGraph,
  distances: Distances,
  targets: Set<string>,
) {
  let max = 0;
  const stack = [{
    valve: "AA",
    t: 26,
    opened: new Set<string>(),
    released: 0,
  }];
  while (stack.length) {
    const { valve, t, opened, released } = stack.pop()!;
    if (released > max) max = released;
    if (t === 0) continue;
    for (const destination of targets.difference(opened)) {
      const remaining = t - distances.get(valve)!.get(destination)! - 1;
      if (remaining < 0) continue;
      stack.push({
        valve: destination,
        t: remaining,
        opened: new Set(opened).add(destination),
        released: released + remaining * graph.value(destination)!,
      });
    }
  }
  return max;
}

export default function solve(input: string) {
  const flowRateGraph = parseFlowRateGraph(input);
  const distances = computeDistances(flowRateGraph);
  const targets = flowRateGraph.nodes()
    .filter((valve) => flowRateGraph.value(valve))
    .reduce((set, value) => set.add(value), new Set<string>());
  const halfOfTargetsSize = targets.size / 2;
  const maxPressures = new Map<string, number>();
  for (const subtargets of subsets(targets)) {
    const maxPressure = findMaxPressure(flowRateGraph, distances, subtargets);
    maxPressures.set(`${[...subtargets]}`, maxPressure);
  }
  let max = 0;
  for (const yourTargets of subsets(targets)) {
    if (yourTargets.size > halfOfTargetsSize) continue;
    const theirTargets = targets.difference(yourTargets);
    const yourHash = `${[...yourTargets]}`, theirHash = `${[...theirTargets]}`;
    const combined = maxPressures.get(yourHash)! + maxPressures.get(theirHash)!;
    if (combined > max) max = combined;
  }
  return max;
}
