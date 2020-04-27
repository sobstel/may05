import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import React, { useState } from "react";
import { Alert, StyleSheet, StatusBar, View } from "react-native";
import { Provider } from "react-redux";

import backgrounds from "../assets/bg";
import store from "../store";
import Stack from "./Stack";

async function cacheResourcesAsync() {
  await Promise.all(
    backgrounds.map((background) =>
      Asset.fromModule(background).downloadAsync()
    )
  );
}

export function App() {
  const [isReady, setReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={() => setReady(true)}
        onError={(err) =>
          Alert.alert("Error", err.message, [], { cancelable: false })
        }
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
    backgroundColor: "#000",
  },
});
