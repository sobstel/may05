import React from "react";
import { View } from "react-native";

import CeroScene from "./CeroScene";

const scenes = [
  <CeroScene />,
  <View />,
  <View />,
  <View />,
  <View />,
  <View />,
];
export default scenes;

export const scenesCount = scenes.length;

export const backgrounds = [
  require("./bg/0.jpg"),
  require("./bg/1.jpg"),
  require("./bg/2.jpg"),
  require("./bg/3.jpg"),
  require("./bg/4.jpg"),
  require("./bg/5.jpg"),
];
