export function parseDepths(text) {
  return text.split("\n").map(Number);
}
