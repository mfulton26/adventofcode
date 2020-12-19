export function solve(input) {
  let position = 0;
  let floor = 0;
  for (const direction of input) {
    position++;
    switch (direction) {
      case "(":
        floor++;
        break;
      case ")":
        floor--;
        break;
    }
    if (floor < 0) {
      return position;
    }
  }
  return floor;
}
