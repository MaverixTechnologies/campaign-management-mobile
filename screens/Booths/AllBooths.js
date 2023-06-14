import React, { useCallback, useState } from "react";
import {
  Text,
  // Heading,
  Box,
  FlatList,
  VStack,
  HStack,
  // Avatar,
  Pressable,
  Spacer,
} from "native-base";
// import UserAvatar from "react-native-user-avatar";
import { ApiService } from "../../lib/axios";
import { useFocusEffect, useLinkTo } from "@react-navigation/native";
// import { Text } from "react-native";

const AllSectors = () => {
  const [lists, setLists] = useState();
  const linkTo = useLinkTo();
  const GetSectors = () => {
    ApiService.getBooths().then((e) => {
      // console.log(e);
      let splitData = e.data.slice(0, 10);
      setLists(splitData);
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
              onPress={() => linkTo("/dashboard")}
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
                      {item.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {/* {item.recentText} */}
                      BC - John Doe
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
                      alignSelf="flex-start"
                    >
                      Booth - {item.number}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      Voters - {item.total_voters}
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
