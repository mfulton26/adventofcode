export function solve(input) {
  const numbers = input.split(",").map(Number);
  const lastTurns = new Map(numbers.map((value, index) => [value, index + 1]));
  let lastNumber = numbers[numbers.length - 1];
  for (let turn = numbers.length; turn < 2020; turn++) {
    const number = lastTurns.has(lastNumber)
      ? turn - lastTurns.get(lastNumber)
      : 0;
    lastTurns.set(lastNumber, turn);
    lastNumber = number;
  }
  return lastNumber;
}
