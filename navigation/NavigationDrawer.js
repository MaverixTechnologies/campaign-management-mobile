import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Box } from "native-base";
import NavigationContent from "./NavigationContent";
import AddVoter from "../screens/Voters/AddVoter";
import VotersList from "../screens/Voters/VotersList";
import Dashboard from "../screens/Dashboard";
import SearchVoters from "../screens/Voters/SearchVoters";
// import AddMandalIncharge from "../screens/Mandals/AddMandalIncharge";
import Mandals from "../screens/Mandals";
import Sectors from "../screens/Sectors";
import Booths from "../screens/Booths";
// import Pollings from "../screens/Pollings";

global.__reanimatedWorkletInit = () => {};
const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  return (
    <Box flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <NavigationContent {...props} />}
      >
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Mandals" component={Mandals} />
        <Drawer.Screen name="Sectors" component={Sectors} />
        <Drawer.Screen name="Booths" component={Booths} />
        {/* <Drawer.Screen name="Pollings" component={Pollings} /> */}
        <Drawer.Screen name="Search Voters" component={SearchVoters} />
        <Drawer.Screen name="Add Voter" component={AddVoter} />
        <Drawer.Screen name="All Voters" component={VotersList} />
      </Drawer.Navigator>
    </Box>
  );
}
