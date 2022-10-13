export default function solve(input: string) {
  let floor = 0;
  for (const direction of input) {
    switch (direction) {
      case "(":
        floor++;
        break;
      case ")":
        floor--;
        break;
    }
  }
  return floor;
}
