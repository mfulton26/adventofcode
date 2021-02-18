export function solve(input) {
  const table = parseTable(input);
  const ingredients = Array.from(table.rowKeys());
  const properties = Array.from(table.columnKeys()).filter(
    (property) => property !== "calories"
  );
  let maxScore = -Infinity;
  for (const recipe of recipes(ingredients)) {
    const propertyTotal = (property) =>
      Math.max(
        ingredients.reduce(
          (total, ingredient) =>
            total + recipe.get(ingredient) * table.get(ingredient, property),
          0
        ),
        0
      );
    const score = properties.reduce(
      (score, property) => score * propertyTotal(property),
      1
    );
    if (score > maxScore) {
      maxScore = score;
    }
  }
  return maxScore;
}

function parseTable(text) {
  const rows = new Map();
  const columnKeySet = new Set();
  for (const line of text.split("\n")) {
    const [ingredient, propertiesText] = line.split(": ");
    const row = new Map();
    for (const propertyText of propertiesText.split(", ")) {
      const [property, teaspoonsText] = propertyText.split(" ");
      const teaspoons = Number(teaspoonsText);
      columnKeySet.add(property);
      row.set(property, teaspoons);
    }
    rows.set(ingredient, row);
  }
  return {
    rowKeys: () => rows.keys(),
    columnKeys: () => columnKeySet.values(),
    get: (rowKey, columnKey) => rows.get(rowKey)?.get(columnKey),
  };
}

function* recipes(ingredients, teaspoons = 100) {
  switch (ingredients.length) {
    case 0:
      throw new Error("ingredients.length must be nonzero");
    case 1:
      yield new Map([[ingredients[0], teaspoons]]);
      break;
    default:
      for (let amount = 0; amount <= teaspoons; amount++) {
        const [ingredient, ...remaining] = ingredients;
        for (const subRecipe of recipes(remaining, teaspoons - amount)) {
          yield new Map([[ingredient, amount], ...subRecipe]);
        }
      }
  }
}
