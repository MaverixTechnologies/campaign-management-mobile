// core
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import * as Network from "expo-network";

// components & theme
import { Spinner, View } from "native-base";
import InternetConnectionPrompt from "./components/InternetConnectionPrompt";

// hooks
import useCachedResources from "./hooks/useCachedResources";
import useAxiosConfig from "./hooks/useAxiosConfig";
import * as Updates from "expo-updates";

// navigation
import Navigator from "./navigation";

export const Root = () => {
  const isLoadingComplete = useCachedResources();
  const isAxiosSetupComplete = useAxiosConfig();
  const [isConnected, setIsConnected] = useState(false);

  // const handleRetry = async () => {
  //   const { isConnected } = await Network.getNetworkStateAsync();
  //   setIsConnected(isConnected);

  //   if (isConnected) {
  //     setIsConnected(true);
  //   }
  // };

  async function onFetchUpdateAsync() {
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

  if (Platform.OS !== "web" && isConnected) {
    onFetchUpdateAsync(); // Call the function on app launch
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      !isConnected && alert(`No Internet Connection`);
      setIsConnected(isConnected);
    };

    checkInternetConnection();
  }, []);
  return (
    <>
      {!isConnected && Platform.OS !== "web" ? (
        <InternetConnectionPrompt
          setIsConnected={setIsConnected}
          isConnected={isConnected}
        />
      ) : (
        <>
          {!isLoadingComplete && !isAxiosSetupComplete ? (
            <View justifyContent={"center"} alignItems={"center"} h={"full"}>
              <Spinner alignSelf={"center"} size="lg" />
            </View>
          ) : null}
          {isLoadingComplete && isAxiosSetupComplete ? (
            <>
              <Navigator />
              <StatusBar />
            </>
          ) : null}
        </>
      )}
    </>
  );
};
