# adventofcode

My [Advent of Code](https://adventofcode.com/) solutions.

## Browser usage

Run the following in the [DevTools Console](https://devtools.chrome.com/console)
while on a puzzle page
([Day 1 - Advent of Code 2015](https://adventofcode.com/2015/day/1)):

<!-- todo: merge aoc.js and aoc.ts and reuse code -->

<!-- deno-fmt-ignore -->

```js
await import("https://mfulton26.github.io/adventofcode/aoc.js").then(({ solve }) => solve());
```

## Command line usage

<!-- todo: make this work without needing local solutions -->

```sh
deno run https://mfulton26.github.io/adventofcode/aoc.ts solve 2021/day/1
```

```sh
deno install --allow-env=AOC_BASE_URL,AOC_CACHE_DIR,AOC_CONFIG_DIR,AOC_SESSION,HOME --allow-read=$HOME/.aoc,. --allow-write=$HOME/.aoc --allow-net=adventofcode.com,deno.land --allow-hrtime https://mfulton26.github.io/adventofcode/aoc.ts
```

```console
% aoc solve 2021/day/1
running solve from ./2021/day/1/part/1/solve.ts
1298 (559µs)
running solve from ./2021/day/1/part/2/solve.ts
1248 (404µs)

2 solved (79ms)
```
