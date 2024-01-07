function parseStartingStacks(text: string) {
  const [idLine, ...crateLines] = text.split("\n").reverse();
  const result = new Map<string, string[]>();
  for (const { 0: id, index } of idLine.matchAll(/\S+/g)) {
    const stack = crateLines
      .map((line) => line.charAt(index!))
      .filter((char) => char !== " ");
    result.set(id, stack);
  }
  return result;
}

parseRearrangementProcedures.regexp =
  /^move (?<quantityText>\d+) from (?<source>\d+) to (?<destination>\d+)$/gm;
function* parseRearrangementProcedures(text: string) {
  const { regexp } = parseRearrangementProcedures;
  for (const [, quantityText, source, destination] of text.matchAll(regexp)) {
    yield { quantity: parseInt(quantityText), source, destination };
  }
}

function parseInput(text: string) {
  const [topText, bottomText] = text.split("\n\n");
  const startingStacks = parseStartingStacks(topText);
  const rearrangementProcedures = parseRearrangementProcedures(bottomText);
  return { startingStacks, rearrangementProcedures };
}

export default function solve(input: string) {
  const { startingStacks: stacks, rearrangementProcedures } = parseInput(input);
  for (const { quantity, source, destination } of rearrangementProcedures) {
    for (let i = 0; i < quantity; i++) {
      stacks.get(destination)!.push(stacks.get(source)!.pop()!);
    }
  }
  return Array.from(stacks.values(), (crates) => crates.at(-1)).join("");
}
