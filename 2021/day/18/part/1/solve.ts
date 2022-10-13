type SnailfishNumber = { depth: number; value: number }[];

export default function solve(input: string) {
  const snailfishNumbers = input.split("\n").map(parseSnailfishNumber);
  const sum = add(...snailfishNumbers);
  return findMagnitude(sum);
}

function parseSnailfishNumber(text: string) {
  const result: SnailfishNumber = [];
  let depth = 0;
  for (const char of text) {
    switch (char) {
      case "[":
        depth++;
        break;
      case ",":
        break;
      case "]":
        depth--;
        break;
      default:
        result.push({ depth, value: Number(char) });
        break;
    }
  }
  return result;
}

function add(...items: SnailfishNumber[]) {
  return items.reduce((a, b) => {
    const sum = [...a, ...b]
      .map(({ depth, value }) => ({ depth: depth + 1, value }));
    reduce:
    while (true) {
      for (let i = 0, j = 1; j < sum.length; i++, j++) {
        const { [i]: a, [j]: b } = sum;
        if (a.depth === 5 && a.depth === b.depth) {
          if (i > 0) sum[i - 1].value += a.value;
          if (j < sum.length - 1) sum[j + 1].value += b.value;
          sum.splice(i, 2, { depth: 4, value: 0 });
          continue reduce;
        }
      }
      for (let i = 0; i < sum.length; i++) {
        const { [i]: { depth, value } } = sum;
        if (value >= 10) {
          const left = { depth: depth + 1, value: Math.floor(value / 2) };
          const right = { depth: depth + 1, value: Math.ceil(value / 2) };
          sum.splice(i, 1, left, right);
          continue reduce;
        }
      }
      break;
    }
    return sum;
  });
}

function findMagnitude(value: SnailfishNumber) {
  value = [...value];
  scan:
  while (value.length > 1) {
    for (let i = 0, j = 1; j < value.length; i++, j++) {
      const { [i]: a, [j]: b } = value;
      if (a.depth === b.depth) {
        value.splice(i, 2, {
          depth: a.depth - 1,
          value: 3 * a.value + 2 * b.value,
        });
        continue scan;
      }
    }
  }
  return value[0].value;
}
