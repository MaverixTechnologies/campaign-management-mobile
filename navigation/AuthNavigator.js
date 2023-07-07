/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { linking } from "./linking";
// theme
// import { navDarkTheme, navLightTheme } from "../lib/theme";
// routing
import NavigationDrawer from "./NavigationDrawer";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  let initialRoute = "app";
  return (
    <NavigationContainer
      linking={linking}
      // theme={
      //   theme.config?.initialColorMode === "dark" ? navDarkTheme : navLightTheme
      // }
    >
      <Stack.Navigator initialRouteName={initialRoute} headerMode="screen">
        <Stack.Screen
          name="cms"
          component={NavigationDrawer}
          headerShown={false}
          options={{ headerMode: "none", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
