export default function solve(input: string) {
  const decks = parseDecks(input);
  const winner = playCombat(decks);
  return findScore(decks[winner]);
}

function parseDecks(text: string) {
  return text.split("\n\n")
    .map((deckText) => deckText.split("\n").slice(1).map(Number));
}

function playCombat(decks: number[][]) {
  while (decks.every((deck) => deck.length)) {
    const cards = decks.map((deck) => deck.shift()!);
    const [{ player: winner, card: winningCard }, { card: losingCard }] = cards
      .map((card, player) => ({ player, card }))
      .sort(({ card: a }, { card: b }) => b - a);
    decks[winner].push(winningCard, losingCard);
  }
  return decks.findIndex((deck) => deck.length);
}

function findScore(deck: number[]) {
  return deck.reduce(
    (score, card, index, { length }) => score + card * (length - index),
    0,
  );
}
