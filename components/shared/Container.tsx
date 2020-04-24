import React from "react";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

type Props = { children: React.ReactNode };

export function Container({ children }: Props) {
  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      {children}
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 25,
    backgroundColor: "rgba(0, 10, 0, 0.5)",
    alignItems: "center",
  },
});
