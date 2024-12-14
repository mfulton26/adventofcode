# adventofcode

My [Advent of Code](https://adventofcode.com/) solutions.

## CLI

```console
% deno task solve 2015/day/1
Task solve ./bin/aoc.ts solve "2015/day/1"
running solve from ./2015/day/1/part/1/solve.ts
74 (1ms)
running solve from ./2015/day/1/part/2/solve.ts
1795 (1ms)

2 solved (238ms)
```

## Web

Run the following in the [DevTools Console](https://devtools.chrome.com/console)
while on a puzzle page (e.g.
[Day 1 - Advent of Code 2015](https://adventofcode.com/2015/day/1)):

```js
const { solve } = await import("https://adventofcode.deno.dev/solver.js");
await solve();
```

`solve()` supports some options:

- `part: 1 | 2`: only run the solver for one part

  ```js
  await solve({ part: 2 });
  ```

- `dotLetterParsing: false`: disable detection and parsing of dot-letter answers

  ```js
  await solve({ dotLetterParsing: false });
  ```

## Development

The CLI usage is easiet but the web server can be run locally too:

```sh
deno task serve
```

```js
await import("http://localhost:8000/solver.js").then(({ solve }) => solve());
```
