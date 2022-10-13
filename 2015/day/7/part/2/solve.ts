type Wire = (signals: { get(key: string): number }) => number;

export default function solve(input: string) {
  const instructions = parseInstructions(input);
  const signals = createSignals(instructions);
  const signal = signals.get("a");
  instructions.set("b", () => signal);
  signals.reset();
  return signals.get("a");
}

export function parseInstructions(text: string) {
  const parse = <Record<string, (words: string[]) => [string, Wire]>> {
    "AND": ([a, , b, , destination]) => {
      return [destination, (signals) => signals.get(a) & signals.get(b)];
    },
    "OR": ([a, , b, , destination]) => {
      return [destination, (signals) => signals.get(a) | signals.get(b)];
    },
    "LSHIFT": ([a, , b, , destination]) => {
      return [destination, (signals) => signals.get(a) << signals.get(b)];
    },
    "RSHIFT": ([a, , b, , destination]) => {
      return [destination, (signals) => signals.get(a) >>> signals.get(b)];
    },
    "NOT": ([, source, , destination]) => {
      return [destination, (signals) => ~signals.get(source) & 0xffff];
    },
    default: ([source, , destination]) => {
      return [destination, (signals) => signals.get(source)];
    },
  };

  function parseInstructionEntry(line: string) {
    const words = line.split(" ");
    if (words[0] === "NOT") return parse["NOT"](words);
    switch (words[1]) {
      case "AND":
      case "OR":
      case "LSHIFT":
      case "RSHIFT":
        return parse[words[1]](words);
      default:
        return parse.default(words);
    }
  }

  function* parseInstructionEntries(text: string) {
    for (const line of text.split("\n")) yield parseInstructionEntry(line);
  }

  return new Map(parseInstructionEntries(text));
}

export function createSignals(instructions: Map<string, Wire>) {
  const signals = new Map<string, number>();
  function get(identifier: string) {
    if (/^\d+$/.test(identifier)) return Number(identifier);
    if (!signals.has(identifier)) {
      signals.set(identifier, instructions.get(identifier)!({ get }));
    }
    return signals.get(identifier)!;
  }
  return { get, reset: () => signals.clear() };
}
