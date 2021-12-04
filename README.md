# adventofcode

Solvers and testers for [Advent of Code](https://adventofcode.com/).

## Requirements

- Chromium web browser with access to [Advent of Code](https://adventofcode.com) and [DevTools](https://devtools.chrome.com).
- Basic knowledge of [running JavaScript](https://devtools.chrome.com/console#javascript) in the [DevTools Console](https://devtools.chrome.com/console) (see [Get Started With Running JavaScript In The Console](https://devtools.chrome.com/console/javascript)).

## Usage

1. Open a puzzle page (e.g. [Day 1 - Advent of Code 2015](https://adventofcode.com/2015/day/1)).
2. Open the [DevTools Console](https://devtools.chrome.com/console).
3. Run the solver or its tests by copying & pasting code below and running it in the DevTools Console. The scripts detect which puzzle is loaded in the page and solve/test accordingly.

### Solving Puzzles

Part one and two can be solved for a puzzle by loading the solver module and callings its `solve` function.

```js
const { solve } = await import("https://mfulton26.github.io/adventofcode/solver.js");
await solve();
```

A `part` parameter can be specified to only solve part `1` or `2` of a puzzle.

```js
const { solve } = await import("https://mfulton26.github.io/adventofcode/solver.js");
await solve({ part: 1 });
```

### Testing Solvers

Part one and two can be tested for a puzzle by loading the tester module and callings its `test` function.

```js
const { test } = await import("https://mfulton26.github.io/adventofcode/tester.js");
await test();
```

A `part` parameter can be specified to only test part `1` or `2` of a puzzle.

```js
const { test } = await import("https://mfulton26.github.io/adventofcode/tester.js");
await test({ part: 2 });
```

## Development

A file server can be used to serve the scripts locally (e.g. using Deno standard library [file server](https://deno.land/manual/examples/file_server#using-the-codestdhttpcode-file-server)).

### Running Solvers Locally

```js
await import("http://localhost:4507/solver.js").then(({ solve }) => solve());
```

### Running Testers Locally

```js
await import("http://localhost:4507/tester.js").then(({ test }) => test());
```
