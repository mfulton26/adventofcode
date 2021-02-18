export function solve(string) {
  for (let n = 0; n < 2; n++) {
    do {
      string = skipInvalidLetters(incrementString(string));
    } while (!isValidPassword(string));
  }
  return string;
}

export function isValidPassword(string) {
  return isValidPassword.regExp.test(string);
}
isValidPassword.letters = "abcdefghijklmnopqrstuvwxyz";
isValidPassword.regExp = new RegExp(
  `^(?=.*(?:${Array.from(
    { length: isValidPassword.letters.length - 2 },
    (_, k) => isValidPassword.letters.slice(k, k + 3)
  ).join("|")}).*)(?!.*[iol].*)(?=.*(.)\\1.*(.)\\2.*).*$`
);

function incrementString(string) {
  return (parseInt(string, 36) + 1).toString(36).replace("0", "a");
}

function skipInvalidLetters(string) {
  return string.replace(skipInvalidLetters.regExp, skipInvalidLetters.replacer);
}
skipInvalidLetters.nextLetters = { i: "j", o: "p", l: "m" };
skipInvalidLetters.regExp = new RegExp(
  `([${Object.keys(skipInvalidLetters.nextLetters).join("")}])(.*)`
);
skipInvalidLetters.replacer = (_, letter, { length: count }) =>
  `${skipInvalidLetters.nextLetters[letter]}${"a".repeat(count)}`;
