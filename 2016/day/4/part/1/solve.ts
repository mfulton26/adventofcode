export default function solve(input: string) {
  return parseRooms(input)
    .filter(isRealRoom)
    .reduce((sum, { sectorId }) => sum + sectorId, 0);
}

function parseRooms(text: string) {
  return text.split("\n").map((line) => {
    const { encryptedName, sectorId, checksum } = line.match(
      /^(?<encryptedName>.*)-(?<sectorId>\d+)\[(?<checksum>.*)\]$/,
    )!.groups!;
    return { encryptedName, sectorId: Number(sectorId), checksum };
  });
}

function isRealRoom(
  { encryptedName, checksum }: { encryptedName: string; checksum: string },
) {
  const letterCounts = countChars(encryptedName.replaceAll("-", ""));
  const mostCommonLetters = [...letterCounts.keys()].sort((a, b) =>
    letterCounts.get(b)! - letterCounts.get(a)! || a.localeCompare(b)
  );
  return mostCommonLetters.join("").startsWith(checksum);
}

function countChars(string: string) {
  const result = new Map<string, number>();
  for (const char of string) result.set(char, (result.get(char) ?? 0) + 1);
  return result;
}
