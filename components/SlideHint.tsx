import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "./scenes/elements/Text";

type Props = { text: string; type: "top" | "bottom" };

export function SlideHint({ text, type }: Props) {
  const style = type === "top" ? styles.slideHintTop : styles.slideHintBottom;

  return (
    <View style={[styles.slideHint, style]}>
      <Text style={styles.slideText}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  slideHint: {
    width: "100%",
    alignItems: "center",
  },
  slideHintTop: {
    position: "absolute",
    top: 30,
  },
  slideHintBottom: {
    position: "absolute",
    bottom: 30,
  },
  slideText: {
    fontWeight: "normal",
    fontSize: 50,
    color: "#ddd",
  },
});
