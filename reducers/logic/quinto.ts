import * as R from "remeda";

import { createMemoryLogic } from "./createMemoryLogic";

const ELEMENTS = [
  ["A", "B", "C", "D"],
  ["1", "2", "3", "4"],
  ["I", "II", "III", "IV"],
  ["α", "β", "γ", "δ"],
];
const SEQUENCE = R.flatten(ELEMENTS);

export const quintoLogic = createMemoryLogic(SEQUENCE, {
  cleanUnmatched: (sequence, visibleCount) => {
    if (visibleCount % 4 === 0) {
      sequence = sequence.map((value) => {
        if (value === "") return value;
        const col = SEQUENCE.findIndex((v) => v === value) % 4;
        const allFound = ELEMENTS.every((row) =>
          sequence.some((v) => row[col] === v)
        );
        if (!allFound) return "";
        return value;
      });
    }
    return sequence;
  },
});
