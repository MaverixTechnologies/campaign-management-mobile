import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Box, useTheme } from "native-base";
import NavigationContent from "./NavigationContent";
import AddVoter from "../screens/Voters/AddVoter";
import Dashboard from "../screens/Dashboard";
// import SearchVoters from "../screens/Voters/SearchVoters";
// import AddMandalIncharge from "../screens/Mandals/AddMandalIncharge";
import Mandals from "../screens/Mandals";
import Sectors from "../screens/Sectors";
import Booths from "../screens/Booths";
import Voters from "../screens/Analytics/Voters";
import Zone from "../screens/Analytics/Zone";
import Previous from "../screens/Analytics/Previous";
import Filters from "../screens/Analytics/Filters";
// import Pollings from "../screens/Pollings";
import { useSelector } from "react-redux";

global.__reanimatedWorkletInit = () => {};
const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  const { userProfile } = useSelector((state) => state.auth);
  // Custom styles for the drawer sidebar and header
  const theme = useTheme();

  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.colors.primary[600],
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    drawerStyle: {
      width: "80%", // Adjust the width of the drawer here
    },
  };
  return (
    <Box flex={1} bgColor={"primary.400"}>
      <Drawer.Navigator
        drawerContent={(props) => <NavigationContent {...props} />}
        screenOptions={screenOptions}
      >
        {/* <Drawer.Screen name="Voters Analytics" component={Voters} /> */}

        {/* <Drawer.Screen name="Filter Voters" component={Filters} /> */}

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
        {userProfile?.role === "MLA" ? (
          <>
            <Drawer.Screen name="Filter Voters" component={Filters} />
            {/* <Drawer.Screen name="Search Voters" component={SearchVoters} /> */}
            <Drawer.Screen name="Voters Analytics" component={Voters} />
            <Drawer.Screen name="Zone Analytics" component={Zone} />
            <Drawer.Screen name="Previous Result" component={Previous} />
          </>
        ) : null}
        <Drawer.Screen name="Add Voter" component={AddVoter} />
      </Drawer.Navigator>
    </Box>
  );
}
