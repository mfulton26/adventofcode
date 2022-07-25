export default function solve(input: string) {
  return parseNotes(input)
    .map(toOutputValue)
    .reduce((sum, outputValue) => sum + outputValue, 0);
}

function parseNotes(text: string) {
  return text.trim().split("\n").map((line) =>
    line.split(" | ").map((words) =>
      words.split(" ").map((pattern) => new Set(pattern))
    )
  );
}

function toOutputValue([patterns, outputValuePatterns]: Set<string>[][]) {
  const digitPatterns = identifyDigitPatterns(patterns);
  const digits = outputValuePatterns.map((outputValuePattern) =>
    digitPatterns.findIndex((digitPattern) =>
      isSubsetOf(digitPattern, outputValuePattern) &&
      isSupersetOf(digitPattern, outputValuePattern)
    )
  );
  return Number(digits.join(""));
}

function identifyDigitPatterns(patterns: Set<string>[]) {
  const digits = Array<Set<string>>(10);
  const patternsBySize: Record<number, Set<string>[]> = {
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  };
  for (const pattern of patterns) patternsBySize[pattern.size].push(pattern);
  ({
    2: [digits[1]],
    3: [digits[7]],
    4: [digits[4]],
    7: [digits[8]],
  } = patternsBySize);
  const {
    5: fiveSided,
    6: sixSided,
  } = patternsBySize;
  digits[3] = fiveSided.find((pattern) => isSupersetOf(pattern, digits[1]))!;
  digits[6] = sixSided.find((pattern) => !isSupersetOf(pattern, digits[1]))!;
  digits[9] = sixSided.find((pattern) => isSupersetOf(pattern, digits[3]))!;
  digits[0] = sixSided.find((pattern) => !digits.includes(pattern))!;
  digits[5] = fiveSided.find((pattern) => isSubsetOf(pattern, digits[6]))!;
  digits[2] = fiveSided.find((pattern) => !digits.includes(pattern))!;
  return digits;
}

function isSupersetOf<T>(a: Set<T>, b: Iterable<T>) {
  for (const value of b) if (!a.has(value)) return false;
  return true;
}

function isSubsetOf<T>(a: Set<T>, b: Iterable<T>) {
  const that = b instanceof Set ? b : new Set(b);
  for (const value of a) if (!that.has(value)) return false;
  return true;
}
