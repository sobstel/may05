import React from "react";
import { StyleSheet } from "react-native";

import { Container } from "./Container";
import { Text } from "./Text";

type Props = { quote: string };

export function Banner({ quote }: Props) {
  return (
    <Container>
      <Text key="quote" style={styles.quote}>
        {quote}
      </Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  quote: {
    marginHorizontal: 20,
    textAlign: "center",
  },
});
