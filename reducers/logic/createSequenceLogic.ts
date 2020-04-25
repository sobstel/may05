import { shallowEqual } from "react-redux";

import type { Logic, LogicState } from "../logic.d";

export function createSequenceLogic(
  sequence: LogicState,
  { initializer }: { initializer?: (sequence: LogicState) => LogicState }
): Logic {
  const sequenceDraft = initializer ? initializer(sequence) : sequence;

  return {
    init(): LogicState {
      return [...sequenceDraft];
    },

    run(values: LogicState, index: number): LogicState {
      const seqIndex = sequenceDraft.findIndex(
        (sign) => sign === values[index]
      );

      let nextSeqIndex = seqIndex + 1;
      if (nextSeqIndex >= sequenceDraft.length) {
        nextSeqIndex = 0;
      }

      values[index] = sequenceDraft[nextSeqIndex];
      return values;
    },

    solved(values: string[]): boolean {
      return shallowEqual(values, sequence);
    },
  };
}
