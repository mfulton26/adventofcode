export function solve(input) {
  const decks = parseDecks(input);
  const winner = playRecursiveCombat(decks);
  return findScore(decks[winner]);
}

function parseDecks(text) {
  return text
    .split("\n\n")
    .map((deckText) => deckText.split("\n").slice(1).map(Number));
}

function playRecursiveCombat(decks) {
  const seen = new Set();
  while (decks.every((deck) => deck.length)) {
    const configuration = stringifyDecks(decks);
    if (seen.has(configuration)) {
      return 0;
    }
    seen.add(configuration);
    const cards = decks.map((deck) => deck.shift());
    if (cards.every((card, player) => decks[player].length >= card)) {
      const winner = playRecursiveCombat(
        decks.map((deck, player) => deck.slice(0, cards[player]))
      );
      const winningCard = cards[winner];
      const losingCard = cards[winner === 0 ? 1 : 0];
      decks[winner].push(winningCard, losingCard);
    } else {
      const [
        { player: winner, card: winningCard },
        { card: losingCard },
      ] = cards
        .map((card, player) => ({ player, card }))
        .sort(({ card: a }, { card: b }) => b - a);
      decks[winner].push(winningCard, losingCard);
    }
  }
  return decks.findIndex((deck) => deck.length);
}

function stringifyDecks(decks) {
  return decks.map((deck) => `${deck}`).join("\n");
}

function findScore(deck) {
  return deck.reduce(
    (score, card, index, { length }) => score + card * (length - index),
    0
  );
}
