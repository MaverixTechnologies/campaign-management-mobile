import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Box, useTheme } from "native-base";
import NavigationContent from "./NavigationContent";
import AddVoter from "../screens/Voters/AddVoter";
import Dashboard from "../screens/Dashboard";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
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
// import { Platform } from "react-native";

global.__reanimatedWorkletInit = () => {};
const Drawer = createDrawerNavigator();
export default function NavigationDrawer() {
  const { userProfile } = useSelector((state) => state.auth);
  // const dimensions = useWindowDimensions();

  // Custom styles for the drawer sidebar and header
  const theme = useTheme();
  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Mandals";

    switch (routeName) {
      case "AllMandalIncharges":
        return "Mandal Incharges";
      case "MandalDashboard":
        return "Mandal Dashboard";
      case "SectorDashboard":
        return "Sector Dashboard";
      case "AllSectorIncharges":
        return "Sector Incharges";
      case "AllBLAs":
        return "BLAs";
      case "BoothDashboard":
        return "Booth Dashboard";
      case "AllPAs":
        return "PAs";
      default:
        routeName;
    }
  }
  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.colors.primary[600],
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: "bold",
    },
    drawerType: screenWidth >= 768 ? "permanent" : "front",
    drawerStyle: {
      width: screenWidth >= 768 ? null : "80%", // Adjust the width of the drawer here
    },
    // headerTitle: {
    //   showHamburger: screenWidth < 768,
    // },
  };
  return (
    <Box flex={1} bgColor={"primary.400"}>
      <Drawer.Navigator
        drawerContent={(props) => <NavigationContent {...props} />}
        screenOptions={screenOptions}
        // defaultStatus={Platform.OS === "web" ? "open" : "closed"}
      >
        {/* <Drawer.Screen name="Voters Analytics" component={Voters} /> */}

        {/* <Drawer.Screen name="Filter Voters" component={Filters} /> */}

        <Drawer.Screen name="Dashboard" component={Dashboard} />
        {userProfile?.role === "MLA" ? (
          <Drawer.Screen
            // options={{ headerMode: "screen" }}
            // option={({ route }) => ({ title: route })}
            name="Mandals"
            component={Mandals}
            options={({ route }) => ({
              headerTitle: getHeaderTitle(route),
            })}
          />
        ) : null}
        {userProfile?.role === "MLA" ||
        userProfile?.role === "MANDAL_INCHARGE" ? (
          <Drawer.Screen
            name="Sectors"
            component={Sectors}
            options={({ route }) => ({
              headerTitle: getHeaderTitle(route),
            })}
          />
        ) : null}
        {userProfile?.role === "MLA" ||
        userProfile?.role === "MANDAL_INCHARGE" ||
        userProfile?.role === "SECTOR_INCHARGE" ? (
          <Drawer.Screen
            name="Booths"
            component={Booths}
            options={({ route }) => ({
              headerTitle: getHeaderTitle(route),
            })}
          />
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
