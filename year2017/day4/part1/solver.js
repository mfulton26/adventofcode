export function solve(input) {
  const passphrases = input.split("\n");
  return passphrases.filter(isValid).length;
}

function isValid(passphrase) {
  const words = passphrase.split(" ");
  const uniqueWords = new Set(words);
  return words.length === uniqueWords.size;
}
