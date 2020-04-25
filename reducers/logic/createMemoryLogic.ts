import shuffleArray from "../../util/shuffleArray";
import type { Logic, LogicState } from "../logic.d";

type Opts = {
  cleanUnmatched: (sequence: LogicState, visibleCount: number) => LogicState;
};

export function createMemoryLogic(
  sequence: LogicState,
  { cleanUnmatched }: Opts
): Logic {
  const currentSequence = shuffleArray(sequence);

  return {
    init(): LogicState {
      return currentSequence.map((_) => "");
    },

    run(values: LogicState, index: number): LogicState {
      const visibleCount = values.filter((value) => value !== "").length;

      values = cleanUnmatched(values, visibleCount);
      values[index] = currentSequence[index];

      return values;
    },

    solved(values: LogicState): boolean {
      return values.every((value) => value !== "");
    },
  };
}
