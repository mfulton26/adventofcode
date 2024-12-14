import lcm from "@lib/lcm.ts";

function parseDocuments(text: string) {
  const [instructionsText, networkText] = text.split("\n\n");
  const instructions = Array.from(
    instructionsText,
    (v) => v === "L" ? "left" : "right",
  );
  const network = networkText.split("\n").reduce((network, line) => {
    const [key, valuesText] = line.split(" = ");
    const [left, right] = valuesText.slice(1, -1).split(", ");
    return network.set(key, { left, right });
  }, new Map<string, { left: string; right: string }>());
  return { instructions, network };
}

export default function solve(input: string) {
  const { instructions, network } = parseDocuments(input);
  return Array.from(network.keys())
    .filter((key) => key.endsWith("A"))
    .map((current) => {
      let stepCount = 0;
      while (true) {
        for (const instruction of instructions) {
          current = network.get(current)![instruction], stepCount++;
          if (current.endsWith("Z")) return stepCount;
        }
      }
    })
    .reduce(lcm);
}
