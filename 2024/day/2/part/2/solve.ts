import { parseReports } from "../../reports.ts";

export default function solve(input: string) {
  return parseReports(input).filter(isSafe).length;
}

function isSafe(levels: number[]) {
  if (isSafeWithoutRemovingAnyLevel(levels)) return true;
  for (let i = 0; i < levels.length; i++) {
    if (isSafeWithoutRemovingAnyLevel(levels.toSpliced(i, 1))) return true;
  }
  return false;
}

function isSafeWithoutRemovingAnyLevel(levels: number[]) {
  const direction = Math.sign(levels[1] - levels[0]);
  for (let i = 0, j = 1; j < levels.length; i++, j++) {
    const diff = levels[j] - levels[i];
    if (Math.sign(diff) !== direction || Math.abs(diff) > 3) return false;
  }
  return true;
}
