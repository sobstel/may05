import React, { useRef } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import * as R from "remeda";

import { sceneStateKeys } from "../config";
import { SceneContainer } from "./SceneContainer";
import { SceneContent } from "./SceneContent";

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
      {R.map.indexed(sceneStateKeys, (stateKey, index) => {
        return (
          <SceneContainer key={index} index={index}>
            <SceneContent stateKey={stateKey} index={index} />
          </SceneContainer>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
});
