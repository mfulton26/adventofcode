export function solve(input) {
  const expressions = input.split("\n");
  return expressions.reduce((sum, expression) => sum + evaluate(expression), 0);
}

function evaluate(expression) {
  let previous;
  do {
    previous = expression;
    expression = expression.replace(/\(([^()]*?)\)/g, (_, sub) =>
      evaluate(sub)
    );
  } while (expression !== previous);
  do {
    previous = expression;
    expression = expression.replace(/\d+ [+*] \d+/, eval);
  } while (expression !== previous);
  return eval(expression);
}
