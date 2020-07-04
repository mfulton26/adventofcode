# adventofcode

Solvers and testers for [Advent of Code](https://adventofcode.com/).

## Requirements

Chromium web browser.

## Usage

Copy & paste code snippets below into the [DevTools](https://devtools.chrome.com) console to run solvers/testers.

### Solving Puzzles

```js
await import(
  "https://mfulton26.github.io/adventofcode/solver.js"
).then(({ solve }) => solve());
```

### Testing Solvers

```js
await import(
  "https://mfulton26.github.io/adventofcode/tester.js"
).then(({ test }) => test());
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
