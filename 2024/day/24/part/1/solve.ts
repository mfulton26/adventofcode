import { output, parseInput } from "../../monitoringDevices.ts";

export default function solve(input: string) {
  const { initialWireValues, gateConnections } = parseInput(input);
  return output(initialWireValues, gateConnections);
}
