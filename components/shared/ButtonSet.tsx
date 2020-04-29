import React from "react";
import { StyleSheet, View } from "react-native";
import * as R from "remeda";

import { Button, BUTTON_SIZE, BUTTON_MARGIN } from "./Button";

type Props = { values: string[]; onPress: (i: number) => any };

export function ButtonSet({ values, onPress }: Props) {
  // TODO: make it configurable via prop?
  let columnsCount = 4;
  if (values.length === 6) columnsCount = 1;
  if (values.length === 9) columnsCount = 3;

  const maxWidth = (BUTTON_SIZE + 2 * BUTTON_MARGIN) * columnsCount;

  return (
    <View style={[styles.container, { maxWidth }]}>
      {R.map.indexed(values, (value, index) => (
        <Button key={index} title={value} onPress={() => onPress(index)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
