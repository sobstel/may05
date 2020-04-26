import produce from "immer";
import * as R from "remeda";

import { SCENES_COUNT } from "../config";
import screenSize from "../util/screenSize";

export type State = {
  currentIndex: number;
  pendingTransition: false | "up" | "down" | "lastup" | "firstdown";
  scenes: {
    pending: boolean;
    bottom: number;
  }[];
  dy: number;
};

type GestureState = {
  dy: number; // accumulated distance of the gesture since the touch started
  moveY: number; //  the latest screen coordinates of the recently-moved touch
  vy: number; // current velocity of the gesture
  y0: number; // the screen coordinates of the responder grant
  numberActiveTouches: number; // number of touches currently on screen
};

type Action = {
  type: "RESPONDER_GRANT" | "RESPONDER_MOVED" | "RESPONDER_RELEASED";
  gestureState: GestureState;
};

const { screenHeight } = screenSize();

const INITIAL_STATE: State = {
  currentIndex: 0,
  pendingTransition: false,
  scenes: R.range(0, SCENES_COUNT).map(() => ({ pending: false, bottom: 0 })),
  dy: 0,
};

const GRANT_ZONE_BUFFER = Math.round(0.05 * screenHeight);
const GRANT_ZONE_SIZE = Math.round(0.4 * screenHeight);
const MOVE_THRESHOLD = Math.round(0.3 * screenHeight);

function withinUpperZone(moveY: number) {
  return (
    moveY > GRANT_ZONE_BUFFER && moveY < GRANT_ZONE_BUFFER + GRANT_ZONE_SIZE
  );
}

function withinLowerZone(moveY: number) {
  return (
    moveY < screenHeight - GRANT_ZONE_BUFFER &&
    moveY > screenHeight - GRANT_ZONE_BUFFER - GRANT_ZONE_SIZE
  );
}

export function stackReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case "RESPONDER_GRANT": {
      if (state.pendingTransition) return state;

      const { numberActiveTouches, moveY, vy } = action.gestureState;
      if (numberActiveTouches !== 1) return state;

      if (vy > 0 && withinUpperZone(moveY)) {
        return produce(state, (nextState) => {
          nextState.pendingTransition =
            state.currentIndex > 0 ? "down" : "firstdown";
        });
      }

      if (vy < 0 && withinLowerZone(moveY)) {
        return produce(state, (nextState) => {
          nextState.pendingTransition =
            state.currentIndex < state.scenes.length - 1 ? "up" : "lastup";
        });
      }

      return state;
    }

    case "RESPONDER_MOVED": {
      if (!state.pendingTransition) return state;

      return produce(state, (nextState) => {
        if (nextState.pendingTransition === "up") {
          nextState.scenes[nextState.currentIndex] = {
            ...nextState.scenes[nextState.currentIndex],
            pending: true,
            bottom: -action.gestureState.dy,
          };
        }
        if (nextState.pendingTransition === "down") {
          const prevIndex = nextState.currentIndex - 1;
          if (nextState.scenes[prevIndex]) {
            nextState.scenes[prevIndex] = {
              ...nextState.scenes[prevIndex],
              pending: true,
              bottom: screenHeight - action.gestureState.dy,
            };
          }
        }
        if (nextState.pendingTransition === "firstdown") {
          nextState.dy = action.gestureState.dy;
        }
        if (nextState.pendingTransition === "lastup") {
          nextState.dy = action.gestureState.dy;
        }
      });
    }

    case "RESPONDER_RELEASED": {
      if (!state.pendingTransition) return state;

      return produce(state, (nextState) => {
        if (nextState.pendingTransition === "up") {
          if (-action.gestureState.dy > MOVE_THRESHOLD) {
            nextState.scenes[nextState.currentIndex] = {
              ...nextState.scenes[nextState.currentIndex],
              pending: false,
              bottom: screenHeight,
            };

            nextState.currentIndex += 1;
          } else {
            nextState.scenes[nextState.currentIndex] = {
              ...nextState.scenes[nextState.currentIndex],
              pending: false,
              bottom: 0,
            };
          }
        }
        if (nextState.pendingTransition === "down") {
          if (action.gestureState.dy > MOVE_THRESHOLD) {
            nextState.scenes[nextState.currentIndex - 1] = {
              ...nextState.scenes[nextState.currentIndex - 1],
              pending: false,
              bottom: 0,
            };

            nextState.currentIndex -= 1;
          } else {
            nextState.scenes[nextState.currentIndex - 1] = {
              ...nextState.scenes[nextState.currentIndex - 1],
              pending: false,
              bottom: screenHeight,
            };
          }
        }
        if (nextState.pendingTransition === "firstdown") {
          nextState.dy = 0;
        }
        if (nextState.pendingTransition === "lastup") {
          nextState.dy = 0;
        }

        nextState.pendingTransition = false;
      });
    }
    default: {
      return state;
    }
  }
}
