const shop = {
  weapons: new Set([
    { name: "Dagger", cost: 8, damage: 4, armor: 0 },
    { name: "Shortsword", cost: 10, damage: 5, armor: 0 },
    { name: "Warhammer", cost: 25, damage: 6, armor: 0 },
    { name: "Longsword", cost: 40, damage: 7, armor: 0 },
    { name: "Greataxe", cost: 74, damage: 8, armor: 0 },
  ]),
  armors: new Set([
    { name: "Leather", cost: 13, damage: 0, armor: 1 },
    { name: "Chainmail", cost: 31, damage: 0, armor: 2 },
    { name: "Splintmail", cost: 53, damage: 0, armor: 3 },
    { name: "Bandedmail", cost: 75, damage: 0, armor: 4 },
    { name: "Platemail", cost: 102, damage: 0, armor: 5 },
  ]),
  rings: new Set([
    { name: "Damage +1", cost: 25, damage: 1, armor: 0 },
    { name: "Damage +2", cost: 50, damage: 2, armor: 0 },
    { name: "Damage +3", cost: 100, damage: 3, armor: 0 },
    { name: "Defense +1", cost: 20, damage: 0, armor: 1 },
    { name: "Defense +2", cost: 40, damage: 0, armor: 2 },
    { name: "Defense +3", cost: 80, damage: 0, armor: 3 },
  ]),
};

export function solve(input) {
  const boss = parseBossStats(input);
  let leastCost = Infinity;
  for (const { you, cost } of scenarios()) {
    if (cost >= leastCost) continue;
    if (determineWinner(you, boss) === boss) continue;
    leastCost = cost;
  }
  return leastCost;
}

function parseBossStats(text) {
  const {
    "Hit Points": hitPoints,
    Damage: damage,
    Armor: armor,
  } = Object.fromEntries(text.split("\n").map((line) => line.split(": ")));
  return {
    hitPoints: Number(hitPoints),
    damage: Number(damage),
    armor: Number(armor),
  };
}

function* scenarios() {
  for (const ringSet of subsets(shop.rings)) {
    if (ringSet.size > 2) continue;
    for (const armor of [undefined, ...shop.armors]) {
      for (const weapon of shop.weapons) {
        const items = [weapon, ...(armor ? [armor] : []), ...ringSet];
        const cost = items.reduce((sum, { cost }) => sum + cost, 0);
        yield {
          you: {
            hitPoints: 100,
            damage: items.reduce((sum, { damage }) => sum + damage, 0),
            armor: items.reduce((sum, { armor }) => sum + armor, 0),
          },
          cost,
          items,
        };
      }
    }
  }
}

function* subsets(set) {
  const { one, size } =
    set.size <= 30
      ? { one: 1, size: 1 << set.size }
      : { one: 1n, size: 1n << BigInt(set.size) };
  yield new Set();
  for (let setBits = one; setBits < size; setBits++) {
    const subset = new Set();
    let mask = one;
    for (const value of set) {
      if (setBits & mask) subset.add(value);
      mask <<= one;
    }
    yield subset;
  }
}

function determineWinner(a, b) {
  return calculateHitsToWin(a, b) <= calculateHitsToWin(b, a) ? a : b;
}

export function calculateHitsToWin({ damage }, { hitPoints, armor }) {
  return Math.ceil(hitPoints / Math.max(damage - armor, 1));
}
