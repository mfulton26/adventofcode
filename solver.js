/**
 * @param {object} [options]
 * @param {number} [options.part]
 * @returns {Promise<void>}
 */
export async function solve({ part } = {}) {
  const { year, day } = parsePathname(location.pathname);
  const parts = part !== undefined ? [part] : day === 25 ? [1] : [1, 2];
  const input = await getInput(year, day);
  for (const part of parts) {
    await solvePart(year, day, part, input);
  }
}

/**
 * @param {string} pathname
 * @returns {{ year: number; day: number }}
 */
export function parsePathname(pathname) {
  const match = /\/(?<year>\d+)\/day\/(?<day>\d+)/.exec(pathname);
  if (!match || !match.groups) {
    throw new Error(
      "current document is not recognized as a puzzle page or input page"
    );
  }
  return { year: Number(match.groups.year), day: Number(match.groups.day) };
}

/**
 * @param {number} year
 * @param {number} day
 * @returns {Promise<string>}
 */
async function getInput(year, day) {
  const rawInput = await getRawInput(year, day);
  return rawInput.replace(/\n$/m, "");
}

/**
 * @param {number} year
 * @param {number} day
 * @returns {Promise<string>}
 */
async function getRawInput(year, day) {
  const pathname = `/${year}/day/${day}/input`;
  return location.pathname === pathname
    ? document.body.innerText
    : fetch(pathname).then((response) => response.text());
}

/**
 * @param {number} year
 * @param {number} day
 * @param {number} part
 * @param {string} input
 * @returns {Promise<void>}
 */
export async function solvePart(year, day, part, input) {
  console.group(`Part ${part}`);
  try {
    const { solve } = await getSolver(year, day, part);
    if (solve) {
      console.time("duartion");
      try {
        console.log("answer:", solve(input));
      } catch (error) {
        console.error(error);
      } finally {
        console.timeEnd("duartion");
      }
    } else {
      console.info(undefined);
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
 * @returns {Promise<{ solve: (input: string) => any}>}
 * @throws
 */
export async function getSolver(year, day, part) {
  try {
    const url = new URL(
      `year=${year}/day=${day}/part=${part}/solver.js`,
      import.meta.url
    ).toString();
    return await import(url);
  } catch (error) {
    throw new TypeError("solver not found; you lose!");
  }
}
