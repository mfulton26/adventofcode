type Predicate = (x: number, m: number, a: number, s: number) => boolean;

function parse(text: string) {
  const [workflowsText, ratingsText] = text.split("\n\n");
  const workflows = workflowsText.split("\n").map((line) => {
    const [name, conditionsText] = line.split(/[{}]/);
    const rules = conditionsText.split(",").map((word) => {
      const args = word.split(":");
      return {
        predicate: args.length === 1
          ? () => true
          : new Function("x", "m", "a", "s", `return ${args[0]}`) as Predicate,
        destination: args.at(-1)!,
      };
    });
    return { name, rules };
  });
  const ratings = ratingsText.split("\n").map((line) =>
    <Record<"x" | "m" | "a" | "s", number>> Object.fromEntries(
      line.slice(1, -1).split(",").map((word) => {
        const [key, valueText] = word.split("=");
        return [key, +valueText];
      }),
    )
  );
  return { workflows, ratings };
}

export default function solve(input: string) {
  const { workflows, ratings } = parse(input);
  const workflowsByName = workflows.reduce(
    (map, workflow) => map.set(workflow.name, workflow),
    new Map<string, typeof workflows[number]>(),
  );
  let result = 0;
  for (const { x, m, a, s } of ratings) {
    let state = "in";
    while (state) {
      const { rules } = workflowsByName.get(state)!;
      state = rules.find(({ predicate }) => predicate(x, m, a, s))!.destination;
      if (state === "R") break;
      if (state === "A") {
        result += x + m + a + s;
        break;
      }
    }
  }
  return result;
}
