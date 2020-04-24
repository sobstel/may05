import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

import type { State } from "../reducers";
import screenSize from "../util/screenSize";
import { backgrounds } from "./scenes";

const { screenWidth, screenHeight } = screenSize();

type Props = { index: number; children: React.ReactNode };

export default function SceneContainer({ index, children }: Props) {
  const bottomAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const { pending, bottomY } = useSelector((state: State) => {
    return state.stack.scenes[index] || { pending: false, bottomY: 0 };
  }, shallowEqual);

  useEffect(() => {
    // TODO(?): avoid dragging outside boundary: Math.min(-bottomY, 0);
    const bottom = bottomY;
    if (pending) {
      bottomAnim.setValue(bottom);
      opacityAnim.setValue(bottom);
    } else {
      const duration = 333;
      Animated.parallel(
        [
          Animated.timing(bottomAnim, { toValue: bottom, duration }),
          Animated.timing(opacityAnim, { toValue: bottom, duration }),
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
        zIndex: 100 - index,
      }}
    >
      <Image
        source={backgrounds[index]}
        style={{ ...styles.backgroundImage }}
      />
      <View style={styles.contentContainer}>{children}</View>
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
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
