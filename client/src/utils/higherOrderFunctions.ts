/**
 * Higher-order function to combine an array of predicates functions into one
 * predicate function. The resulting function applies all the predicates on
 * an item in one go.
 *
 * @param predicates array of predicates accepting a single argument
 * @returns a single predicate being the intersection of the input predicates
 */
const combinePredicates =
  <T>(predicates: ((item: T) => boolean)[]): ((item: T) => boolean) =>
  (item: T) =>
    predicates.every(f => f(item));

export { combinePredicates };
