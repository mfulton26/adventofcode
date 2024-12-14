import md5 from "@lib/md5.ts";

export default function solve(input: string) {
  const password = Array(8).fill("_");
  let integer = 0;
  while (password.some((char) => char === "_")) {
    let hash;
    do hash = md5(`${input}${integer++}`); while (!hash.startsWith("00000"));
    const position = parseInt(hash[5], 16);
    if (password[position] !== "_") continue;
    password[position] = hash[6];
  }
  return password.join("");
}
