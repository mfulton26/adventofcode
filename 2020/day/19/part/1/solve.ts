export default function solve(input: string) {
  const { rules, messages } = parseRulesAndMessages(input);
  const regExpZero = createRegExp(0, rules);
  const validMessages = messages.filter((message) => regExpZero.test(message));
  return validMessages.length;
}

type Alternative = number | "a" | "b";
type Rule = { number: number; subRulesAlternatives: Alternative[][] };

function parseRulesAndMessages(text: string) {
  const [rulesLines, messagesLines] = text.split("\n\n");
  const rules = new Map(
    rulesLines.split("\n").map((line) => {
      const [lhs, rhs] = line.split(": ");
      const number = Number(lhs);
      const subRulesAlternatives = rhs
        .split(" | ")
        .map((s) => s.split(" ").map((text) => <Alternative> JSON.parse(text)));
      return [number, <Rule> { number, subRulesAlternatives }];
    }),
  );
  const messages = messagesLines.split("\n");
  return { rules, messages };
}

function createRegExp(number: number, rules: Map<number, Rule>) {
  const patterns = new Map<number, string>();

  function getPattern(number: number) {
    if (!patterns.has(number)) {
      const { subRulesAlternatives } = rules.get(number)!;
      const subPatternsAlternatives = subRulesAlternatives.map((subRules) =>
        subRules.map((subRule) =>
          typeof subRule === "string" ? subRule : getPattern(subRule)
        )
      );
      const pattern = `(?:${
        subPatternsAlternatives
          .map((subPatterns) => subPatterns.join(""))
          .join("|")
      })`;
      patterns.set(number, pattern);
    }
    return patterns.get(number)!;
  }

  return new RegExp(`^${getPattern(number)}$`);
}
