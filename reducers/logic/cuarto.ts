import shuffleArray from "../../util/shuffleArray";
import type { Logic, LogicState } from "../logic.d";

const ELEMENTS = ["ॐ", "हं", "यं", "रं", "वं", "लं"];
const SEQUENCE = shuffleArray([...ELEMENTS].concat(ELEMENTS));

function isEven(n: number) {
  return n % 2 === 0;
}

export const cuartoLogic: Logic = {
  init(): LogicState {
    return SEQUENCE.map((_) => "");
  },

  run(values: LogicState, index: number): LogicState {
    if (values[index] !== "") return values;

    const visibleCount = values.filter((value) => value !== "").length;

    // clean unmatched signs
    if (isEven(visibleCount)) {
      values = values.map((value) => {
        const count = values.filter((v) => v === value).length;
        if (count !== 2) return "";
        return value;
      });
    }

    values[index] = SEQUENCE[index];
    return values;
  },

  solved(values: LogicState): boolean {
    return values.every((value) => value !== "");
  },
};
