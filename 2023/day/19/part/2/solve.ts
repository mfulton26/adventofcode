const regExp = /^(?<key>[xmas])(?<operator>[<>])(?<valueText>\d+)$/;

function parse(text: string) {
  const [workflowsText] = text.split("\n\n");
  const workflows = workflowsText.split("\n").map((line) => {
    const [name, conditionsText] = line.split(/[{}]/);
    const rules = conditionsText.split(",").map((word) => {
      const args = word.split(":");
      if (args.length === 1) return { destination: args[0] };
      const { key, operator, valueText } = regExp.exec(args[0])!.groups!;
      const condition = {
        key: key as "x" | "m" | "a" | "s",
        operator: operator as "<" | ">",
        value: +valueText,
      };
      return { condition, destination: args[1] };
    });
    return { name, rules };
  });
  return { workflows };
}

export default function solve(input: string) {
  const { workflows } = parse(input);
  const workflowsByName = workflows.reduce(
    (map, workflow) => map.set(workflow.name, workflow),
    new Map<string, typeof workflows[number]>(),
  );
  let result = 0;
  const stack = [{
    path: ["in"],
    ranges: {
      x: { min: 1, max: 4000 },
      m: { min: 1, max: 4000 },
      a: { min: 1, max: 4000 },
      s: { min: 1, max: 4000 },
    },
  }];
  while (stack.length) {
    let { path, ranges } = stack.pop()!;
    const state = path.at(-1)!;
    if (state === "R") continue;
    if (state === "A") {
      const combinations = Object.values(ranges)
        .reduce((product, { min, max }) => product * (max - min + 1), 1);
      result += combinations;
      continue;
    }
    const { rules } = workflowsByName.get(state)!;
    for (const { condition, destination } of rules) {
      if (condition === undefined) {
        stack.push({ path: [...path, destination], ranges });
        break;
      }
      const { key, operator, value } = condition;
      stack.push({
        path: [...path, destination],
        ranges: {
          ...ranges,
          [key]: {
            ...ranges[key],
            ...(operator === "<"
              ? { max: Math.min(value - 1, ranges[key].max) }
              : { min: Math.max(value + 1, ranges[key].min) }),
          },
        },
      });
      ranges = {
        ...ranges,
        [key]: {
          ...ranges[key],
          ...(operator === "<"
            ? { min: Math.max(value, ranges[key].min) }
            : { max: Math.min(value, ranges[key].max) }),
        },
      };
    }
  }
  return result;
}
