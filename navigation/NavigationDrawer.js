import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Box } from "native-base";
import NavigationContent from "./NavigationContent";
import AddVoter from "../screens/Voters/AddVoter";
import Dashboard from "../screens/Dashboard";
import SearchVoters from "../screens/Voters/SearchVoters";
// import AddMandalIncharge from "../screens/Mandals/AddMandalIncharge";
import Mandals from "../screens/Mandals";
import Sectors from "../screens/Sectors";
import Booths from "../screens/Booths";
// import Pollings from "../screens/Pollings";
import { useSelector } from "react-redux";

global.__reanimatedWorkletInit = () => {};
const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  const { userProfile } = useSelector((state) => state.auth);
  return (
    <Box flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <NavigationContent {...props} />}
      >
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        {userProfile?.role === "MLA" ? (
          <Drawer.Screen name="Mandals" component={Mandals} />
        ) : null}
        {userProfile?.role === "MLA" ||
        userProfile?.role === "MANDAL_INCHARGE" ? (
          <Drawer.Screen name="Sectors" component={Sectors} />
        ) : null}
        {userProfile?.role === "MLA" ||
        userProfile?.role === "MANDAL_INCHARGE" ||
        userProfile?.role === "SECTOR_INCHARGE" ? (
          <Drawer.Screen name="Booths" component={Booths} />
        ) : null}
        {/* <Drawer.Screen name="Pollings" component={Pollings} /> */}
        {userProfile?.role === "MLA" ? (
          <Drawer.Screen name="Search Voters" component={SearchVoters} />
        ) : null}
        <Drawer.Screen name="Add Voter" component={AddVoter} />
      </Drawer.Navigator>
    </Box>
  );
}
