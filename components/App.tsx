import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import React, { useState } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import { Provider } from "react-redux";

import store from "../store";
import Stack from "./Stack";
import { backgrounds } from "./scenes/index";

function cacheResourcesAsync() {
  return Promise.all(
    backgrounds.map((background) =>
      Asset.fromModule(background).downloadAsync()
    )
  );
}

export default function App() {
  const [isReady, setReady] = useState(false);

  if (!isReady) {
    // TODO: handle error
    return (
      <AppLoading
        startAsync={(cacheResourcesAsync as unknown) as () => Promise<void>}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

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
