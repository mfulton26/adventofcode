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

export default function solve(input: string) {
  let result = 0;
  const blueprints = parse(input);
  for (const { id, robotCosts } of blueprints.slice(0, 1)) {
    let max = -Infinity;
    const stack = [...resourceTypes.toReversed(), null]
      .map((constructionTarget) => ({
        minute: 0,
        robotCounts: counts({ ore: 1 }),
        resourceCounts: counts(),
        constructionTarget,
      }));
    while (stack.length) {
      const {
        minute,
        robotCounts,
        resourceCounts,
        constructionTarget,
      } = stack.pop()!;
      if (minute > 24) continue;
      console.log(stack.at(-1));
      if (constructionTarget === null) {
        const result = resourceCounts.geode +
          Math.floor(robotCounts.geode * (24 - minute));
        console.log(
          "if you build nothing else, you will collect a total of",
          result,
          "geodes",
        );
        alert();
        if (result > max) max = result;
        continue;
      }
      const cost = robotCosts[constructionTarget];
      const time = Math.max(
        ...resourceTypes.filter((type) => cost[type]).map((type) =>
          Math.ceil(cost[type] / robotCounts[type]) - resourceCounts[type]
        ),
      );
      console.log({ constructionTarget, time });
      if (!Number.isFinite(time) || time < 1) continue;
      for (const type of [...resourceTypes.toReversed(), null]) {
        stack.push({
          minute: minute + time,
          robotCounts: {
            ...robotCounts,
            [constructionTarget]: robotCounts[constructionTarget] + 1,
          },
          resourceCounts: {
            ore: resourceCounts.ore + robotCounts.ore * time - cost.ore,
            clay: resourceCounts.clay + robotCounts.clay * time - cost.clay,
            obsidian: resourceCounts.obsidian + robotCounts.obsidian * time -
              cost.obsidian,
            geode: resourceCounts.geode + robotCounts.geode * time - cost.geode,
          },
          constructionTarget: type,
        });
      }
    }
    // while (stack.length) {
    //   // console.log(stack.at(-1));
    //   // if (stack.length > 10) break;
    //   const { minute, robotCounts, resourceCounts } = stack.pop()!;
    //   {
    //     const result = resourceCounts.geode +
    //       Math.floor((24 - minute) * robotCounts.geode);
    //     if (result > max) max = result;
    //   }
    //   if (minute >= 24) continue;
    //   for (const { type, cost } of buildOptions) {
    //     if (
    //       cost.geode > resourceCounts.geode ||
    //       cost.obsidian > resourceCounts.obsidian ||
    //       cost.clay > resourceCounts.clay ||
    //       cost.ore > resourceCounts.ore
    //     ) continue;
    //     // console.log({ cost, counts });
    //     stack.push({
    //       minute: minute + 1,
    //       robotCounts: type === null ? robotCounts : {
    //         ...robotCounts,
    //         [type]: robotCounts[type] + 1,
    //       },
    //       resourceCounts: {
    //         ore: resourceCounts.ore + robotCounts.ore - cost.ore,
    //         clay: resourceCounts.clay + robotCounts.clay - cost.clay,
    //         obsidian: resourceCounts.obsidian + robotCounts.obsidian -
    //           cost.obsidian,
    //         geode: resourceCounts.geode + robotCounts.geode - cost.geode,
    //       },
    //     });
    //   }
    // }
    result += id * max;
    console.log({ id, max, result });
  }
  return result;
}
