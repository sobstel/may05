export type State = {
  values: null | string[];
};

export type Action = object;

const INITIAL_STATE = {
  values: ["A", "G", "O", "Y", "", "", ""],
};

export function primeroReducer(state: State = INITIAL_STATE, action: Action) {
  return state;
}
