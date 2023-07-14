import React, { useCallback, useState } from "react";
import {
  Center,
  ScrollView,
  HStack,
  IconButton,
  Text,
  Heading,
  Icon,
  Pressable,
  Spinner,
} from "native-base";
// import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
// import { chartConfig } from "../../components/Charts/chartConfig";
// import InfoCard from "./InfoCard";
// import GraphCard from "../../components/Cards/GraphCard";
import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
// import InfoCard from "./InfoCard";
import CardsStack from "./CardsStack";
import { ApiService } from "../../lib/axios";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SectorDashboard = ({ route, navigation }) => {
  //   const navigation = useNavigation();
  const [sectorInfo, setSectorInfo] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { itemId } = route.params;
  const { goBack } = navigation;
  // const data = [
  //   {
  //     name: "Remaining Voters",
  //     // population: 2898 - sectorInfo?.total_voters_added,
  //     population: 2898 - 1,
  //     color: "rgba(131, 167, 234, 1)",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: "Voters Added",
  //     population: 1,
  //     color: "green",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  // ];
  const GetSector = () => {
    ApiService.getSectorDashboard(itemId)
      .then((e) => {
        setIsLoaded(true);
        setSectorInfo(e.data);
      })
      .catch((err) => {
        setIsLoaded(true);
        console.log(err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetSector();
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
            data={sectorInfo}
          />
          {sectorInfo?.sectorincharge_name ? null : (
            <Center>
              <Pressable
                onPress={() => {
                  navigation.navigate("AddSectorIncharge", {
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
          )}
        </Center>
      ) : (
        <Center h={screenHeight - 80}>
          <Spinner size={"lg"} />
        </Center>
      )}
    </ScrollView>
  );
};

export default SectorDashboard;
