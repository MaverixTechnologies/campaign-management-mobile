import React, { useCallback, useState } from "react";
import {
  Text,
  ScrollView,
  FlatList,
  VStack,
  HStack,
  IconButton,
  Pressable,
  Spinner,
  Center,
} from "native-base";
import { ApiService } from "../../lib/axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const AllBooths = ({ navigation: { goBack } }) => {
  const [lists, setLists] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const navigation = useNavigation();

  const GetBooths = () => {
    ApiService.getBooths()
      .then((e) => {
        setLists(e.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoaded(true);
      });
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetBooths();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <ScrollView bgColor={"primary.50"}>
      <HStack
        space={2}
        p={1}
        bgColor={"secondary.50"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        borderBottomColor={"primary.100"}
        borderBottomWidth={1}
        w={screenWidth > 800 ? "800" : screenWidth}
      >
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
      {isLoaded ? (
        <FlatList
          data={lists}
          px={1}
          space="4"
          renderItem={({ item }) => (
            <Pressable
              safeArea
              flex="1"
              onPress={() =>
                navigation.navigate("BoothDashboard", {
                  itemId: item.id,
                })
              }
              _dark={{
                bg: "coolGray.800",
              }}
              _light={{
                bgColor: "primary.50",
              }}
              borderRadius={8}
              borderBottomColor={"primary.100"}
              borderBottomWidth={1}
            >
              <HStack alignItems="center" pl={2} w={"100%"}>
                <Text
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  bold
                  fontSize="lg"
                  w={"12%"}
                >
                  #{item?.number}
                </Text>
                <VStack
                  pl="4"
                  pr="5"
                  py="2"
                  alignItems="flex-start"
                  justifyContent={"space-between"}
                  space={1}
                  w={"87%"}
                >
                  <HStack
                    w={"100%"}
                    alignItems="center"
                    justifyContent={"space-between"}
                  >
                    <Text
                      fontSize={"md"}
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      bold
                    >
                      {item.name}
                    </Text>
                    <HStack
                      alignItems="center"
                      space={3}
                      borderRadius={"full"}
                      backgroundColor={"rose.100"}
                      _dark={{
                        backgroundColor: "rose.200",
                      }}
                      px={2}
                    >
                      <Text
                        fontSize="xs"
                        color="gray.900"
                        _dark={{
                          color: "rose.600",
                        }}
                        alignSelf="flex-end"
                      >
                        {item.sector?.name}
                      </Text>
                    </HStack>
                  </HStack>
                  <HStack alignItems="center" space={3}>
                    <Text
                      color="primary.800"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      fontSize="xs"
                    >
                      BLA -
                    </Text>
                    <Text
                      color="primary.800"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontSize="xs"
                    >
                      {item.boothlevelagent
                        ? item.boothlevelagent?.full_name
                        : "Not added"}
                    </Text>
                  </HStack>
                  <HStack alignItems="center" space={3}>
                    <Text
                      color="primary.800"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      fontSize="xs"
                    >
                      Sector Incharge -
                    </Text>
                    <Text
                      color="primary.800"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontSize="xs"
                    >
                      {item.sector.sectorincharge
                        ? item.sector?.sectorincharge?.full_name
                        : "Not added"}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </Pressable>
          )}
          keyExtractor={(item, i) => i}
        />
      ) : (
        <Center h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      )}
    </ScrollView>
  );
};

export default AllBooths;
