const cards = Object.freeze(
  [
    "J",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "Q",
    "K",
    "A",
  ] as const,
);

type Card = typeof cards[number];

const handTypes = Object.freeze(
  [
    "High card",
    "One pair",
    "Two pair",
    "Three of a kind",
    "Full house",
    "Four of a kind",
    "Five of a kind",
  ] as const,
);

type HandType = typeof handTypes[number];

function determineHandType(cards: Card[]): HandType {
  const counts = new Map<Card, number>();
  for (const card of cards) counts.set(card, (counts.get(card) ?? 0) + 1);
  switch (counts.size) {
    case 1:
      return "Five of a kind";
    case 2: {
      if (counts.has("J")) return "Five of a kind";
      const [count] = counts.values();
      switch (count) {
        case 1:
        case 4:
          return "Four of a kind";
      }
      return "Full house";
    }
    case 3:
      for (const count of counts.values()) {
        if (count < 3) continue;
        if (counts.has("J")) return "Four of a kind";
        return "Three of a kind";
      }
      switch (counts.get("J")) {
        case 1:
          return "Full house";
        case 2:
          return "Four of a kind";
      }
      return "Two pair";
    case 4:
      if (counts.has("J")) return "Three of a kind";
      return "One pair";
    default:
      if (counts.has("J")) return "One pair";
      return "High card";
  }
}

function parseHands(text: string) {
  return text.split("\n").map((line) => {
    const [cardsText, bidText] = line.split(" ");
    const cards = Array.from(cardsText) as Card[];
    const bid = Number(bidText);
    const type = determineHandType(cards);
    return { cards, type, bid };
  });
}

type Hand = ReturnType<typeof parseHands>[number];

function compareHandTypes(a: HandType, b: HandType) {
  return handTypes.indexOf(a) - handTypes.indexOf(b);
}

function compareCards(a: Card, b: Card) {
  return cards.indexOf(a) - cards.indexOf(b);
}

function compareHands(a: Hand, b: Hand) {
  const typeComparison = compareHandTypes(a.type, b.type);
  if (typeComparison !== 0) return typeComparison;
  for (let i = 0; i < 5; i++) {
    const cardComparison = compareCards(a.cards[i], b.cards[i]);
    if (cardComparison !== 0) return cardComparison;
  }
  return 0;
}

export default function solve(input: string) {
  return parseHands(input)
    .sort(compareHands)
    .reduce((total, { bid }, index) => {
      const rank = index + 1;
      return total + bid * rank;
    }, 0);
}
