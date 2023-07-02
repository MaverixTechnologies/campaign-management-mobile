import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider, Spinner } from "native-base";
import { theme } from "./lib/theme";
// import { useColorScheme } from "react-native";
// redux & persister
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./lib/redux/store";
import { PersistGate } from "redux-persist/es/integration/react";
import { LinearGradient } from "expo-linear-gradient";

import { Root } from "./root";
const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};
export default function App() {
  console.log("APP");
  return (
    <NativeBaseProvider config={config}>
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
