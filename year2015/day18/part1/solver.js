export function solve(input, { steps = 100 } = {}) {
  let lights = Lights.parse(input);
  for (let i = 0; i < steps; i++) {
    lights = animate(lights);
  }
  let count = 0;
  for (const row of lights) for (const value of row) if (value) count++;
  return count;
}

const Lights = {
  parse: (input) =>
    input
      .split("\n")
      .map((line) => Array.from(line).map((value) => value === "#")),
  stringify: (lights) =>
    lights
      .map((row) => row.map((value) => (value ? "#" : ".")).join(""))
      .join("\n"),
};

function animate(lights) {
  return lights.map((row, rowIndex) =>
    row.map((value, columnIndex) => {
      const neighborsOnCount = countNeighborsOn(lights, rowIndex, columnIndex);
      return (value && neighborsOnCount === 2) || neighborsOnCount === 3;
    })
  );
}

function countNeighborsOn(lights, rowIndex, columnIndex) {
  let count = 0;
  for (const [rowOffset, columnOffset] of countNeighborsOn.neighborDeltas) {
    if (lights[rowIndex + rowOffset]?.[columnIndex + columnOffset]) {
      count++;
    }
  }
  return count;
}
countNeighborsOn.neighborDeltas = [-1, 0, 1]
  .flatMap((x, _, array) => array.map((y) => [x, y]))
  .filter((cell) => cell.some((coordinate) => coordinate !== 0));
