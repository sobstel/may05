import React from "react";
import { useSelector } from "react-redux";

import { SCENE_STATE_KEY } from "../config";
import { State } from "../reducers";
import { quotes, hints } from "../script";
import { Banner } from "./shared/Banner";
import { ButtonSet } from "./shared/ButtonSet";

type Props = { stateKey: SCENE_STATE_KEY; index: number };

export function SceneContent({ stateKey, index }: Props) {
  const values = useSelector((state: State) => state[stateKey].values);

  if (!values || values.length === 0) {
    return <Banner quote={quotes[index]} hint={hints[index]} />;
  }

  // TODO: dispatch onPress
  return <ButtonSet values={values} onPress={(i) => console.log(i)} />;
}
