import { parseConnections } from "../connectionsParser.js";

import Signals from "../Signals.js";

export function solve(input) {
  const connections = parseConnections(input);
  const signals = new Signals(connections);
  const signal = signals.get("a");
  connections.set("b", () => signal);
  signals.reset();
  return signals.get("a");
}
