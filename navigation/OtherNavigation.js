import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Box } from "native-base";
import AddNewMember from "../screens/AddNewMember";
global.__reanimatedWorkletInit = () => {};
const Stack = createNativeStackNavigator();
export default function OtherNavigation() {
  return (
    <Box flex={1}>
      <Stack.Navigator>
        {/* Include additional screens accessible through stack navigator */}
        <Stack.Screen
          name="AddNewMember"
          component={AddNewMember}
          options={{
            title: "Add New Member",
            headerShown: true,
          }}
        />
        {/* {user.role === "MLA" && (
          <>
            <Drawer.Screen name="ScreenA" component={ScreenA} />
            <Drawer.Screen name="ScreenB" component={ScreenB} />
          </>
        )}
        {user.role === "MI" && (
          <>
            <Drawer.Screen name="ScreenB" component={ScreenB} />
          </>
        )} */}
        {/* {user.role === "SI" && <>Include SI role specific screens</>} */}
        {/* {user.role === "BC" && <>Include BC role specific screens</>} */}
        {/* {user.role === "BLA" && <>Include BLA role specific screens</>} */}
        {/* {user.role === "PA" && <>Include PA role specific screens</>} */}
        {/* Add more stack screens as needed */}
      </Stack.Navigator>
    </Box>
  );
}
