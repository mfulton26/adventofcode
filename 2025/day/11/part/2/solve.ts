import { parseDevices } from "../../devices.ts";
import { countPaths } from "../../paths.ts";

export default function solve(input: string) {
  const devices = parseDevices(input);
  const svr2dac = countPaths(devices, "svr", "dac");
  const dac2fft = countPaths(devices, "dac", "fft");
  const fft2out = countPaths(devices, "fft", "out");
  const svr2fft = countPaths(devices, "svr", "fft");
  const fft2dac = countPaths(devices, "fft", "dac");
  const dac2out = countPaths(devices, "dac", "out");
  return svr2dac * dac2fft * fft2out + svr2fft * fft2dac * dac2out;
}
