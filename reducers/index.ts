import { combineReducers } from "redux";

import { ceroReducer, State as CeroState } from "./cero";
import { cuartoReducer, State as CuartoState } from "./cuarto";
import { primeroReducer, State as PrimeroState } from "./primero";
import { quintoReducer, State as QuintoState } from "./quinto";
import { segundoReducer, State as SegundoState } from "./segundo";
import { stackReducer, State as StackState } from "./stack";
import { terceroReducer, State as TerceroState } from "./tercero";

export type State = {
  stack: StackState;
  cero: CeroState;
  primero: PrimeroState;
  segundo: SegundoState;
  tercero: TerceroState;
  cuarto: CuartoState;
  quinto: QuintoState;
};

export default combineReducers({
  stack: stackReducer,
  cero: ceroReducer,
  primero: primeroReducer,
  segundo: segundoReducer,
  tercero: terceroReducer,
  cuarto: cuartoReducer,
  quinto: quintoReducer,
});
