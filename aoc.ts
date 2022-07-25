import { parse } from "std/flags/mod.ts";
import { dirname, join } from "std/path/mod.ts";

declare global {
  interface NumberConstructor {
    isSafeInteger(number: unknown): number is number;
  }
}

const defaultBaseUrl = "https://adventofcode.com";

if (import.meta.main) {
  const { _: [command, year, day, part], time } = parse(Deno.args, {
    boolean: ["time"],
  });

  if (command !== "solve") {
    console.log(`USAGE:
    aoc <SUBCOMMAND>

SUBCOMMANDS:
    solve
            Solve puzzles

ENVIRONMENT VARIABLES:
    AOC_BASE_URL    Default to ${defaultBaseUrl}
    AOC_CACHE_DIR   Set the cache directory
                    Defaults to ~/.aoc
    AOC_CONFIG_DIR  Set the config directory
                    Defaults to ~/.aoc/cache
    AOC_SESSION     The session value to send in cookies for authentication
                    Will be read from $AOC_CONFIG_DIR/session if not specified`);

    Deno.exit(1);
  }

  if (
    !(
      command === "solve" &&
      Number.isSafeInteger(year) &&
      Number.isSafeInteger(day) &&
      (part === undefined || part === 1 || part === 2)
    )
  ) {
    console.log(`USAGE:
    aoc solve [OPTIONS] <year> <day> [<part>]

OPTIONS:
    --time
            Print time it takes to solve
ARGS:
    <year>
            The event year
    <day>
            The puzzle day
    [<part>]
            Part 1 or 2 of the puzzle`);

    Deno.exit(1);
  }

  const session = await getSession();
  const cachePath = Deno.env.get("AOC_CACHE_DIR") ??
    join(Deno.env.get("HOME")!, ".aoc", "cache");

  const parts: number[] = part === undefined ? [1, 2] : [part];

  const input = await getInput(year, day, session, cachePath);
  for (const part of parts) {
    const moduleName = `./${year}/day/${day}/part/${part}/solve.ts`;
    try {
      const { default: solve } = await import(moduleName);
      const start = performance.now();
      const answer = solve(input);
      const end = performance.now();
      console.log(answer);
      if (time) {
        console.error("time:", (end - start).toFixed(3), "ms");
      }
    } catch (e) {
      console.error(e);
    }
  }
}

async function getSession() {
  const result = Deno.env.get("AOC_SESSION");
  if (result !== undefined) return result;
  const configPath = Deno.env.get("AOC_CONFIG_DIR") ??
    join(Deno.env.get("HOME")!, ".aoc");
  const sessionPath = join(configPath, "session");
  try {
    return await Deno.readTextFile(sessionPath);
  } catch {
    const result = prompt("session cookie value:");
    if (result === null) {
      console.error(
        "A session cookie value is required for downloading puzzle inputs.",
      );
      Deno.exit(1);
    }
    await Deno.mkdir(configPath, { recursive: true });
    await Deno.writeTextFile(sessionPath, result);
    return result;
  }
}

async function getInput(
  year: number,
  day: number,
  session: string,
  cachePath: string,
) {
  const inputPathname = `${year}/day/${day}/input`;
  const inputCachePath = join(cachePath, session, inputPathname);
  try {
    return await Deno.readTextFile(inputCachePath);
  } catch {
    const response = await fetch(
      new URL(inputPathname, Deno.env.get("AOC_BASE_URL") ?? defaultBaseUrl),
      { headers: { cookie: `session=${session}` } },
    );
    const result = await response.text();
    if (!response.ok) throw new Error(result);
    try {
      await Deno.mkdir(dirname(inputCachePath), { recursive: true });
      await Deno.writeTextFile(inputCachePath, result);
    } catch (e) {
      console.warn("failed to cache input", e);
    }
    return result;
  }
}
