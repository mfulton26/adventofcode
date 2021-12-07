const spells = [
  { name: "Magic Missile", cost: 53, damage: 4 },
  { name: "Drain", cost: 73, damage: 2, heal: 2 },
  { name: "Shield", cost: 113, effect: "shield", duration: 6, armor: 7 },
  { name: "Poison", cost: 173, effect: "poison", duration: 6, damage: 3 },
  { name: "Recharge", cost: 229, effect: "recharge", duration: 5, charge: 101 },
];

export function solve(input) {
  const boss = parseBossStats(input);
  let leastAmountOfMana = Infinity;
  let i = 0;
  for (const fight of fights({
    boss,
    filter: ({ you: { spent } }) => spent < leastAmountOfMana,
  })) {
    if (fight.winner === "boss") continue;
    console.log(fight);
    if (fight.you.spent < leastAmountOfMana)
      leastAmountOfMana = fight.you.spent;
    if (++i > 1000) break;
  }
  return leastAmountOfMana;
}

function parseBossStats(text) {
  const { "Hit Points": hitPoints, Damage: damage } = Object.fromEntries(
    text.split("\n").map((line) => line.split(": "))
  );
  return { hitPoints: Number(hitPoints), damage: Number(damage) };
}

function* fights({ boss, filter = () => true }) {
  const queue = [
    {
      turn: "you",
      you: { hitPoints: 50, manaPoints: 500, spent: 0 },
      boss: { ...boss },
      effects: {},
    },
  ];
  while (queue.length) {
    const { turn, you, boss, effects } = queue.shift();
    if (!filter({ turn, you, boss, effects })) continue;
    for (const effect in effects) {
      switch (effect) {
        case "shield":
          you.armor = 7;
          break;
        case "poison":
          boss.hitPoints -= 3;
          if (boss.hitPoints <= 0) {
            yield { turn, you, boss, effects, winner: "you" };
            continue;
          }
          break;
        case "recharge":
          you.manaPoints += 101;
          break;
      }
      if (--effects[effect] === 0) {
        delete effects[effect];
        if (effect === "shield") delete you.armor;
      }
    }
    switch (turn) {
      case "you": {
        const affordableSpells = spells.filter(
          ({ cost }) => cost <= you.manaPoints
        );
        if (affordableSpells.length === 0)
          yield { turn, you, boss, effects, winner: "boss" };
        else
          for (const {
            cost,
            damage = 0,
            heal = 0,
            effect,
            duration,
          } of affordableSpells) {
            const scenario = {
              turn: "boss",
              you: {
                hitPoints: you.hitPoints + heal,
                manaPoints: you.manaPoints - cost,
                spent: you.spent + cost,
              },
              boss: {
                hitPoints: Math.max(boss.hitPoints - damage, 1),
                damage: boss.damage,
              },
              effects: {
                ...effects,
                ...(effect ? { [effect]: duration } : {}),
              },
            };
            if (scenario.boss.hitPoints > 0) queue.push(scenario);
            else yield { ...scenario, winner: "you" };
          }
        break;
      }
      case "boss": {
        const scenario = {
          turn: "you",
          you: { ...you, hitPoints: Math.max(you.hitPoints - boss.damage, 1) },
          boss: { ...boss },
          effects: { ...effects },
        };
        if (scenario.you.hitPoints > 0) queue.push(scenario);
        else yield { ...scenario, winner: "boss" };
        break;
      }
    }
  }
}
