const seatDirections = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export function solve(input) {
  const initialLayout = input.split("\n").map((line) => Array.from(line));
  const stabilizedLayout = findStabilizedLayout(initialLayout);
  return findOccupiedSeatCount(stabilizedLayout);
}

function findStabilizedLayout(layout) {
  while (true) {
    let changed = false;
    layout = layout.map((row, rowIndex) =>
      row.map((position, columnIndex) => {
        const index = [rowIndex, columnIndex];
        const occupiedSeatCount = findAdjacentOccupiedSeatCount(layout, index);
        switch (position) {
          case "L":
            if (occupiedSeatCount === 0) {
              changed = true;
              return "#";
            }
            break;
          case "#":
            if (occupiedSeatCount >= 4) {
              changed = true;
              return "L";
            }
            break;
        }
        return position;
      })
    );
    if (!changed) {
      return layout;
    }
  }
}

function findAdjacentOccupiedSeatCount(layout, [rowIndex, columnIndex]) {
  return seatDirections.reduce((count, [dr, dc]) => {
    const [r, c] = [rowIndex + dr, columnIndex + dc];
    return r in layout && layout[r][c] === "#" ? count + 1 : count;
  }, 0);
}

function findOccupiedSeatCount(layout) {
  let count = 0;
  for (const row of layout) {
    for (const position of row) {
      if (position === "#") {
        count++;
      }
    }
  }
  return count;
}
