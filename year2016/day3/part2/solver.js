export function solve(input) {
  const tuples = input
    .split("\n")
    .map((line) => line.match(/\d+/g).map(Number));
  for (let offset = 0; offset < tuples.length; offset += 3) {
    transpose(tuples, { offset, limit: 3 });
  }
  let count = 0;
  for (const tuple of tuples) {
    const [a, b, c] = Array.from(tuple).sort((a, b) => a - b);
    if (a + b > c) {
      count++;
    }
  }
  return count;
}

function transpose(matrix, { offset = 0, limit = matrix.length - offset }) {
  for (let i = 0; i < limit; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i + offset][j], matrix[j + offset][i]] = [
        matrix[j + offset][i],
        matrix[i + offset][j],
      ];
    }
  }
}
