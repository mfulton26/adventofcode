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

function findShortestSequenceLength(
  code: string,
  depth: number,
  {
    paths = numericKeypadPaths,
    seen = new Map<`${number},${string}`, number>(),
  } = {},
): number {
  if (depth < 0) return code.length;
  const hash = `${depth},${code}` as const;
  if (seen.has(hash)) return seen.get(hash)!;
  let result = 0;
  let pointer = "A";
  const options = { paths: directionalKeypadPaths, seen };
  for (const char of code) {
    result += findShortestSequenceLength(
      `${paths[pointer][char]}A`,
      depth - 1,
      options,
    );
    pointer = char;
  }
  seen.set(hash, result);
  return result;
}

export default function solve(input: string, { depth = 25 } = {}) {
  const codes = input.split("\n");
  let sum = 0;
  for (const code of codes) {
    sum += findShortestSequenceLength(code, depth) * parseInt(code);
  }
  return sum;
}
