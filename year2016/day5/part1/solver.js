import md5 from "../../../crypto/md5.js";

export function solve(input) {
  const password = Array(8);
  let integer = 0;
  for (let i = 0; i < password.length; i++) {
    let hashHexString;
    do {
      const hashValue = md5(`${input}${integer++}`);
      hashHexString = hashValue.toString(16);
    } while (!hashHexString.startsWith("00000"));
    password[i] = hashHexString[5];
  }
  return password.join("");
}
