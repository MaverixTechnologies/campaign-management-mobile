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

const AllSectors = ({ navigation: { goBack } }) => {
  const [lists, setLists] = useState();
  const navigation = useNavigation();

  const GetSectors = () => {
    ApiService.getBooths().then((e) => {
      // console.log(e);
      // let splitData = e.data.slice(0, 10);
      setLists(e.data);
    });
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetSectors();
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
                navigation.navigate("BoothDashboard", {
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
                      color="coolGray.800"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      bold
                    >
                      {item.name} - #{item.number}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      BLA - {item.boothlevelagent?.full_name}
                    </Text>
                  </VStack>
                  <Spacer />
                  <VStack>
                    <Text
                      fontSize="xs"
                      color="coolGray.800"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      alignSelf="flex-end"
                    >
                      Sector - {item.sector?.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      alignSelf="flex-end"
                    >
                      SI - {item.sector?.sectorincharge?.full_name}
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

export default AllSectors;
