import React, { useCallback, useState } from "react";
import {
  Center,
  ScrollView,
  HStack,
  // VStack,
  IconButton,
  Text,
  // Heading,
  // Icon,
  Spinner,
  // Pressable,
} from "native-base";
import { Dimensions } from "react-native";
import CardsStack from "./CardsStack";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { ApiService } from "../../lib/axios";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const MandalDashboard = ({ route, navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mandalInfo, setMandalInfo] = useState();
  const { itemId } = route.params;
  const { goBack } = navigation;
  const GetMandal = () => {
    ApiService.getMandalDashboard(itemId)
      .then((e) => {
        // console.log(e);
        // let splitData = e.data.slice(0, 10);
        setIsLoaded(true);
        setMandalInfo(e?.data);
      })
      .catch(() => {
        setIsLoaded(true);
        // console.log(err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetMandal();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <ScrollView>
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
        <Center>
          <CardsStack
            itemId={itemId}
            screenWidth={screenWidth}
            isLoaded={isLoaded}
            data={mandalInfo}
          />
          {/* {mandalInfo?.mandalincharge_name ? null : (
            <Center>
              <Pressable
                onPress={() => {
                  navigation.navigate("AddMandalIncharge", {
                    itemId: itemId,
                  });
                }}
                w={screenWidth > 800 ? "800" : screenWidth - 20}
                rounded={"full"}
                bg="coolGray.100"
              >
                <HStack
                  bg="primary.100"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  py="4"
                  rounded={"full"}
                  px="8"
                >
                  <Heading
                    size="md"
                    ml="-1"
                    _light={{
                      color: "gray.700",
                    }}
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Add New Member
                  </Heading>
                  <Icon
                    color={"primary"}
                    variant={"ghost"}
                    as={MaterialIcons}
                    name="person-add-alt-1"
                    size={"lg"}
                  />
                </HStack>
              </Pressable>
            </Center>
          )} */}
        </Center>
      ) : (
        <Center h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      )}
    </ScrollView>
  );
};

export default MandalDashboard;
