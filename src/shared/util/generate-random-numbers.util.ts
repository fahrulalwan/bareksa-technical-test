const generateRandomNumbers = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

export default generateRandomNumbers;
