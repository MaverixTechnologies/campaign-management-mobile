import React from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const CustomDropDownPicker = (props) => {
  return (
    <View style={styles.container}>
      <DropDownPicker
        // containerStyle={styles.pickerContainer}
        style={styles.picker}
        labelStyle={styles.label}
        activeLabelStyle={styles.activeLabel}
        dropDownMaxHeight={200}
        placeholderStyle={styles.placeholderStyle} // Add this line for placeholder style
        dropDownContainerStyle={styles.dropDownContainerStyle} // Add this line for dropdown modal style
        dropDownItemStyle={styles.dropDownItemStyle} // Add this line for dropdown item style
        // selectedLabelStyle={styles.selectedLabelStyle} // Add this line for selected value style
        itemSeparator={true}
        itemSeparatorStyle={styles.itemSeparatorStyle}
        selectedItemContainerStyle={styles.selectedItemContainerStyle}
        listItemContainer={styles.listItemContainer}
        searchTextInputProps={{
          maxLength: 25,
        }}
        searchContainerStyle={{
          borderBottomColor: "#9DCAFF",
        }}
        searchTextInputStyle={{
          color: "#000",
          borderColor: "#0061A3",
        }}
        searchPlaceholderTextColor="#354550"
        listMode="MODAL"
        closeAfterSelecting={true}
        modalAnimationType="slide"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  //   pickerContainer: {
  //     borderRadius: 8,
  //   },
  picker: {
    backgroundColor: "#fff",
    // borderWidth: 1,
    borderColor: "#0061A3",
    borderRadius: 8,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: "#354550",
  },
  activeLabel: {
    color: "#5188E3",
  },
  placeholderStyle: {
    color: "#354550", // Placeholder text color
    fontSize: 16, // Placeholder font size
    // paddingHorizontal: 4, // Placeholder horizontal padding
  },
  dropDownContainerStyle: {
    backgroundColor: "#fff244", // Dropdown modal background color
    borderWidth: 1,
    borderColor: "#ccc",
    // borderRadius: 8,
  },
  dropDownItemStyle: {
    justifyContent: "flex-start",
  },
  //   selectedLabelStyle: {
  //     color: "#5188E3", // Selected value color
  //   },
  listItemContainer: {
    height: 60,
  },
  selectedItemContainerStyle: {
    backgroundColor: "#D1E4FF",
    color: "#fff",
  },
  itemSeparatorStyle: {
    backgroundColor: "#E9F1FF",
  },
});

export default CustomDropDownPicker;
