export function parseReports(text: string) {
  return text.split("\n").map((line) => line.split(" ").map(Number));
}
