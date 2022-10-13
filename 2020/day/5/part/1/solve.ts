export default function solve(input: string) {
  const seatIds = input.split("\n").map(toSeatId);
  return Math.max(...seatIds);
}

export function toSeatId(boardingPass: string) {
  const bits = boardingPass.replace(/F|L/g, "0").replace(/B|R/g, "1");
  const row = parseInt(bits.substring(0, 7), 2);
  const column = parseInt(bits.substring(7), 2);
  return row * 8 + column;
}
