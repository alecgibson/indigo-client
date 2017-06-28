export default class Random {
  // Returns a random integer from min (inclusive) to max (exclusive)
  static integerExclusive(min = 0, max = 1): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
