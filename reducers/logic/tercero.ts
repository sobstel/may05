import { createSequenceLogic } from "./createSequenceLogic";

const SEQUENCE = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const MAGIC_COLUMNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const terceroLogic = {
  ...createSequenceLogic(SEQUENCE, { shuffle: false }),
  solved(values: string[]): boolean {
    const sums = MAGIC_COLUMNS.map((row) =>
      row.reduce((acc, index) => acc + parseInt(values[index], 10), 0)
    );
    return sums.every((sum) => sum === sums[0]);
  },
};
