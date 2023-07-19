import React, { useState, useEffect } from "react";
import { VStack, Text, FormControl } from "native-base";
// import { MaterialIcons } from "@expo/vector-icons";
// import DropDownPicker from "react-native-dropdown-picker";
import CustomDropDownPicker from "../../../components/CustomDropDownPicker";
const CasteFilter = ({
  // filter,
  formData,
  setFormData,
  // show,
  // setShow,
  // errors,
  // setErrors,
  filterOn,
  options,
}) => {
  const [openCastes, setOpenCastes] = useState(false);
  const [caste, setCaste] = useState("");
  const handleChange = () => {
    setFormData({ ...formData, caste: caste });
  };

  useEffect(() => {
    handleChange();
  }, [caste]);

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
        <CustomDropDownPicker
          open={openCastes}
          setOpen={setOpenCastes}
          value={caste}
          setValue={setCaste}
          items={options}
          placeholder="Select Caste"
          searchable={true}
          searchPlaceholder="Search Caste here..."
          // onChangeValue={setCaste}
        />
        {/* // <Select
        //   selectedValue={formData?.caste}
        //   minWidth="200"
        //   accessibilityLabel={`Select ${filterOn}`}
        //   placeholder={`Select ${filterOn}`}
        //   _selectedItem={{
        //     bg: "primary.600",
        //     endIcon: <CheckIcon size="5" />,
        //   }}
        //   mt={1}
        //   onValueChange={(itemValue) =>
        //     setFormData({ ...formData, caste: itemValue })
        //   }
        // >
        //   {options.map((option, i) => (
        //     <Select.Item key={i} label={option?.label} value={option?.value} />
        //   ))}
        // </Select> */}
      </FormControl>
    </VStack>
  );
};

export default CasteFilter;
