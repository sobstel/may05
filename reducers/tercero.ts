export type State = {
  values: null | string[];
};

export type Action = object;

const INITIAL_STATE = {
  values: null,
};

export function terceroReducer(state: State = INITIAL_STATE, action: Action) {
  return state;
}
