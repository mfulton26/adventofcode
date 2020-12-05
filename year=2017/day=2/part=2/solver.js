export function solve(input) {
  const table = input.split("\n").map((line) => line.split(/\s/).map(Number));
  return table.reduce((sum, values) => {
    values.sort((a, b) => a - b);
    for (let i = 0; i < values.length; i++) {
      const a = values[i];
      for (let j = i + 1; j < values.length; j++) {
        const b = values[j];
        const quotient = b / a;
        if (Number.isInteger(quotient)) {
          return sum + quotient;
        }
      }
    }
  }, 0);
}
