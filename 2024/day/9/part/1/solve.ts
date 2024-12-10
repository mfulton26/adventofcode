export default function solve(input: string) {
  const filesystem: (number | undefined)[] = [];
  for (let id = 0; id < input.length; id++) {
    const fileLength = +input[2 * id];
    const freeSpaceLength = +(input[2 * id + 1] ?? 0);
    for (let n = 0; n < fileLength; n++) filesystem.push(id);
    for (let n = 0; n < freeSpaceLength; n++) filesystem.push(undefined);
  }
  for (
    let id = filesystem.at(-1)!,
      i = filesystem.indexOf(undefined),
      j = filesystem.length - 1;
    j > i;
    id = filesystem[j - 1] === id ? id : id - 1,
      i = filesystem.indexOf(undefined, i),
      j = filesystem.lastIndexOf(id, j)
  ) {
    filesystem[i] = filesystem[j], filesystem[j] = undefined;
  }
  return filesystem.reduce<number>(
    (checksum, id = 0, position) => checksum + position * id,
    0,
  );
}
