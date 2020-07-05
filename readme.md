# adventofcode

Solvers and testers for [Advent of Code](https://adventofcode.com/).

## Requirements

Chromium web browser.

## Usage

Copy & paste code snippets below into the [DevTools](https://devtools.chrome.com) console to run solvers/testers.

### Solving Puzzles

Part one and two can be solved for a puzzle by loading the solver module and callings its `solve` function.

```js
await import(
  "https://mfulton26.github.io/adventofcode/solver.js"
).then(({ solve }) => solve());
```

A `part` parameter can be specified to only solve part `1` or `2` of a puzzle.

```js
await import(
  "https://mfulton26.github.io/adventofcode/solver.js"
).then(({ solve }) => solve({ part: 1 }));
```

### Testing Solvers

Part one and two can be tested for a puzzle by loading the tester module and callings its `test` function.

```js
await import(
  "https://mfulton26.github.io/adventofcode/tester.js"
).then(({ test }) => test());
```

A `part` parameter can be specified to only test part `1` or `2` of a puzzle.

```js
await import(
  "https://mfulton26.github.io/adventofcode/tester.js"
).then(({ test }) => test({ part: 2 }));
```

## Development

A static HTTP server can be used to serve the scripts locally (e.g. using [Live Server - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).

### Running Solvers Locally

```js
await import("http://127.0.0.1:5500/solver.js").then(({ solve }) => solve());
```

### Running Testers Locally

```js
await import("http://127.0.0.1:5500/tester.js").then(({ test }) => test());
```
