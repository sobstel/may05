import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useSelector, shallowEqual } from "react-redux";
import * as R from "remeda";

import type { State } from "../reducers";
import type { SCENE_NAME } from "../scenes";
import { backgrounds } from "../scenes";
import screenSize from "../util/screenSize";

// import usePrevious from "./usePrevious";

// const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const { screenWidth, screenHeight } = screenSize();

type Props = { name: SCENE_NAME; children: React.ReactNode };

export default function Scene({ name, children }: Props) {
  const top = useRef(new Animated.Value(0)).current;
  const bottom = useRef(new Animated.Value(0)).current;
  const intensity = useRef(new Animated.Value(0)).current;

  const { pending, bottomY } = useSelector((state: State) => {
    return (
      R.find(state.stack.scenes, (scene) => scene.name === name) ?? {
        name,
        pending: false,
        bottomY: 0,
        intensity: 100,
      }
    );
  }, shallowEqual);

  // const prevEffect = usePrevious(transition.effect);

  useEffect(() => {
    const topValue = -bottomY; // Math.min(-bottomY, 0);
    const bottomValue = bottomY; // Math.max(bottomY, 0);
    if (pending) {
      top.setValue(topValue);
      bottom.setValue(bottomValue);
      intensity.setValue(bottomValue);
    } else {
      const duration = 333;
      Animated.parallel(
        [
          Animated.timing(top, { toValue: topValue, duration }),
          Animated.timing(bottom, { toValue: bottomValue, duration }),
          Animated.timing(intensity, { toValue: bottomValue, duration }),
        ],
        { stopTogether: false }
      ).start();
    }
  }, [bottomY]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        top,
        bottom,
        opacity: intensity.interpolate({
          inputRange: [0, screenHeight],
          outputRange: [1, 0],
        }),
      }}
    >
      <Image source={backgrounds[name]} style={{ ...styles.backgroundImage }} />
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: "cover",
  },
});
