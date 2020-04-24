import { combineReducers } from "redux";

import { logicReducer, State as LogicState } from "./logic";
import { stackReducer, State as StackState } from "./stack";

export type State = {
  stack: StackState;
  logic: LogicState;
};

export default combineReducers({
  stack: stackReducer,
  logic: logicReducer,
});
