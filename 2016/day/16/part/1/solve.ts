export default function solve(disk: string, { length = 272 } = {}) {
  while (disk.length < length) {
    const a = disk;
    const b = Array.from(disk, (c) => c === "0" ? "1" : "0").reverse().join("");
    disk = `${a}0${b}`;
  }
  disk = disk.slice(0, length);
  let checksum = disk;
  do {
    const data = checksum;
    checksum = "";
    for (let i = 0, j = 1; j < data.length; i += 2, j += 2) {
      checksum += +(data[i] === data[j]);
    }
  } while (checksum.length % 2 === 0);
  return checksum;
}
