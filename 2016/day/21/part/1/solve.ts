function swapPosition<T>(array: T[], i: number, j: number) {
  [array[i], array[j]] = [array[j], array[i]];
}
function rotateLeft<T>(array: T[], amount: number) {
  amount %= array.length;
  array.push(...array.splice(0, amount));
}
function rotateRight<T>(array: T[], amount: number) {
  amount %= array.length;
  array.unshift(...array.splice(-amount, amount));
}
function rotateBasedOnPositionOf<T>(array: T[], value: T) {
  let i = array.indexOf(value);
  if (i >= 4) i += 1;
  i += 1;
  i %= array.length;
  rotateRight(array, i);
}
function reversePositions<T>(array: T[], i: number, j: number) {
  for (; i < j; i++, j--) swapPosition(array, i, j);
}
function movePosition<T>(array: T[], i: number, j: number) {
  array.splice(j, 0, ...array.splice(i, 1));
}
export default function solve(input: string, { password = "abcdefgh" } = {}) {
  const array = Array.from(password);
  const handlers: Record<string, (x: string, y: string) => void> = {
    "swap position": (x, y) => swapPosition(array, +x, +y),
    "swap letter": (x, y) =>
      swapPosition(array, array.indexOf(x), array.indexOf(y)),
    "rotate left": (x) => rotateLeft(array, +x),
    "rotate right": (x) => rotateRight(array, +x),
    "rotate based on position of letter": (x) =>
      rotateBasedOnPositionOf(array, x),
    "reverse positions": (x, y) => reversePositions(array, +x, +y),
    "move position": (x, y) => movePosition(array, +x, +y),
  };
  for (const line of input.split("\n")) {
    const [command, x, , y] = line.split(/\s*\b(\d+|[a-z])\b\s*/);
    handlers[command](x, y);
  }
  return array.join("");
}
