export function solve(input, { moves = 10000000 } = {}) {
  const cups = parseCups(input);
  let [[currentCup]] = cups;
  for (let move = 1; move <= moves; move++) {
    const [a, b, c] = valuesAfter(cups, currentCup);
    let destinationCup = currentCup;
    destinationCup: while (true) {
      destinationCup = destinationCup === 1 ? cups.size : destinationCup - 1;
      switch (destinationCup) {
        case a:
        case b:
        case c:
          continue destinationCup;
        default:
          break destinationCup;
      }
    }
    cups.set(currentCup, cups.get(c));
    cups.set(c, cups.get(destinationCup));
    cups.set(destinationCup, a);
    [currentCup] = valuesAfter(cups, currentCup);
  }
  const [a, b] = valuesAfter(cups, 1);
  return a * b;
}

function parseCups(text) {
  const labels = Array.from(text, Number);
  for (let label = labels.length + 1; label <= 1000000; label++) {
    labels.push(label);
  }
  const cups = new Map();
  for (let i = 0; i < labels.length; i++) {
    cups.set(labels[i], labels[(i + 1) % labels.length]);
  }
  return cups;
}

function* valuesAfter(map, reference) {
  for (
    let value = map.get(reference);
    value !== reference;
    value = map.get(value)
  ) {
    yield value;
  }
}
