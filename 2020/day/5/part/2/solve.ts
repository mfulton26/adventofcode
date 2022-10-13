export default function solve(input: string) {
  const seatIds = new Set(input.split("\n").map(toSeatId));
  for (let seatId = 0; seatId < 1024; seatId++) {
    if (seatIds.has(seatId)) continue;
    if (!seatIds.has(seatId - 1) || !seatIds.has(seatId + 1)) continue;
    return seatId;
  }
}

export function toSeatId(boardingPass: string) {
  const bits = boardingPass.replace(/F|L/g, "0").replace(/B|R/g, "1");
  const row = parseInt(bits.substring(0, 7), 2);
  const column = parseInt(bits.substring(7), 2);
  return row * 8 + column;
}
