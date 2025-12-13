import DotLetters from "@lib/DotLetters.ts";

export async function getSolveFn(moduleName: string) {
  try {
    const { default: solve } = await import(moduleName);
    if (typeof solve !== "function") return;
    return solve as (input: string) => unknown | PromiseLike<unknown>;
  } catch (e) {
    console.warn(e);
    return;
  }
}

export function formatAnswer(
  answer: unknown,
  { dotLetterParsing = true } = {},
) {
  const shouldParseAsDotLetters = dotLetterParsing &&
    typeof answer === "string" && formatAnswer.lettersOutputRegExp.test(answer);
  return shouldParseAsDotLetters ? DotLetters.parse(answer) : answer;
}
formatAnswer.lettersOutputRegExp =
  /^[.#\n]+(?<=\.[\s\S]*)(?<=#[\s\S]*)(?<=\n[\s\S]*)|[01\n]+(?<=0[\s\S]*)(?<=1[\s\S]*)(?<=\n[\s\S]*)$/m;
