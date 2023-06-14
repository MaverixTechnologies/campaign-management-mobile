import React, { useCallback, useState } from "react";
import {
  Center,
  ScrollView,
  HStack,
  VStack,
  Stack,
  IconButton,
  Text,
  Heading,
  Icon,
  Pressable,
} from "native-base";
import StatsCard from "../../components/Cards/StatsCard";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { chartConfig } from "../../components/Charts/chartConfig";
// import InfoCard from "./InfoCard";
import GraphCard from "../../components/Cards/GraphCard";
import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import InfoCard from "./InfoCard";
import { ApiService } from "../../lib/axios";
const screenWidth = Dimensions.get("window").width;

const SectorDashboard = ({ route, navigation }) => {
  //   const navigation = useNavigation();
  const [sectorInfo, setSectorInfo] = useState();
  const { itemId } = route.params;
  const { goBack } = navigation;
  const data = [
    {
      name: "Voters Added",
      population: 970,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Total Voters",
      population: 2898,
      color: "blue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const GetMandal = () => {
    ApiService.getSector(itemId)
      .then((e) => {
        // console.log(e);
        //   let splitData = e.data.slice(0, 10);
        setSectorInfo(e.data);
      })
      .catch((err) => {
        console.log(err);
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
      <VStack alignSelf={"center"} p={2} space={4} maxWidth={"600"}>
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
        <Center>
          <InfoCard data={sectorInfo} screenWidth={screenWidth} />
        </Center>
        <Center>
          <Stack
            flexDirection={screenWidth > 300 ? "row" : "column"}
            justifyContent={screenWidth > 300 ? "space-between" : "center"}
            alignItems={screenWidth > 300 ? "space-between" : "center"}
            space={6}
            w={screenWidth > 800 ? "800" : screenWidth - 20}
          >
            <StatsCard
              heading={"Booths"}
              text={8}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
              bg="gray.50"
            />
            <StatsCard
              heading={"Voters"}
              text={2898}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
              bg="gray.50"
            />
          </Stack>
        </Center>
        <Center>
          <Stack
            flexDirection={screenWidth > 300 ? "row" : "column"}
            justifyContent={screenWidth > 300 ? "space-between" : "center"}
            alignItems={screenWidth > 300 ? "space-between" : "center"}
            space={6}
            w={screenWidth > 800 ? "800" : screenWidth - 20}
          >
            <StatsCard
              heading={"Voters Added"}
              text={970}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "full" : "full"
              }
              bg="gray.50"
            />
          </Stack>
        </Center>
        {sectorInfo?.sectorincharge ? null : (
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
        <Center>
          <GraphCard heading={"Constituency Distribution"}>
            <PieChart
              data={data}
              width={screenWidth > 800 ? 800 : screenWidth - 40}
              height={200}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
            />
          </GraphCard>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default SectorDashboard;
