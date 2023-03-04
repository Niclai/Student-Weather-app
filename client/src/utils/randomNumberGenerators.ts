/**
 * Generate random and unique integers in specified range. If the range is
 * smaller than the requested number of integers, then all integers from the
 * range will be returned in a random order.
 *
 * @param n maximum number of unique integers generated
 * @param min lowest possible integer that can be generated
 * @param max highest possible integer that can be generated
 */
const randomUniqueInts = (n: number, min: number, max: number): number[] => {
  const numbers: number[] = [];

  for (let i = 0; i < n && i <= max - min; i++) {
    let generated;
    while (generated == null || numbers.includes(generated)) {
      generated = randomIntBetween(min, max);
    }
    numbers.push(generated);
  }

  return numbers;
};

/**
 * Generate a random single random integer in the specified range
 * @param min lowest possible integer that can be generated
 * @param max highest possible integer that can be generated
 */
const randomIntBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export { randomUniqueInts, randomIntBetween };
