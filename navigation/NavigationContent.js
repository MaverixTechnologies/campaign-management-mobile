import * as React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  VStack,
  Text,
  HStack,
  Icon,
  Button,
  Box,
} from "native-base";
import UserAvatar from "react-native-user-avatar";
//axios
import AsyncStorage from "@react-native-async-storage/async-storage";
// state(redux)
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../lib/redux/reducers/authReducer";

global.__reanimatedWorkletInit = () => {};
export default function NavigationContent(props) {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.auth);
  const doLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refreshToken");
    dispatch(logout());
  };
  // console.log("props  - ", userProfile?.role?.toUpperCase());
  return (
    <Box flex={1} p={0} m={0}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <HStack
          space={4}
          px={4}
          py={2}
          alignItems={"center"}
          // borderBottomWidth={1}
          borderBottomColor={"primary.100"}
          // backgroundColor={"primary.600"}
        >
          <UserAvatar size={48} name={userProfile?.full_name} />
          <VStack>
            <Text
              fontSize="lg"
              color="primary.600"
              fontWeight="600"
              textTransform={"capitalize"}
            >
              {userProfile?.full_name}
            </Text>
            <Text
              fontSize="xs"
              color="gray.400"
              fontWeight="500"
              textTransform={"uppercase"}
            >
              {userProfile?.role?.toUpperCase() === "MLA"
                ? "VIDHANSABHA INCHARGE"
                : userProfile?.role}
            </Text>
          </VStack>
        </HStack>
        <VStack mx="0" h={"80%"} pt={4} backgroundColor={"primary.50"}>
          <VStack justifyContent={"space-between"} space="6">
            <VStack space="3">
              {props.state.routeNames.map((name, index) =>
                name !== "Filter Voters" &&
                name !== "Voters Analytics" &&
                name !== "Zone Analytics" &&
                name !== "Previous Result" &&
                name !== "AllSectorIncharges" &&
                name !== "AllPAs" &&
                name !== "AllBLAs" &&
                name !== "AllMandalIncharges" ? (
                  <Pressable
                    key={index}
                    px="5"
                    py="3"
                    rounded="md"
                    bg={
                      index === props.state.index
                        ? "secondary.100"
                        : "transparent"
                    }
                    onPress={() => {
                      props.navigation.navigate(name);
                    }}
                  >
                    <HStack space="7" alignItems="center">
                      <Icon
                        color={
                          index === props.state.index
                            ? "secondary.500"
                            : "gray.500"
                        }
                        size="8"
                        as={<MaterialCommunityIcons name={getIcon(name)} />}
                      />
                      <Text
                        fontWeight="500"
                        fontSize={"lg"}
                        color={
                          index === props.state.index
                            ? "secondary.500"
                            : "gray.500"
                        }
                      >
                        {name}
                      </Text>
                    </HStack>
                  </Pressable>
                ) : null
              )}
            </VStack>
          </VStack>
        </VStack>
        <VStack px={4}>
          <Button
            leftIcon={
              <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
            }
            bg={"secondary.600"}
            rounded={"full"}
            onPress={() => doLogout()}
          >
            Logout
          </Button>
        </VStack>
      </DrawerContentScrollView>
    </Box>
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
