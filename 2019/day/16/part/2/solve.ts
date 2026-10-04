export default function solve(input: string, { phases = 100 } = {}) {
  const offset = +input.slice(0, 7);
  const signalFromOffset = Array.from(
    { length: input.length * 10_000 - offset },
    (_, k) => +input[(offset + k) % input.length],
  );
  for (let phase = 1; phase <= phases; phase++) {
    let sum = 0;
    for (let index = signalFromOffset.length - 1; index >= 0; index--) {
      sum = (sum + signalFromOffset[index]) % 10;
      signalFromOffset[index] = sum;
    }
  }
  return signalFromOffset.slice(0, 8).join("");
}
