import React, { useRef } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import * as R from "remeda";

import scenes from "../config/scenes";
import SceneContainer from "./SceneContainer";

export default function Stack() {
  const dispatch = useDispatch();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) =>
        dispatch({ type: "RESPONDER_GRANT", gestureState }),
      onPanResponderMove: (_, gestureState) =>
        dispatch({ type: "RESPONDER_MOVED", gestureState }),
      onPanResponderRelease: (_, gestureState) =>
        dispatch({ type: "RESPONDER_RELEASED", gestureState }),
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {R.map.indexed(scenes, (scene, index) => {
        return (
          <SceneContainer key={index} index={index}>
            {scene}
          </SceneContainer>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
