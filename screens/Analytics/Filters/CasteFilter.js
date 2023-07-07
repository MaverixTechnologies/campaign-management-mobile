import React from "react";
import { VStack, Text, FormControl, Select, CheckIcon } from "native-base";
// import { MaterialIcons } from "@expo/vector-icons";
// import DropDownPicker from "react-native-dropdown-picker";

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
        {/* <DropDownPicker
          items={options}
          // value={value}
          value={formData?.caste}
          // containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{ justifyContent: "flex-start" }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          searchable={true} // Enable search functionality
          searchablePlaceholder="Search for an option"
          searchablePlaceholderTextColor="gray"
          placeholder={`Select ${filterOn}`}
          searchableError={() => <Text>Option not found</Text>} // Custom error message for search
          onChangeItem={(item) =>
            setFormData({ ...formData, caste: item.value })
          }
          dropDownContainerStyle={{
            backgroundColor: "#dfdfdf",
          }}
        /> */}
        <Select
          selectedValue={formData?.caste}
          minWidth="200"
          accessibilityLabel={`Select ${filterOn}`}
          placeholder={`Select ${filterOn}`}
          _selectedItem={{
            bg: "primary.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) =>
            setFormData({ ...formData, caste: itemValue })
          }
        >
          {options.map((option, i) => (
            <Select.Item key={i} label={option?.label} value={option?.value} />
          ))}
        </Select>
      </FormControl>
    </VStack>
  );
};

export default CasteFilter;
