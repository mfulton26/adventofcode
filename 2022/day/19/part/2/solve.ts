const types = ["ore", "clay", "obsidian", "geode"] as const;
const reversedTypes = types.toReversed();

const zeros = { ore: 0, clay: 0, obsidian: 0, geode: 0 };

function parseBlueprint(text: string) {
  const [
    ,
    id,
    oreOreCost,
    clayOreCost,
    obsidianOreCost,
    obsidianClayCost,
    geodeOreCost,
    geodeObsidianCost,
  ] =
    /^Blueprint (?<id>\d+): Each ore robot costs (?<oreOreCost>\d+) ore. Each clay robot costs (?<clayOreCost>\d+) ore. Each obsidian robot costs (?<obsidianOreCost>\d+) ore and (?<obsidianClayCost>\d+) clay. Each geode robot costs (?<geodeOreCost>\d+) ore and (?<geodeObsidianCost>\d+) obsidian.$/
      .exec(text)!.map(Number);
  return {
    id,
    ore: { ...zeros, ore: oreOreCost },
    clay: { ...zeros, ore: clayOreCost },
    obsidian: { ...zeros, ore: obsidianOreCost, clay: obsidianClayCost },
    geode: { ...zeros, ore: geodeOreCost, obsidian: geodeObsidianCost },
  };
}

type Blueprint = ReturnType<typeof parseBlueprint>;

function calculateMaxGeodes(blueprint: Blueprint): number {
  let max = -Infinity;
  let scenarios = [{ stock: zeros, robots: { ...zeros, ore: 1 } }];
  for (let minute = 0; minute < 32; minute++) {
    const stringifiedSet = new Set<string>();
    for (const prev of scenarios) {
      const stock = { ...prev.stock };
      for (const stockType of types) stock[stockType] += prev.robots[stockType];
      if (stock.geode > max) max = stock.geode;
      for (const robotType of reversedTypes) {
        const canBuy = types.every((costType) =>
          prev.stock[costType] >= blueprint[robotType][costType]
        );
        if (!canBuy) continue;
        const stockAfterSpend = { ...stock };
        for (const costType of types) {
          stockAfterSpend[costType] -= blueprint[robotType][costType];
        }
        const robots = { ...prev.robots };
        robots[robotType]++;
        const isExcessive = types.some((costType) => {
          const cost = blueprint[costType][robotType];
          return cost && robots[robotType] > cost + 2;
        });
        if (isExcessive) continue;
        stringifiedSet.add(JSON.stringify({ stock: stockAfterSpend, robots }));
      }
      stringifiedSet.add(JSON.stringify({ stock, robots: prev.robots }));
    }
    scenarios = Array.from(stringifiedSet, (hash) => JSON.parse(hash))
      .filter(({ stock }) => stock.geode >= max - 2);
  }
  return max;
}

export default function solve(input: string) {
  const blueprints = input.split("\n").slice(0, 3).map(parseBlueprint);
  return blueprints.map(calculateMaxGeodes)
    .reduce((product, geodes) => product * geodes, 1);
}
