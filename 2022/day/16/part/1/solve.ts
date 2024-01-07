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

// function findShortestDistances<N>(
//   node: N,
//   successors: (node: N) => Iterable<N>,
// ) {
//   const result = new Map<N, number>().set(node, 0);
//   const queue = [node];
//   while (queue.length) {
//     const u = queue.shift()!;
//     const distance = 1 + result.get(u)!;
//     for (const v of successors(u)) {
//       if (result.has(v)) continue;
//       result.set(v, distance);
//       queue.push(v);
//     }
//   }
//   return result;
// }

// function findShortestDistancesBetweenTargets<N>(
//   node: N,
//   targets: Set<N>,
//   successors: (node: N) => Iterable<N>,
// ) {
//   const result = new Map<N, Map<N, number>>()
//     .set(node, findShortestDistances(node, successors));
//   for (const target of targets) {
//     const distances = findShortestDistances(target, successors);
//     for (const node of distances.keys()) {
//       if (targets.has(node)) continue;
//       distances.delete(node);
//     }
//     result.set(target, distances);
//   }
//   return result;
// }

// function buildTargetValveGraph(
//   flowRateGraph: ReturnType<typeof parseFlowRateGraph>,
// ) {
//   const targets = Array.from(flowRateGraph.valves())
//     .filter((valve) => flowRateGraph.flowRate(valve))
//     .reduce((set, target) => set.add(target), new Set<string>());
//   const targetDistances = findShortestDistancesBetweenTargets(
//     START,
//     targets,
//     (valve) => flowRateGraph.tunnels(valve),
//   );
//   return {
//     targets: () => targets.values(),
//     connections: (target: string) =>
//       targetDistances.get(target)?.keys() ?? [][Symbol.iterator](),
//     travelMinutes: (u: string, v: string) => targetDistances.get(u)?.get(v),
//   };
// }

const START = "AA";
const MINUTES = 30;

export default function solve(input: string) {
  // let pressureReleased = 0;
  // const flowRateGraph = parseFlowRateGraph(input);
  // const targets = Array.from(flowRateGraph.valves())
  //   .filter((valve) => flowRateGraph.flowRate(valve))
  //   .reduce((set, target) => set.add(target), new Set<string>());
  // const opened = new Set<string>();
  // for (
  //   let minutesRemaining = MINUTES, current = "AA";
  //   minutesRemaining > 0;
  //   minutesRemaining--
  // ) {
  //   const pressureReleasedPerMinute = Array.from(opened)
  //     .reduce((sum, valve) => sum + flowRateGraph.flowRate(valve)!, 0);
  //   pressureReleased += pressureReleasedPerMinute;
  //   const distances = findShortestDistances(current, flowRateGraph.tunnels);
  //   console.log(distances);
  //   console.log(
  //     Array.from(
  //       distances,
  //       (
  //         [valve, distance],
  //       ) => [
  //         valve,
  //         pressureReleasedPerMinute * minutesRemaining +
  //         (flowRateGraph.flowRate(valve)! * (minutesRemaining - distance)),
  //       ],
  //     ),
  //   );
  //   console.log(
  //     Array.from(targets).sort((a, b) => distances.get(b)! - distances.get(a)!),
  //   );
  //   break;
  // }
  // return pressureReleased;

  const flowRateGraph = parseFlowRateGraph(input);
  const initialTargets: ReadonlySet<string> = Array.from(flowRateGraph.valves())
    .filter((valve) => flowRateGraph.flowRate(valve))
    .reduce((set, target) => set.add(target), new Set<string>());
  let best = {
    valve: START,
    visited: new Set<string>().add(START) as ReadonlySet<string>,
    targets: initialTargets,
    minutesRemaining: MINUTES,
    pressureReleased: 0,
    pressureReleasedPerMinute: 0,
    potentialPressureReleased: Array.from(initialTargets)
      .map((valve) => flowRateGraph.flowRate(valve)!)
      .sort((a, b) => b - a)
      .reduce(
        (potential, flowRate, index) =>
          potential + (MINUTES - 1 - index) * flowRate,
        0,
      ),
  };
  const queue = [best];
  const maxPressureReleasedPerMinute = Array.from(initialTargets)
    .map((valve) => flowRateGraph.flowRate(valve)!)
    .reduce((sum, rate) => sum + rate, 0);
  // let i = 0;
  while (queue.length) {
    // if (i++ > 10) break;
    // console.log(queue.at(0));
    const current = queue.pop()!;
    // if (potentialPressureReleased < maxPressureReleased) continue;
    if (current.pressureReleased > best.pressureReleased) {
      best = current;
      console.log(best);
    }
    if (
      current.pressureReleased < best.pressureReleased &&
      current.minutesRemaining <= best.minutesRemaining
    ) continue;
    const {
      valve,
      visited,
      targets,
      minutesRemaining,
      pressureReleased,
      pressureReleasedPerMinute,
      potentialPressureReleased,
    } = current;
    const nextMinutesRemaining = minutesRemaining - 1;
    if (nextMinutesRemaining < 0) continue;
    // if (nextPotentialPressureReleased < maxPressureReleased) continue;
    if (targets.size === 0) {
      queue.push({
        valve,
        visited,
        targets,
        minutesRemaining: nextMinutesRemaining,
        pressureReleased: pressureReleased + pressureReleasedPerMinute,
        pressureReleasedPerMinute,
        potentialPressureReleased,
      });
      continue;
    }
    const nextPressureReleased = pressureReleased + pressureReleasedPerMinute;
    if (targets.has(valve)) {
      const nextVisited = new Set<string>().add(valve);
      const nextTargets = new Set(targets);
      nextTargets.delete(valve);
      const nextPressureReleasedPerMinute = pressureReleasedPerMinute +
        flowRateGraph.flowRate(valve)!;
      const nextPotentialPressureReleased = potentialPressureReleased -
        (maxPressureReleasedPerMinute - nextPressureReleasedPerMinute);
      queue.push({
        valve,
        visited: nextVisited,
        targets: nextTargets,
        minutesRemaining: nextMinutesRemaining,
        pressureReleased: nextPressureReleased,
        pressureReleasedPerMinute: nextPressureReleasedPerMinute,
        potentialPressureReleased: nextPotentialPressureReleased,
      });
    }
    const nextPotentialPressureReleased = potentialPressureReleased -
      (maxPressureReleasedPerMinute - pressureReleasedPerMinute);
    for (const nextValve of flowRateGraph.tunnels(valve)!) {
      if (visited.has(nextValve)) continue;
      const nextVisited = new Set(visited).add(nextValve);
      queue.push({
        valve: nextValve,
        visited: nextVisited,
        targets,
        minutesRemaining: nextMinutesRemaining,
        pressureReleased: nextPressureReleased,
        pressureReleasedPerMinute,
        potentialPressureReleased: nextPotentialPressureReleased,
      });
    }
  }
  return best.pressureReleased;

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
