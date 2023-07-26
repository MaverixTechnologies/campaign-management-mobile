import React, { useState } from "react";
import { VStack, Text, FormControl } from "native-base";
import CustomDropDownPicker from "../../../components/CustomDropDownPicker";

const GenderFilter = ({
  // filter,
  formData,
  setFormData,
  // show,
  // setShow,
  // errors,
  // setErrors,
  filterOn,
}) => {
  const [openGenders, setOpenGenders] = useState(false);
  const [gender, setGender] = useState("");

  const options = [
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
    { label: "THIRD", value: "THIRD" },
  ];
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
        <FormControl.Label htmlFor="gender">
          <Text fontWeight={"semibold"} fontSize="14">
            Filter voters on {filterOn}
          </Text>
        </FormControl.Label>
        <CustomDropDownPicker
          open={openGenders}
          setOpen={setOpenGenders}
          value={gender}
          setValue={setGender}
          items={options}
          placeholder="Select Gender"
          onSelectItem={(item) =>
            setFormData({ ...formData, gender: item.value })
          }
        />
      </FormControl>
    </VStack>
  );
};

export default GenderFilter;
