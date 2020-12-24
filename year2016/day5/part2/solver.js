import md5 from "../../../crypto/md5.js";

export function solve(input) {
  const password = Array(8).fill("_");
  let integer = 0;
  while (password.some((char) => char === "_")) {
    let hashHexString;
    do {
      const hashValue = md5(`${input}${integer++}`);
      hashHexString = hashValue.toString(16);
    } while (!hashHexString.startsWith("00000"));
    const position = hashHexString[5];
    if (password[position] === "_") {
      password[position] = hashHexString[6];
    }
  }
  return password.join("");
}
