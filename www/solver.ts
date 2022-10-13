import prettyMs from "https://cdn.skypack.dev/pretty-ms?dts";

import { formatAnswer, getSolveFn, prettyMsOptions } from "../lib/harness.ts";

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
    const start = performance.now();
    let end: number;
    try {
      const answer = solve(input);
      end = performance.now();
      const formattedAnswer = formatAnswer(answer, { dotLetterParsing });
      if (
        typeof formattedAnswer === "string" && /[\n\r]/.test(formattedAnswer)
      ) {
        console.group("answer");
        console.log(formattedAnswer);
        console.groupEnd();
      } else {
        console.log("answer:", formattedAnswer);
      }
    } catch (error) {
      end = performance.now();
      console.error(error);
    } finally {
      const duration = end! - start;
      console.log("duration:", prettyMs(duration, prettyMsOptions));
    }
  } catch (e) {
    console.error(e);
  } finally {
    console.groupEnd();
  }
}
