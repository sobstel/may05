import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function Button({ label }: { label: string }) {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

// 2 * Math.round(underbust / 2);

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
  label: {
    color: "#eee",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Avenir-Book",
  },
});
