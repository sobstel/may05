import React from "react";
import { StyleSheet, View } from "react-native";
import * as R from "remeda";

import { Button } from "./Button";

type Props = { values: string[]; onPress: (i: number) => any };

export function ButtonSet({ values, onPress }: Props) {
  let columnsCount = 4;
  if (values.length === 6) columnsCount = 1;
  if (values.length === 9) columnsCount = 3;

  const maxWidth = (56 + 2 * 8) * columnsCount;

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
