import shuffleArray from "../../util/shuffleArray";
import type { Logic, LogicState } from "../logic.d";

const ELEMENTS = ["ॐ", "हं", "यं", "रं", "वं", "लं"];
const SEQUENCE = [...ELEMENTS].concat(ELEMENTS);
const SHUFFLED_SEQUENCE = shuffleArray(SEQUENCE);

export const cuartoLogic: Logic = {
  init(): LogicState {
    return SHUFFLED_SEQUENCE.map((_) => "");
  },

  run(values: LogicState, index: number): LogicState {
    if (values[index] !== "") return values;

    const visibleCount = values.filter((value) => value !== "").length;

    // when even, clean unmatched signs
    if (visibleCount % 2 === 0) {
      values = values.map((value) => {
        if (value === "") return value;
        const valueCount = values.filter((v) => v === value).length;
        if (valueCount !== 2) return "";
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
