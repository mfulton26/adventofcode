import * as Cards from "../../cards.ts";
import { intersection } from "../../sets.ts";

export default function solve(input: string) {
  const cards = Cards.parse(input);
  const cardCounts = cards.reduce(
    (map, { id }) => map.set(id, 1),
    new Map<number, number>(),
  );
  for (const card of cards) {
    const count = cardCounts.get(card.id)!;
    const { size } = intersection(card.winningNumbers, card.numbersYouHave);
    for (let offset = 1; offset <= size; offset++) {
      const id = card.id + offset;
      cardCounts.set(id, cardCounts.get(id)! + count);
    }
  }
  return Array.from(cardCounts.values()).reduce((sum, value) => sum + value, 0);
}
