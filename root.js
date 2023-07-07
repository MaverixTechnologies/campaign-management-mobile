// core
import React from "react";
import { StatusBar } from "expo-status-bar";

// components & theme
import { Spinner, View } from "native-base";

// hooks
import useCachedResources from "./hooks/useCachedResources";
import useAxiosConfig from "./hooks/useAxiosConfig";

// navigation
import Navigator from "./navigation";

export const Root = () => {
  const isLoadingComplete = useCachedResources();
  const isAxiosSetupComplete = useAxiosConfig();
  console.log("ROOT");
  return (
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
  );
};
