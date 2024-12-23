import { generateSecrets } from "../../secrets.ts";

export default function solve(input: string) {
  const initialSecrets = input.split("\n").map(Number);
  const sequenceToTotalPrice = new Map<string, number>();
  for (const initialSecret of initialSecrets) {
    const sequenceToPrice = new Map<string, number>();
    const sequence: number[] = [];
    let prevPrice = Number(initialSecret % 10);
    for (const secret of generateSecrets(initialSecret)) {
      if (sequence.length === 4) sequence.shift();
      const price = secret % 10;
      sequence.push(price - prevPrice);
      prevPrice = price;
      if (sequence.length < 4) continue;
      const hash = sequence.join(",");
      if (sequenceToPrice.has(hash)) continue;
      sequenceToPrice.set(hash, price);
      const total = sequenceToTotalPrice.get(hash) ?? 0;
      sequenceToTotalPrice.set(hash, total + price);
    }
  }
  return Math.max(...sequenceToTotalPrice.values());
}
