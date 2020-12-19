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
    if (
      required.every((key) => key in passport) &&
      isValidYear(passport.byr, {
        min: "1920",
        max: "2002",
      }) &&
      isValidYear(passport.iyr, {
        min: "2010",
        max: "2020",
      }) &&
      isValidYear(passport.eyr, {
        min: "2020",
        max: "2030",
      }) &&
      isValidHeight(passport.hgt) &&
      isValidHairColor(passport.hcl) &&
      isValidEyeColor(passport.ecl) &&
      isValidPassportId(passport.pid)
    ) {
      count++;
    }
  }
  return count;
}

function isValidYear(year, { min, max }) {
  return year.length === 4 && year >= min && year <= max;
}

function isValidHeight(height) {
  let [, amount, unit] = height.match(/^(\d+)(cm|in)$/) ?? [];
  if (!amount) {
    return false;
  }
  amount = Number(amount);
  return unit === "cm"
    ? amount >= 150 && amount <= 193
    : amount >= 59 && amount <= 76;
}

function isValidHairColor(color) {
  return /^#[0-9a-f]{6}$/.test(color);
}

function isValidEyeColor(color) {
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

function isValidPassportId(pid) {
  return /^\d{9}$/.test(pid);
}
