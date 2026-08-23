export default function solve(input: string) {
  const regExp = /\((?<length>\d+)x(?<repeat>\d+)\)/g;
  let match: RegExpExecArray | null;
  let decompressedOffset = 0;
  while ((match = regExp.exec(input)) !== null) {
    const { [0]: marker, groups = {} } = match;
    const length = +groups.length;
    const repeat = +groups.repeat;
    decompressedOffset +=
      solve(input.substring(regExp.lastIndex, regExp.lastIndex + length)) *
        repeat - length - marker.length;
    regExp.lastIndex += length;
  }
  return input.length + decompressedOffset;
}
