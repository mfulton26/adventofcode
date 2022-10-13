const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

export default function solve(input: string) {
  const passports = input.split("\n\n").map((lines) =>
    Object.fromEntries(
      lines.replace(/\n/g, " ").split(" ").map((pair) => pair.split(":")),
    ) as Record<string, string>
  );
  let count = 0;
  for (const passport of passports) {
    if (!required.every((key) => key in passport)) continue;
    if (!isValidYear(passport.byr, { min: "1920", max: "2002" })) continue;
    if (!isValidYear(passport.iyr, { min: "2010", max: "2020" })) continue;
    if (!isValidYear(passport.eyr, { min: "2020", max: "2030" })) continue;
    if (!isValidHeight(passport.hgt)) continue;
    if (!isValidHairColor(passport.hcl)) continue;
    if (!isValidEyeColor(passport.ecl)) continue;
    if (!isValidPassportId(passport.pid)) continue;
    count++;
  }
  return count;
}

function isValidYear(year: string, { min, max }: { min: string; max: string }) {
  return year.length === 4 && year >= min && year <= max;
}

function isValidHeight(height: string) {
  const [, amountText, unit] = height.match(/^(\d+)(cm|in)$/) ?? [];
  if (!amountText) return false;
  const amount = Number(amountText);
  return unit === "cm"
    ? amount >= 150 && amount <= 193
    : amount >= 59 && amount <= 76;
}

function isValidHairColor(color: string) {
  return /^#[0-9a-f]{6}$/.test(color);
}

function isValidEyeColor(color: string) {
  switch (color) {
    case "amb":
    case "blu":
    case "brn":
    case "gry":
    case "grn":
    case "hzl":
    case "oth":
      return true;
    default:
      return false;
  }
}

function isValidPassportId(pid: string) {
  return /^\d{9}$/.test(pid);
}
