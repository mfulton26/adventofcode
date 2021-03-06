export function solve(input) {
  const claims = parseClaims(input);
  const squares = transformClaimsToClaimSquares(claims);
  return findCountOfConflictingClaimSquares(squares);
}

function parseClaims(input) {
  return new Map(
    input.split("\n").map((line) => {
      const [, id, left, top, width, height] = line.split(/\D+/).map(Number);
      return [id, new DOMRect(left, top, width, height)];
    })
  );
}

function transformClaimsToClaimSquares(claims) {
  const squares = Array.from({ length: 1000 }, () => Array(1000));
  for (const [id, { left, right, top, bottom }] of claims) {
    for (let x = left; x < right; x++) {
      for (let y = top; y < bottom; y++) {
        switch (squares[x][y]) {
          case undefined:
            squares[x][y] = id;
            break;
          case "X":
            break;
          default:
            squares[x][y] = "X";
            break;
        }
      }
    }
  }
  return squares;
}

function findCountOfConflictingClaimSquares(squares) {
  return squares.reduce(
    (count, row) =>
      count +
      row.reduce((count, square) => (square === "X" ? count + 1 : count), 0),
    0
  );
}
