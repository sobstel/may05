import React, { useRef, useEffect } from "react";
import { Animated, PanResponder, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as R from "remeda";

import { SCENES_COUNT } from "../config";
import type { State } from "../reducers";
import { SceneContainer } from "./SceneContainer";

function momentumMove(dy: number) {
  const { abs, max, log2, round, sign } = Math;
  return R.pipe(
    dy,
    abs,
    (value) => max(1, value),
    log2,
    (value) => value * 7,
    round,
    (value) => sign(dy) * value
  );
}

export default function Stack() {
  const bottomAnim = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const dy = useSelector((state: State) => state.stack.dy);

  useEffect(() => {
    if (dy === 0) {
      Animated.timing(bottomAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      bottomAnim.setValue(Math.max(momentumMove(dy), 0));
    }
  }, [dy]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, _gestureState) => true,
      onPanResponderGrant: (_evt, gestureState) =>
        dispatch({ type: "RESPONDER_GRANT", gestureState }),
      onPanResponderMove: (_evt, gestureState) =>
        dispatch({ type: "RESPONDER_MOVED", gestureState }),
      onPanResponderRelease: (_evt, gestureState) =>
        dispatch({ type: "RESPONDER_RELEASED", gestureState }),
    })
  ).current;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: bottomAnim }] }]}
      {...panResponder.panHandlers}
    >
      {R.range(0, SCENES_COUNT).map((index) => (
        <SceneContainer key={index} index={index} />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
});
