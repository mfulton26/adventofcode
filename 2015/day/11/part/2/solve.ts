export default function solve(input: string) {
  return nextPassword(nextPassword(input));
}

function nextPassword(string: string) {
  do {
    string = skipInvalidLetters(incrementString(string));
  } while (!isValidPassword(string));
  return string;
}

export function isValidPassword(string: string) {
  return isValidPassword.regExp.test(string);
}
isValidPassword.letters = "abcdefghijklmnopqrstuvwxyz";
isValidPassword.regExp = new RegExp(
  `^(?=.*(?:${
    Array.from({ length: isValidPassword.letters.length - 2 }, (_, k) =>
      isValidPassword.letters.slice(k, k + 3)).join("|")
  }).*)(?!.*[iol].*)(?=.*(.)\\1.*(.)\\2.*).*$`,
);

function incrementString(string: string) {
  return (parseInt(string, 36) + 1).toString(36).replace("0", "a");
}

function skipInvalidLetters(string: string) {
  return string.replace(skipInvalidLetters.regExp, skipInvalidLetters.replacer);
}
skipInvalidLetters.nextLetters = { i: "j", o: "p", l: "m" } as const;
skipInvalidLetters.regExp = new RegExp(
  `([${Object.keys(skipInvalidLetters.nextLetters).join("")}])(.*)`,
);
skipInvalidLetters.replacer = (
  _: string,
  letter: "i" | "o" | "l",
  { length: count }: string,
) => `${skipInvalidLetters.nextLetters[letter]}${"a".repeat(count)}`;
