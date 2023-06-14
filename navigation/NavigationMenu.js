import React from "react";
import { Menu, HamburgerIcon, Text, Pressable } from "native-base";
// navigation
import { useNavigation } from "@react-navigation/native";
// state(redux)
import { useDispatch } from "react-redux";
import { resetAuthData } from "../lib/redux/reducers/authReducer";

export const NavMenu = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(resetAuthData());
    navigation.navigate("Signin");
  };
  return (
    <Menu
      closeOnSelect={true}
      trigger={(triggerProps) => {
        return (
          <Pressable
            accessibilityLabel="More options menu"
            {...triggerProps}
            mr={2}
          >
            <HamburgerIcon size="lg" />
          </Pressable>
        );
      }}
    >
      <Menu.Item
        onPress={() =>
          navigation.navigate("AllVoters", {
            screen: "AllVoters",
          })
        }
      >
        <Text>All Voters</Text>
      </Menu.Item>
      <Menu.Item
        onPress={() =>
          navigation.navigate("AddVoterList", {
            screen: "AddVoterList",
          })
        }
      >
        <Text>Add Voters</Text>
      </Menu.Item>
      <Menu.Item onPress={() => doLogout()}>
        <Text>Sign out</Text>
      </Menu.Item>
    </Menu>
  );
};
