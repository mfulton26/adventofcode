type ClaimSquare = (number | "X")[];

export default function solve(input: string) {
  const claims = parseClaims(input);
  const squares = transformClaimsToClaimSquares(claims);
  return findCountOfConflictingClaimSquares(squares);
}

function parseClaims(text: string): Map<number, DOMRect> {
  return new Map(
    text.split("\n").map((line) => {
      const [, id, left, top, width, height] = line.split(/\D+/).map(Number);
      return [id, new DOMRect(left, top, width, height)];
    }),
  );
}

function transformClaimsToClaimSquares(claims: Map<number, DOMRect>) {
  const squares: ClaimSquare[] = Array.from(
    { length: 1000 },
    () => Array.from({ length: 1000 }),
  );
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

function findCountOfConflictingClaimSquares(squares: ClaimSquare[]) {
  let count = 0;
  for (const row of squares) {
    for (const square of row) {
      if (square !== "X") continue;
      count++;
    }
  }
  return count;
}
