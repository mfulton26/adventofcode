import groupBy from "../../../lib/groupBy.js";
import isSubsetOf from "../../../lib/isSubsetOf.js";
import isSupersetOf from "../../../lib/isSupersetOf.js";
import pipe from "../../../lib/pipe.js";
import single from "../../../lib/single.js";
import sumBy from "../../../lib/sumBy.js";
import toInt from "../../../lib/toInt.js";

export function solve(input) {
  return parseNotes(input)[sumBy](([patterns, outputValuePatterns]) =>
    identifyDigitPatterns(patterns)[pipe]((digitPatterns) =>
      outputValuePatterns
        .map((outputValuePattern) =>
          digitPatterns.findIndex(
            (digitPattern) =>
              digitPattern[isSubsetOf](outputValuePattern) &&
              digitPattern[isSupersetOf](outputValuePattern)
          )
        )
        .join("")
        [toInt]()
    )
  );
}

function parseNotes(text) {
  return text
    .split("\n")
    .map((line) =>
      line
        .split(" | ")
        .map((words) => words.split(" ").map((pattern) => new Set(pattern)))
    );
}

function identifyDigitPatterns(patterns) {
  const digits = Array(10);
  const patternsByLength = patterns[groupBy]((pattern) => pattern.size);
  digits[1] = patternsByLength.get(2)[single]();
  digits[7] = patternsByLength.get(3)[single]();
  digits[4] = patternsByLength.get(4)[single]();
  digits[8] = patternsByLength.get(7)[single]();
  const fiveSided = patternsByLength.get(5);
  const sixSided = patternsByLength.get(6);
  digits[3] = fiveSided[single]((pattern) => pattern[isSupersetOf](digits[1]));
  digits[6] = sixSided[single]((pattern) => !pattern[isSupersetOf](digits[1]));
  digits[9] = sixSided[single]((pattern) => pattern[isSupersetOf](digits[3]));
  digits[0] = sixSided[single]((pattern) => !digits.includes(pattern));
  digits[5] = fiveSided[single]((pattern) => pattern[isSubsetOf](digits[6]));
  digits[2] = fiveSided[single]((pattern) => !digits.includes(pattern));
  return digits;
}
