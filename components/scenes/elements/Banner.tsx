import React from "react";

import { Container } from "./Container";
import { Text } from "./Text";

type Props = { quote: string; hint?: string };

export function Banner({ quote, hint }: Props) {
  return (
    <Container>
      <Text>{quote}</Text>
    </Container>
  );
}
