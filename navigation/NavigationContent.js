import * as React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  VStack,
  Text,
  HStack,
  Divider,
  Icon,
  Button,
} from "native-base";
import UserAvatar from "react-native-user-avatar";
// navigation
import { useNavigation } from "@react-navigation/native";
// state(redux)
import { useDispatch } from "react-redux";
import { resetAuthData } from "../lib/redux/reducers/authReducer";

global.__reanimatedWorkletInit = () => {};
export default function NavigationContent(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(resetAuthData());
    navigation.navigate("Signin");
  };

  return (
    <DrawerContentScrollView {...props}>
      <VStack h={"full"} my="2" mx="1">
        <VStack justifyContent={"space-between"} space="6">
          <HStack space={4} px={4} alignItems={"center"}>
            <UserAvatar size={48} name={"John Doe"} />
            <VStack>
              <Text
                fontSize="xl"
                color="gray.700"
                fontWeight="600"
                textTransform={"capitalize"}
              >
                john doe
              </Text>
              <Text
                fontSize="xs"
                color="gray.500"
                fontWeight="500"
                textTransform={"capitalize"}
              >
                Admin
              </Text>
            </VStack>
          </HStack>
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                key={index}
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(6, 182, 212, 0.1)"
                    : "transparent"
                }
                onPress={() => {
                  props.navigation.navigate(name);
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? "primary.500" : "gray.500"
                    }
                    size="5"
                    as={<MaterialCommunityIcons name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? "primary.500" : "gray.700"
                    }
                  >
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
        <VStack justifyContent={"space-between"} space="5">
          <Divider />
          <VStack space="3">
            <Button
              leftIcon={
                <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
              }
              rounded={"full"}
              onPress={() => doLogout()}
            >
              Logout
            </Button>
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

const getIcon = (screenName) => {
  switch (screenName) {
    case "Inbox":
      return "email";
    case "Outbox":
      return "send";
    case "Favorites":
      return "heart";
    case "Archive":
      return "archive";
    case "Trash":
      return "trash-can";
    case "Spam":
      return "alert-circle";
    case "Dashboard":
      return "developer-board";
    case "Mandals":
      return "alpha-m-circle-outline";
    case "Sectors":
      return "alpha-s-circle-outline";
    case "Pollings":
      return "alpha-p-circle-outline";
    case "Booths":
      return "alpha-b-circle-outline";
    case "Voters":
      return "alpha-v-circle-outline";
    case "All Voters":
      return "account-group-outline";
    case "Add Voter":
      return "account-plus-outline";
    case "Search Voters":
      return "account-search-outline";
    default:
      return undefined;
  }
};
// account-star
// account-supervisor
// account-tie
// adjust
// alpha-m-circle-outline
