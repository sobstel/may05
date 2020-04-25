import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = { title: string; onPress: any };

export function Button({ title, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    width: 56,
    height: 56,
    backgroundColor: "rgba(10, 10, 10, 0.7)",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#eee",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Avenir-Book",
  },
});
