import { formatAnswer, getSolveFn } from "../lib/harness.ts";

declare let document: { body: { innerText: string } };

const pageURLPattern = new URLPattern({ pathname: "/:year/day/:day/*?" });

export async function solve(
  { part, dotLetterParsing = true }: {
    part?: string | number;
    dotLetterParsing?: boolean;
  } = {},
) {
  const result = pageURLPattern.exec(location);
  if (!result) {
    throw new Error(
      "current document is not recognized as a puzzle page or input page",
    );
  }
  const { pathname: { groups: { year, day } } } = result;
  const parts = part ? [`${part}`] : day === "25" ? ["1"] : ["1", "2"];
  const input = await getInput(year, day);
  for (const part of parts) {
    await solvePart(year, day, part, input, { dotLetterParsing });
  }
}

async function getInput(year: string, day: string) {
  const rawInput = await getRawInput(year, day);
  return rawInput.replaceAll(/^\n|\n$/g, "");
}

async function getRawInput(year: string, day: string) {
  const pathname = `/${year}/day/${day}/input`;
  return location.pathname === pathname
    ? document.body.innerText
    : await fetch(pathname).then((response) => response.text());
}

async function solvePart(
  year: string,
  day: string,
  part: string,
  input: string,
  { dotLetterParsing = true } = {},
) {
  const moduleName = new URL(
    `./${year}/day/${day}/part/${part}/solve.js`,
    import.meta.url,
  ).toString();
  console.group(`Part ${part}`);
  try {
    const solve = await getSolveFn(moduleName);
    if (solve === undefined) {
      console.log(`no default exported function found in ${moduleName}`);
      return;
    }
    console.time("duration");
    try {
      const answer = solve(input);
      console.log("answer:", formatAnswer(answer, { dotLetterParsing }));
    } catch (e) {
      console.error(e);
    } finally {
      console.timeEnd("duration");
    }
  } catch (e) {
    console.error(e);
  } finally {
    console.groupEnd();
  }
}
