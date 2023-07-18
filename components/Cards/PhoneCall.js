import React from "react";
import { Button } from "native-base";
import { Platform, Linking } from "react-native";
const PhoneCall = ({ number }) => {
  const makePhoneCall = (num) => {
    if (number !== "NA" || number !== "Not added") {
      if (Platform.OS === "android") {
        Linking.openURL(`tel:${num}`);
      } else {
        Linking.openURL(`telprompt:${num}`);
      }
    }
  };
  return (
    <Button
      onPress={() => makePhoneCall(number)}
      rounded={"full"}
      p={1}
      backgroundColor={
        number === "NA" || number === "Not added" ? "amber.300" : "green.500"
      }
      textTransform={"capitalize"}
      fontSize="md"
      //   _light={{
      //     color: "primary.800",
      //   }}
      //   color={"primary.800"}
      //   _dark={{
      //     color: "gray.50",
      //   }}
      fontStyle={{
        color: "primary.800",
      }}
      fontWeight="500"
    >
      {number}
    </Button>
  );
};

export default PhoneCall;
