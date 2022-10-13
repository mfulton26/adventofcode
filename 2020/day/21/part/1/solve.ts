export default function solve(input: string) {
  const foods = parseFoods(input);
  const allergenMap = mapAllergens(foods);
  const { safeSet } = categorizeIngredients(foods, allergenMap);
  return countOccurrences(foods, safeSet);
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

function categorizeIngredients(
  foods: ReturnType<typeof parseFoods>,
  allergenMap: ReturnType<typeof mapAllergens>,
) {
  const ingredientSet = new Set(
    foods.flatMap(({ ingredientSet }) => [...ingredientSet]),
  );
  const unknownSet = new Set(
    Array.from(allergenMap.values(), (set) => [...set]).flat(),
  );
  const safeSet = new Set(
    [...ingredientSet].filter((ingredient) => !unknownSet.has(ingredient)),
  );
  return { unknownSet, safeSet };
}

function countOccurrences(
  foods: ReturnType<typeof parseFoods>,
  safeSet: Set<string>,
) {
  return [...safeSet].reduce(
    (count, ingredient) =>
      count +
      foods.reduce(
        (count, { ingredientSet }) =>
          ingredientSet.has(ingredient) ? count + 1 : count,
        0,
      ),
    0,
  );
}
