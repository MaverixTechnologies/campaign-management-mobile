import React from "react";
import { Text, Center } from "native-base";

const SearchBLA = (props) => {
  return (
    <Center>
      <Text mt="12" fontSize="18">
        This is {props.route.name} page.
      </Text>
    </Center>
  );
};

export default SearchBLA;
