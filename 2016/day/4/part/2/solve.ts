export default function solve(input: string) {
  return parseRooms(input)
    .find((room) => decryptName(room).startsWith("northpole"))!
    .sectorId;
}

function parseRooms(text: string) {
  return text.split("\n").map((line) => {
    const { encryptedName, sectorId, checksum } = line.match(
      /^(?<encryptedName>.*)-(?<sectorId>\d+)\[(?<checksum>.*)\]$/,
    )!.groups!;
    return { encryptedName, sectorId: Number(sectorId), checksum };
  });
}

const letterCharCodeOffset = "a".charCodeAt(0);

export function decryptName(
  { encryptedName, sectorId }: { encryptedName: string; sectorId: number },
) {
  function rotateLetter(letter: string) {
    const encrypted = letter.charCodeAt(0) - letterCharCodeOffset;
    const decrypted = (encrypted + sectorId) % 26;
    return String.fromCharCode(decrypted + letterCharCodeOffset);
  }
  return [...encryptedName]
    .map((char) => (char === "-" ? " " : rotateLetter(char)))
    .join("");
}
