import React, { useState, useEffect } from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider, Spinner } from "native-base";
import { theme } from "./lib/theme";
import * as Network from "expo-network";
import { Platform } from "react-native";

// import { useColorScheme } from "react-native";
// redux & persister
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./lib/redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import { LinearGradient } from "expo-linear-gradient";
import * as Updates from "expo-updates";
import { Root } from "./root";
const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};
export default function App() {
  // const [isConnected, setIsConnected] = useState(false);
  async function onFetchUpdateAsync() {
    const { isConnected } = await Network.getNetworkStateAsync();
    if (!isConnected) {
      alert(`No Internet Connection`);
    } else {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          alert(`New Update is Available Downloading now...`);
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        // You can also add an alert() to see the error message in case of an error when fetching updates.
        alert(`Error fetching latest Expo update: ${error}`);
      }
    }
  }

  if (Platform.OS !== "web") {
    onFetchUpdateAsync(); // Call the function on app launch
  }

  // const checkInternetConnection = async () => {
  //   const { isConnected } = await Network.getNetworkStateAsync();
  //   !isConnected && alert(`No Internet Connection`);
  //   setIsConnected(isConnected);
  // };

  // useEffect(() => {
  //   checkInternetConnection();
  // }, []);

  return (
    <NativeBaseProvider config={config} theme={theme}>
      <ReduxProvider store={store}>
        <PersistGate loading={<Spinner size="lg" />} persistor={persistor}>
          <SafeAreaProvider>
            <Root theme={theme} />
          </SafeAreaProvider>
        </PersistGate>
      </ReduxProvider>
    </NativeBaseProvider>
  );
}

// Color Switch Component
// function ToggleDarkMode() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <HStack space={2} alignItems="center">
//       <Text>Dark</Text>
//       <Switch
//         isChecked={colorMode === "light"}
//         onToggle={toggleColorMode}
//         aria-label={
//           colorMode === "light" ? "switch to dark mode" : "switch to light mode"
//         }
//       />
//       <Text>Light</Text>
//     </HStack>
//   );
// }
