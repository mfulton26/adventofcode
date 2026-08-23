export default function solve(input: string) {
  const messages = input.split("\n");
  const counts = Array.from(messages[0], () => new Map<string, number>());
  for (const message of messages) {
    for (let i = 0; i < message.length; i++) {
      counts[i].set(message[i], (counts[i].get(message[i]) ?? 0) + 1);
    }
  }
  return counts.map((counts) =>
    counts.entries().reduce((a, b) => (a[1] < b[1] ? a : b))[0]
  ).join("");
}
