type Paths = Record<string, Record<string, string>>;

const numericKeypadPaths: Paths = Object.fromEntries(
  [
    ["", "^<", "^", "^>", "^^<", "^^", "^^>", "^^^<", "^^^", "^^^>", ">"],
    [">v", "", ">", ">>", "^", "^>", "^>>", "^^", "^^>", "^^>>", ">>v"],
    ["v", "<", "", ">", "<^", "^", "^>", "<^^", "^^", "^^>", "v>"],
    ["<v", "<<", "<", "", "<<^", "<^", "^", "<<^^", "<^^", "^^", "v"],
    [">vv", "v", "v>", "v>>", "", ">", ">>", "^", "^>", "^>>", ">>vv"],
    ["vv", "<v", "v", "v>", "<", "", ">", "<^", "^", "^>", "vv>"],
    ["<vv", "<<v", "<v", "v", "<<", "<", "", "<<^", "<^", "^", "vv"],
    [">vvv", "vv", "vv>", "vv>>", "v", "v>", "v>>", "", ">", ">>", ">>vvv"],
    ["vvv", "<vv", "vv", "vv>", "<v", "v", "v>", "<", "", ">", "vvv>"],
    ["<vvv", "<<vv", "<vv", "vv", "<<v", "<v", "v", "<<", "<", "", "vvv"],
    ["<", "^<<", "<^", "^", "^^<<", "<^^", "^^", "^^^<<", "<^^^", "^^^", ""],
  ].map((row, u) => [
    u.toString(11).toUpperCase(),
    Object.fromEntries(row.map((p, v) => [v.toString(11).toUpperCase(), p])),
  ]),
);

const directionalKeypadPaths: Paths = {
  "^": { "^": "", "v": "v", "<": "v<", ">": "v>", "A": ">" },
  "v": { "^": "^", "v": "", "<": "<", ">": ">", "A": "^>" },
  "<": { "^": ">^", "v": ">", "<": "", ">": ">>", "A": ">>^" },
  ">": { "^": "<^", "v": "<", "<": "<<", ">": "", "A": "^" },
  "A": { "^": "<", "v": "<v", "<": "v<<", ">": "v", "A": "" },
};

export default function solve(input: string) {
  const codes = input.split("\n");
  let sum = 0;
  for (const code of codes) {
    let path = code;
    for (let i = 0; i <= 2; i++) {
      let nextPath = "";
      let pointer = "A";
      const paths = i === 0 ? numericKeypadPaths : directionalKeypadPaths;
      for (const char of path) {
        nextPath += paths[pointer][char];
        nextPath += "A";
        pointer = char;
      }
      path = nextPath;
    }
    sum += path.length * parseInt(code);
  }
  return sum;
}
