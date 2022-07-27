import { parse } from "std/flags/mod.ts";
import { dirname, join } from "std/path/mod.ts";
import { walk } from "std/fs/mod.ts";
import { gray } from "std/fmt/colors.ts";

import prettyMs from "https://cdn.skypack.dev/pretty-ms?dts";

declare global {
  interface NumberConstructor {
    isSafeInteger(number: unknown): number is number;
  }
}

const defaultBaseUrl = "https://adventofcode.com";

if (import.meta.main) {
  const { _: [command, ...args], h, help } = parse(Deno.args, {
    boolean: ["h", "help"],
  });

  if (h || help) {
    console.log(getHelp(command));
    Deno.exit(0);
  }

  switch (command) {
    case "solve":
      solve(args.length ? args.map(String) : ["."]);
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
            Print help information`;
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

async function solve(paths: Iterable<string>) {
  paths = new Set(paths);

  const session = await getSession();
  const cachePath = Deno.env.get("AOC_CACHE_DIR") ??
    join(Deno.env.get("HOME")!, ".aoc", "cache");

  const totalStart = performance.now();
  let solved = 0;

  const moduleNames = new Set<string>();
  const groupsByModuleName = new Map<string, Record<string, string>>();
  for (const path of paths) {
    const fileInfo = await Deno.lstat(path);
    if (fileInfo.isFile) {
      (<Set<string>> paths).add(dirname(path));
      continue;
    }
    for await (
      const entry of walk(path, {
        includeDirs: false,
        match: [/solve\.(js|ts)$/],
      })
    ) {
      const match = /(?<year>\d{4})\D+(?<day>\d{1,2})/.exec(entry.path);
      if (match?.groups === undefined) continue;
      const moduleName = `./${entry.path}`;
      moduleNames.add(moduleName);
      groupsByModuleName.set(moduleName, match.groups);
    }
  }

  for (const moduleName of [...moduleNames].sort(alphanumericalCompareFn)) {
    console.log(gray(`running solve from ${moduleName}`));
    const { default: solve } = await import(moduleName);
    const { year, day } = groupsByModuleName.get(moduleName)!;
    const input = await getInput(year, day, session, cachePath);
    try {
      const start = performance.now();
      const answer = solve(input);
      const end = performance.now();
      const time = formatTime(start, end);
      console.log(answer, time);
      if (answer !== undefined) solved++;
    } catch (e) {
      console.error(e);
    }
  }

  const totalEnd = performance.now();

  console.log(`\n${solved} solved ${formatTime(totalStart, totalEnd)}\n`);
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

function formatTime(start: number, end: number) {
  return gray(`(${prettyMs(end - start, formatTime.prettyMsOptions)})`);
}
formatTime.prettyMsOptions = Object.freeze({
  formatSubMilliseconds: true,
  unitCount: 1,
});

export function alphanumericalCompareFn(a: string, b: string): number {
  const aIterator = a.matchAll(/\d+/g);
  const bIterator = b.matchAll(/\d+/g);
  let aStart = 0, bStart = 0;
  for (
    let aResult = aIterator.next(), bResult = bIterator.next();
    !aResult.done && !bResult.done;
    aResult = aIterator.next(), bResult = bIterator.next()
  ) {
    const { value: { index: aEnd, 0: aDigits } } = aResult;
    const { value: { index: bEnd, 0: bDigits } } = bResult;
    for (; aStart < aEnd! && bStart < bEnd!; aStart++, bStart++) {
      const m = a[aStart], n = b[bStart];
      if (m !== n) return m < n ? -1 : 1;
    }
    const m = BigInt(aDigits), n = BigInt(bDigits);
    if (m !== n) return m < n ? -1 : 1;
    aStart += aDigits.length, bStart += bDigits.length;
  }
  for (; aStart < a.length && bStart < b.length; aStart++, bStart++) {
    const m = a[aStart], n = b[bStart];
    if (m !== n) return m < n ? -1 : 1;
  }
  return a.length - b.length;
}
