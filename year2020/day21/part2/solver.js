export function solve(input) {
  const foods = parseFoods(input);
  const allergenMap = mapAllergens(foods);
  const dangerousIngredientByAllergen = findDangerousIngredientByAllergen(
    allergenMap
  );
  return findCanonicalDangerousIngredientsList(dangerousIngredientByAllergen);
}

function findCanonicalDangerousIngredientsList(dangerousIngredientByAllergen) {
  return Array.from(dangerousIngredientByAllergen)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, ingredient]) => ingredient)
    .join(",");
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

function findDangerousIngredientByAllergen(allergenMap) {
  allergenMap = new Map(allergenMap);
  const conclusionMap = new Map();
  conclusionsLoop: while (allergenMap.size) {
    for (const [allergen, ingredientCandidates] of allergenMap) {
      if (ingredientCandidates.size === 1) {
        const [ingredient] = ingredientCandidates;
        conclusionMap.set(allergen, ingredient);
        allergenMap.delete(allergen);
        for (const otherIngredientCandidates of allergenMap.values()) {
          otherIngredientCandidates.delete(ingredient);
        }
        continue conclusionsLoop;
      }
    }
  }
  return conclusionMap;
}
