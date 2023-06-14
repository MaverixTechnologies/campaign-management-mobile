/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { linking } from "./linking";
// theme
import { navDarkTheme, navLightTheme } from "../lib/theme";
// routing
import { SignInScreen } from "../screens/SignInScreen";
// import SplashScreen from "../screens/SplashScreen";
import NavigationDrawer from "./NavigationDrawer";
// import OtherNavigation from "./OtherNavigation";
// state(redux)
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export default function Navigator({ theme }) {
  const { user, token, userRole } = useSelector((state) => state.auth);
  let initialRoute = "app";
  return (
    <>
      {user && token ? (
        // Authenticated users rooting
        <NavigationContainer
          linking={linking}
          theme={
            theme.config?.initialColorMode === "dark"
              ? navDarkTheme
              : navLightTheme
          }
        >
          <Stack.Navigator initialRouteName={initialRoute} headerMode="screen">
            {/* <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                title: "",
                headerShown: false,
              }}
            /> */}
            <Stack.Screen
              name="cms"
              component={NavigationDrawer}
              headerShown={false}
              options={{ headerMode: "none", headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        // NOT authenticated users rooting
        <NavigationContainer
          linking={linking}
          theme={
            theme.config?.initialColorMode === "dark"
              ? navDarkTheme
              : navLightTheme
          }
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
      )}
    </>
  );
}
