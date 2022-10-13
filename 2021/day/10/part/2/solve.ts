export default function solve(input: string) {
  const scores = input.split("\n")
    .map((line) => {
      const { value, error } = findCompletion(line);
      if (error) return;
      return value.reduce((score, char) => score * 5 + pointsTable[char], 0);
    })
    .filter((score): score is number => score !== undefined)
    .sort((a, b) => a - b);
  return scores[(scores.length - 1) / 2];
}

function findCompletion(line: string) {
  const stack = <("(" | "[" | "{" | "<")[]> [];
  stackBuilding:
  for (const char of line) {
    switch (char) {
      case "(":
      case "[":
      case "{":
      case "<":
        stack.push(char);
        break;
      case ")":
      case "]":
      case "}":
      case ">": {
        if (stack.length === 0) break stackBuilding;
        const expected = closeToOpen[char];
        const actual = stack.pop()!;
        if (actual !== expected) return { error: { actual, expected } };
        break;
      }
    }
  }
  const value = stack.reverse().map((char) => openToClose[char]);
  return { value };
}

const closeToOpen = {
  [")"]: "(" as const,
  ["]"]: "[" as const,
  ["}"]: "{" as const,
  [">"]: "<" as const,
};

const openToClose = {
  ["("]: ")" as const,
  ["["]: "]" as const,
  ["{"]: "}" as const,
  ["<"]: ">" as const,
};

const pointsTable = {
  [")"]: 1,
  ["]"]: 2,
  ["}"]: 3,
  [">"]: 4,
};
