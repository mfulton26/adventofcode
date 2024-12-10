export default function solve(input: string) {
  const filesystem: (number | undefined)[] = [];
  const freeSpaces: { k: number; length: number }[] = [];
  for (let id = 0; id < input.length; id++) {
    const fileLength = +input[2 * id];
    const freeSpaceLength = +(input[2 * id + 1] ?? 0);
    for (let n = 0; n < fileLength; n++) filesystem.push(id);
    freeSpaces.push({ k: filesystem.length, length: freeSpaceLength });
    for (let n = 0; n < freeSpaceLength; n++) filesystem.push(undefined);
  }
  for (
    let id = filesystem.at(-1)!,
      length = +input[2 * id],
      i = filesystem.indexOf(undefined),
      j = filesystem.length - length;
    id >= 0;
    id--,
      length = +input[2 * id],
      i = filesystem.indexOf(undefined, i - 1),
      j = filesystem.lastIndexOf(id, j) - length + 1
  ) {
    const freeSpaceIndex = freeSpaces
      .findIndex((freeSpace) => freeSpace.k < j && freeSpace.length >= length);
    if (freeSpaceIndex === -1) continue;
    const freeSpace = freeSpaces[freeSpaceIndex];
    filesystem.copyWithin(freeSpace.k, j, j + length);
    filesystem.fill(undefined, j, j + length);
    if (freeSpace.length === length) freeSpaces.splice(freeSpaceIndex, 1);
    else freeSpace.k += length, freeSpace.length -= length;
  }
  return filesystem.reduce<number>(
    (checksum, id = 0, position) => checksum + position * id,
    0,
  );
}
