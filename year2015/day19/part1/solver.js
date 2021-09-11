export function solve(input) {
  const { replacements, medicineMolecule } = parseInput(input);
  const createdMolecules = new Set();
  for (const [from, to] of replacements) {
    for (const { index } of medicineMolecule.matchAll(from)) {
      const prefix = medicineMolecule.slice(0, index);
      const suffix = medicineMolecule.slice(index + from.length);
      createdMolecules.add(`${prefix}${to}${suffix}`);
    }
  }
  return createdMolecules.size;
}

function parseInput(input) {
  const [replacementsText, medicineMolecule] = input.split("\n\n");
  const replacements = parseReplacements(replacementsText);
  return { replacements, medicineMolecule };
}

function parseReplacements(text) {
  return text.split("\n").map((line) => line.split(" => "));
}
