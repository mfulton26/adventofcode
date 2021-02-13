export function solve(input) {
  const rules = parseRules(input);
  let count = 0;
  const queue = [{ quantity: 1, color: "shiny gold" }];
  while (queue.length) {
    const { quantity, color } = queue.shift();
    count += quantity;
    if (rules.has(color)) {
      queue.push(
        ...rules.get(color).map(({ quantity: contentQuantity, color }) => ({
          quantity: quantity * contentQuantity,
          color,
        }))
      );
    }
  }
  return count - 1;
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
