export default function solve(input: string) {
  const rules = parseRules(input);
  const graph = buildContainingColorsGraph(rules);
  const eventuallyContainingColors = new Set<string>();
  const bags = ["shiny gold"];
  for (const color of bags) {
    if (!graph.has(color)) continue;
    for (const containingColor of graph.get(color)!) {
      eventuallyContainingColors.add(containingColor);
      bags.push(containingColor);
    }
  }
  return eventuallyContainingColors.size;
}

function parseRules(text: string) {
  return new Map(
    text.split("\n").map((line) => {
      const [lhs, rhs] = line.split(" contain ");
      const bag = parseBag(lhs);
      const contents = parseContents(rhs);
      return [bag.color, contents];
    }),
  );
}

function parseBag(text: string) {
  return text.match(/(?<color>.*) bags?/)!.groups as { color: string };
}

function parseContents(text: string) {
  if (text === "no other bags.") return [];
  return text.split(",").map(parseContent);
}

function parseContent(text: string) {
  const [, quantity, bagText] = text.match(/(\d+) (.*)/)!;
  const { color } = parseBag(bagText);
  return { quantity: Number(quantity), color };
}

function buildContainingColorsGraph(rules: ReturnType<typeof parseRules>) {
  const graph = new Map<string, Set<string>>();
  for (const [containingColor, contents] of rules) {
    for (const { color: child } of contents) {
      if (!graph.has(child)) graph.set(child, new Set());
      graph.get(child)!.add(containingColor);
    }
  }
  return graph;
}
