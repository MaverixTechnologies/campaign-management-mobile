import React from "react";
import { Text, Center } from "native-base";

const AllBLAs = (props) => {
  return (
    <Center>
      <Text mt="12" fontSize="18">
        This is {props.route.name} page.
      </Text>
    </Center>
  );
};

export default AllBLAs;
