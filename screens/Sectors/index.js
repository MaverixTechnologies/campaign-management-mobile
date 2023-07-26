import React from "react";
import AllSectors from "./AllSectors";
// import AllSectorIncharges from "./AllSectorIncharges";
import SectorDashboard from "./SectorDashboard";
import AddSectorIncharge from "./AddSectorIncharge";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Sectors = () => {
  return (
    <Stack.Navigator initialRouteName={"AllSectors"} headerMode="screen">
      <Stack.Screen
        name="AllSectors"
        component={AllSectors}
        headerShown={false}
        options={{ headerMode: "none", headerShown: false }}
      />
      {/* <Stack.Screen
        name="AllSectorIncharges"
        component={AllSectorIncharges}
        headerShown={false}
        options={{
          headerShown: false,
          title: "All Sector Incharges",
        }}
      /> */}
      <Stack.Screen
        name="SectorDashboard"
        component={SectorDashboard}
        headerShown={false}
        options={{
          headerShown: false,
          title: "Sector Dashboard",
        }}
      />
      <Stack.Screen
        name="AddSectorIncharge"
        component={AddSectorIncharge}
        headerShown={false}
        options={{
          headerShown: false,
          title: "Add Sector Incharge",
        }}
      />
    </Stack.Navigator>
  );
};

export default Sectors;
