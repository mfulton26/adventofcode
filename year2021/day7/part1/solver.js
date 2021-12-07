import { parseHorizontalPositions } from "../horizontalPositionsParser.js";

import ints from "../../../lib/ints.js";
import map from "../../../lib/map.js";
import max from "../../../lib/max.js";
import min from "../../../lib/min.js";
import sumBy from "../../../lib/sumBy.js";

export function solve(input) {
  const positions = parseHorizontalPositions(input);
  return ints({ first: positions[min](), last: positions[max]() })
    [map]((n) => positions[sumBy]((position) => Math.abs(position - n)))
    [min]();
}
