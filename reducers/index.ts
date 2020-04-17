import { combineReducers } from "redux";

import stack, { State as StackState } from "./stack";

export type State = {
  stack: StackState;
};

export default combineReducers({ stack });
