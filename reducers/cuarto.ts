export type State = {
  values: null | string[];
};

export type Action = object;

const INITIAL_STATE = {
  values: null,
};

export function cuartoReducer(state: State = INITIAL_STATE, action: Action) {
  return state;
}
