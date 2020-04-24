import React from "react";
import { StyleSheet, View } from "react-native";

export default function CeroScene() {
  return (
    <View style={styles.container}>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: "red",
  },
});
