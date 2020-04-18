import React from "react";

import type { SCENE_NAME } from "../scenes";
import Scene from "./Scene";

export default function stackable(name: SCENE_NAME) {
  return (WrappedComponent: any) => (props: any) => (
    <Scene name={name}>
      <WrappedComponent {...props} />
    </Scene>
  );
}
