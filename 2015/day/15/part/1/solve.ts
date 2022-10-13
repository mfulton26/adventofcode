export default function solve(input: string) {
  const table = parseTable(input);
  const ingredients = Array.from(table.rowKeys());
  const properties = Array.from(table.columnKeys()).filter(
    (property) => property !== "calories",
  );
  let maxScore = -Infinity;
  for (const recipe of recipes(ingredients)) {
    const propertyTotal = (property: string) =>
      Math.max(
        ingredients.reduce(
          (total, ingredient) =>
            total + recipe.get(ingredient)! * table.get(ingredient, property)!,
          0,
        ),
        0,
      );
    const score = properties.reduce(
      (score, property) => score * propertyTotal(property),
      1,
    );
    if (score > maxScore) {
      maxScore = score;
    }
  }
  return maxScore;
}

function parseTable(text: string) {
  const rows = new Map<string, Map<string, number>>();
  const columnKeySet = new Set<string>();
  for (const line of text.split("\n")) {
    const [ingredient, propertiesText] = line.split(": ");
    const row = new Map<string, number>();
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
    get: (rowKey: string, columnKey: string) =>
      rows.get(rowKey)?.get(columnKey),
  };
}

function* recipes(
  ingredients: string[],
  teaspoons = 100,
): IterableIterator<Map<string, number>> {
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
