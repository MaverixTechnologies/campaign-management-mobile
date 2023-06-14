import React, { useCallback } from "react";
import {
  Center,
  ScrollView,
  HStack,
  VStack,
  Stack,
  // IconButton,
  Heading,
  Icon,
  Pressable,
  // Image,
} from "native-base";
import StatsCard from "../../components/Cards/StatsCard";
import { PieChart } from "react-native-chart-kit";
import {
  Dimensions,
  //  ImageBackground
} from "react-native";
import GraphCard from "../../components/Cards/GraphCard";
// import bgImage from "../../assets/bg.jpg";
// navigation
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
// state(redux)
// import { useDispatch } from "react-redux";
import { chartConfig } from "../../components/Charts/chartConfig";
// import OtherNavigation from "../../navigation/OtherNavigation";
import InfoCard from "./InfoCard";
import { MaterialIcons } from "@expo/vector-icons";
const screenWidth = Dimensions.get("window").width;
// const DashboardStack = createNativeStackNavigator();
import { useFocusEffect } from "@react-navigation/native";
// import { ApiService } from "../../lib/axios";

// import PieChartComponent from "../../components/Charts/PieChartComponent";
// import Mandals from "../Mandals";
const Dashboard = () => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  const data = [
    {
      name: "Total Voters",
      population: 1203203,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Voters Added",
      population: 23404,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  // const GetMandals = () => {
  //   ApiService.getMLADashboard().then((e) => {
  //     // console.log(e);
  //     // let splitData = e.data.slice(0, 10);
  //     // setLists(splitData);
  //     console.log("Data - ", e?.data);
  //   });
  // };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      // GetMandals();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <ScrollView bgColor={"coolGray.100"}>
      {/* <DashboardStack.Navigator>
        <DashboardStack.Screen
          name="others"
          component={OtherNavigation}
          options={{ headerMode: "none", headerShown: false }}
        />
      </DashboardStack.Navigator> */}
      {/* <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          // opacity: "1",
        }}
      > */}
      <VStack alignSelf={"center"} p={2} space={4} maxWidth={"600"}>
        <Center>
          <InfoCard screenWidth={screenWidth} />
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
              heading={"Voters"}
              text={1203203}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
              bg="white"
            />
            <StatsCard
              heading={"Added Voters"}
              text={23404}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
              bg="white"
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
              heading={"Mandals"}
              text={"12/21"}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
            />
            <StatsCard
              heading={"Sectors"}
              text={"32/50"}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
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
              heading={"Booths"}
              text={"220/329"}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
            />
            <StatsCard
              heading={"Pollings"}
              text={"400/658"}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
            />
          </Stack>
        </Center>
        <Center>
          <Pressable
            onPress={() => {
              navigation.navigate("AddNewMember");
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
      {/* </ImageBackground> */}
    </ScrollView>
  );
};

export default Dashboard;
