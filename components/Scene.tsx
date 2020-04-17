import React from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";

type Props = { children: React.ReactNode; style?: ViewStyle };

//

export default function Scene({ children, style }: Props) {
  return (
    <Animated.View style={[styles.container, style]}>{children}</Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ccc",
  },
});
