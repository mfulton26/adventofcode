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
export default function solve(input: string, { password = "fbgdceah" } = {}) {
  const array = Array.from(password);
  const reverseHandlers: Record<string, (x: string, y: string) => void> = {
    "swap position": (x, y) => swapPosition(array, +x, +y),
    "swap letter": (x, y) =>
      swapPosition(array, array.indexOf(x), array.indexOf(y)),
    "rotate left": (x) => rotateRight(array, +x),
    "rotate right": (x) => rotateLeft(array, +x),
    "rotate based on position of letter": (x) => {
      const scrambled = array.join("");
      for (let j = 0; j < array.length; j++) {
        const candidate = [...array];
        rotateLeft(candidate, j);
        const transformed = [...candidate];
        rotateBasedOnPositionOf(transformed, x);
        if (transformed.join("") === scrambled) {
          array.splice(0, array.length, ...candidate);
          return;
        }
      }
      throw new Error(`Could not reverse rotation for ${scrambled}`);
    },
    "reverse positions": (x, y) => reversePositions(array, +x, +y),
    "move position": (x, y) => movePosition(array, +y, +x),
  };
  for (const line of input.split("\n").reverse()) {
    const [command, x, , y] = line.split(/\s*\b(\d+|[a-z])\b\s*/);
    reverseHandlers[command](x, y);
  }
  return array.join("");
}
