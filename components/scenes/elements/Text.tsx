import React from "react";
import { StyleSheet, Text as RNText } from "react-native";

export function Text(props: any) {
  return (
    <RNText {...props} style={styles.default}>
      {props.children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  default: {
    color: "#eee",
    fontSize: 18,
    fontFamily: "Avenir",
    fontWeight: "bold",
  },
});
