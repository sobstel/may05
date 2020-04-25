import { shallowEqual } from "react-redux";

import shuffleArray from "../../util/shuffleArray";
import type { Logic, LogicState } from "../logic.d";

export function createSequenceLogic(sequence: LogicState): Logic {
  const shuffledSequence = shuffleArray(sequence);

  return {
    init(): LogicState {
      return shuffledSequence.slice();
    },

    apply(values: string[], index: number) {
      const seqIndex = shuffledSequence.findIndex(
        (sign) => sign === values[index]
      );

      let nextSeqIndex = seqIndex + 1;
      if (nextSeqIndex >= shuffledSequence.length) {
        nextSeqIndex = 0;
      }

      values[index] = shuffledSequence[nextSeqIndex];
      return values;
    },

    solved(values: string[]) {
      return shallowEqual(values, sequence);
    },
  };
}
