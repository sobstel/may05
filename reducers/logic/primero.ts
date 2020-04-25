import { shallowEqual } from "react-redux";

import type { Logic, LogicState } from "../logic.d";

const SEQUENCE = ["A", "G", "O", "Y"];

export const primeroLogic: Logic = {
  init(): LogicState {
    return SEQUENCE.slice();
  },

  apply(values: string[], index: number) {
    const seqIndex = SEQUENCE.findIndex((sign) => sign === values[index]);
    const nextSeqIndex = seqIndex < SEQUENCE.length - 1 ? seqIndex + 1 : 0;
    values[index] = SEQUENCE[nextSeqIndex];
    return values;
  },

  solved(values: string[]) {
    return shallowEqual(values, ["Y", "O", "G", "A"]);
  },
};
