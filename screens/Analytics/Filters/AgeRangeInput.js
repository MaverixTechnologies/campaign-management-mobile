import React, { useState } from "react";
import { HStack, Text, Input, FormControl } from "native-base";
// import { MaterialIcons } from "@expo/vector-icons";

const AgeRangeInput = ({
  // filter,
  formData,
  setFormData,
  // show,
  // setShow,
  // errors,
  // setErrors,
  // filterOn,
}) => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const onChangeAge = (label, value) => {
    label === "start" ? setStart(value) : setEnd(value);
    let tempAges = {
      age_min: start,
      age_max: end,
    };

    setFormData({ ...formData, ...tempAges });
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
      <FormControl isRequired>
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
            value={formData?.start}
            onChangeText={(value) => onChangeAge("start", value)}
          />
          <Input
            placeholder="End Age"
            width="120px"
            keyboardType="numeric"
            value={formData?.end}
            onChangeText={(value) => onChangeAge("end", value)}
          />
        </HStack>
      </FormControl>
    </HStack>
  );
};

export default AgeRangeInput;
