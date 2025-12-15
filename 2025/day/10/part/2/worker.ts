/// <reference no-default-lib="true" />
/// <reference lib="deno.worker" />

import { init } from "z3-solver";
import { parseManual } from "../../manuals.ts";

async function solve(input: string) {
  const manual = parseManual(input);
  const { Context } = await init();
  const { Int, Optimize } = Context("main");
  let sum = 0;
  for (const { buttons, requirements } of manual) {
    const variables = buttons.map((_, i) => Int.const(`b${i}`));
    const optimize = new Optimize();
    optimize.add(
      ...requirements.map((requirement, lightIndex) =>
        buttons.keys()
          .filter((buttonIndex) => buttons[buttonIndex].includes(lightIndex))
          .map((buttonIndex) => variables[buttonIndex])
          .reduce((a, b) => a.add(b), Int.val(0))
          .eq(Int.val(requirement))
      ),
      ...variables.map((variable) => variable.ge(0)),
    );
    const sumExpression = variables.reduce((a, x) => a.add(x), Int.val(0));
    optimize.minimize(sumExpression);
    if (await optimize.check() !== "sat") throw new Error("No solution found");
    sum += +optimize.model().eval(sumExpression);
  }
  return sum;
}

self.onmessage = async ({ data }) => self.postMessage(await solve(data));
