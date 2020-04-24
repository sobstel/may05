import React from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "./elements/Button";
import { Container } from "./elements/Container";

// TODO: useButtonSet

export function EscenaPrimera() {
  return (
    <Container>
      <View style={styles.row}>
        <Button label="A" />
        <Button label="B" />
        <Button label="C" />
        <Button label="D" />
      </View>

      <View style={styles.row}>
        <Button label="1" />
        <Button label="2" />
        <Button label="3" />
        <Button label="4" />
      </View>

      <View style={styles.row}>
        <Button label="I" />
        <Button label="II" />
        <Button label="III" />
        <Button label="IV" />
      </View>

      <View style={styles.row}>
        <Button label="लं" />
        <Button label="α" />
        <Button label="δ" />
        <Button label="D" />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
