import React, { useRef, useState } from "react";
import {
  // Dimensions,
  PanResponder,
  StyleSheet,
  View,
  // ViewStyle,
} from "react-native";
import { useDispatch } from "react-redux";
import * as R from "remeda";
// import { useSelector } from "react-redux";

// import type { State } from "../reducers";
import { names, colors } from "../scenes";
import stackable from "./stackable";

// const screenHeight = Math.round(Dimensions.get("window").height);

export default function Stack() {
  const dispatch = useDispatch();

  // const items = useSelector((state: State) => state.stack.items);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (_, gestureState) => {
        // console.log(evt, gestureState);
        // Animated.spring(animatedHeight, {
        // toValue: Math.max(gestureState.moveY, 100),
        // }).start();
        // animatedHeight.setValue(Math.max(gestureState.moveY, 100));
        // setPosY(gestureState.moveY);
        dispatch({ type: "RESPONDER_MOVE", gestureState });
      },
      onPanResponderRelease: (_, gestureState) => {
        // Animated.spring(animatedHeight, {
        //   toValue: gestureState.moveY > 300 ? 550 : 100,
        //   speed: 100,
        // }).start();
        dispatch({ type: "RESPONDER_RELEASE", gestureState });
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {R.pipe(
        names,
        R.reverse(),
        R.map.indexed((name, reversedIndex) => {
          const index = names.length - 1 - reversedIndex;
          const ItemView = stackable(name)(View);

          // It's ok to use index as a key as scenes order never changes
          return (
            <ItemView
              key={name}
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: colors[index] },
              ]}
            />
          );
        })
      )}
    </View>
  );
}

// {
/* <View style={styles.container} {...panResponder.panHandlers}>
  <Animated.View // Special animatable View
    style={{
      width: 250,
      // height: 50,
      backgroundColor: "powderblue",
      height: animatedHeight, // Bind opacity to animated value
    }}
  >
    <Text style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
      Fading in
    </Text>
  </Animated.View>
</View>; */
// }

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "#ccc",
    // alignItems: "center",
  },
  item: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
