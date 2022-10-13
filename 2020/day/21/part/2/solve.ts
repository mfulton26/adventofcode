export default function solve(input: string) {
  const foods = parseFoods(input);
  const allergenMap = mapAllergens(foods);
  const dangerousIngredientByAllergen = findDangerousIngredientByAllergen(
    allergenMap,
  );
  return findCanonicalDangerousIngredientsList(dangerousIngredientByAllergen);
}

function parseFoods(text: string) {
  return text.split("\n").map((line) => {
    const [, ingredientsText, allergensText = ""] = line.match(
      /^(.*?)(?: \(contains (.*)\))?$/,
    )!;
    const ingredientSet = new Set(ingredientsText.split(" "));
    const allergenSet = new Set(allergensText.split(", "));
    return { ingredientSet, allergenSet };
  });
}

function mapAllergens(foods: ReturnType<typeof parseFoods>) {
  const result = new Map<string, Set<string>>();
  for (const { ingredientSet, allergenSet } of foods) {
    for (const allergen of allergenSet) {
      if (!result.has(allergen)) {
        result.set(allergen, new Set(ingredientSet));
        continue;
      }
      for (const ingredient of result.get(allergen)!) {
        if (!ingredientSet.has(ingredient)) {
          result.get(allergen)!.delete(ingredient);
        }
      }
    }
  }
  return result;
}

function findDangerousIngredientByAllergen(
  allergenMap: ReturnType<typeof mapAllergens>,
) {
  allergenMap = new Map(allergenMap);
  const conclusionMap = new Map<string, string>();
  conclusionsLoop:
  while (allergenMap.size) {
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

function findCanonicalDangerousIngredientsList(
  dangerousIngredientByAllergen: Map<string, string>,
) {
  return [...dangerousIngredientByAllergen]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, ingredient]) => ingredient)
    .join(",");
}
