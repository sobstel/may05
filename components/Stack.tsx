import React, { useRef } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import * as R from "remeda";

import { sceneNames } from "../scenes";
import stackable from "./stackable";

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
      {R.pipe(
        sceneNames,
        R.map.indexed((name, index) => {
          const NamedStackableView = stackable(name)(View);
          return (
            <NamedStackableView
              key={name}
              style={[
                styles.container,
                {
                  backgroundColor: "transparent",
                },
              ]}
            />
          );
        }),
        R.reverse()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
