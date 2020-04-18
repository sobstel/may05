import { Dimensions } from "react-native";

export default function screenSize() {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);
  return { screenWidth, screenHeight };
}
