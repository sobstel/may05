import React from "react";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";

import type { State } from "../reducers";
// import type { Item } from "../reducers/stack";
import Scene from "./Scene";

const screenHeight = Math.round(Dimensions.get("window").height);

export default function stackable(name: string) {
  return (WrappedComponent: any) => {
    return (props: any) => {
      const item: any = useSelector((state: State) => {
        // TODO: do it a bit smarter?
        return state.stack.items.find((item) => item.name === name);
      });

      const bottomY = screenHeight - (item.bottomY || screenHeight);
      return (
        <Scene style={{ top: -bottomY, bottom: bottomY }}>
          <WrappedComponent {...props} />
        </Scene>
      );
    };
  };
}
