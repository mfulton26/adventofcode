export default function solve(input: string) {
  const rules = parseRules(input);
  let count = 0;
  const bags = [{ quantity: 1, color: "shiny gold" }];
  for (const { quantity, color } of bags) {
    count += quantity;
    if (!rules.has(color)) continue;
    for (const bag of rules.get(color)!) {
      bags.push({ quantity: quantity * bag.quantity, color: bag.color });
    }
  }
  return count - 1;
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
