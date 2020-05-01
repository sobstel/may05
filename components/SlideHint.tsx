import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import { Button } from "./shared/Button";

type Props = { text: string; type: "top" | "bottom" };

export function SlideHint({ text, type }: Props) {
  const dispatch = useDispatch();
  const style = type === "top" ? styles.slideHintTop : styles.slideHintBottom;

  return (
    <View style={[styles.slideHint, style]}>
      <Button
        title={text}
        onPress={() => dispatch({ type: "SLIDE_HINT_PRESSED", hintType: type })}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  slideHint: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    zIndex: 101,
  },
  slideHintTop: {
    top: 30,
  },
  slideHintBottom: {
    bottom: 30,
  },
  slideText: {
    fontWeight: "normal",
    fontSize: 50,
    color: "#ddd",
  },
});
