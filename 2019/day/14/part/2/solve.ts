function parseMeasure(text: string) {
  const [quantityText, chemical] = text.split(" ");
  return { quantity: +quantityText, chemical };
}

function parseReaction(text: string) {
  const [lhs, rhs] = text.split(" => ");
  const inputs = lhs.split(", ").map(parseMeasure);
  return { inputs, output: parseMeasure(rhs) };
}

export default function solve(input: string, { oreGiven = 1e12 } = {}) {
  const reactions = new Map(
    input.split("\n").map(parseReaction)
      .map((reaction) => [reaction.output.chemical, reaction]),
  );
  function calculateOre(fuel: number) {
    const required = new Map([["FUEL", fuel]]);
    const surplus = new Map<string, number>();
    let ore = 0;
    while (required.size) {
      const [[chemical, quantity]] = required.entries();
      required.delete(chemical);
      if (chemical === "ORE") {
        ore += quantity;
        continue;
      }
      const available = surplus.get(chemical) ?? 0;
      const needed = Math.max(0, quantity - available);
      surplus.set(chemical, Math.max(0, available - quantity));
      if (needed === 0) continue;
      const { inputs, output } = reactions.get(chemical)!;
      const batches = Math.ceil(needed / output.quantity);
      const current = surplus.get(chemical) ?? 0;
      surplus.set(chemical, current + batches * output.quantity - needed);
      for (const { chemical, quantity } of inputs) {
        const current = required.get(chemical) ?? 0;
        required.set(chemical, current + batches * quantity);
      }
    }
    return ore;
  }
  let low = 0, high = 1;
  while (calculateOre(high) <= oreGiven) low = high, high *= 2;
  while (low < high) {
    const fuel = low + Math.floor((high - low + 1) / 2);
    if (calculateOre(fuel) <= oreGiven) low = fuel;
    else high = fuel - 1;
  }
  return low;
}
