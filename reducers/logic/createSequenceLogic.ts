import { shallowEqual } from "react-redux";

import shuffleArray from "../../util/shuffleArray";
import type { Logic, LogicState } from "../logic.d";

type Opts = { shuffle: boolean }; // initializer?: (sequence: LogicState) => LogicState };

export function createSequenceLogic(
  sequence: LogicState,
  { shuffle }: Opts
): Logic {
  const currentSequence = shuffle ? shuffleArray(sequence) : [...sequence];

  return {
    init(): LogicState {
      return [...currentSequence];
    },

    run(values: LogicState, index: number): LogicState {
      const seqIndex = currentSequence.findIndex(
        (sign) => sign === values[index]
      );

      let nextSeqIndex = seqIndex + 1;
      if (nextSeqIndex >= currentSequence.length) {
        nextSeqIndex = 0;
      }

      values[index] = currentSequence[nextSeqIndex];
      return values;
    },

    solved(values: string[]): boolean {
      return shallowEqual(values, sequence);
    },
  };
}
