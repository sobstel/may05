import React from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { Provider } from "react-redux";

import store from "../store";
import Stack from "./Stack";

export default function App() {
  // const [animatedHeight] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  // useEffect(() => {
  //   Animated.spring(animatedHeight, {
  //     toValue: 100,
  //   }).start();
  // }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Stack />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
