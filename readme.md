# adventofcodesolvers

## Requirements

Chromium web browser.

## Usage

Copy & paste code snippets below into the [DevTools](https://devtools.chrome.com) console to run solvers/tests.

### Solving Puzzles

```js
await import("http://127.0.0.1:5500/solver.js").then(({ solve }) => solve());
```

### Testing Solvers

```js
await import("http://127.0.0.1:5500/tester.js").then(({ test }) => test());
```
