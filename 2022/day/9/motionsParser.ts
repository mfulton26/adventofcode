import { parseDirection } from "./directionParser.ts";

export function parseMotions(text: string) {
  return text.split("\n").map((line) => {
    const [directionText, amountText] = line.split(" ");
    const direction = parseDirection(directionText);
    const amount = parseInt(amountText);
    return { direction, amount };
  });
}
