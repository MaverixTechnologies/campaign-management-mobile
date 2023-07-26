import React from "react";
import { VStack, Stack, Flex, Heading } from "native-base";
// import StatsCardT2 from "../../components/Cards/StatsCardT2";
import TitleCard from "../../components/Cards/TitleCard";
import StatsCard from "../../components/Cards/StatsCard";
import { useNavigation } from "@react-navigation/native";
import StatsCardT3 from "../../components/Cards/StatsCardT3";
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
        <VStack
          w={screenWidth > 800 ? "800" : screenWidth - 20}
          borderRadius={"2xl"}
          space={0}
          borderWidth={2}
          borderColor={"secondary.100"}
        >
          <Flex bgColor={"secondary.100"} py={2} px={2}>
            <Heading fontWeight={"medium"} size={"xs"}>
              Sectors
            </Heading>
          </Flex>
          <Stack
            flexDirection={screenWidth > 300 ? "row" : "column"}
            justifyContent={screenWidth > 300 ? "space-between" : "center"}
            alignItems={screenWidth > 300 ? "space-between" : "center"}
            space={6}
            p={2}
          >
            <StatsCardT3
              heading={"Total Sectors"}
              text={data?.total_sectors}
              onClick={() => navigation.navigate("Sectors")}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
              isLoaded={isLoaded}
            />
            <StatsCardT3
              heading={"Sector Incharges"}
              text={data?.total_sics}
              onClick={() =>
                navigation.navigate("Sectors", {
                  screen: "AllSectorIncharges",
                  params: { zone: "mandal_id", zone_id: itemId },
                })
              }
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
              isLoaded={isLoaded}
            />
          </Stack>
        </VStack>

        <VStack
          w={screenWidth > 800 ? "800" : screenWidth - 20}
          borderRadius={"2xl"}
          space={0}
          borderWidth={2}
          borderColor={"secondary.100"}
        >
          <Flex bgColor={"secondary.100"} py={2} px={2}>
            <Heading fontWeight={"medium"} size={"xs"}>
              Polling Booths
            </Heading>
          </Flex>
          <Stack
            flexDirection={screenWidth > 300 ? "row" : "column"}
            justifyContent={screenWidth > 300 ? "space-between" : "center"}
            alignItems={screenWidth > 300 ? "space-between" : "center"}
            space={1}
            p={2}
          >
            <StatsCardT3
              heading={"Total Booths"}
              text={data?.total_polling_booths}
              onClick={() => navigation.navigate("Booths")}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
              isLoaded={isLoaded}
            />
            <StatsCardT3
              heading={"BLAs"}
              text={data?.total_blas}
              onClick={() =>
                navigation.navigate("Booths", {
                  screen: "AllBLAs",
                  params: { zone: "mandal_id", zone_id: itemId },
                })
              }
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
            space={1}
            p={2}
            mt={1}
          >
            <StatsCardT3
              // heading={"Pollings"}
              heading={"PAs"}
              onClick={() =>
                navigation.navigate("Booths", {
                  screen: "AllPAs",
                  params: { zone: "mandal_id", zone_id: itemId },
                })
              }
              // text={data?.total_polling_booths}
              text={data?.total_pas * 2}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
              isLoaded={isLoaded}
            />
          </Stack>
        </VStack>
        {/* <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-between" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <StatsCardT2
            subheading={"Sectors"}
            heading={"Sector Incharges"}
            text={data?.total_sics}
            text2={data?.total_sectors}
            onClick={() => navigation.navigate("Sectors")}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            isLoaded={isLoaded}
          />
          <StatsCardT2
            subheading={"Booths"}
            heading={"BLAs"}
            text={data?.total_blas}
            text2={data?.total_polling_booths}
            onClick={() => navigation.navigate("Booths")}
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
            // subheading={"Pollings"}
            heading={"PAs"}
            onClick={() => navigation.navigate("Booths")}
            // text={data?.total_polling_booths}
            text={data?.total_pas * 2}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            isLoaded={isLoaded}
          />
        </Stack> */}
      </VStack>
    </VStack>
  );
};

export default CardsStack;
