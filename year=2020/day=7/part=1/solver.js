export function solve(input) {
  const rules = parseRules(input);
  const graph = buildContainingColorsGraph(rules);
  const eventuallyContainingColors = new Set();
  const queue = ["shiny gold"];
  while (queue.length) {
    const color = queue.shift();
    if (!graph.has(color)) {
      continue;
    }
    for (const containingColor of graph.get(color)) {
      eventuallyContainingColors.add(containingColor);
      queue.push(containingColor);
    }
  }
  return eventuallyContainingColors.size;
}

function parseRules(text) {
  return new Map(
    text.split("\n").map((line) => {
      const [lhs, rhs] = line.split(" contain ");
      const bag = parseBag(lhs);
      const contents = parseContents(rhs);
      return [bag.color, contents];
    })
  );
}

function parseBag(text) {
  const {
    groups: { color },
  } = text.match(/(?<color>.*) bags?/);
  return { color };
}

function parseContents(text) {
  if (text === "no other bags.") {
    return [];
  }
  return text.split(",").map(parseContent);
}

function parseContent(text) {
  const [, quantity, bagText] = text.match(/(\d+) (.*)/);
  const { color } = parseBag(bagText);
  return { quantity: Number(quantity), color };
}

function buildContainingColorsGraph(rules) {
  const graph = new Map();
  for (const [containingColor, contents] of rules) {
    for (const { color: child } of contents) {
      if (!graph.has(child)) {
        graph.set(child, new Set());
      }
      graph.get(child).add(containingColor);
    }
  }
  return graph;
}
