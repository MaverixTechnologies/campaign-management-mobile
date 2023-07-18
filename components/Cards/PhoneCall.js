import React from "react";
import { Button, Icon } from "native-base";
import { Platform, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
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
      disabled={
        number === "NA" || number === "Not added" || Platform.OS === "web"
          ? true
          : false
      }
      backgroundColor={
        number === "NA" || number === "Not added" ? "amber.300" : "green.500"
      }
      leftIcon={
        <Icon
          as={Feather}
          name={
            number === "NA" || number === "Not added" ? "slash" : "phone-call"
          }
          size="sm"
        />
      }
      textTransform={"capitalize"}
      fontSize="md"
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
