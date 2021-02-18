export function solve(input) {
  const passphrases = input.split("\n");
  return passphrases.filter(isValid).length;
}

function isValid(passphrase) {
  const words = passphrase.split(" ");
  const uniqueSortedWords = new Set(
    words.map((word) => Array.from(word).sort().join(""))
  );
  return words.length === uniqueSortedWords.size;
}
