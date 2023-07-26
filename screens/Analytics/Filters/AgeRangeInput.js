import React, { useState } from "react";
import { HStack, Text, Input, FormControl } from "native-base";
// import { MaterialIcons } from "@expo/vector-icons";
const AgeRangeInput = ({ formData, setFormData }) => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [error, setError] = useState(null);

  const validateAges = () => {
    if (start < 18) {
      setError({ age: "Age must be above 18 to be a valid voter." });
    } else if (start > end) {
      setError({ age: "Start age should be less than the End age." });
    } else {
      setError(null);
    }
  };
  return (
    <HStack
      width="90%"
      space={2}
      py={2}
      mx="auto"
      maxW="600px"
      alignItems="center"
      justifyContent={"space-between"}
      overflow={"scroll"}
    >
      <FormControl isInvalid={error?.age}>
        <FormControl.Label htmlFor="start_age">
          <Text fontWeight={"semibold"} fontSize="14">
            Enter the Start & End Age
          </Text>
        </FormControl.Label>
        <HStack justifyContent={"space-between"}>
          <Input
            placeholder="Start Age"
            width="120px"
            keyboardType="numeric"
            value={start}
            onChangeText={(value) => {
              setStart(value);
              setFormData({ ...formData, ...{ age_min: value } });
              validateAges();
            }}
          />
          <Input
            placeholder="End Age"
            width="120px"
            keyboardType="numeric"
            value={end}
            onChangeText={(value) => {
              setEnd(value);
              setFormData({ ...formData, ...{ age_max: value } });
              validateAges();
            }}
          />
        </HStack>
        {/* {error && (
          <FormControl.ErrorMessage>{error.age}</FormControl.ErrorMessage>
        )} */}
      </FormControl>
    </HStack>
  );
};

export default AgeRangeInput;
