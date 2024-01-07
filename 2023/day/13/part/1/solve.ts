function transpose<T>(data: T[][]) {
  const { length: height, 0: { length: width } } = data;
  return Array.from(
    { length: width },
    (_, x) => Array.from({ length: height }, (_, y) => data[y][x]),
  );
}

function getRows(pattern: string) {
  return pattern.split("\n");
}

function getColumns(pattern: string) {
  const data = pattern.split("\n").map((line) => Array.from(line));
  return transpose(data).map((array) => array.join(""));
}

function findMirror(lines: string[]) {
  scan: for (let i = 1; i < lines.length; i++) {
    if (lines[i] !== lines[i - 1]) continue scan;
    for (let j = i - 2, k = i + 1; j >= 0 && k < lines.length; j--, k++) {
      if (lines[j] !== lines[k]) continue scan;
    }
    return i;
  }
  return null;
}

export default function solve(input: string) {
  const patterns = input.split("\n\n");
  let result = 0;
  for (const pattern of patterns) {
    {
      const count = findMirror(getRows(pattern));
      if (count !== null) {
        result += 100 * count;
        continue;
      }
    }
    {
      const count = findMirror(getColumns(pattern));
      if (count !== null) {
        result += count;
        continue;
      }
    }
  }
  return result;
}
