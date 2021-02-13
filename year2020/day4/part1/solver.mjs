const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

export function solve(input) {
  const passports = input.split("\n\n").map((lines) =>
    Object.fromEntries(
      lines
        .replace(/\n/g, " ")
        .split(" ")
        .map((pair) => pair.split(":"))
    )
  );
  let count = 0;
  for (const passport of passports) {
    if (required.every((key) => key in passport)) {
      count++;
    }
  }
  return count;
}
