import React, { useCallback, useState } from "react";
import {
  Text,
  Box,
  FlatList,
  VStack,
  HStack,
  IconButton,
  Pressable,
  Spacer,
} from "native-base";
import { ApiService } from "../../lib/axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
const AllMandals = ({ navigation: { goBack } }) => {
  const [lists, setLists] = useState();
  const navigation = useNavigation();
  const GetMandals = async () => {
    const e = await ApiService.getMandals();
    setLists(e.data);

    // ApiService.getMandals().then((e) => {
    //   setLists(e.data);
    // });
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
                  itemId: item?.id,
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
                      {item?.name}
                    </Text>
                  </VStack>
                  <Spacer />
                  <VStack>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      alignSelf="flex-end"
                    >
                      Mandal Incharge -
                    </Text>
                    <Text
                      color="coolGray.800"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      alignSelf="flex-end"
                      bold
                    >
                      {item?.mandalincharge
                        ? item?.mandalincharge?.full_name
                        : "Not Added Yet"}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </Pressable>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default AllMandals;
