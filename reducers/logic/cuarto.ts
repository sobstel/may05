import type { Logic, LogicState } from "../logic.d";

export const cuartoLogic: Logic = {
  init(): LogicState {
    return [];
  },

  run(_values: LogicState, _index: number): LogicState {
    return [];
  },

  solved(_values: LogicState): boolean {
    return false;
  },
};
