import { parse } from "https://deno.land/std@0.149.0/flags/mod.ts";
import { dirname, join } from "https://deno.land/std@0.149.0/path/mod.ts";
import { walk } from "https://deno.land/std@0.149.0/fs/mod.ts";
import { bold, gray, red } from "https://deno.land/std@0.149.0/fmt/colors.ts";

import prettyMs from "https://cdn.skypack.dev/pretty-ms?dts";

import { alphanumericalCompareFn } from "../lib/alphanumeric.ts";
import { formatAnswer, prettyMsOptions } from "../lib/harness.ts";

const defaultBaseUrl = "https://adventofcode.com";

if (import.meta.main) {
  const {
    _: [command, ...args],
    h,
    help,
    ["dot-letter-parsing"]: dotLetterParsing,
  } = parse(
    Deno.args,
    {
      boolean: ["h", "help", "dot-letter-parsing"],
      negatable: ["dot-letter-parsing"],
      default: { ["dot-letter-parsing"]: true },
    },
  );

  if (h || help) {
    console.log(getHelp(command));
    Deno.exit(0);
  }

  try {
    switch (command) {
      case "solve":
        await solve(args.length ? args.map(String) : ["."], {
          dotLetterParsing,
        });
        break;
      default:
        console.error(`Unrecognized subcommand: ${command}\n\n${getHelp()}`);
        Deno.exit(1);
    }
  } catch (e) {
    if (!(e instanceof Error)) throw e;
    console.error(`${bold(red("error"))}: ${e.message}`);
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

        --no-dot-letter-parsing
            Disable automatic dot letter answer recognition parsing.`;
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

async function solve(
  paths: Iterable<string>,
  { dotLetterParsing = true } = {},
) {
  const session = await getSession();
  const cachePath = Deno.env.get("AOC_CACHE_DIR") ??
    join(Deno.env.get("HOME")!, ".aoc", "cache");

  const totalStart = performance.now();
  let solved = 0;

  const moduleNames = <string[]> [];
  const groupsByModuleName = new Map<string, Record<string, string>>();
  for (const path of new Set(paths)) {
    const fileInfo = await Deno.lstat(path);
    for await (
      const entry of fileInfo.isFile ? [{ path }] : walk(path, {
        includeDirs: false,
        match: [/solve\.(js|ts)$/],
      })
    ) {
      const moduleName = `./${entry.path}`;
      // todo: replace with URLPattern
      const match = /(?<year>\d{4})\D+(?<day>\d{1,2})/.exec(entry.path);
      if (match?.groups === undefined) {
        console.log(gray(`puzzle year and day not found in ${moduleName}`));
        continue;
      }
      moduleNames.push(moduleName);
      groupsByModuleName.set(moduleName, match.groups);
    }
  }

  moduleNames.sort(alphanumericalCompareFn);

  for (const moduleName of new Set(moduleNames)) {
    const { year, day } = groupsByModuleName.get(moduleName)!;
    const input = await getInput(year, day, session, cachePath);
    const solve = await getSolveFn(`.${moduleName}`);
    if (solve === undefined) {
      console.log(gray(`no default exported function found in ${moduleName}`));
      continue;
    }
    console.log(gray(`running solve from ${moduleName}`));
    try {
      const start = performance.now();
      const answer = solve(input);
      const end = performance.now();
      const duration = end - start;
      console.log(
        formatAnswer(answer, { dotLetterParsing }),
        formatDuration(duration),
      );
      if (answer !== undefined) solved++;
    } catch (e) {
      console.error(e);
    }
  }

  const totalEnd = performance.now();
  const totalDuration = totalEnd - totalStart;

  console.log(`\n${solved} solved ${formatDuration(totalDuration)}\n`);
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
  year: string,
  day: string,
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
    const text = await response.text();
    if (!response.ok) throw new Error(text);
    const result = text.replaceAll(/^\n|\n$/g, "");
    try {
      await Deno.mkdir(dirname(inputCachePath), { recursive: true });
      await Deno.writeTextFile(inputCachePath, result);
    } catch (e) {
      console.warn("failed to cache input", e);
    }
    return result;
  }
}

async function getSolveFn(moduleName: string) {
  try {
    const { default: solve } = await import(moduleName);
    if (typeof solve === "function") return solve as (input: string) => unknown;
  } catch (e) {
    console.warn(e);
    return;
  }
}

function formatDuration(milliseconds: number) {
  return gray(`(${prettyMs(milliseconds, prettyMsOptions)})`);
}
