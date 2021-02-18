export function solve(input) {
  const foods = parseFoods(input);
  const allergenMap = mapAllergens(foods);
  const { safeSet } = categorizeIngredients(foods, allergenMap);
  return countOccurrences(foods, safeSet);
}

function parseFoods(text) {
  return text.split("\n").map((line) => {
    const [, ingredientsText, allergensText = ""] = line.match(
      /^(.*?)(?: \(contains (.*)\))?$/
    );
    const ingredientSet = new Set(ingredientsText.split(" "));
    const allergenSet = new Set(allergensText.split(", "));
    return { ingredientSet, allergenSet };
  });
}

function mapAllergens(foods) {
  const result = new Map();
  for (const { ingredientSet, allergenSet } of foods) {
    for (const allergen of allergenSet) {
      if (result.has(allergen)) {
        for (const ingredient of result.get(allergen)) {
          if (!ingredientSet.has(ingredient)) {
            result.get(allergen).delete(ingredient);
          }
        }
      } else {
        result.set(allergen, new Set(ingredientSet));
      }
    }
  }
  return result;
}

function categorizeIngredients(foods, allergenMap) {
  const ingredientSet = new Set(
    foods.flatMap(({ ingredientSet }) => Array.from(ingredientSet))
  );
  const unknownSet = new Set(
    Array.from(allergenMap.values(), (set) => Array.from(set)).flat()
  );
  const safeSet = new Set(
    Array.from(ingredientSet).filter(
      (ingredient) => !unknownSet.has(ingredient)
    )
  );
  return { unknownSet, safeSet };
}

function countOccurrences(foods, safeSet) {
  return Array.from(safeSet).reduce(
    (count, ingredient) =>
      count +
      foods.reduce(
        (count, { ingredientSet }) =>
          ingredientSet.has(ingredient) ? count + 1 : count,
        0
      ),
    0
  );
}
