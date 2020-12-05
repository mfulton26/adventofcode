export function solve(input) {
  const codeBuilder = [];
  let key = 5;
  for (const line of input.split("\n")) {
    for (const char of line) {
      switch (char) {
        case "U":
          switch (key) {
            case 1:
            case 2:
            case 3:
              break;
            default:
              key -= 3;
          }
          break;
        case "D":
          switch (key) {
            case 7:
            case 8:
            case 9:
              break;
            default:
              key += 3;
          }
          break;
        case "L":
          switch (key) {
            case 1:
            case 4:
            case 7:
              break;
            default:
              key--;
          }
          break;
        case "R":
          switch (key) {
            case 3:
            case 6:
            case 9:
              break;
            default:
              key++;
          }
          break;
      }
    }
    codeBuilder.push(key);
  }
  return codeBuilder.join("");
}
