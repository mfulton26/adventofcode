export default {
  "+": (numbers) => numbers.reduce((a, b) => a + b, 0),
  "*": (numbers) => numbers.reduce((a, b) => a * b, 1),
} satisfies Record<string, (numbers: number[]) => number>;
