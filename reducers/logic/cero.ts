import type { Logic, LogicState } from "../logic.d";

export const ceroLogic: Logic = {
  init(): LogicState {
    return [];
  },

  apply(_values: LogicState, _index: number) {
    return [];
  },

  solved(_values: LogicState) {
    return true;
  },
};
