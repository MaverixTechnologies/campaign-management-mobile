import React, { useState } from "react";
import { Box, Input, Modal, Pressable, ScrollView, Text } from "native-base";

const CustomSelect = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredOptions = options?.filter((option) =>
    option?.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Pressable onPress={handleOpen}>
        <Input
          placeholder={placeholder}
          value={selectedOption ? selectedOption.label : ""}
          isReadOnly
        />
      </Pressable>

      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <Modal.Content>
          <Modal.CloseButton />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <ScrollView maxHeight={400}>
            {filteredOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleSelectOption(option)}
                p={2}
                _pressed={{ backgroundColor: "gray.100" }}
              >
                <Text>{option.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default CustomSelect;
