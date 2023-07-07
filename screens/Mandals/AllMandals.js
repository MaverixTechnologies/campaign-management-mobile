import React, { useCallback, useState } from "react";
import {
  Text,
  FlatList,
  VStack,
  HStack,
  IconButton,
  Pressable,
  ScrollView,
} from "native-base";
import { ApiService } from "../../lib/axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const AllMandals = ({ navigation: { goBack } }) => {
  const [lists, setLists] = useState();
  const navigation = useNavigation();
  const GetMandals = async () => {
    const e = await ApiService.getMandals();
    setLists(e.data);
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
      <FlatList
        data={lists}
        bg="white"
        px={2}
        renderItem={({ item, index }) => (
          <Pressable
            safeArea
            flex="1"
            onPress={() =>
              navigation.navigate("MandalDashboard", {
                itemId: item?.id,
              })
            }
            _dark={{
              bg: "coolGray.800",
            }}
            _light={{
              bgColor: "primary.50",
            }}
            borderBottomRadius={8}
            borderBottomColor={"primary.100"}
            borderBottomWidth={1}
          >
            <HStack
              pl="4"
              pr="5"
              py="2"
              alignItems="center"
              justifyContent={"space-between"}
              space={3}
            >
              <HStack alignItems="center" space={3}>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  bold
                >
                  #{index + 1}
                </Text>
                <Text
                  fontSize={"md"}
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                  bold
                >
                  {item?.name}
                </Text>
              </HStack>
              <VStack alignItems={"flex-end"}>
                <Text
                  fontSize={"xs"}
                  color="coolGray.700"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Mandal Incharge -
                </Text>
                <Text
                  color="coolGray.700"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  bold
                >
                  {item?.mandalincharge
                    ? item?.mandalincharge?.full_name
                    : "Not Added Yet"}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
};

export default AllMandals;
