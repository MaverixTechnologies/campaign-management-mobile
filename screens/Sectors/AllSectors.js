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
import { useFocusEffect } from "@react-navigation/native";
// import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const AllSectors = ({ navigation }) => {
  const [lists, setLists] = useState();
  // const linkTo = useLinkTo();
  const { goBack } = navigation;
  const GetSectors = () => {
    ApiService.getSectors()
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
      GetSectors();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <Box>
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
                navigation.navigate("SectorDashboard", {
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
                      {item.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      SI -
                      {item.sectorincharge
                        ? item.sectorincharge?.full_name
                        : "Not added"}
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
                      Mandal - {item.mandal.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      MI -
                      {item.mandal.mandalincharge
                        ? item.mandal?.mandalincharge?.full_name
                        : "Not added"}
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
