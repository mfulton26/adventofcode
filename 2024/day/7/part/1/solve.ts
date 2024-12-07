export default function solve(input: string) {
  const equations = input.split("\n").map((line) => {
    const [left, right] = line.split(": ");
    const testValue = +left;
    const numbers = right.split(" ").map(Number);
    return { testValue, numbers };
  });
  return equations
    .filter(({ testValue, numbers }) => {
      const stack = [numbers];
      while (stack.length) {
        const numbers = stack.pop()!;
        if (numbers.length === 1) {
          if (numbers[0] === testValue) return true;
          else continue;
        }
        const [a, b, ...rest] = numbers;
        stack.push([a + b, ...rest]);
        stack.push([a * b, ...rest]);
      }
    })
    .reduce((sum, { testValue }) => sum + testValue, 0);
}
