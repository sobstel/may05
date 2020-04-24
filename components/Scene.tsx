import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { State } from "../reducers";
import { quotes, hints } from "../script";
import { Banner } from "./shared/Banner";
import { ButtonSet } from "./shared/ButtonSet";

type Props = { index: number };

export function Scene({ index }: Props) {
  const dispatch = useDispatch();
  const values = useSelector((state: State) => state.logic[index]);

  if (values.length === 0) {
    return <Banner quote={quotes[index]} hint={hints[index]} />;
  }

  return (
    <ButtonSet
      values={values}
      onPress={(i) =>
        dispatch({ type: "BUTTON_PRESSED", index, valueIndex: i })
      }
    />
  );
}
