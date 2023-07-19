import React from "react";
import { VStack, Stack } from "native-base";
import StatsCardT2 from "../../components/Cards/StatsCardT2";
import TitleCard from "../../components/Cards/TitleCard";
import StatsCard from "../../components/Cards/StatsCard";
import { useNavigation } from "@react-navigation/native";
// import GraphCard from "../../components/Cards/GraphCard";
// import { chartConfig } from "../../components/Charts/chartConfig";
// import { PieChart } from "react-native-chart-kit";
import InfoCard from "./InfoCard";

const CardsStack = ({ screenWidth, data, itemId, isLoaded }) => {
  const navigation = useNavigation();

  return (
    <VStack space={"0"} w={"100%"} alignItems={"center"}>
      <VStack
        bg={{
          linearGradient: {
            colors: ["primary.50", "fuchsia.100"],
            start: [0, 0],
            end: [0, 1],
          },
        }}
        // bg={"gray.50"}
        space={"4"}
        pt={4}
        pb={6}
        w={"100%"}
        alignItems={"center"}
      >
        <TitleCard
          bg={"blue.50"}
          borderColor={"primary.400"}
          icon={"pie-chart"}
          iconColor={"primary.400"}
          heading={`${data?.mandal_name} Mandal Info`}
          subheading={`Details of mandal`}
          // isMore={true}
          // onClick={() => navigation.navigate("Voters Analytics")}
        />
        <InfoCard data={data} screenWidth={screenWidth} />
      </VStack>
      <VStack
        bg={{
          linearGradient: {
            colors: ["secondary.50", "blue.100"],
            start: [0, 0],
            end: [0, 1],
          },
        }}
        // bg={"gray.50"}
        space={"4"}
        pt={4}
        pb={6}
        w={"100%"}
        alignItems={"center"}
      >
        <TitleCard
          bg={"blue.50"}
          borderColor={"primary.400"}
          icon={"pie-chart"}
          iconColor={"primary.400"}
          heading={"Voters Stats"}
          subheading={`Voter's statistics of the constituency`}
          isMore={true}
          onClick={() =>
            navigation.navigate("Voters Analytics", {
              zone: "mandal",
              zone_id: itemId,
            })
          }
        />
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-around" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={4}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <StatsCard
            heading={"Total Voters"}
            text={data?.total_voters}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "45%" : "full"
            }
            isLoaded={isLoaded}
            bg="white"
          />
          <StatsCard
            heading={"Added Voters"}
            text={data?.total_voters_added}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "45%" : "full"
            }
            isLoaded={isLoaded}
            bg="white"
          />
        </Stack>
      </VStack>
      <VStack
        bg={{
          linearGradient: {
            colors: ["secondary.50", "secondary.100"],
            start: [0, 0],
            end: [0, 1],
          },
        }}
        space={"4"}
        pt={4}
        pb={6}
        w={"100%"}
        alignItems={"center"}
      >
        <TitleCard
          bg={"secondary.50"}
          borderColor={"secondary.400"}
          icon={"map-pin"}
          iconColor={"secondary.400"}
          heading={"Zone Stats"}
          subheading={`Zonal statistics of the constituency`}
          // isMore={true}
        />
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-between" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <StatsCardT2
            heading={"Sectors"}
            subheading={"Sector Incharges"}
            text={data?.total_sectors}
            onClick={() => navigation.navigate("Sectors")}
            text2={data?.total_sics}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            isLoaded={isLoaded}
          />
          <StatsCardT2
            heading={"Booths"}
            subheading={"BLAs"}
            text={data?.total_polling_booths}
            onClick={() => navigation.navigate("Booths")}
            text2={data?.total_blas}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            isLoaded={isLoaded}
          />
        </Stack>

        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-between" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <StatsCardT2
            heading={"Pollings"}
            subheading={"PAs"}
            onClick={() => navigation.navigate("Booths")}
            text={data?.total_polling_booths}
            text2={data?.total_pas * 2}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            isLoaded={isLoaded}
          />
        </Stack>
      </VStack>
    </VStack>
  );
};

export default CardsStack;
