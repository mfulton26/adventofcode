import { parseConnections } from "../connectionsParser.js";

import Signals from "../Signals.js";

export function solve(input) {
  const connections = parseConnections(input);
  const signals = new Signals(connections);
  return signals.get("a");
}

export function solveAll(input) {
  const connections = parseConnections(input);
  const signals = new Signals(connections);
  return Object.fromEntries(
    Array.from(connections.keys())
      .sort()
      .map((key) => [key, signals.get(key)])
  );
}
