export function itemTypePriority(itemType: string) {
  if (itemType >= "a" && itemType <= "z") {
    return 1 + itemType.charCodeAt(0) - "a".charCodeAt(0);
  }
  if (itemType >= "A" && itemType <= "Z") {
    return 27 + itemType.charCodeAt(0) - "A".charCodeAt(0);
  }
  throw new TypeError("item type must match /[a-zA-Z]/");
}
