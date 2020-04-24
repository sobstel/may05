import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

import { backgrounds } from "../config/scenes";
import type { State } from "../reducers";
import screenSize from "../util/screenSize";

const { screenWidth, screenHeight } = screenSize();

type Props = { index: number; children: React.ReactNode };

export default function Scene({ index, children }: Props) {
  const bottomAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const { pending, bottomY } = useSelector((state: State) => {
    return state.stack.scenes[index] || { pending: false, bottomY: 0 };
  }, shallowEqual);

  useEffect(() => {
    // TODO(?): avoid dragging outside boundary: Math.min(-bottomY, 0);
    const bottomValue = bottomY;
    if (pending) {
      bottomAnim.setValue(bottomValue);
      opacityAnim.setValue(bottomValue);
    } else {
      const duration = 333;
      Animated.parallel(
        [
          Animated.timing(bottomAnim, { toValue: bottomValue, duration }),
          Animated.timing(opacityAnim, { toValue: bottomValue, duration }),
        ],
        { stopTogether: false }
      ).start();
    }
  }, [bottomY]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        bottom: bottomAnim,
        opacity: opacityAnim.interpolate({
          inputRange: [0, screenHeight],
          outputRange: [1, 0],
        }),
      }}
    >
      <Image
        source={backgrounds[index]}
        style={{ ...styles.backgroundImage }}
      />
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: "auto",
    height: screenHeight,
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: "cover",
  },
});
