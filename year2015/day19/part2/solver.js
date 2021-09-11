export function solve(input) {
  const { replacements, medicineMolecule } = parseInput(input);
  const moleculeReducer = createMoleculeReducer(replacements);

  let stepCount = 0;
  for (
    let molecule = medicineMolecule;
    molecule !== "e";
    molecule = moleculeReducer.reduce(molecule)
  ) {
    ++stepCount;
  }
  return stepCount;
}

function parseInput(input) {
  const [replacementsText, medicineMolecule] = input.split("\n\n");
  const replacements = parseReplacements(replacementsText);
  return { replacements, medicineMolecule };
}

function parseReplacements(text) {
  return text.split("\n").map((line) => line.split(" => "));
}

function createMoleculeReducer(replacements) {
  const reductions = new Map(replacements.map(([from, to]) => [to, from]));
  const searchValue = new RegExp(
    `(.*)(${Array.from(reductions.keys())
      .filter((key) => reductions.get(key) !== "e")
      .join("|")})`
  );
  const replacer = (_, prefix, match) => `${prefix}${reductions.get(match)}`;

  return {
    reduce: (molecule) =>
      reductions.get(molecule) === "e"
        ? "e"
        : molecule.replace(searchValue, replacer),
  };
}
