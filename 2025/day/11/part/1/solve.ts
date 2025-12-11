import { parseDevices } from "../../devices.ts";
import { countPaths } from "../../paths.ts";

export default function solve(input: string) {
  const devices = parseDevices(input);
  return countPaths(devices, "you", "out");
}
