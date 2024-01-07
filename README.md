# adventofcode

My [Advent of Code](https://adventofcode.com/) solutions.

## Browser usage

Run the following in the [DevTools Console](https://devtools.chrome.com/console)
while on a puzzle page (e.g.
[Day 1 - Advent of Code 2015](https://adventofcode.com/2015/day/1)):

Part one and two can be solved for a puzzle by importing the `solve.js` module.

```js
await import("http://localhost:8000/solver.js").then(({ solve }) => solve());
```

A `part` option can be specified to only solve part `1` or `2`.

```js
await import("http://localhost:8000/solver.js")
  .then(({ solve }) => solve({ part: 2 }));
```

A `dotLetterParsing` option is also available to disable detection and parsing
of dot-letter answers.

```js
await import("http://localhost:8000/solver.js")
  .then(({ solve }) => solve({ dotLetterParsing: false }));
```

## Command line usage

<!-- todo: make this work without needing local solutions -->

The below steps currently require solve modules to be available locally.

```sh
deno run https://mfulton26.github.io/adventofcode/bin/aoc.ts solve 2021/day/1
```

```sh
deno install --allow-env=AOC_BASE_URL,AOC_CACHE_DIR,AOC_CONFIG_DIR,AOC_SESSION,HOME --allow-read=$HOME/.aoc,.. --allow-write=$HOME/.aoc --allow-net=adventofcode.com,deno.land,esm.sh --allow-hrtime --import-map=./importMap.json ./bin/aoc.ts
```

```console
% aoc solve 2021/day/1
running solve from ./2021/day/1/part/1/solve.ts
1298 (559µs)
running solve from ./2021/day/1/part/2/solve.ts
1248 (404µs)

2 solved (79ms)
```
