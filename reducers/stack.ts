import * as R from "remeda";
import { find } from "remeda";

import { names } from "../scenes";

type Action = {
  type: "RESPONDER_MOVE" | "RESPONDER_RELEASE";
  gestureState: any;
};

export type State = {
  items: {
    name: string;
    pile: "main" | "discarded";
    bottomY: number;
    intensity: number;
  }[];
};

const INITIAL_ITEM_STATE = {
  pile: "main",
  bottomY: 0,
  intensity: 100,
};

const INITIAL_STATE = {
  items: R.map(names, (name) => ({
    name,
    ...INITIAL_ITEM_STATE,
  })),
};

export default function stackReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case "RESPONDER_MOVE": {
      const nextState = { ...state };
      nextState.items[0] = {
        ...nextState.items[0],
        bottomY: action.gestureState.moveY,
      };
      return nextState;
    }
  }

  return state;
}
