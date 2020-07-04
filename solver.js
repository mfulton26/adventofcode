export async function solve() {
  const { year, day } = parsePathname(location.pathname);
  const input = await getInput(year, day);
  await solvePart(year, day, 1, input);
  if (day !== 25) {
    await solvePart(year, day, 2, input);
  }
}

/**
 * @param {string} pathname
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
 */
async function getInput(year, day) {
  const rawInput = await getRawInput(year, day);
  return rawInput.replace(/\n$/m, "");
}

/**
 * @param {number} year
 * @param {number} day
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
