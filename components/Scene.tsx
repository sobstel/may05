import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { useSelector, shallowEqual } from "react-redux";
import * as R from "remeda";

import type { State } from "../reducers";
import type { SCENE_NAME } from "../scenes";
import screenSize from "../util/screenSize";
import usePrevious from "./usePrevious";

type Props = { name: SCENE_NAME; children: React.ReactNode };

const { screenHeight } = screenSize();

export default function Scene({ name, children }: Props) {
  const top = useRef(new Animated.Value(0)).current;
  const bottom = useRef(new Animated.Value(0)).current;

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
    const nextTop = -bottomY; // Math.max(-bottomY, 0);
    const nextBottom = bottomY; // Math.min(bottomY, 0);
    if (pending) {
      top.setValue(nextTop);
      bottom.setValue(nextBottom);
    } else {
      Animated.parallel([
        Animated.spring(top, { toValue: nextTop, damping: 20 }),
        Animated.spring(bottom, { toValue: nextBottom }),
      ]).start();
    }
  }, [bottomY]);

  // useEffect(() => {
  //   if (prevEffect === "slideUp") {
  //     const toValue = 0; //transition.dy;
  //     // TODO: use timing animations
  //     Animated.parallel([
  //       Animated.spring(top, { toValue: Math.min(-toValue, 0), damping: 20 }),
  //       Animated.spring(bottom, { toValue: Math.max(toValue, 0) }),
  //     ]).start();
  //   }
  // }, [transition.effect]);

  // const isActive = useSelector((state: State) => state.stack.current === name);
  // const transitionDirection = useSelector(
  //   (state: State) =>
  //     isActive && state.stack.transition && state.stack.transition.direction
  // );
  // const transitionY = useSelector(
  //   (state: State) =>
  //     isActive && state.stack.transition && state.stack.transition.y
  // );

  // useEffect(() => {
  //   if (!isActive || !transitionY) return;

  //   // animation top
  //   top.setValue(Math.min(transitionY, 0));
  //   bottom.setValue(Math.max(-transitionY, 0));
  // }, [transitionY]);

  // useEffect(() => {
  //   const toValue = isActive ? 0 : screenHeight;
  //   Animated.parallel([
  //     Animated.spring(top, { toValue: -toValue }),
  //     Animated.spring(bottom, { toValue }),
  //   ]).start();
  // }, [transitionDirection]);

  // console.log(name, isActive, transitionDirection, transitionY);

  return (
    <Animated.View style={{ ...StyleSheet.absoluteFillObject, top, bottom }}>
      {children}
    </Animated.View>
  );
}
