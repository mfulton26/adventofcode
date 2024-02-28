const resourceTypes = Object.freeze(
  ["ore", "clay", "obsidian", "geode"] as const,
);

function counts({ ore = 0, clay = 0, obsidian = 0, geode = 0 } = {}) {
  return { ore, clay, obsidian, geode };
}

function parse(text: string) {
  return text.split("\n").map((line) => {
    const numbers = [...line.matchAll(/\d+/g)].map(Number);
    return {
      id: numbers[0],
      robotCosts: {
        ore: counts({ ore: numbers[1] }),
        clay: counts({ ore: numbers[2] }),
        obsidian: counts({ ore: numbers[3], clay: numbers[4] }),
        geode: counts({ ore: numbers[5], obsidian: numbers[6] }),
      },
    };
  });
}

// function* subsets<T>(set: Set<T>) {
//   const size = 1 << set.size;
//   yield new Set<T>();
//   for (let setBits = 1; setBits < size; setBits++) {
//     const subset = new Set<T>();
//     let mask = 1;
//     for (const value of set) {
//       if (setBits & mask) subset.add(value);
//       mask <<= 1;
//     }
//     yield subset;
//   }
// }

// const buildSets = [...subsets(new Set(resourceTypes))].toReversed();
// console.log(buildSets);

export default function solve(input: string) {
  let result = 0;
  const blueprints = parse(input);
  for (const { id, robotCosts } of blueprints) {
    let max = -Infinity;
    // const buildOptions = buildSets.map((robotTypes) => ({
    //   cost: Array.from(robotTypes).reduce(
    //     (cost, type) => ({
    //       ore: cost.ore + robotCosts[type].ore,
    //       clay: cost.clay + robotCosts[type].clay,
    //       obsidian: cost.obsidian + robotCosts[type].obsidian,
    //       geode: cost.geode + robotCosts[type].geode,
    //     }),
    //     counts(),
    //   ),
    //   counts: {
    //     ore: robotTypes.has("ore") ? 1 : 0,
    //     clay: robotTypes.has("clay") ? 1 : 0,
    //     obsidian: robotTypes.has("obsidian") ? 1 : 0,
    //     geode: robotTypes.has("geode") ? 1 : 0,
    //   },
    // }));
    const buildOptions = [...resourceTypes.toReversed(), null].map((type) => ({
      type,
      cost: type === null ? counts() : robotCosts[type],
      counts: {
        ore: type === "ore" ? 1 : 0,
        clay: type === "clay" ? 1 : 0,
        obsidian: type === "obsidian" ? 1 : 0,
        geode: type === "geode" ? 1 : 0,
      },
    }));
    const stack = [{
      minute: 0,
      robotCounts: counts({ ore: 1 }),
      resourceCounts: counts(),
    }];
    while (stack.length) {
      console.log(stack.at(-1));
      // if (stack.length > 10) break;
      const { minute, robotCounts, resourceCounts } = stack.pop()!;
      if (resourceCounts.geode > max) max = resourceCounts.geode;
      if (minute >= 24) continue;
      for (const { type, cost, counts } of buildOptions) {
        if (
          cost.ore > resourceCounts.ore ||
          cost.clay > resourceCounts.clay ||
          cost.obsidian > resourceCounts.obsidian ||
          cost.geode > resourceCounts.geode ||
          type &&
            buildOptions.filter((buildOption) => buildOption.type !== type)
              .every(({ cost }) => cost[type] <= resourceCounts[type])
        ) continue;
        // console.log({ cost, counts });
        stack.push({
          minute: minute + 1,
          robotCounts: {
            ore: robotCounts.ore + counts.ore,
            clay: robotCounts.clay + counts.clay,
            obsidian: robotCounts.obsidian + counts.obsidian,
            geode: robotCounts.geode + counts.geode,
          },
          resourceCounts: {
            ore: resourceCounts.ore + robotCounts.ore - cost.ore,
            clay: resourceCounts.clay + robotCounts.clay - cost.clay,
            obsidian: resourceCounts.obsidian + robotCounts.obsidian -
              cost.obsidian,
            geode: resourceCounts.geode + robotCounts.geode - cost.geode,
          },
        });
        break;
      }
    }
    result += id * max;
    console.log({ id, max, result });
  }
  return result;
}
