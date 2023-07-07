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
import { SignInScreen } from "../screens/SignInScreen";

const Stack = createNativeStackNavigator();

export default function UnAuthNavigator() {
  return (
    <NavigationContainer
      linking={linking}
      // theme={
      //   theme.config?.initialColorMode === "dark" ? navDarkTheme : navLightTheme
      // }
    >
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen
          name="Signin"
          component={SignInScreen}
          options={() => ({
            title: "Signin",
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
