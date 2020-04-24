import produce from "immer";
import * as R from "remeda";

import { scenesCount } from "../components/scenes";
import screenSize from "../util/screenSize";

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

export type State = {
  currentIndex: number;
  pendingTransition: false | "up" | "down";
  scenes: {
    pending: boolean;
    bottomY: number;
  }[];
};

const { screenHeight } = screenSize();

const INITIAL_STATE: State = {
  currentIndex: 0,
  pendingTransition: false,
  scenes: R.range(0, scenesCount).map(() => ({ pending: false, bottomY: 0 })),
};

const GRANT_ZONE_BUFFER = Math.round(0.05 * screenHeight);
const GRANT_ZONE_SIZE = Math.round(0.4 * screenHeight);
const MOVE_THRESHOLD = Math.round(0.3 * screenHeight);

export default function stackReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case "RESPONDER_GRANT": {
      if (state.pendingTransition) return state;

      const { numberActiveTouches, moveY, vy } = action.gestureState;
      if (numberActiveTouches !== 1) return state;

      // TODO: move to some separate utility
      if (
        state.currentIndex > 0 &&
        vy > 0 &&
        moveY > GRANT_ZONE_BUFFER &&
        moveY < GRANT_ZONE_BUFFER + GRANT_ZONE_SIZE
      ) {
        return produce(state, (nextState) => {
          nextState.pendingTransition = "down";
        });
      }

      // TODO: move to some separate utility
      if (
        state.currentIndex < state.scenes.length - 1 &&
        vy < 0 &&
        moveY < screenHeight - GRANT_ZONE_BUFFER &&
        moveY > screenHeight - GRANT_ZONE_BUFFER - GRANT_ZONE_SIZE
      ) {
        return produce(state, (nextState) => {
          nextState.pendingTransition = "up";
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
            bottomY: -action.gestureState.dy,
          };
          const nextIndex = nextState.currentIndex + 1;
          if (nextState.scenes[nextIndex]) {
            nextState.scenes[nextIndex] = {
              ...nextState.scenes[nextIndex],
            };
          }
        }
        if (nextState.pendingTransition === "down") {
          const prevIndex = nextState.currentIndex - 1;
          if (nextState.scenes[prevIndex]) {
            nextState.scenes[prevIndex] = {
              ...nextState.scenes[prevIndex],
              pending: true,
              bottomY: screenHeight - action.gestureState.dy,
            };
          }
          const currentIndex = nextState.currentIndex;
          if (nextState.scenes[currentIndex]) {
            nextState.scenes[currentIndex] = {
              ...nextState.scenes[currentIndex],
            };
          }
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
              bottomY: screenHeight,
            };

            nextState.currentIndex += 1;
          } else {
            nextState.scenes[nextState.currentIndex] = {
              ...nextState.scenes[nextState.currentIndex],
              pending: false,
              bottomY: 0,
            };
          }
        }

        if (nextState.pendingTransition === "down") {
          if (action.gestureState.dy > MOVE_THRESHOLD) {
            nextState.scenes[nextState.currentIndex - 1] = {
              ...nextState.scenes[nextState.currentIndex - 1],
              pending: false,
              bottomY: 0,
            };

            nextState.currentIndex -= 1;
          } else {
            nextState.scenes[nextState.currentIndex - 1] = {
              ...nextState.scenes[nextState.currentIndex - 1],
              pending: false,
              bottomY: screenHeight,
            };
          }
        }

        nextState.pendingTransition = false;
      });
    }
  }

  return state;
}
