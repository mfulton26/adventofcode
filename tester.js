import { getSolver, parsePathname } from "./solver.js";
import { indexIterable } from "./iterables/indexer.js";

const Status = {
  PASSED: {
    name: "passed",
    circle: "🟢",
  },
  FAILED: {
    name: "failed",
    circle: "🔴",
  },
  ERRED: {
    name: "erred",
    circle: "🟡",
  },
};

/**
 * @param {object} [options]
 * @param {number} [options.part]
 * @returns {Promise<void>}
 */
export async function test({ part } = {}) {
  const { year, day } = parsePathname(location.pathname);
  console.group(`Year ${year} Day ${day}`);
  console.time("elapsed");
  const results = [];
  try {
    const parts = part !== undefined ? [part] : day === 25 ? [1] : [1, 2];
    for (const part of parts) {
      console.group(`Part ${part}`);
      try {
        for await (const result of testPart(year, day, part)) {
          if (result.end === undefined) {
            console.group(result.name);
          } else {
            results.push(result);
            const { status, reason } = result;
            console.info("status:", status.name, status.circle);
            console[status === Status.ERRED ? "error" : "info"](
              "reason:",
              ...reason
            );
            console.info(
              "elapsed:",
              `${result.elapsed.toLocaleString(undefined, {
                minimumFractionDigits: 6,
              })}ms`
            );
            console.groupEnd();
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.groupEnd();
      }
    }
    console.group("Test Summary");
    const resultsByStatus = indexIterable(results, ({ status }) => status);
    for (const status of Object.values(Status)) {
      const count = resultsByStatus.get(status)?.length;
      if (count) {
        console.log(status.circle, count, "of", results.length, status.name);
      }
    }
    console.groupEnd();
  } finally {
    console.timeEnd("elapsed");
    console.groupEnd();
  }
}

/**
 * @typedef {object} TestResult
 * @property {string} name
 * @property {{name: string; circle: string }} status
 * @property {any[]} reason
 * @property {number} start
 * @property {number} end
 * @property {number} elapsed
 */

/**
 * @param {number} year
 * @param {number} day
 * @param {number} part
 * @returns {AsyncGenerator<{
 *   name: string;
 *   status?: never;
 *   reason?: never;
 *   start?: never;
 *   end?: never;
 *   elapsed?: never;
 * } | {
 *   name: string;
 *   status: {
 *       name: string;
 *       circle: string;
 *   };
 *   reason: any[] | [Error];
 *   start: number;
 *   end: number;
 *   elapsed: number;
 * }>}
 */
export async function* testPart(year, day, part) {
  /** @type {Array<{name?: string; input: string; expected: any}>} */
  const testCases = await getTestCases(year, day, part);
  const { solve } = await getSolver(year, day, part);
  for (const { input, name = input, expected } of testCases) {
    yield { name };
    const start = performance.now();
    try {
      const actual = solve(input);
      const end = performance.now();
      const elapsed = end - start;
      if (actual === expected) {
        yield {
          name,
          status: Status.PASSED,
          reason: ["expected", expected, "and got", actual],
          start,
          end,
          elapsed,
        };
      } else {
        yield {
          name,
          status: Status.FAILED,
          reason: ["expected", expected, "but got", actual],
          start,
          end,
          elapsed,
        };
      }
    } catch (error) {
      const end = performance.now();
      const elapsed = end - start;
      yield {
        name,
        status: Status.ERRED,
        reason: [error],
        start,
        end,
        elapsed,
      };
    }
  }
}

/**
 * @param {number} year
 * @param {number} day
 * @param {number} part
 */
export async function getTester(year, day, part) {
  const url = new URL(
    `year=${year}/day=${day}/part=${part}/solver.tester.js`,
    import.meta.url
  ).toString();
  return import(url);
}

/**
 * @param {number} year
 * @param {number} day
 * @param {number} part
 */
export async function getTestCases(year, day, part) {
  const url = new URL(
    `year=${year}/day=${day}/part=${part}/testCases.json`,
    import.meta.url
  ).toString();
  const response = await fetch(url);
  if (response.status === 404) {
    throw new Error("test cases not found; you lose badly!");
  }
  return response.json();
}
