export function sortByScore(items) {
  return items.sort((formerItem, latterItem) => latterItem.score - formerItem.score);
}
