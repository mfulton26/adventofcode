export default function solve(input: string) {
  for (
    let start = 0, end = 14;
    end < input.length;
    start++, end++
  ) {
    const characters = input.substring(start, end);
    const uniqueCharacters = new Set(characters);
    if (uniqueCharacters.size < characters.length) continue;
    return end;
  }
}
