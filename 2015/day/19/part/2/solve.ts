export default function solve(input: string) {
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

function parseInput(input: string) {
  const [replacementsText, medicineMolecule] = input.split("\n\n");
  const replacements = parseReplacements(replacementsText);
  return { replacements, medicineMolecule };
}

function parseReplacements(text: string) {
  return text.split("\n").map((line) => line.split(" => "));
}

function createMoleculeReducer(replacements: string[][]) {
  const reductions = new Map(replacements.map(([from, to]) => [to, from]));
  const searchValue = new RegExp(
    `(.*)(${
      Array.from(reductions.keys())
        .filter((key) => reductions.get(key) !== "e")
        .join("|")
    })`,
  );
  const replacer = (_: string, prefix: string, match: string) =>
    `${prefix}${reductions.get(match)}`;

  return {
    reduce: (molecule: string) =>
      reductions.get(molecule) === "e"
        ? "e"
        : molecule.replace(searchValue, replacer),
  };
}
