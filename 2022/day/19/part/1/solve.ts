function parseBlueprint(text: string) {
  const [lhs, rhs] = text.split(": ");
  const id = +lhs.slice("Blueprint ".length);
  const robotCostsByType = new Map(
    rhs.split(/(?<=\.) /).map((statement) => {
      const [/*Each*/, type, /*robot*/, /*costs*/ , ...rest] = statement
        .slice(0, -1)
        .split(" ");
      const costs = Array.from(
        { length: (rest.length + 1) / 3 },
        (_, k) => ({ quantity: +rest[3 * k], resource: rest[3 * k + 1] }),
      );
      return [type, costs];
    }),
  );
  return { id, robotCostsByType };
}

type Blueprint = ReturnType<typeof parseBlueprint>;

function determineBlueprintQualityLevel({ id, robotCostsByType }: Blueprint) {
  let maxGeodes = 0;
  const stack = [{
    minutes: 0,
    robots: new Map([["ore", 1]]),
    resources: new Map<string, number>(),
    history: "",
  }];
  let i = 0;
  bar: while (stack.length) {
    if (i++ >= 2000) break;
    stack.sort((a, b) =>
      (b.resources.get("geode") ?? 0) - (a.resources.get("geode") ?? 0)
    );
    console.log(stack.at(-1));
    const { minutes, robots, resources, history } = stack.pop()!;
    const geodes = (24 - minutes) * (robots.get("geode") ?? 0) +
      (resources.get("geode") ?? 0);
    if (geodes > maxGeodes) {
      maxGeodes = geodes;
      console.log({ maxGeodes });
    }
    for (const [type, costs] of robotCostsByType) {
      continue bar;
    }
    for (const [type, costs] of robotCostsByType) {
      const minutesToCollect = Math.max(
        ...costs.map(({ quantity, resource }) =>
          Math.ceil(
            (quantity - (resources.get(resource) ?? 0)) /
              (robots.get(resource) ?? 0),
          )
        ),
      );
      if (
        minutesToCollect < 0 ||
        minutesToCollect === Infinity ||
        minutes + minutesToCollect > 24
      ) continue;
      const collected = new Map(resources);
      for (const [type, count] of robots) {
        collected.set(
          type,
          (collected.get(type) ?? 0) + (minutesToCollect + 1) * count,
        );
      }
      const m = minutes + minutesToCollect + 1;
      stack.push({
        minutes: m,
        robots: new Map(robots).set(type, (robots.get(type) ?? 0) + 1),
        resources: costs.reduce(
          (resources, { quantity, resource }) =>
            resources.set(resource, resources.get(resource)! - quantity),
          new Map(collected),
        ),
        history: `${history}${m}${type[1].toUpperCase()}`,
      });
    }
  }
  return id * maxGeodes;
}

export default function solve(input: string) {
  const blueprints = input.split("\n").slice(0, 1).map(parseBlueprint);
  return blueprints.map(determineBlueprintQualityLevel)
    .reduce((sum, level) => sum + level, 0);
}
