import * as R from "remeda";

import shuffleArray from "../../util/shuffleArray";
import type { Logic, LogicState } from "../logic.d";

const ELEMENTS = [
  ["A", "B", "C", "D"],
  ["1", "2", "3", "4"],
  ["I", "II", "III", "IV"],
  ["α", "β", "γ", "δ"],
];
const SEQUENCE = R.flatten(ELEMENTS);
const SHUFFLED_SEQUENCE = shuffleArray(SEQUENCE);

export const quintoLogic: Logic = {
  init(): LogicState {
    return [...SHUFFLED_SEQUENCE].map((_) => "");
  },

  run(values: LogicState, index: number): LogicState {
    if (values[index] !== "") return values;

    const visibleCount = values.filter((value) => value !== "").length;

    // clean unmatched signs
    if (visibleCount % 4 === 0) {
      values = values.map((value) => {
        if (value === "") return value;
        const col = SEQUENCE.findIndex((v) => v === value) % 4;
        const allFound = ELEMENTS.every((row) =>
          values.some((v) => row[col] === v)
        );
        if (!allFound) return "";
        return value;
      });
    }

    values[index] = SHUFFLED_SEQUENCE[index];

    return values;
  },

  solved(values: LogicState): boolean {
    return values.every((value) => value !== "");
  },
};
