import React from "react";
import AllMandals from "./AllMandals";
import MandalDashboard from "./MandalDashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddMandalIncharge from "./AddMandalIncharge";
import AllMandalIncharges from "./AllMandalIncharges";
const Stack = createNativeStackNavigator();

const Mandals = () => {
  return (
    <Stack.Navigator initialRouteName={"AllMandals"} headerMode="screen">
      <Stack.Screen
        name="AllMandals"
        component={AllMandals}
        headerShown={false}
        options={{ headerMode: "none", headerShown: false }}
      />
      <Stack.Screen
        name="AllMandalIncharges"
        component={AllMandalIncharges}
        options={{
          headerShown: false,
          title: "All Mandal Incharges",
        }}
      />
      <Stack.Screen
        name="MandalDashboard"
        component={MandalDashboard}
        headerShown={false}
        options={{
          headerMode: "none",
          headerShown: false,
          title: "Mandal Dashboard",
        }}
      />
      <Stack.Screen
        name="AddMandalIncharge"
        component={AddMandalIncharge}
        headerShown={false}
        options={{ headerMode: "none", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Mandals;
