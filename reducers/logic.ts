import produce from "immer";

import { ceroLogic } from "./logic/cero";
import { cuartoLogic } from "./logic/cuarto";
import { primeroLogic } from "./logic/primero";
import { quintoLogic } from "./logic/quinto";
import { segundoLogic } from "./logic/segundo";
import { terceroLogic } from "./logic/tercero";

export type State = string[][];

export type Action = {
  type: "BUTTON_PRESSED";
  index: number;
  valueIndex: number;
};

const logics = [
  ceroLogic,
  primeroLogic,
  segundoLogic,
  terceroLogic,
  cuartoLogic,
  quintoLogic,
];

const INITIAL_STATE = logics.map((logic) => logic.init());

export function logicReducer(state: State = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case "BUTTON_PRESSED": {
      return produce(state, (nextState) => {
        const { index, valueIndex } = action;
        logics[index].apply(nextState[index], valueIndex);
      });
    }
  }

  return state;
}
