export default function solve(input: string) {
  const passphrases = input.split("\n");
  return passphrases.filter(isValid).length;
}

export function isValid(passphrase: string) {
  const words = passphrase.split(" ");
  const uniqueSortedWords = new Set(
    words.map((word) => Array.from(word).sort().join("")),
  );
  return words.length === uniqueSortedWords.size;
}
