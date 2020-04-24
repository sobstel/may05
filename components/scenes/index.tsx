import React from "react";
import { View } from "react-native";

import { EscenaCero } from "./EscenaCero";
import { EscenaPrimera } from "./EscenaPrimera";

const scenes = [
  <EscenaCero />,
  <EscenaPrimera />,
  <View />,
  <View />,
  <View />,
  <View />,
];
export default scenes;

export const scenesCount = scenes.length;

export { default as backgrounds } from "../../assets/bg";
