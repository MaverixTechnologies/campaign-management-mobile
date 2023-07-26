import AllBooths from "./AllBooths";
import React from "react";
// import MandalDashboard from "./MandalDashboard";
import BoothDashboard from "./BoothDashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddBLA from "./AddBLA";
// import AllBLAs from "./AllBLAs";
// import AllPAs from "../Pollings/AllAgents";
const Stack = createNativeStackNavigator();

const Booths = () => {
  return (
    <Stack.Navigator initialRouteName={"AllMandals"} headerMode="screen">
      <Stack.Screen
        name="AllBooths"
        component={AllBooths}
        headerShown={false}
        options={{ headerMode: "none", headerShown: false }}
      />
      {/* <Stack.Screen
        name="AllBLAs"
        component={AllBLAs}
        options={{
          headerShown: false,
          title: "All BLA",
        }}
      />
      <Stack.Screen
        name="AllPAs"
        component={AllPAs}
        options={{
          headerShown: false,
          title: "All PA",
        }}
      /> */}
      <Stack.Screen
        name="BoothDashboard"
        component={BoothDashboard}
        headerShown={false}
        options={{ headerMode: "none", headerShown: false }}
      />
      <Stack.Screen
        name="AddBLA"
        component={AddBLA}
        headerShown={false}
        options={{ headerMode: "none", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Booths;
