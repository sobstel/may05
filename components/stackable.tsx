import React from "react";

import Scene from "./Scene";

export default function stackable(index: number) {
  return (WrappedComponent: any) => (props: any) => (
    <Scene index={index}>
      <WrappedComponent {...props} />
    </Scene>
  );
}
