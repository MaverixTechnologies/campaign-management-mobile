import React, { useState } from "react";
import { VStack, Text, FormControl } from "native-base";
import CustomDropDownPicker from "../../../components/CustomDropDownPicker";
const CasteFilter = ({ formData, setFormData, filterOn, options }) => {
  const [openCastes, setOpenCastes] = useState(false);
  const [caste, setCaste] = useState("");

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
          items={options.sort((a, b) => a.label.localeCompare(b.label))}
          placeholder="Select Caste"
          searchable={true}
          searchPlaceholder="Search Caste here..."
          onSelectItem={(item) =>
            setFormData({ ...formData, caste: item.value })
          }
        />
      </FormControl>
    </VStack>
  );
};

export default CasteFilter;
