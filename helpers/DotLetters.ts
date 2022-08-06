const E = `\
####
#...
###.
#...
#...
####`;

const G = `\
.##.
#..#
#...
#.##
#..#
.###`;

const H = `\
#..#
#..#
####
#..#
#..#
#..#`;

const J = `\
..##
...#
...#
...#
#..#
.##.`;

const L = `\
#...
#...
#...
#...
#...
####`;

const U = `\
#..#
#..#
#..#
#..#
#..#
.##.`;

const dotsToLetter = new Map([
  [E, "E"],
  [G, "G"],
  [H, "H"],
  [J, "J"],
  [L, "L"],
  [U, "U"],
]);

function parse(text: string) {
  const lines = text.split("\n");
  const dotLetters: string[] = [];
  for (let i = 0; i < lines[0].length; i += 5) {
    const dotLetter = Array
      .from({ length: 6 }, (_, k) => lines[k].substring(i, i + 4))
      .join("\n");
    dotLetters.push(dotLetter);
  }
  const result = dotLetters
    .map((dotLetter) => dotsToLetter.get(dotLetter) ?? "�")
    .join("");
  if (result.includes("�")) {
    console.warn(
      "failed to parse dot letters:",
      result,
      "(this could be a solver issue or perhaps some dot letter(s) are not yet mapped and can be added)",
    );
    return text;
  }
  return result;
}

export default { parse };
