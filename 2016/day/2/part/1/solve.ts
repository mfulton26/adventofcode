export default function solve(input: string) {
  let code = "";
  let key = 5;
  for (const line of input.split("\n")) {
    for (const char of line) {
      switch (char) {
        case "U":
          switch (key) {
            case 1:
            case 2:
            case 3:
              continue;
            default:
              key -= 3;
              continue;
          }
          break;
        case "D":
          switch (key) {
            case 7:
            case 8:
            case 9:
              continue;
            default:
              key += 3;
              continue;
          }
          break;
        case "L":
          switch (key) {
            case 1:
            case 4:
            case 7:
              continue;
            default:
              key--;
              continue;
          }
          break;
        case "R":
          switch (key) {
            case 3:
            case 6:
            case 9:
              continue;
            default:
              key++;
              continue;
          }
          break;
      }
    }
    code += key;
  }
  return code;
}
