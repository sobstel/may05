import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";

type Props = { children: React.ReactNode };

export function Container({ children }: Props) {
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, { toValue: 1, duration: 500 }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
      {children}
    </Animated.View>
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
