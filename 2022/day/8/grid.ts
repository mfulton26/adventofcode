export function parseGrid(text: string) {
  return text.split("\n").map((line) => Array.from(line, Number));
}
