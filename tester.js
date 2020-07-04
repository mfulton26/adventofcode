import { getSolver, parsePathname } from "./solver.js";
import { indexIterable } from "./iterables/indexer.js";

const Status = {
  Passed: {
    name: "passed",
    circle: "🟢",
  },
  Failed: {
    name: "failed",
    circle: "🔴",
  },
  Erred: {
    name: "erred",
    circle: "🟡",
  },
};

export async function test() {
  const { year, day } = parsePathname(location.pathname);
  console.group(`Year ${year} Day ${day}`);
  console.time("totalDuration");
  try {
    const results = [];
    for await (const result of testPart(year, day, 1)) {
      results.push(result);
    }
    if (day !== 25) {
      for await (const result of testPart(year, day, 2)) {
        results.push(result);
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
    console.timeEnd("totalDuration");
    console.groupEnd();
  }
}

/**
 * @param {number} year
 * @param {number} day
 * @param {number} part
 */
export async function* testPart(year, day, part) {
  console.group(`Part ${part}`);
  try {
    /** @type {Array<{name?: string; input: string; expected: any}>} */
    const testCases = await getTestCases(year, day, part);
    const { solve } = await getSolver(year, day, part);
    for (const { input, name = input, expected } of testCases) {
      console.group(name);
      console.time("duration");
      try {
        const actual = solve(input);
        if (actual === expected) {
          const reason = ["expected", expected, "and got", actual];
          yield { name, status: Status.Passed, reason };
          console.info("status:", "passed 🟢");
          console.info("reason:", ...reason);
        } else {
          const reason = ["expected", expected, "but got", actual];
          yield { name, status: Status.Failed, reason };
          console.info("status:", "failed 🔴");
          console.info("reason:", ...reason);
        }
      } catch (error) {
        yield { name, status: Status.Erred, reason: error };
        console.info("status:", "erred 🟡");
        console.error("reason:", error);
      } finally {
        console.timeEnd("duration");
        console.groupEnd();
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.groupEnd();
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
    `/year=${year}/day=${day}/part=${part}/testCases.json`,
    import.meta.url
  ).toString();
  const response = await fetch(url);
  if (response.status === 404) {
    throw new Error("no tests found; you lose badly!");
  }
  return response.json();
}
