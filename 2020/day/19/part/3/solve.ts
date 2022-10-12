export default function solve(input: string) {
  const { rules, messages } = parseRulesAndMessages(input);
  const maxMessageLength = findMaxMessageLength(messages);
  const regExpZero = createRegExp(0, rules, maxMessageLength);
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

function findMaxMessageLength(messages: string[]) {
  return Math.max(...messages.map(({ length }) => length));
}

function createRegExp(
  number: number,
  rules: Map<number, Rule>,
  maxMessageLength: number,
) {
  const patterns = new Map<number, string>();

  function getPattern(number: number) {
    if (!patterns.has(number)) {
      const rule = rules.get(number)!;
      const subPatternsAlternatives = getSubPatternsAlternatives(rule);
      const pattern = `(?:${
        subPatternsAlternatives
          .map((subPatterns) => subPatterns.join(""))
          .join("|")
      })`;
      patterns.set(number, pattern);
    }
    return patterns.get(number)!;
  }

  function getSubPatternsAlternatives(
    {
      number,
      subRulesAlternatives,
    }: {
      number?: number;
      subRulesAlternatives: Alternative[][];
    },
  ): string[][] {
    switch (number) {
      case 8:
        return getSubPatternsAlternatives({
          subRulesAlternatives,
        }).map((subPatterns) =>
          subPatterns.map((subPattern) => `(?:${subPattern})+`)
        );
      case 11: {
        const [[lhs, rhs]] = getSubPatternsAlternatives({
          subRulesAlternatives,
        });
        return Array.from({ length: maxMessageLength }, (_, k) => [
          `(?:${lhs}){${k + 1}}`,
          `(?:${rhs}){${k + 1}}`,
        ]);
      }
      default:
        return subRulesAlternatives.map((subRules) =>
          subRules.map((subRule) =>
            typeof subRule === "string" ? subRule : getPattern(subRule)
          )
        );
    }
  }

  return new RegExp(`^${getPattern(number)}$`);
}
