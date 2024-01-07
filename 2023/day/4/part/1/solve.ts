import * as Cards from "../../cards.ts";
import { intersection } from "../../sets.ts";

export default function solve(input: string) {
  return Cards.parse(input)
    .map(({ winningNumbers, numbersYouHave }) =>
      (2 ** intersection(winningNumbers, numbersYouHave).size) >> 1
    )
    .reduce((sum, value) => sum + value, 0);
}
