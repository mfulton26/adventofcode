const roomRegExp = /^(?<encryptedName>.*)-(?<sectorId>\d+)\[(?<checksum>.*)\]$/;

export function solve(input) {
  const rooms = parseRooms(input);
  const { sectorId } = rooms.find((room) =>
    decryptName(room).startsWith("northpole")
  );
  return sectorId;
}

function parseRooms(text) {
  return text.split("\n").map((line) => {
    const room = line.match(roomRegExp).groups;
    room.sectorId = Number(room.sectorId);
    return room;
  });
}

const letterCharCodeOffset = "a".charCodeAt(0);

export function decryptName({ encryptedName, sectorId }) {
  function rotateLetter(letter) {
    const encrypted = letter.charCodeAt(0) - letterCharCodeOffset;
    const decrypted = (encrypted + sectorId) % 26;
    return String.fromCharCode(decrypted + letterCharCodeOffset);
  }
  return Array.from(encryptedName)
    .map((char) => (char === "-" ? " " : rotateLetter(char)))
    .join("");
}
