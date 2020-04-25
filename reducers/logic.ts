import type { Logic, LogicState } from "./logic.d";
import { ceroLogic } from "./logic/cero";
import { cuartoLogic } from "./logic/cuarto";
import { primeroLogic } from "./logic/primero";
import { quintoLogic } from "./logic/quinto";
import { segundoLogic } from "./logic/segundo";
import { terceroLogic } from "./logic/tercero";

export type State = LogicState[];

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

function runLogic(logic: Logic, logicState: LogicState, valueIndex: number) {
  const values = logic.run([...logicState], valueIndex);
  console.log(values);
  if (logic.solved(values)) return [];
  return values;
}

export function logicReducer(state: State = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case "BUTTON_PRESSED": {
      return state.map((logicState, index) => {
        if (index === action.index) {
          return runLogic(logics[index], logicState, action.valueIndex);
        }
        return logicState;
      });
    }
    default: {
      return state;
    }
  }
}
