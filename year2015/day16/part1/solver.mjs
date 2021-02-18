export function solve(input) {
  const sues = parseSues(input);
  return sues.find(giftGivingSue).number;
}

function parseSues(text) {
  return text.split("\n").map((line) => {
    const indexOfFirstColon = line.indexOf(": ");
    const number = Number(line.slice(4, indexOfFirstColon));
    const compounds = line
      .slice(indexOfFirstColon + 2)
      .split(", ")
      .map((compoundText) => {
        const [key, valueText] = compoundText.split(": ");
        return [key, Number(valueText)];
      });
    return { number, compounds };
  });
}

function giftGivingSue({ compounds }) {
  return compounds.every(([key, value]) => value === giftGivingSue.known[key]);
}
giftGivingSue.known = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};
