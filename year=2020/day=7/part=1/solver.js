export function solve(input) {
  const graph = parseGraph(input);
  const containingColors = new Set();
  const queue = ["shiny gold"];
  while (queue.length) {
    const color = queue.shift();
    if (!graph.has(color)) {
      continue;
    }
    const containers = graph.get(color);
    for (const containingColor of containers.keys()) {
      containingColors.add(containingColor);
      queue.push(containingColor);
    }
  }
  return containingColors.size;
}

function parseGraph(text) {
  const rules = parseRules(text);
  const graph = new Map();
  for (const [containingColor, contents] of rules) {
    for (const { quantity, color } of contents) {
      if (!graph.has(color)) {
        graph.set(color, new Map());
      }
      graph.get(color).set(containingColor, quantity);
    }
  }
  return graph;
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
