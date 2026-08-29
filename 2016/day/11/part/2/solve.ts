const itemRegExp =
  /(?<element>\w+)(-compatible)? (?<component>generator|microchip)/g;

type Pair = [generator: number, microchip: number];

function parsePairs(input: string) {
  const map = new Map<string, Pair>();
  for (const [index, line] of input.split("\n").entries()) {
    for (const { groups = {} } of line.matchAll(itemRegExp)) {
      const { element, component } = groups;
      const current = map.get(element) ?? [0, 0];
      current[+(component === "microchip")] = index;
      map.set(element, current);
    }
  }
  return map.values().toArray().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

function* candidateTokens(index: number, pairs: Pair[]) {
  for (const [pairIndex, [generator, microchip]] of pairs.entries()) {
    if (generator === index) yield pairIndex * 2;
    if (microchip === index) yield pairIndex * 2 + 1;
  }
}

function areSafePairs(pairs: Pair[]) {
  for (let index = 0; index < 4; index++) {
    const hasGenerator = pairs.some(([g]) => g === index);
    if (!hasGenerator) continue;
    const unsafeChip = pairs.some(([g, m]) => m === index && g !== index);
    if (unsafeChip) return false;
  }
  return true;
}

export default function solve(input: string) {
  const pairs = parsePairs(input);
  pairs.unshift([0, 0], [0, 0]);
  const queue = [{ index: 0, pairs, steps: 0 }];
  const seen = new Set<string>();
  while (queue.length) {
    const { index, pairs, steps } = queue.shift()!;
    const pairsHash = pairs.toSorted((a, b) => a[0] - b[0] || a[1] - b[1])
      .map(([g, m]) => `${g}:${m}`).join(";");
    const hash = `${index}|${pairsHash}`;
    if (seen.has(hash)) continue;
    seen.add(hash);
    if (pairs.every(([g, m]) => g === 3 && m === 3)) return steps;
    const candidates = [...candidateTokens(index, pairs)];
    for (let i = 0; i < candidates.length; i++) {
      for (let j = i; j < candidates.length; j++) {
        for (const direction of [-1, 1]) {
          const nextIndex = index + direction;
          if (nextIndex < 0 || nextIndex > 3) continue;
          const nextPairs = pairs.map((pair) => [...pair] as Pair);
          for (const token of [candidates[i], candidates[j]]) {
            const pairIndex = Math.floor(token / 2);
            nextPairs[pairIndex][token % 2] = nextIndex;
          }
          if (!areSafePairs(nextPairs)) continue;
          queue.push({ index: nextIndex, pairs: nextPairs, steps: steps + 1 });
        }
      }
    }
  }
}
