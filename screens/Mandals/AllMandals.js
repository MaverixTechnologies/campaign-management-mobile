import React, { useCallback, useState } from "react";
import {
  Text,
  // Heading,
  Box,
  FlatList,
  VStack,
  HStack,
  IconButton,
  Pressable,
  Spacer,
} from "native-base";
// import UserAvatar from "react-native-user-avatar";
import { ApiService } from "../../lib/axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const AllMandals = ({ navigation: { goBack } }) => {
  const [lists, setLists] = useState();
  // const linkTo = useLinkTo();
  const navigation = useNavigation();

  const GetMandals = () => {
    ApiService.getMandals()
      .then((e) => {
        // console.log(e);
        let splitData = e.data.slice(0, 10);
        setLists(splitData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetMandals();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <Box>
      {/* <Heading fontSize="xl" p="4" pb="3">
        Inbox
      </Heading> */}
      <HStack justifyContent={"flex-start"} alignItems={"center"}>
        <IconButton
          size={"md"}
          variant="ghost"
          _icon={{
            as: MaterialIcons,
            name: "arrow-back",
          }}
          onPress={() => goBack()}
          title="Go back"
        />
        <Text
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          bold
        >
          Go back
        </Text>
      </HStack>
      <FlatList
        data={lists}
        space="4"
        renderItem={({ item }) => (
          <Box
            bg="white"
            safeArea
            flex="1"
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.500"
          >
            <Pressable
              onPress={() =>
                navigation.navigate("MandalDashboard", {
                  itemId: item.id,
                })
              }
              _dark={{
                bg: "coolGray.800",
              }}
              _light={{
                bg: "white",
              }}
            >
              <Box pl="4" pr="5" py="2">
                <HStack alignItems="center" space={3}>
                  <VStack>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      Mandal Name -
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      bold
                    >
                      {item.name}
                    </Text>
                  </VStack>
                  <Spacer />
                  <VStack>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      Mandal Incharge -
                    </Text>
                    <Text
                      color="coolGray.800"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      alignSelf="flex-start"
                      bold
                    >
                      {item.mandalincharge
                        ? item.mandalincharge?.full_name
                        : "Not Added Yet"}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Pressable>
          </Box>
        )}
        keyExtractor={(item, i) => i}
      />
    </Box>
  );
};

export default AllMandals;
