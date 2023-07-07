import React from "react";
import { VStack, Text, Input, Icon, FormControl } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const NameInput = ({
  // filter,
  formData,
  setFormData,
  searchKey,
  // show,
  // setShow,
  // errors,
  // setErrors,
  filterOn,
}) => {
  return (
    <VStack
      width="90%"
      space={2}
      py={2}
      mx="auto"
      maxW="600px"
      alignItems="center"
    >
      <FormControl isRequired>
        <FormControl.Label htmlFor="voter_category">
          <Text fontWeight={"semibold"} fontSize="14">
            Filter voters on {filterOn}
          </Text>
        </FormControl.Label>
        <Input
          placeholder={`Enter ${filterOn}`}
          width="100%"
          InputRightElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="primary.600"
              as={<MaterialIcons name="search" />}
            />
          }
          onChangeText={(value) =>
            setFormData({ ...formData, [searchKey]: value })
          }
        />
      </FormControl>
    </VStack>
  );
};

export default NameInput;
