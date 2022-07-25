export default function solve(input: string) {
  return input.trim().split("\n").reduce((sum, line) => {
    const char = findFirstIllegalCharacter(line);
    if (char === undefined) return sum;
    return sum + pointsTable[char];
  }, 0);
}

function findFirstIllegalCharacter(line: string) {
  const stack = <("(" | "[" | "{" | "<")[]> [];
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
        if (stack.length === 0) return;
        const expected = closeToOpen[char];
        const actual = stack.pop()!;
        if (actual !== expected) return char;
        break;
      }
    }
  }
}

const closeToOpen = {
  [")"]: "(" as const,
  ["]"]: "[" as const,
  ["}"]: "{" as const,
  [">"]: "<" as const,
};

const pointsTable = {
  [")"]: 3,
  ["]"]: 57,
  ["}"]: 1197,
  [">"]: 25137,
};
