export function solve(input) {
  const instructions = parseInstructions(input);
  const signals = createSignals(instructions);
  return signals.get("a");
}

export function solveAll(input) {
  const instructions = parseInstructions(input);
  const signals = createSignals(instructions);
  return Object.fromEntries(
    Array.from(instructions.keys())
      .sort()
      .map((key) => [key, signals.get(key)])
  );
}

function parseInstructions(text) {
  const instructionEntries = parseInstructionEntries(text);
  return new Map(instructionEntries);
}

function* parseInstructionEntries(text) {
  for (const line of text.split("\n")) {
    yield parseInstructionEntry(line);
  }
}

function parseInstructionEntry(line) {
  const words = line.split(" ");
  if (words[0] === "NOT") {
    return parseNot(words);
  }
  switch (words[1]) {
    case "AND":
      return parseAnd(words);
    case "OR":
      return parseOr(words);
    case "LSHIFT":
      return parseLeftShift(words);
    case "RSHIFT":
      return parseRightShift(words);
    default:
      return parseSource(words);
  }
}

function parseSource([source, , destination]) {
  return [destination, (signals) => signals.get(source)];
}

function parseAnd([a, , b, , destination]) {
  return [destination, (signals) => signals.get(a) & signals.get(b)];
}

function parseOr([a, , b, , destination]) {
  return [destination, (signals) => signals.get(a) | signals.get(b)];
}

function parseLeftShift([a, , b, , destination]) {
  return [destination, (signals) => signals.get(a) << signals.get(b)];
}

function parseRightShift([a, , b, , destination]) {
  return [destination, (signals) => signals.get(a) >>> signals.get(b)];
}

function parseNot([, source, , destination]) {
  return [destination, (signals) => ~signals.get(source) & 0xffff];
}

function createSignals(instructions) {
  const signals = new Map();
  function get(identifier) {
    if (isFinite(identifier)) {
      return Number(identifier);
    }
    if (!signals.has(identifier)) {
      signals.set(identifier, instructions.get(identifier)({ get }));
    }
    return signals.get(identifier);
  }
  return { get };
}
