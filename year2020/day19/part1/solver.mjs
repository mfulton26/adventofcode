export function solve(input) {
  const { rules, messages } = parseRulesAndMessages(input);
  const regExpZero = createRegExp(0, { rules });
  const validMessages = messages.filter((message) => regExpZero.test(message));
  return validMessages.length;
}

function parseRulesAndMessages(text) {
  const [rulesLines, messagesLines] = text.split("\n\n");
  const rules = new Map(
    rulesLines.split("\n").map((line) => {
      const [lhs, rhs] = line.split(": ");
      const number = Number(lhs);
      const subRulesAlternatives = rhs
        .split(" | ")
        .map((s) => s.split(" ").map(JSON.parse));
      return [number, { number, subRulesAlternatives }];
    })
  );
  const messages = messagesLines.split("\n");
  return { rules, messages };
}

function createRegExp(number, { rules }) {
  const patterns = new Map();

  function getPattern(number) {
    if (!patterns.has(number)) {
      const { subRulesAlternatives } = rules.get(number);
      const subPatternsAlternatives = subRulesAlternatives.map((subRules) =>
        subRules.map((subRule) =>
          isNaN(subRule) ? subRule : getPattern(subRule)
        )
      );
      const pattern = `(?:${subPatternsAlternatives
        .map((subPatterns) => subPatterns.join(""))
        .join("|")})`;
      patterns.set(number, pattern);
    }
    return patterns.get(number);
  }

  return new RegExp(`^${getPattern(number)}$`);
}
