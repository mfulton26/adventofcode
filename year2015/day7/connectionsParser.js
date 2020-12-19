export function parseConnections(input) {
  return new Map(parseConnectionEntries(input));
}

function* parseConnectionEntries(input) {
  for (const line of input.split("\n")) {
    yield parseConnectionEntry(line);
  }
}

function parseConnectionEntry(line) {
  const words = line.split(" ");
  if (words[0] === "NOT") {
    return parseNot(words);
  } else {
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
