export default function solve(input: string, { phases = 100 } = {}) {
  let signal = Array.from(input, Number);
  for (let phase = 1; phase <= phases; phase++) {
    signal = signal.map((_, outputIndex) => {
      const coefficients = patternForOutput(outputIndex).drop(1);
      let sum = 0;
      for (const digit of signal) sum += digit * coefficients.next().value!;
      return Math.abs(sum) % 10;
    });
  }
  return signal.slice(0, 8).join("");
}

function* patternForOutput(outputIndex: number) {
  while (true) {
    for (let i = 0; i <= outputIndex; i++) yield 0;
    for (let i = 0; i <= outputIndex; i++) yield 1;
    for (let i = 0; i <= outputIndex; i++) yield 0;
    for (let i = 0; i <= outputIndex; i++) yield -1;
  }
}
