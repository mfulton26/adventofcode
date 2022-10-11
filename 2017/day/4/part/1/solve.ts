export default function solve(input: string) {
  const passphrases = input.split("\n");
  return passphrases.filter(isValid).length;
}

export function isValid(passphrase: string) {
  const words = passphrase.split(" ");
  const uniqueWords = new Set(words);
  return words.length === uniqueWords.size;
}
