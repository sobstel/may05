import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import React, { useState } from "react";
import { Alert, StyleSheet, StatusBar, View } from "react-native";
import { Provider } from "react-redux";

import backgrounds from "../assets/bg";
import store from "../store";
import Stack from "./Stack";

async function cacheResourcesAsync() {
  // preload only first one to avoid flickering of other backgrounds
  await Asset.fromModule(backgrounds[0]).downloadAsync();
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
