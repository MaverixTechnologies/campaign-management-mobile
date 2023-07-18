// core
import React from "react";
import { StatusBar } from "expo-status-bar";

// components & theme
import { Spinner, View } from "native-base";
// import InternetConnectionPrompt from "./components/InternetConnectionPrompt";

// hooks
import useCachedResources from "./hooks/useCachedResources";
import useAxiosConfig from "./hooks/useAxiosConfig";

// navigation
import Navigator from "./navigation";

export const Root = () => {
  const isLoadingComplete = useCachedResources();
  const isAxiosSetupComplete = useAxiosConfig();

  // const handleRetry = async () => {
  //   const { isConnected } = await Network.getNetworkStateAsync();
  //   setIsConnected(isConnected);

  //   if (isConnected) {
  //     setIsConnected(true);
  //   }
  // };

  return (
    // <>
    //   {!isConnected && Platform.OS !== "web" ? (
    //     <InternetConnectionPrompt
    //       setIsConnected={setIsConnected}
    //       isConnected={isConnected}
    //     />
    //   ) : (
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
    //   )}
    // </>
  );
};
