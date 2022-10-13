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
            case 4:
            case 5:
            case 9:
              continue;
            case 3:
              key = 1;
              continue;
            case 13:
              key = 11;
              continue;
            default:
              key -= 4;
              continue;
          }
          break;
        case "D":
          switch (key) {
            case 5:
            case 9:
            case 10:
            case 12:
            case 13:
              continue;
            case 11:
              key = 13;
              continue;
            case 1:
              key = 3;
              continue;
            default:
              key += 4;
              continue;
          }
          break;
        case "L":
          switch (key) {
            case 1:
            case 2:
            case 5:
            case 10:
            case 13:
              continue;
            default:
              key--;
              continue;
          }
          break;
        case "R":
          switch (key) {
            case 1:
            case 4:
            case 9:
            case 12:
            case 13:
              continue;
            default:
              key++;
              continue;
          }
          break;
      }
    }
    code += key.toString(14).toUpperCase();
  }
  return code;
}
