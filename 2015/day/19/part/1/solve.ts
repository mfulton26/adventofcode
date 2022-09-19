export default function solve(input: string) {
  const { replacements, medicineMolecule } = parseInput(input);
  const createdMolecules = new Set();
  for (const [from, to] of replacements) {
    for (const { index } of medicineMolecule.matchAll(new RegExp(from, "g"))) {
      const prefix = medicineMolecule.slice(0, index);
      const suffix = medicineMolecule.slice(index! + from.length);
      createdMolecules.add(`${prefix}${to}${suffix}`);
    }
  }
  return createdMolecules.size;
}

function parseInput(input: string) {
  const [replacementsText, medicineMolecule] = input.split("\n\n");
  const replacements = parseReplacements(replacementsText);
  return { replacements, medicineMolecule };
}

function parseReplacements(text: string) {
  return text.split("\n").map((line) => line.split(" => "));
}
