const randomUniqueNumbers = (n: number, min: number, max: number): number[] => {
  const numbers: number[] = [];

  for (let i = 0; i < n && i <= max - min; i++) {
    let generated;
    while (generated == null || numbers.includes(generated)) {
      generated = randomBetween(min, max);
    }
    numbers.push(generated);
  }

  return numbers;
};

const randomBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export { randomUniqueNumbers, randomBetween };
