import React from "react";
import { StyleSheet } from "react-native";

import { Container } from "./Container";
import { Text } from "./Text";

type Props = { quote: string; hint?: string };

export function Banner({ quote, hint }: Props) {
  return (
    <Container>
      <Text key="quote" style={styles.quote}>
        {quote}
      </Text>
      {hint && (
        <Text key="hint" style={styles.hint}>
          {hint}
        </Text>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  quote: {
    marginHorizontal: 20,
    textAlign: "center",
  },
  hint: {
    marginTop: 30,
    fontSize: 12,
    fontWeight: "normal",
    textAlign: "center",
    color: "#aaa",
  },
});
