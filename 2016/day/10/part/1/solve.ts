const goesRegExp = /^value (?<value>\d+) goes to (?<bot>bot \d+)$/gm;
const givesRegExp =
  /^(?<bot>bot \d+) gives low to (?<low>(?:bot|output) \d+) and high to (?<high>(?:bot|output) \d+)$/gm;

export default function solve(input: string, { a = 61, b = 17 } = {}) {
  if (a > b) [a, b] = [b, a];
  const data = new Map<string, number[]>();
  for (const { groups: { value, bot } = {} } of input.matchAll(goesRegExp)) {
    data.getOrInsert(bot, []).push(+value);
  }
  const rules = new Set(input.matchAll(givesRegExp).map((m) => m.groups ?? {}));
  while (rules.size) {
    for (const rule of rules) {
      const values = data.getOrInsert(rule.bot, []);
      if (values.length !== 2) continue;
      data.delete(rule.bot);
      const [lower, higher] = values.sort((a, b) => a - b);
      if (lower === a && higher === b) return +rule.bot.slice("bot ".length);
      data.getOrInsert(rule.low, []).push(lower);
      data.getOrInsert(rule.high, []).push(higher);
      rules.delete(rule);
    }
  }
  throw new RangeError("compared values not found");
}
