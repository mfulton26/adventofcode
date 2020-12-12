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
        const occupiedSeatCount = findVisibleOccupiedSeatCount(layout, index);
        switch (position) {
          case "L":
            if (occupiedSeatCount === 0) {
              changed = true;
              return "#";
            }
            break;
          case "#":
            if (occupiedSeatCount >= 5) {
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

function findVisibleOccupiedSeatCount(layout, [rowIndex, columnIndex]) {
  return seatDirections.reduce((count, [dr, dc]) => {
    for (
      let r = rowIndex + dr, c = columnIndex + dc;
      r in layout && c in layout[r];
      r += dr, c += dc
    ) {
      switch (layout[r][c]) {
        case "#":
          return count + 1;
        case "L":
          return count;
      }
    }
    return count;
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
