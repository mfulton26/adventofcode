export function parseDirection(text: string): [number, number] {
  switch (text) {
    case "U":
      return [0, 1];
    case "D":
      return [0, -1];
    case "L":
      return [-1, 0];
    case "R":
      return [1, 0];
    default:
      throw new SyntaxError(`unexpected direction text: ${text}`);
  }
}
