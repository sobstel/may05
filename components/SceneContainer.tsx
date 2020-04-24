import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useSelector, shallowEqual } from "react-redux";

import { backgrounds, scenesCount } from "../config";
import type { State } from "../reducers";
import screenSize from "../util/screenSize";
import { SlideHint } from "./SlideHint";

const { screenWidth, screenHeight } = screenSize();

type Props = { index: number; children: React.ReactNode };

export function SceneContainer({ index, children }: Props) {
  const bottomAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const { pending, bottom } = useSelector((state: State) => {
    return state.stack.scenes[index] || { pending: false, bottom: 0 };
  }, shallowEqual);

  const { pending: prevPending, bottom: prevBottom } = useSelector(
    (state: State) => {
      return state.stack.scenes[index - 1] || { pending: false, bottom: 0 };
    },
    shallowEqual
  );

  useEffect(() => {
    const nextBottom = Math.max(bottom, 0);
    if (pending) {
      bottomAnim.setValue(nextBottom);
      opacityAnim.setValue(nextBottom);
    } else {
      const duration = 333;
      Animated.parallel([
        Animated.timing(bottomAnim, { toValue: nextBottom, duration }),
        Animated.timing(opacityAnim, { toValue: nextBottom, duration }),
      ]).start();
    }
  }, [bottom]);

  useEffect(() => {
    if (index === 0) return;

    const nextBottom = screenHeight - Math.max(prevBottom, 0);
    if (prevPending) {
      opacityAnim.setValue(nextBottom);
    } else {
      Animated.timing(opacityAnim, {
        toValue: nextBottom,
        duration: 333,
      }).start();
    }
  }, [prevBottom]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        bottom: bottomAnim,
        opacity: opacityAnim.interpolate({
          inputRange: [50, screenHeight - 50],
          outputRange: [1, 0],
          extrapolate: "clamp",
        }),
        zIndex: 100 - index,
      }}
    >
      <Image
        source={backgrounds[index]}
        style={{ ...styles.backgroundImage }}
      />
      {index > 0 && <SlideHint type="top" text="⇣" />}
      {index < scenesCount - 1 && <SlideHint type="bottom" text="⇡" />}
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
    bottom: 0,
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
