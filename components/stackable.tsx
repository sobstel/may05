import React from "react";
import { Dimensions } from "react-native";
import { connect } from "react-redux";

import type { State } from "../reducers";
import Scene from "./Scene";

const screenHeight = Math.round(Dimensions.get("window").height);

export default function stackable(name: string) {
  return (WrappedComponent: any) => {
    const mapStateToProps = (state: State) => {
      // TODO: do it a bit smarter with an error boundary etc
      return state.stack.items.find((item) => item.name === name);
    };

    return connect(mapStateToProps)((props: any) => {
      const bottomY = screenHeight - (props.bottomY || screenHeight);
      return (
        <Scene style={{ top: -bottomY, bottom: bottomY }}>
          <WrappedComponent {...props} />
        </Scene>
      );
    });
  };
}
