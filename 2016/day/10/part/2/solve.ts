const goesRegExp = /^value (?<value>\d+) goes to (?<bot>bot \d+)$/gm;
const givesRegExp =
  /^(?<bot>bot \d+) gives low to (?<low>(?:bot|output) \d+) and high to (?<high>(?:bot|output) \d+)$/gm;

export default function solve(input: string) {
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
      data.getOrInsert(rule.low, []).push(lower);
      data.getOrInsert(rule.high, []).push(higher);
      rules.delete(rule);
    }
  }
  return data.get("output 0")![0] *
    data.get("output 1")![0] *
    data.get("output 2")![0];
}
