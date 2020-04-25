import { shallowEqual } from "react-redux";

import type { Logic, LogicState } from "../logic.d";

type Opts = { initializer?: (sequence: LogicState) => LogicState };

export function createSequenceLogic(
  sequence: LogicState,
  { initializer }: Opts
): Logic {
  const currentSequence = initializer ? initializer(sequence) : sequence;

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
