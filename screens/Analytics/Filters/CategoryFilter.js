import React, { useState } from "react";
import { VStack, Text, FormControl } from "native-base";
// import DropDownPicker from "react-native-dropdown-picker";
import CustomDropDownPicker from "../../../components/CustomDropDownPicker";
const CategoryFilter = ({
  // filter,
  formData,
  setFormData,
  filterOn,
  options,
}) => {
  const [openCategories, setOpenCategories] = useState(false);
  const [category, setCategory] = useState("");

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
          open={openCategories}
          setOpen={setOpenCategories}
          value={category}
          setValue={setCategory}
          items={options.sort((a, b) => {
            if (a.label !== "NA" && b.label !== "NA") {
              return a.label.localeCompare(b.label);
            } else if (a.label === "NA") {
              return 1;
            } else {
              return -1;
            }
          })}
          placeholder="Select Category"
          // onChangeValue={(value) => setCategory(value)}
          onSelectItem={(item) =>
            setFormData({ ...formData, category: item.value })
          }
        />
      </FormControl>
    </VStack>
  );
};

export default CategoryFilter;
