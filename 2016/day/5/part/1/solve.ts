import md5 from "helpers/md5.ts";

export default function solve(input: string) {
  let password = "";
  let integer = 0;
  for (let i = 0; i < 8; i++) {
    let hash;
    do hash = md5(`${input}${integer++}`); while (!hash.startsWith("00000"));
    password += hash[5];
  }
  return password;
}
