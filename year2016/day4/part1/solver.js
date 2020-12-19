const roomRegExp = /^(?<encryptedName>.*)-(?<sectorId>\d+)\[(?<checksum>.*)\]$/;

export function solve(input) {
  const rooms = parseRooms(input);
  const realRooms = rooms.filter(isRealRoom);
  return realRooms.reduce((sum, { sectorId }) => sum + sectorId, 0);
}

function parseRooms(text) {
  return text.split("\n").map((line) => {
    const room = line.match(roomRegExp).groups;
    room.sectorId = Number(room.sectorId);
    return room;
  });
}

function isRealRoom({ encryptedName, checksum }) {
  const letterCounts = countChars(encryptedName.replaceAll("-", ""));
  const mostCommonLetters = Array.from(letterCounts.keys())
    .sort(
      (a, b) => letterCounts.get(b) - letterCounts.get(a) || a.localeCompare(b)
    )
    .join("");
  return mostCommonLetters.startsWith(checksum);
}

function countChars(string) {
  const charCounts = new Map();
  for (const char of string) {
    charCounts.set(char, charCounts.has(char) ? charCounts.get(char) + 1 : 1);
  }
  return charCounts;
}
