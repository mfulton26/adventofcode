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
            case 4:
            case 5:
            case 9:
              break;
            case 3:
              key = 1;
              break;
            case 13:
              key = 11;
              break;
            default:
              key -= 4;
          }
          break;
        case "D":
          switch (key) {
            case 5:
            case 9:
            case 10:
            case 12:
            case 13:
              break;
            case 11:
              key = 13;
              break;
            case 1:
              key = 3;
              break;
            default:
              key += 4;
          }
          break;
        case "L":
          switch (key) {
            case 1:
            case 2:
            case 5:
            case 10:
            case 13:
              break;
            default:
              key--;
          }
          break;
        case "R":
          switch (key) {
            case 1:
            case 4:
            case 9:
            case 12:
            case 13:
              break;
            default:
              key++;
          }
          break;
      }
    }
    codeBuilder.push(key.toString(14).toUpperCase());
  }
  return codeBuilder.join("");
}
