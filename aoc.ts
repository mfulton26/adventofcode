import { parse } from "std/flags/mod.ts";
import { dirname, join } from "std/path/mod.ts";
import { walk } from "std/fs/mod.ts";

declare global {
  interface NumberConstructor {
    isSafeInteger(number: unknown): number is number;
  }
}

const defaultBaseUrl = "https://adventofcode.com";

if (import.meta.main) {
  const { _: [command, ...args], h, help, t, time } = parse(Deno.args, {
    boolean: ["h", "help", "t", "time"],
  });

  if (h || help) {
    console.log(getHelp(command));
    Deno.exit(0);
  }

  switch (command) {
    case "solve":
      solve(args.length ? args.map(String) : ["."], { time: t || time });
      break;
    default:
      console.error(`Unrecognized subcommand: ${command}\n\n${getHelp()}`);
      Deno.exit(1);
  }
}

function getHelp(command?: string | number) {
  switch (command) {
    case "solve":
      return `USAGE:
    aoc solve [OPTIONS] [files]...

ARGS:
    <files>...
            List of file names to run

OPTIONS:
    -h, --help
            Print help information

    -t, --time
            Print time it takes to solve`;
    default:
      return `USAGE:
    aoc <SUBCOMMAND>
  
OPTIONS:
    -h, --help
            Print help information

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
                    Will be read from $AOC_CONFIG_DIR/session if not specified`;
  }
}

async function solve(paths: string[], { time }: { time: boolean }) {
  const session = await getSession();
  const cachePath = Deno.env.get("AOC_CACHE_DIR") ??
    join(Deno.env.get("HOME")!, ".aoc", "cache");

  for (const path of paths) {
    for await (
      const entry of walk(path, {
        includeDirs: false,
        match: [/solve\.(js|ts)$/],
      })
    ) {
      const match = /(?<year>\d{4})\D+(?<day>\d{1,2})/.exec(entry.path);
      if (match?.groups === undefined) continue;
      const { default: solve } = await import(`./${entry.path}`);
      const { year, day } = match.groups;
      const input = await getInput(year, day, session, cachePath);
      try {
        const start = performance.now();
        const answer = solve(input);
        const end = performance.now();
        console.log(answer);
        if (time) console.error("time:", (end - start).toFixed(3), "ms");
      } catch (e) {
        console.error(e);
      }
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
  year: string | number,
  day: string | number,
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
