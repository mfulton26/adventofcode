function parseRange(text: string) {
  const [lower, upper] = text.split("-").map(Number);
  return { lower, upper };
}

function parseAssignmentPair(text: string) {
  const [first, second] = text.split(",").map(parseRange);
  return { first, second };
}

export function parseAssignmentPairs(text: string) {
  return text.split("\n").map(parseAssignmentPair);
}
