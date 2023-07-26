import React from "react";
import {
  VStack,
  Stack,
  Box,
  Text,
  Heading,
  Flex,
  // HStack,
  // Divider,
} from "native-base";
import StatsCard from "../../components/Cards/StatsCard";
import StatsCardT3 from "../../components/Cards/StatsCardT3";
import { PieChart } from "react-native-chart-kit";
import { chartConfig } from "../../components/Charts/chartConfig";
import GraphCard from "../../components/Cards/GraphCard";
import TitleCard from "../../components/Cards/TitleCard";
import FilterCard from "../../components/Cards/FilterCard";
import { useNavigation } from "@react-navigation/native";
const CardsStack = ({ screenWidth, data, chartData, isLoaded }) => {
  const navigation = useNavigation();
  return (
    <VStack space={"0"} w={"100%"} alignItems={"center"}>
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
              zone: "vidhanshbha",
              zone_id: "243",
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
            bg="white"
            isLoaded={isLoaded}
          />
          <StatsCard
            heading={"Added Voters"}
            text={data?.total_voters_added}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "45%" : "full"
            }
            bg="white"
            isLoaded={isLoaded}
          />
        </Stack>
        <GraphCard
          heading={"Gender wise (total) voters distribution"}
          width={screenWidth > 800 ? 800 : screenWidth - 20}
          isLoaded={isLoaded}
        >
          {chartData?.length < 1 ? (
            <Box>
              <Text>No Data to Show, add some voters to see analytics</Text>
            </Box>
          ) : (
            <PieChart
              data={chartData}
              width={screenWidth > 800 ? 800 : screenWidth - 40}
              height={200}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
            />
          )}
        </GraphCard>
      </VStack>
      <VStack
        bg={{
          linearGradient: {
            colors: ["secondary.50", "secondary.100"],
            start: [0, 0],
            end: [0, 1],
          },
        }}
        space={"2"}
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
              Mandals
            </Heading>
          </Flex>
          <Stack
            flexDirection={screenWidth > 300 ? "row" : "column"}
            justifyContent={screenWidth > 300 ? "space-between" : "center"}
            alignItems={screenWidth > 300 ? "space-between" : "center"}
            w={screenWidth > 800 ? "800" : screenWidth - 20}
            space={6}
            p={2}
          >
            <StatsCardT3
              heading={"Total Mandals"}
              text={data?.total_mandals}
              onClick={() => navigation.navigate("Mandals")}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
              isLoaded={isLoaded}
            />
            <StatsCardT3
              heading={"Mandal Incharges"}
              text={data?.total_mics}
              onClick={() =>
                navigation.navigate("AllMandalIncharges", {
                  zone: null,
                  zone_id: null,
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
                navigation.navigate("AllSectorIncharges", {
                  zone: null,
                  zone_id: null,
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
                navigation.navigate("AllBLAs", {
                  zone: null,
                  zone_id: null,
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
                navigation.navigate("AllPAs", {
                  zone: null,
                  zone_id: null,
                })
              }
              text={data?.total_pas}
              width={
                screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
              }
              isLoaded={isLoaded}
            />
          </Stack>
        </VStack>
      </VStack>

      <VStack
        bg={{
          linearGradient: {
            colors: ["primary.50", "emerald.100"],
            start: [0, 0],
            end: [0, 1],
          },
        }}
        space={"4"}
        pt={4}
        pb={4}
        w={"100%"}
        alignItems={"center"}
      >
        <TitleCard
          bg={"teal.50"}
          borderColor={"teal.400"}
          icon={"filter"}
          iconColor={"teal.400"}
          heading={"Filter/Search Voters"}
          subheading={`Filter voters of the constituency`}
        />
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-between" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <FilterCard
            heading={"By First Name"}
            icon={"format-letter-case-upper"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            onClick={() =>
              navigation.navigate("Filter Voters", {
                filter: "first-name",
              })
            }
            isLoaded={isLoaded}
          />
          <FilterCard
            heading={"By Last Name"}
            icon={"signature-text"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            onClick={() =>
              navigation.navigate("Filter Voters", {
                filter: "last-name",
              })
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
          <FilterCard
            heading={"By Age Range"}
            icon={"calendar-range-outline"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            onClick={() =>
              navigation.navigate("Filter Voters", {
                filter: "age-range",
              })
            }
          />

          <FilterCard
            heading={"By Caste"}
            icon={"tag-text-outline"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            onClick={() =>
              navigation.navigate("Filter Voters", {
                filter: "caste",
              })
            }
          />
        </Stack>
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-between" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          <FilterCard
            heading={"By Category"}
            icon={"badge-account-outline"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            onClick={() =>
              navigation.navigate("Filter Voters", {
                filter: "category",
              })
            }
          />
          <FilterCard
            heading={"By Gender"}
            icon={"human-male-female"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            onClick={() =>
              navigation.navigate("Filter Voters", {
                filter: "gender",
              })
            }
          />
        </Stack>
        <Stack
          flexDirection={screenWidth > 300 ? "row" : "column"}
          justifyContent={screenWidth > 300 ? "space-around" : "center"}
          alignItems={screenWidth > 300 ? "space-between" : "center"}
          space={6}
          w={screenWidth > 800 ? "800" : screenWidth - 20}
        >
          {/* <FilterCard
            heading={"By Dead/Alive"}
            icon={"account-alert-outline"}
            width={
              screenWidth > 800 ? "380" : screenWidth > 300 ? "48%" : "full"
            }
            onClick={() =>
              navigation.navigate("Filter Voters", {
                filter: "dead-alive",
              })
            }
          /> */}
          {/* <FilterCard
            heading={"By Region"}
            icon={"filter-plus-outline"}
            width={
              screenWidth > 800 ? "800" : screenWidth > 300 ? "48%" : "full"
            }
            onClick={() =>
              navigation.navigate("Filter Voters", {
                filter: "region",
              })
            }
          /> */}
          <FilterCard
            heading={"Advance"}
            icon={"filter-plus-outline"}
            width={"full"}
            type={"advance"}
            onClick={() =>
              navigation.navigate("Filter Voters", {
                filter: "advance",
              })
            }
          />
        </Stack>
      </VStack>
    </VStack>
  );
};

export default CardsStack;
