const spells = [
  { name: "magicMissile", cost: 53, damage: 4 },
  { name: "drain", cost: 73, damage: 2, heal: 2 },
  { name: "shield", cost: 113, duration: 6 },
  { name: "poison", cost: 173, duration: 6 },
  { name: "recharge", cost: 229, duration: 5 },
];

export default function solve(
  input: string,
  { player = { hitPoints: 50, manaPoints: 500 } } = {},
) {
  const boss = parseBossStats(input);
  let minManaSpent = Infinity;
  const queue = [{
    turn: "player" as "boss" | "player",
    boss: { ...boss },
    player: { ...player },
    effects: <Record<string, number>> { shield: 0, poison: 0, recharge: 0 },
    manaSpent: 0,
  }];
  const seen = new Set<string>();
  while (queue.length) {
    const { turn, boss, player, effects, manaSpent } = queue.shift()!;
    const hash = JSON.stringify({ turn, boss, player, effects, manaSpent });
    if (seen.has(hash)) continue;
    seen.add(hash);
    if (manaSpent >= minManaSpent) continue;
    if (turn === "player") player.hitPoints--;
    if (player.hitPoints <= 0) continue;
    if (effects.poison) boss.hitPoints -= 3;
    if (boss.hitPoints <= 0) {
      if (manaSpent < minManaSpent) minManaSpent = manaSpent;
      continue;
    }
    if (effects.recharge) player.manaPoints += 101;
    for (const { name } of spells) if (effects[name]) effects[name]--;
    const armor = effects.shield ? 7 : 0;
    switch (turn) {
      case "boss":
        queue.push({
          turn: "player",
          boss: { ...boss },
          player: {
            ...player,
            hitPoints: player.hitPoints - Math.max(1, boss.damage - armor),
          },
          effects: { ...effects },
          manaSpent,
        });
        break;
      case "player":
        if (spells.every(({ cost }) => cost > player.manaPoints)) continue;
        for (const { name, cost, damage, heal, duration } of spells) {
          if (player.manaPoints < cost) continue;
          if (effects[name]) continue;
          queue.push({
            turn: "boss",
            boss: {
              ...boss,
              ...(damage && { hitPoints: boss.hitPoints - damage }),
            },
            player: {
              ...player,
              manaPoints: player.manaPoints - cost,
              ...(heal && { hitPoints: player.hitPoints + heal }),
            },
            effects: { ...effects, ...(duration && { [name]: duration }) },
            manaSpent: manaSpent + cost,
          });
        }
        break;
    }
  }
  return minManaSpent;
}

function parseBossStats(text: string) {
  const { "Hit Points": hitPoints, "Damage": damage } = Object.fromEntries(
    text.split("\n").map((line) => line.split(": ")),
  );
  return { hitPoints: Number(hitPoints), damage: Number(damage) };
}
