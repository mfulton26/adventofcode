function hash(text: string) {
  let result = 0;
  for (const char of text) {
    result += char.charCodeAt(0);
    result *= 17;
    result %= 256;
  }
  return result;
}

export default function solve(input: string) {
  return input.split(",").map(hash).reduce((sum, value) => sum + value, 0);
}
