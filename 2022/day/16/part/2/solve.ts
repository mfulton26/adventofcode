const regExp =
  /^Valve (?<id>.+) has flow rate=(?<flowRateText>\d+); tunnels? leads? to valves? (?<destinationsText>.+?)$/gm;

function parseFlowRateGraph(text: string) {
  const flowRates = new Map<string, number>();
  const tunnels = new Map<string, string[]>();
  for (const { groups } of text.matchAll(regExp)) {
    const { id, flowRateText, destinationsText } = groups!;
    const flowRate = Number(flowRateText);
    const destinations = destinationsText.split(", ");
    flowRates.set(id, flowRate);
    tunnels.set(id, destinations);
  }
  return {
    valves: () => flowRates.keys(),
    flowRate: (valve: string) => flowRates.get(valve),
    tunnels: (valve: string) =>
      tunnels.get(valve)?.values() ?? [][Symbol.iterator](),
  };
}

function findShortestDistances<N>(
  node: N,
  successors: (node: N) => Iterable<N>,
) {
  const result = new Map<N, number>().set(node, 0);
  const queue = [node];
  while (queue.length) {
    const u = queue.shift()!;
    const distance = 1 + result.get(u)!;
    for (const v of successors(u)) {
      if (result.has(v)) continue;
      result.set(v, distance);
      queue.push(v);
    }
  }
  return result;
}

function findShortestDistancesBetweenTargets<N>(
  node: N,
  targets: ReadonlySet<N>,
  successors: (node: N) => Iterable<N>,
) {
  const result = new Map<N, Map<N, number>>()
    .set(node, findShortestDistances(node, successors));
  for (const target of targets) {
    // const distances = findShortestDistances(target, successors);
    // for (const node of distances.keys()) {
    //   if (targets.has(node)) continue;
    //   distances.delete(node);
    // }
    // result.set(target, distances);
    result.set(target, findShortestDistances(target, successors));
  }
  return result;
}

function buildTargetValveGraph(
  flowRateGraph: ReturnType<typeof parseFlowRateGraph>,
  targets: ReadonlySet<string>,
) {
  const targetDistances = findShortestDistancesBetweenTargets(
    START,
    targets,
    (valve) => flowRateGraph.tunnels(valve),
  );
  return {
    targets: () => targets.values(),
    connections: (target: string) =>
      targetDistances.get(target)?.keys() ?? [][Symbol.iterator](),
    travelMinutes: (u: string, v: string) => targetDistances.get(u)?.get(v),
  };
}

function* subsetsWithComplements<T>(set: Set<T>) {
  const size = 1 << set.size;
  yield { subset: new Set<T>(), complement: new Set(set) };
  for (let setBits = 1; setBits < size; setBits++) {
    const subset = new Set<T>();
    const complement = new Set<T>();
    let mask = 1;
    for (const value of set) {
      if (setBits & mask) subset.add(value);
      else complement.add(value);
      mask <<= 1;
    }
    yield { subset, complement };
  }
}

const START = "AA";
const MINUTES = 26;

function findMaxPressureReleased(
  flowRateGraph: ReturnType<typeof parseFlowRateGraph>,
  targetValveGraph: ReturnType<typeof buildTargetValveGraph>,
) {
  let maxPressureReleased = -Infinity;
  const stack = [{
    currentValve: START,
    visitedValves: new Set<string>().add(START),
    minutesRemaining: MINUTES,
    pressureReleased: 0,
  }];
  while (stack.length) {
    const { currentValve, visitedValves, minutesRemaining, pressureReleased } =
      stack.pop()!;
    if (pressureReleased > maxPressureReleased) {
      maxPressureReleased = pressureReleased;
    }
    if (minutesRemaining <= 0) continue;
    for (const targetValve of targetValveGraph.connections(currentValve)) {
      if (visitedValves.has(targetValve)) continue;
      const newVisitedValves = new Set(visitedValves).add(targetValve);
      const newMinutesRemaining = minutesRemaining - 1 -
        targetValveGraph.travelMinutes(currentValve, targetValve)!;
      const newPressureReleased = pressureReleased +
        newMinutesRemaining * flowRateGraph.flowRate(targetValve)!;
      stack.push({
        currentValve: targetValve,
        visitedValves: newVisitedValves,
        minutesRemaining: newMinutesRemaining,
        pressureReleased: newPressureReleased,
      });
    }
  }
  return maxPressureReleased;
}

export default function solve(input: string) {
  const flowRateGraph = parseFlowRateGraph(input);
  const targets = Array.from(flowRateGraph.valves())
    .filter((valve) => flowRateGraph.flowRate(valve))
    .reduce((set, target) => set.add(target), new Set<string>());

  let maxPressureReleased = -Infinity;
  for (const { subset, complement } of subsetsWithComplements(targets)) {
    console.log(subset, complement);
    // const pressureReleased = findMaxPressureReleased(
    //   flowRateGraph,
    //   buildTargetValveGraph(flowRateGraph, subset),
    // ) + findMaxPressureReleased(
    //   flowRateGraph,
    //   buildTargetValveGraph(flowRateGraph, complement),
    // );
    // if (pressureReleased > maxPressureReleased) {
    //   maxPressureReleased = pressureReleased;
    //   console.log(maxPressureReleased);
    // }
  }
  return maxPressureReleased;

  // let maxPressureReleased = -Infinity;
  // const stack = [{
  //   currentValve: START,
  //   visitedValves: new Set<string>().add(START),
  //   minutesRemaining: MINUTES,
  //   pressureReleased: 0,
  // }];
  // while (stack.length) {
  //   const { currentValve, visitedValves, minutesRemaining, pressureReleased } =
  //     stack.pop()!;
  //   if (pressureReleased > maxPressureReleased) {
  //     maxPressureReleased = pressureReleased;
  //   }
  //   if (minutesRemaining <= 0) continue;
  //   for (const targetValve of targetValveGraph.connections(currentValve)) {
  //     if (visitedValves.has(targetValve)) continue;
  //     const newVisitedValves = new Set(visitedValves).add(targetValve);
  //     const newMinutesRemaining = minutesRemaining - 1 -
  //       targetValveGraph.travelMinutes(currentValve, targetValve)!;
  //     const newPressureReleased = pressureReleased +
  //       newMinutesRemaining * flowRateGraph.flowRate(targetValve)!;
  //     stack.push({
  //       currentValve: targetValve,
  //       visitedValves: newVisitedValves,
  //       minutesRemaining: newMinutesRemaining,
  //       pressureReleased: newPressureReleased,
  //     });
  //   }
  // }
  // return maxPressureReleased;
}
