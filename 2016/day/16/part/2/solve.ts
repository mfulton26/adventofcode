export default function solve(disk: string, { length = 35651584 } = {}) {
  while (disk.length < length) {
    const a = disk;
    const b = Array.from(disk, (c) => c === "0" ? "1" : "0").reverse().join("");
    disk = `${a}0${b}`;
  }
  disk = disk.slice(0, length);
  let blockSize = 1;
  while (disk.length % (blockSize * 2) === 0) blockSize *= 2;
  let checksum = "";
  for (let start = 0; start < disk.length; start += blockSize) {
    let ones = 0;
    for (let i = start; i < start + blockSize; i++) {
      ones += disk.charCodeAt(i) - "0".charCodeAt(0);
    }
    checksum += ones % 2 === 0 ? "1" : "0";
  }
  return checksum;
}
