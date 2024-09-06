// import AllBooths from "./AllBooths";
import UploadForm17C from "./UploadForm17C";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AllBLAs from "./AllBLAs";
// import AllPAs from "../Pollings/AllAgents";
const Stack = createNativeStackNavigator();

const ImageUpload = () => {
  return (
    <Stack.Navigator initialRouteName={"ImageUpload"} headerMode="screen">
      <Stack.Screen
        name="ImageUpload"
        component={UploadForm17C}
        headerShown={false}
        options={{ headerMode: "none", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ImageUpload;
