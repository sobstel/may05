import produce from "immer";
import * as R from "remeda";

import { SCENE_NAME, sceneNames } from "../scenes";
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
  // current: SCENE_NAME;
  // transition: false | { direction: "up" | "down"; y: number };
  currentIndex: number;
  pendingTransition: false | "up" | "down";
  scenes: {
    name: SCENE_NAME;
    pending: boolean;
    bottomY: number;
  }[];
};

const { screenHeight } = screenSize();

const INITIAL_STATE: State = {
  // current: sceneNames[0],
  // transition: false,
  currentIndex: 0,
  pendingTransition: false,
  scenes: [
    { name: "cero", pending: false, bottomY: 0 },
    { name: "primero", pending: false, bottomY: 0 },
    { name: "segundo", pending: false, bottomY: 0 },
    { name: "tercero", pending: false, bottomY: 0 },
    { name: "cuatro", pending: false, bottomY: 0 },
    { name: "quinto", pending: false, bottomY: 0 },
  ],
};

const GRANT_ZONE_BUFFER = 30;
const GRANT_ZONE_SIZE = 150;

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
          if (-action.gestureState.dy > 0.33 * screenHeight) {
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
          if (action.gestureState.dy > 0.33 * screenHeight) {
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
